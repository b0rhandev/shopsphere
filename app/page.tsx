import Image from "next/image";
import Link from "next/link";
import { imageAssets } from "./data/images";
import { ProductResults, ProductSearchProvider } from "./components/home/ProductSearch";
import HeroCarousel from "./components/home/HeroCarousel";
import ShippingInfoButton from "./components/home/ShippingInfoButton";
import { StoreActions } from "./components/store/StoreActions";
import LiveSearch from "./components/LiveSearch";
import ThemeToggle from "./components/ThemeToggle";
import type { StaticImageData } from "next/image";

interface Category {
  id: string;
  name: string;
  image: StaticImageData;
  imageAlt: string;
  description: string;
  itemCount: number;
}

type IconName = "bag" | "cart" | "chevron" | "grid" | "heart" | "search" | "arrow";

const categories: Category[] = [
  { id: "laptop", name: "لپ‌تاپ", image: imageAssets.categoryLaptop, imageAlt: "لپ‌تاپ", description: "قدرتی برای قدم بعدی", itemCount: 124 },
  { id: "mobile", name: "موبایل", image: imageAssets.mobile, imageAlt: "موبایل", description: "همیشه یک قدم جلوتر", itemCount: 218 },
  { id: "headphones", name: "هدفون", image: imageAssets.headphones, imageAlt: "هدفون", description: "غرق در صدای دلخواهت", itemCount: 86 },
  { id: "watch", name: "ساعت هوشمند", image: imageAssets.smartwatch, imageAlt: "ساعت هوشمند", description: "زمان را هوشمندانه بگذران", itemCount: 59 },
  { id: "audio", name: "هندزفری", image: imageAssets.earbudsCategory, imageAlt: "هندزفری", description: "موسیقی، همیشه همراه تو", itemCount: 74 },
  { id: "gaming", name: "کنسول بازی", image: imageAssets.gamingConsole, imageAlt: "کنسول بازی", description: "بازی را جور دیگری تجربه کن", itemCount: 42 },
  { id: "home", name: "لوازم خانگی", image: imageAssets.homeAppliances, imageAlt: "لوازم خانگی", description: "خانه‌ای راحت‌تر و هوشمندتر", itemCount: 98 },
  { id: "beauty", name: "زیبایی و سلامت", image: imageAssets.perfume, imageAlt: "زیبایی و سلامت", description: "برای حال خوب هر روزت", itemCount: 63 },
];

// آبجکت آیکون‌ها برای پرفورمنس بهتر به بیرون از کامپوننت منتقل شد
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="m9 14 2 2 4-4" /></>,
  cart: <><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
  heart: <path d="M20.8 8.8c0 4.2-8.8 10-8.8 10S3.2 13 3.2 8.8A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 8.8 1.5Z" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  arrow: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
};

function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

function Header() {
  return (
    <header className="border-b border-gray-100 bg-white" dir="rtl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-4 sm:gap-5 sm:px-6">
        <Link aria-label="ShopSphere صفحه اصلی" className="flex shrink-0 items-center gap-1 text-lg font-black text-gray-900 sm:gap-2 sm:text-xl" href="/">
          <span className="grid size-9 place-items-center rounded-xl bg-purple-100 text-purple-700 sm:size-10">
            <Icon name="bag" className="size-5 sm:size-6" />
          </span>
          <span>Shop<span className="text-purple-700">Sphere</span></span>
        </Link>
        <LiveSearch className="hidden max-w-xl flex-1 md:block" />
        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <div className="hidden sm:block"><ThemeToggle /></div>
          <StoreActions />
          <details className="group relative hidden sm:block">
            <summary className="flex cursor-pointer list-none items-center gap-1 text-xs font-medium text-gray-700 sm:text-sm">
              <span className="sm:hidden">حساب</span><span className="hidden sm:inline">حساب کاربری</span><Icon name="chevron" className="size-4" />
            </summary>
            <div className="absolute left-0 top-full z-30 mt-3 w-48 rounded-2xl border border-gray-100 bg-white p-2 shadow-lg">
              <Link className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-purple-50 hover:text-purple-700" href="/admin">
                پنل مدیریت
              </Link>
            </div>
          </details>
        </div>
      </div>
      <nav aria-label="منوی اصلی" className="border-t border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center gap-7 overflow-x-auto px-4 py-3 text-sm text-gray-600 sm:px-6">
          <Link className="shrink-0 border-b-2 border-purple-600 pb-1 font-semibold text-purple-700" href="/">صفحه اصلی</Link>
          <Link className="shrink-0 transition hover:text-purple-700" href="/">دسته‌بندی‌ها</Link>
          <Link className="shrink-0 transition hover:text-purple-700" href="/">پیشنهاد ویژه</Link>
          <Link className="shrink-0 transition hover:text-purple-700" href="/about">درباره ما</Link>
          <Link className="shrink-0 transition hover:text-purple-700" href="/contact">تماس با ما</Link>
          <Link className="shrink-0 transition hover:text-purple-700 sm:hidden" href="/admin">پنل مدیریت</Link>
        </div>
      </nav>
      <div className="flex items-center gap-2 px-4 pb-3 sm:px-6 md:hidden">
        <LiveSearch className="min-w-0 flex-1" />
        <ThemeToggle />
      </div>
    </header>
  );
}

