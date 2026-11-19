"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { imageAssets, type ProductImageKey } from "../data/images";
import { products as defaultProducts, type Product } from "../data/products";

export type OrderStatus = "پرداخت شده" | "در حال پردازش" | "ارسال شد";

export interface CartOrderItem {
  productId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface ShopOrder {
  id: string;
  createdAt: string;
  timeLabel: string;
  dateLabel: string;
  customerName: string;
  items: CartOrderItem[];
  total: number;
  status: OrderStatus;
}

export type CartItems = Record<string, number>;
export type ProductInput = Pick<Product, "name" | "category" | "price" | "discount" | "imageKey"> &
  Partial<Pick<Product, "description" | "oldPrice" | "imageAlt">>;
export type ProductUpdate = Partial<ProductInput>;

interface ShopSnapshot {
  products: Product[];
  cartItems: CartItems;
  wishlist: string[];
  orders: ShopOrder[];
}

interface ShopContextValue extends ShopSnapshot {
  favoriteIds: string[];
  cartCount: number;
  isCartDrawerOpen: boolean;
  isWishlistDrawerOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setCartQuantity: (id: string, quantity: number) => void;
  placeOrder: (customerName?: string) => ShopOrder | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: ProductInput) => void;
  updateProduct: (productId: string, updates: ProductUpdate) => void;
  deleteProduct: (productId: string) => void;
  resetDemoData: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;
  showToast: (message: string) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  openWishlistDrawer: () => void;
  closeWishlistDrawer: () => void;
}

const STORAGE_KEY = "shopsphere-store-v3";
const LEGACY_STORAGE_KEY = "shopsphere-store-v2";
const initialSnapshot: ShopSnapshot = {
  products: defaultProducts,
  cartItems: {},
  wishlist: [],
  orders: [],
};
let shopSnapshot = initialSnapshot;
let storeInitialized = false;
const listeners = new Set<() => void>();
const ShopContext = createContext<ShopContextValue | null>(null);

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach((listener) => listener());
}

function getSnapshot() {
  return shopSnapshot;
}

function getServerSnapshot() {
  return initialSnapshot;
}

function serializeProduct({ id, name, category, imageKey, imageAlt, description, oldPrice, price, discount }: Product) {
  return { id, name, category, imageKey, imageAlt, description, oldPrice, price, discount };
}

