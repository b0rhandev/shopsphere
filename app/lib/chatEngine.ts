import type { Product } from "../data/products";
import type { ShopOrder } from "../context/ShopContext";

export type Order = ShopOrder;

export interface BotReply {
  text: string;
  products?: Product[];
  latestOrder?: Order;
  quickReplies?: string[];
}

export interface ChatContext {
  products: Product[];
  orders: Order[];
  cartCount: number;
}

const helpfulReplies = [
  "محصولات زیر ۵ میلیون",
  "پیگیری سفارش من",
  "بیشترین تخفیف‌ها",
  "شرایط ارسال رایگان",
];

export function normalizePersianText(value: string) {
  return value
    .toLocaleLowerCase("fa")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/[\u200c\u0640]/g, "")
    .replace(/[،,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getBudget(message: string) {
  const match = message.match(/(\d+(?:\.\d+)?)\s*(میلیون|مليون|م|هزار|هزار تومن|تومان|تومن)?/);
  if (!match) return null;
  const amount = Number(match[1]);
  const unit = match[2];
  if (unit === "میلیون" || unit === "مليون" || unit === "م" || (!unit && amount < 1000)) {
    return amount * 1_000_000;
  }
  if (unit === "هزار" || unit === "هزار تومن") return amount * 1000;
  return amount;
}

function isTrackingRequest(message: string) {
  return /پیگیری|وضعیت سفارش|سفارش/.test(message);
}

function isSupportRequest(message: string) {
  return /ارسال|پشتیبانی|تماس|تلفن|آدرس|رایگان/.test(message);
}

function getCategoryTerms(message: string) {
  const categories: Record<string, string[]> = {
    موبایل: ["موبایل", "گوشی", "آیفون", "iphone", "سامسونگ", "samsung"],
    "ساعت هوشمند": ["ساعت", "مچبند", "مچ بند", "smartwatch"],
    هدفون: ["هدفون", "هندزفری", "ایرپاد", "airpod", "headphone", "earbud"],
    لپتاپ: ["لپتاپ", "لپ تاپ", "مکبوک", "macbook"],
  };
  return Object.values(categories).filter((terms) => terms.some((term) => message.includes(term)));
}

function formatPrice(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

// n8n integration boundary: replace only this function with an async fetch and keep its callers awaiting the result; no UI changes are needed.
export function generateBotReply(message: string, context: ChatContext): BotReply {
  const normalized = normalizePersianText(message);
  const { products, orders, cartCount } = context;

  if (isTrackingRequest(normalized)) {
    const latestOrder = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
    if (!latestOrder) {
      return {
        text: "هنوز سفارشی برای پیگیری ثبت نشده است. می‌توانید محصولات فروشگاه را ببینید و هر زمان خواستید خریدتان را انجام دهید.",
        quickReplies: ["محصولات زیر ۵ میلیون", "بیشترین تخفیف‌ها"],
      };
    }
    return {
      text: "آخرین سفارش شما را پیدا کردم. جزئیات و وضعیت فعلی آن:",
      latestOrder,
      quickReplies: ["محصولات زیر ۵ میلیون", "شرایط ارسال رایگان"],
    };
  }

  if (isSupportRequest(normalized)) {
    return {
      text: "ارسال سفارش‌های بالای ۱٬۰۰۰٬۰۰۰ تومان رایگان است. برای راهنمایی بیشتر با پشتیبانی ShopSphere تماس بگیرید: 021-1234-5678.",
      quickReplies: ["پیگیری سفارش من", "محصولات زیر ۵ میلیون"],
    };
  }

  const budget = getBudget(normalized);
  const asksForDiscount = /ارزان|اقتصادی|زیر|کمتر|تا|بودجه/.test(normalized);
  const categories = getCategoryTerms(normalized);
  if (budget !== null || asksForDiscount || /تخفیف/.test(normalized)) {
    if (budget === null && !asksForDiscount) {
      const discounted = [...products].sort((a, b) => b.discount - a.discount || a.price - b.price);
      return {
        text: "این محصولات در حال حاضر بیشترین درصد تخفیف را دارند:",
        products: discounted.slice(0, 4),
        quickReplies: ["محصولات زیر ۵ میلیون", "پیگیری سفارش من"],
      };
    }
    const limit = budget ?? 5_000_000;
    let matches = products.filter((product) => product.price <= limit);
    if (categories.length) {
      matches = matches.filter((product) =>
        categories.some((terms) => terms.some((term) =>
          normalizePersianText(`${product.name} ${product.category}`).includes(term),
        )),
      );
    }
    matches = matches.sort((a, b) => b.discount - a.discount || a.price - b.price);
    return {
      text: matches.length
        ? `این گزینه‌ها با بودجه‌ی ${formatPrice(limit)} هماهنگ‌اند.`
        : `در حال حاضر محصولی با این شرایط تا ${formatPrice(limit)} پیدا نکردم. می‌توانید بودجه یا دسته‌بندی دیگری را امتحان کنید.`,
      products: matches,
      quickReplies: ["بیشترین تخفیف‌ها", "پیگیری سفارش من"],
    };
  }

  if (/سبد|خرید/.test(normalized) && !/محصول|ارزان/.test(normalized)) {
    return {
      text: `در حال حاضر ${cartCount.toLocaleString("fa-IR")} قلم کالا در سبد خرید شماست. برای دیدن محصولات یا افزودن کالای تازه، یکی از گزینه‌ها را انتخاب کنید.`,
      quickReplies: ["محصولات زیر ۵ میلیون", "بیشترین تخفیف‌ها"],
    };
  }

  const searchCategories = getCategoryTerms(normalized);
  const matches = products.filter((product) => {
    const productText = normalizePersianText(`${product.name} ${product.category}`);
    return productText.includes(normalized) || searchCategories.some((terms) =>
      terms.some((term) => productText.includes(term)),
    );
  });
  if (matches.length) {
    return {
      text: `چند محصول مرتبط با «${message.trim()}» پیدا کردم:`,
      products: matches,
      quickReplies: ["محصولات زیر ۵ میلیون", "بیشترین تخفیف‌ها"],
    };
  }

  return {
    text: "خوشحال می‌شوم راهنمایی‌تان کنم. می‌توانید نام محصول، بازه قیمت، وضعیت سفارش یا شرایط ارسال را بپرسید.",
    quickReplies: helpfulReplies,
  };
}