function CategoryCard({ category, featured = false }: { category: Category; featured?: boolean }) {
  return (
    <Link
      className={`group relative isolate flex min-h-36 overflow-hidden rounded-2xl bg-gray-900 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "col-span-2 min-h-64 sm:min-h-72 lg:row-span-2" : ""
      }`}
      href="#offers"
    >
      <Image
        alt={category.imageAlt}
        className={`absolute inset-0 -z-20 object-cover transition duration-700 group-hover:scale-110 ${
          featured ? "object-center" : "object-center"
        }`}
        fill
        sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
        src={category.image}
        unoptimized
      />
      <div className={`absolute inset-0 -z-10 ${
        featured
          ? "bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-purple-950/10"
          : "bg-gradient-to-t from-gray-950/85 via-gray-950/15 to-transparent"
      }`} />
      {featured && (
        <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-md">
          محبوب‌ترین دسته
        </span>
      )}
      <div className={`mt-auto flex w-full items-end justify-between gap-2 p-4 text-white sm:p-5 ${
        featured ? "sm:p-7" : ""
      }`}>
        <div>
          <span className="mb-1 block text-[10px] font-medium text-white/70 sm:text-xs">
            {category.itemCount.toLocaleString("fa-IR")} محصول برای انتخاب
          </span>
          <h3 className={`font-black ${featured ? "text-2xl sm:text-4xl" : "text-base sm:text-lg"}`}>
            {category.name}
          </h3>
          {featured && <p className="mt-2 hidden text-sm text-white/80 sm:block">{category.description}</p>}
        </div>
        <span className={`grid shrink-0 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-md transition duration-300 group-hover:border-white group-hover:bg-white group-hover:text-purple-700 ${
          featured ? "size-11 sm:size-12" : "size-9"
        }`}>
          <Icon name="arrow" className={featured ? "size-5" : "size-4"} />
        </span>
      </div>
      {!featured && (
        <span className="absolute right-3 top-3 size-1.5 rounded-full bg-purple-300 shadow-[0_0_12px_rgba(216,180,254,0.9)]" />
      )}
    </Link>
  );
}

function CategoryGrid() {
  const featuredCategory = categories.find((category) => category.id === "mobile");
  const otherCategories = categories.filter((category) => category.id !== "mobile");

  if (!featuredCategory) {
    throw new Error("The featured mobile category is missing.");
  }

  return (
    <section aria-label="دسته‌بندی محصولات" className="py-8 sm:py-10" dir="rtl">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold text-purple-700 sm:text-sm">
            <span className="grid size-7 place-items-center rounded-lg bg-purple-100"><Icon name="grid" className="size-4" /></span>
            هر چیزی که دنبالش هستی
          </p>
          <h2 className="text-2xl font-black text-gray-950 sm:text-3xl">از کجا شروع کنیم؟</h2>
        </div>
        <Link className="mb-1 inline-flex shrink-0 items-center gap-1 text-xs font-bold text-purple-700 transition hover:gap-2 sm:text-sm" href="#offers">
          دیدن محصولات <Icon name="arrow" className="size-4" />
        </Link>
      </div>
      <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-2 gap-4 sm:auto-rows-[minmax(170px,auto)] sm:grid-cols-3 lg:auto-rows-[minmax(180px,auto)] lg:grid-cols-4 lg:gap-5">
        <CategoryCard category={featuredCategory} featured />
        {otherCategories.map((category) => <CategoryCard key={category.id} category={category} />)}
        <Link
          className="group flex min-h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-purple-200 bg-purple-50/70 p-4 text-center text-purple-800 transition hover:border-purple-400 hover:bg-purple-100"
          href="#offers"
        >
          <span className="grid size-11 place-items-center rounded-full bg-white text-purple-700 shadow-sm transition group-hover:scale-110">
            <Icon name="grid" className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-black">محصولات فروشگاه</span>
            <span className="mt-1 block text-[11px] text-purple-600">پیشنهادهای منتخب را ببین</span>
          </span>
          <Icon name="arrow" className="size-4 transition group-hover:-translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function SpecialOffers() {
  return (
    <section aria-labelledby="offers-title" className="pb-12" dir="rtl" id="offers">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-black text-gray-900 sm:text-2xl" id="offers-title">پیشنهاد شگفت‌انگیز</h2>
        <Link className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 transition hover:text-purple-900 sm:text-sm" href="/offers">
          مشاهده همه <Icon name="arrow" className="size-4" />
        </Link>
      </div>
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
        <ProductResults />
        <aside className="relative flex h-fit min-h-0 flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-100 p-5 shadow-sm">
          <div className="relative z-10">
            <p className="text-xs font-bold text-purple-700">هدیه شاپ‌اسفیر</p>
            <h3 className="mt-1 text-xl font-black leading-relaxed text-gray-900">ارسال رایگان</h3>
            <p className="text-xs font-medium leading-5 text-gray-700">برای سفارش‌های بالای ۱ میلیون تومان</p>
            <ShippingInfoButton />
          </div>
          <div aria-hidden="true" className="absolute bottom-1 left-2 text-purple-300/90">
            <svg className="size-16" fill="none" viewBox="0 0 64 48">
              <path d="M4 13h34v23H4zM38 21h12l10 10v5H38z" fill="currentColor" />
              <path d="M42 24h7l6 7H42z" fill="#fff" fillOpacity=".75" />
              <circle cx="17" cy="38" r="5" fill="#6d28d9" />
              <circle cx="49" cy="38" r="5" fill="#6d28d9" />
              <circle cx="17" cy="38" r="2" fill="#fff" />
              <circle cx="49" cy="38" r="2" fill="#fff" />
              <path d="M2 9h12M7 4h12M1 22h7" stroke="#a78bfa" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <ProductSearchProvider>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="pt-6"><HeroCarousel /></div>
          <CategoryGrid />
          <SpecialOffers />
        </main>
      </div>
    </ProductSearchProvider>
  );
}