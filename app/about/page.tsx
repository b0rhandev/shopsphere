import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { imageAssets } from "../data/images";

type IconName =
  | "return"
  | "support"
  | "delivery"
  | "secure"
  | "quality"
  | "experience"
  | "customer"
  | "price"
  | "arrow"
  | "bag";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
}

interface CoreValue {
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

const features: Feature[] = [
  { id: "returns", title: "بازگشت کالا", description: "تا ۷ روز پس از خرید", icon: "return" },
  { id: "support", title: "پشتیبانی ۲۴/۷", description: "همیشه کنار شما هستیم", icon: "support" },
  { id: "delivery", title: "ارسال سریع", description: "در کوتاه‌ترین زمان ممکن", icon: "delivery" },
  { id: "secure", title: "پرداخت امن", description: "با خیال راحت خرید کنید", icon: "secure" },
];

const team: TeamMember[] = [
  {
    name: "مینا رضایی",
    role: "طراح رابط کاربری",
    image: imageAssets.teamMina,
  },
  {
    name: "علی محمدی",
    role: "توسعه‌دهنده ارشد",
    image: imageAssets.teamAli,
  },
  {
    name: "رضا حسینی",
    role: "مدیر محصول",
    image: imageAssets.teamReza,
  },
];

const coreValues: CoreValue[] = [
  { id: "quality", title: "کیفیت بالا", description: "فقط بهترین‌ها را انتخاب می‌کنیم", icon: "quality" },
  { id: "experience", title: "تجربه کاربری عالی", description: "خریدی ساده و لذت‌بخش", icon: "experience" },
  { id: "customer", title: "تعامل با مشتری", description: "همیشه شنونده نیازهای شما هستیم", icon: "customer" },
  { id: "price", title: "قیمت مناسب", description: "ارزش بیشتر، هزینه کمتر", icon: "price" },
];

const iconPaths: Record<IconName, React.ReactNode> = {
  return: <><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" /></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4ZM17 19a5 5 0 0 1-5 2" /></>,
  delivery: <><path d="M3 7h11v11H3z" /><path d="M14 11h4l3 3v4h-7z" /><circle cx="7.5" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /></>,
  secure: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  quality: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" /><path d="m9.5 12 1.7 1.7 3.4-3.4" /></>,
  experience: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3" /><path d="m5.6 5.6 2.1 2.1m8.6 8.6 2.1 2.1m0-12.8-2.1 2.1m-8.6 8.6-2.1 2.1" /><circle cx="12" cy="12" r="5" /></>,
  customer: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  price: <><path d="M20 13 13 20l-9-9V4h7l9 9Z" /><circle cx="8.5" cy="8.5" r="1" /><path d="m11 14 3-3m-3 0 3 3" /></>,
  arrow: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="m9 14 2 2 4-4" /></>,
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
      {iconPaths[name]}
    </svg>
  );
}

function AboutHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <Link aria-label="ShopSphere صفحه اصلی" className="flex shrink-0 items-center gap-2 text-xl font-black text-gray-900" href="/">
          <span className="grid size-10 place-items-center rounded-xl bg-purple-100 text-purple-700">
            <Icon name="bag" className="size-6" />
          </span>
          <span>Shop<span className="text-purple-700">Sphere</span></span>
        </Link>
        <nav aria-label="منوی اصلی" className="hidden items-center gap-7 text-sm text-gray-600 md:flex">
          <Link className="transition hover:text-purple-700" href="/">خانه</Link>
          <Link className="transition hover:text-purple-700" href="/">فروشگاه</Link>
          <Link className="transition hover:text-purple-700" href="/">دسته‌بندی‌ها</Link>
          <Link aria-current="page" className="border-b-2 border-purple-600 pb-1 font-semibold text-purple-700" href="/about">درباره ما</Link>
          <Link className="transition hover:text-purple-700" href="/contact">تماس با ما</Link>
        </nav>
        <Link className="hidden rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 sm:inline-flex" href="/">
          شروع خرید
        </Link>
      </div>
    </header>
  );
}