function persistSnapshot() {
  try {
    const serializable = {
      ...shopSnapshot,
      products: shopSnapshot.products.map(serializeProduct),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error("Could not save ShopSphere store data.", error);
  }
}

function isCartItems(value: unknown): value is CartItems {
  return typeof value === "object" && value !== null &&
    Object.entries(value).every(([id, quantity]) =>
      typeof id === "string" && Number.isInteger(quantity) && Number(quantity) > 0,
    );
}

function isProductImageKey(value: unknown): value is ProductImageKey {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(imageAssets, value);
}

function parseProduct(value: unknown): Product | null {
  if (typeof value !== "object" || value === null) return null;
  const record = value as Record<string, unknown>;
  if (
    typeof record.id !== "string" || typeof record.name !== "string" ||
    typeof record.category !== "string" || typeof record.imageAlt !== "string" ||
    typeof record.description !== "string" || typeof record.oldPrice !== "number" ||
    typeof record.price !== "number" || typeof record.discount !== "number" ||
    !isProductImageKey(record.imageKey)
  ) return null;
  return {
    id: record.id,
    name: record.name,
    category: record.category,
    imageKey: record.imageKey,
    image: imageAssets[record.imageKey],
    imageAlt: record.imageAlt,
    description: record.description,
    oldPrice: record.oldPrice,
    price: record.price,
    discount: record.discount,
  };
}

function isOrderStatus(value: unknown): value is OrderStatus {
  return value === "پرداخت شده" || value === "در حال پردازش" || value === "ارسال شد";
}

function isOrder(value: unknown): value is ShopOrder {
  if (typeof value !== "object" || value === null) return false;
  const order = value as Record<string, unknown>;
  return typeof order.id === "string" &&
    typeof order.createdAt === "string" &&
    typeof order.timeLabel === "string" &&
    typeof order.dateLabel === "string" &&
    typeof order.customerName === "string" &&
    typeof order.total === "number" &&
    isOrderStatus(order.status) &&
    Array.isArray(order.items) &&
    order.items.every((item) => {
      if (typeof item !== "object" || item === null) return false;
      const line = item as Record<string, unknown>;
      return typeof line.productId === "string" &&
        typeof line.name === "string" &&
        typeof line.category === "string" &&
        typeof line.price === "number" &&
        Number.isInteger(line.quantity) &&
        Number(line.quantity) > 0;
    });
}

function parseSnapshot(value: unknown): ShopSnapshot | null {
  if (typeof value !== "object" || value === null) return null;
  const stored = value as Record<string, unknown>;
  const wishlist = stored.wishlist ?? stored.favoriteIds;
  if (
    !isCartItems(stored.cartItems) ||
    !Array.isArray(wishlist) ||
    !wishlist.every((id) => typeof id === "string") ||
    !Array.isArray(stored.orders) ||
    !stored.orders.every(isOrder)
  ) return null;

  const savedProducts = Array.isArray(stored.products)
    ? stored.products.map(parseProduct).filter((product): product is Product => product !== null)
    : defaultProducts;
  return { products: savedProducts, cartItems: stored.cartItems, wishlist, orders: stored.orders };
}

function formatPersianTime(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", { hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

function calculateOldPrice(price: number, discount: number) {
  return discount >= 100 ? price : Math.round(price / (1 - discount / 100));
}

function createProductId() {
  return `custom-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isCartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (storeInitialized) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      if (stored) {
        const parsed = parseSnapshot(JSON.parse(stored));
        if (parsed) {
          shopSnapshot = parsed;
          persistSnapshot();
        }
      } else {
        const legacyCart = localStorage.getItem("shopsphere-cart");
        const legacyFavorites = localStorage.getItem("shopsphere-favorites");
        const cartItems: unknown = legacyCart ? JSON.parse(legacyCart) : {};
        const wishlist: unknown = legacyFavorites ? JSON.parse(legacyFavorites) : [];
        if (isCartItems(cartItems) && Array.isArray(wishlist) && wishlist.every((id) => typeof id === "string")) {
          shopSnapshot = { ...initialSnapshot, cartItems, wishlist };
          if (legacyCart || legacyFavorites) persistSnapshot();
        }
      }
    } catch (error) {
      console.error("Could not restore ShopSphere store data.", error);
    } finally {
      storeInitialized = true;
      notify();
    }
  }, []);

  useEffect(() => {
    function syncFromAnotherTab(event: StorageEvent) {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue === null) {
        shopSnapshot = initialSnapshot;
        notify();
        return;
      }
      try {
        const parsed = parseSnapshot(JSON.parse(event.newValue));
        if (parsed) {
          shopSnapshot = parsed;
          notify();
        }
      } catch (error) {
        console.error("Could not sync ShopSphere data between tabs.", error);
      }
    }
    window.addEventListener("storage", syncFromAnotherTab);
    return () => window.removeEventListener("storage", syncFromAnotherTab);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string) => setToast(message), []);
  const addToCart = useCallback((product: Product) => {
    shopSnapshot = {
      ...shopSnapshot,
      cartItems: { ...shopSnapshot.cartItems, [product.id]: (shopSnapshot.cartItems[product.id] ?? 0) + 1 },
    };
    persistSnapshot();
    notify();
    setWishlistDrawerOpen(false);
    setCartDrawerOpen(true);
    showToast("محصول به سبد خرید اضافه شد");
  }, [showToast]);
  const removeFromCart = useCallback((id: string) => {
    const cartItems = { ...shopSnapshot.cartItems };
    delete cartItems[id];
    shopSnapshot = { ...shopSnapshot, cartItems };
    persistSnapshot();
    notify();
  }, []);
  const clearCart = useCallback(() => {
    shopSnapshot = { ...shopSnapshot, cartItems: {} };
    persistSnapshot();
    notify();
  }, []);
  const setCartQuantity = useCallback((id: string, quantity: number) => {
    const cartItems = { ...shopSnapshot.cartItems };
    if (quantity <= 0) delete cartItems[id];
    else cartItems[id] = quantity;
    shopSnapshot = { ...shopSnapshot, cartItems };
    persistSnapshot();
    notify();
  }, []);
  const placeOrder = useCallback((customerName = "مشتری مهمان") => {
    const items = Object.entries(shopSnapshot.cartItems).flatMap(([productId, quantity]) => {
      const product = shopSnapshot.products.find((item) => item.id === productId);
      return product ? [{ productId, name: product.name, category: product.category, price: product.price, quantity }] : [];
    });
    if (items.length === 0) return null;

    const now = new Date();
    const order: ShopOrder = {
      id: `SS-${now.getTime().toString().slice(-8)}`,
      createdAt: now.toISOString(),
      timeLabel: `امروز، ${formatPersianTime(now)}`,
      dateLabel: new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "short", day: "numeric" }).format(now),
      customerName: customerName.trim() || "مشتری مهمان",
      items,
      total: items.reduce((total, item) => total + item.price * item.quantity, 0),
      status: "پرداخت شده",
    };
    shopSnapshot = { ...shopSnapshot, cartItems: {}, orders: [order, ...shopSnapshot.orders] };
    persistSnapshot();
    notify();
    setCartDrawerOpen(false);
    showToast("سفارش با موفقیت ثبت شد");
    return order;
  }, [showToast]);
  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    shopSnapshot = {
      ...shopSnapshot,
      orders: shopSnapshot.orders.map((order) => order.id === orderId ? { ...order, status } : order),
    };
    persistSnapshot();
    notify();
  }, []);
  const addProduct = useCallback((input: ProductInput) => {
    const product: Product = {
      id: createProductId(),
      ...input,
      image: imageAssets[input.imageKey],
      imageAlt: input.imageAlt ?? input.name,
      description: input.description ?? "",
      oldPrice: input.oldPrice ?? calculateOldPrice(input.price, input.discount),
    };
    shopSnapshot = { ...shopSnapshot, products: [...shopSnapshot.products, product] };
    persistSnapshot();
    notify();
    showToast("محصول جدید به فروشگاه اضافه شد");
  }, [showToast]);
  const updateProduct = useCallback((productId: string, updates: ProductUpdate) => {
    shopSnapshot = {
      ...shopSnapshot,
      products: shopSnapshot.products.map((product) => {
        if (product.id !== productId) return product;
        const updated = { ...product, ...updates };
        return {
          ...updated,
          image: updates.imageKey ? imageAssets[updates.imageKey] : product.image,
          imageAlt: updates.imageAlt ?? updates.name ?? product.imageAlt,
          oldPrice: updates.oldPrice ?? (
            updates.price !== undefined || updates.discount !== undefined
              ? calculateOldPrice(updated.price, updated.discount)
              : product.oldPrice
          ),
        };
      }),
    };
    persistSnapshot();
    notify();
    showToast("تغییرات محصول ذخیره شد");
  }, [showToast]);
  const deleteProduct = useCallback((productId: string) => {
    shopSnapshot = {
      ...shopSnapshot,
      products: shopSnapshot.products.filter((product) => product.id !== productId),
      cartItems: Object.fromEntries(Object.entries(shopSnapshot.cartItems).filter(([id]) => id !== productId)),
      wishlist: shopSnapshot.wishlist.filter((id) => id !== productId),
    };
    persistSnapshot();
    notify();
    showToast("محصول از فروشگاه حذف شد");
  }, [showToast]);
  const resetDemoData = useCallback(() => {
    shopSnapshot = { ...initialSnapshot, products: defaultProducts };
    persistSnapshot();
    notify();
    setCartDrawerOpen(false);
    setWishlistDrawerOpen(false);
    showToast("محصولات نمونه و سفارش‌ها بازگردانی شدند");
  }, [showToast]);
  const toggleWishlist = useCallback((productId: string) => {
    const isSaved = shopSnapshot.wishlist.includes(productId);
    shopSnapshot = {
      ...shopSnapshot,
      wishlist: isSaved
        ? shopSnapshot.wishlist.filter((id) => id !== productId)
        : [...shopSnapshot.wishlist, productId],
    };
    persistSnapshot();
    notify();
    showToast(isSaved ? "محصول از علاقه‌مندی‌ها حذف شد" : "محصول به علاقه‌مندی‌ها اضافه شد");
  }, [showToast]);
  const isInWishlist = useCallback(
    (productId: string) => snapshot.wishlist.includes(productId),
    [snapshot.wishlist],
  );
  const moveWishlistToCart = useCallback((productId: string) => {
    if (!shopSnapshot.products.some((product) => product.id === productId)) return;
    shopSnapshot = {
      ...shopSnapshot,
      cartItems: { ...shopSnapshot.cartItems, [productId]: (shopSnapshot.cartItems[productId] ?? 0) + 1 },
      wishlist: shopSnapshot.wishlist.filter((id) => id !== productId),
    };
    persistSnapshot();
    notify();
    showToast("محصول به سبد خرید منتقل شد");
  }, [showToast]);
  const openCartDrawer = useCallback(() => {
    setWishlistDrawerOpen(false);
    setCartDrawerOpen(true);
  }, []);
  const closeCartDrawer = useCallback(() => setCartDrawerOpen(false), []);
  const openWishlistDrawer = useCallback(() => {
    setCartDrawerOpen(false);
    setWishlistDrawerOpen(true);
  }, []);
  const closeWishlistDrawer = useCallback(() => setWishlistDrawerOpen(false), []);
  const cartCount = useMemo(
    () => Object.values(snapshot.cartItems).reduce((sum, quantity) => sum + quantity, 0),
    [snapshot.cartItems],
  );

  const value = useMemo<ShopContextValue>(() => ({
    ...snapshot,
    favoriteIds: snapshot.wishlist,
    cartCount,
    isCartDrawerOpen,
    isWishlistDrawerOpen,
    addToCart,
    removeFromCart,
    clearCart,
    setCartQuantity,
    placeOrder,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDemoData,
    toggleWishlist,
    isInWishlist,
    toggleFavorite: toggleWishlist,
    isFavorite: isInWishlist,
    moveWishlistToCart,
    showToast,
    openCartDrawer,
    closeCartDrawer,
    openWishlistDrawer,
    closeWishlistDrawer,
  }), [
    snapshot, cartCount, isCartDrawerOpen, isWishlistDrawerOpen, addToCart,
    removeFromCart, clearCart, setCartQuantity, placeOrder, updateOrderStatus,
    addProduct, updateProduct, deleteProduct, resetDemoData, toggleWishlist,
    isInWishlist, moveWishlistToCart, showToast, openCartDrawer, closeCartDrawer,
    openWishlistDrawer, closeWishlistDrawer,
  ]);

  return (
    <ShopContext.Provider value={value}>
      {children}
      {toast && (
        <div aria-live="polite" className="fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-sm font-bold text-gray-800 shadow-lg">
          <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
            <svg className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6" /></svg>
          </span>
          {toast}
        </div>
      )}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("ShopContext consumers must be rendered inside ShopProvider.");
  return context;
}