function AboutHero() {
  return (
    <section className="grid items-center gap-8 overflow-hidden rounded-2xl bg-gradient-to-l from-violet-100 via-purple-50 to-indigo-100 px-6 py-8 sm:px-10 lg:grid-cols-2 lg:px-14">
      <div className="text-center lg:text-right">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-purple-700 shadow-sm">
          <span className="size-2 rounded-full bg-purple-600" />
          درباره فروشگاه ما
        </span>
        <h1 className="mt-4 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">
          ShopSphere، جایی برای خرید هوشمندانه
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 lg:mx-0">
          ما در شاپ‌اسفیر با هدف ارائه بهترین محصولات، تجربه‌ای لذت‌بخش و مطمئن از خرید آنلاین را برای شما فراهم کرده‌ایم. باور ما این است که خرید آنلاین باید ساده، سریع و لذت‌بخش باشد.
        </p>
        <Link className="mt-6 inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-md" href="/">
          همین حالا خرید کنید <Icon name="arrow" className="size-4" />
        </Link>
      </div>
      <div className="relative mx-auto h-52 w-full max-w-lg overflow-hidden rounded-2xl sm:h-64">
        <div className="absolute inset-0 bg-purple-200/30" />
        <Image
          alt="نمایی از خرید آنلاین و بسته‌بندی محصولات"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 45vw"
          src={imageAssets.aboutShopping}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/15 to-transparent" />
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-purple-50 text-purple-700">
        <Icon name={feature.icon} className="size-6" />
      </span>
      <div>
        <h2 className="text-sm font-bold text-gray-900">{feature.title}</h2>
        <p className="mt-1 text-xs text-gray-500">{feature.description}</p>
      </div>
    </article>
  );
}

function FeaturesGrid() {
  return (
    <section aria-label="مزایای خرید از شاپ‌اسفیر" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => <FeatureCard key={feature.id} feature={feature} />)}
    </section>
  );
}

function StorySection() {
  return (
    <section className="grid items-center gap-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[1fr_1.1fr]">
      <div className="relative min-h-56 overflow-hidden rounded-2xl bg-purple-50 sm:min-h-64">
        <Image
          alt="فضای کاری تیم ShopSphere"
          className="object-cover"
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          src={imageAssets.aboutOffice}
          unoptimized
        />
      </div>
      <div className="py-2">
        <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">داستان ما</span>
        <h2 className="mt-4 text-2xl font-black leading-relaxed text-gray-900">از یک ایده ساده تا یک فروشگاه بزرگ</h2>
        <p className="mt-3 text-sm leading-7 text-gray-600">
          شاپ‌اسفیر در سال ۱۴۰۲ با یک هدف ساده شروع شد: ساخت تجربه‌ای بهتر برای خرید آنلاین. امروز با افتخار در کنار هزاران مشتری هستیم و هر روز برای ارائه خدماتی بهتر تلاش می‌کنیم.
        </p>
        <Link className="mt-5 inline-flex items-center gap-2 rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700" href="/">
          بیشتر بخوانید <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <span className="rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">تیم ما</span>
      <h2 className="mt-4 text-2xl font-black text-gray-900">تیمی پرانرژی و خلاق</h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">با عشق کار می‌کنیم تا بهترین تجربه خرید را برای شما بسازیم.</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {team.map((member) => (
          <article className="text-center" key={member.name}>
            <div className="relative mx-auto size-20 overflow-hidden rounded-full bg-purple-50 ring-4 ring-purple-50 sm:size-24">
              <Image alt={member.name} className="object-cover" fill sizes="96px" src={member.image} unoptimized />
            </div>
            <h3 className="mt-3 text-xs font-bold text-gray-900 sm:text-sm">{member.name}</h3>
            <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StoryAndTeam() {
  return (
    <section aria-label="داستان و تیم ما" className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <TeamSection />
      <StorySection />
    </section>
  );
}

function ValueCard({ value }: { value: CoreValue }) {
  return (
    <article className="rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <span className="mx-auto grid size-12 place-items-center rounded-full bg-purple-50 text-purple-700">
        <Icon name={value.icon} className="size-5" />
      </span>
      <h3 className="mt-3 text-sm font-bold text-gray-900">{value.title}</h3>
      <p className="mt-2 text-xs leading-5 text-gray-500">{value.description}</p>
    </article>
  );
}

function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="rounded-2xl bg-gradient-to-l from-purple-50 to-indigo-50 p-5 sm:p-7">
      <div className="mb-5 text-center">
        <span className="text-xs font-bold text-purple-700">چرا شاپ‌اسفیر؟</span>
        <h2 className="mt-2 text-2xl font-black text-gray-900" id="values-heading">ارزش‌هایی که به آن‌ها پایبندیم</h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map((value) => <ValueCard key={value.id} value={value} />)}
      </div>
    </section>
  );
}

function AboutFooter() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 sm:flex-row sm:px-6">
        <Link className="font-black text-gray-900" href="/">Shop<span className="text-purple-700">Sphere</span></Link>
        <nav aria-label="پیوندهای پایین صفحه" className="flex gap-5">
          <Link className="hover:text-purple-700" href="/">خانه</Link>
          <Link className="hover:text-purple-700" href="/about">درباره ما</Link>
          <Link className="hover:text-purple-700" href="/contact">تماس با ما</Link>
        </nav>
        <p>© تمامی حقوق برای ShopSphere محفوظ است.</p>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <AboutHeader />
      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <AboutHero />
        <FeaturesGrid />
        <StoryAndTeam />
        <ValuesSection />
      </main>
      <AboutFooter />
    </div>
  );
}
