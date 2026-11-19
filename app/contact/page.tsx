import Link from "next/link";
import ChatContactCard from "../components/chat/ChatContactCard";

type IconName =
  | "bag"
  | "user"
  | "mail"
  | "phone"
  | "message"
  | "chevron"
  | "send"
  | "headset";

interface ContactMethod {
  id: string;
  title: string;
  detail: string;
  caption?: string;
  icon: "phone" | "mail" | "headset";
  href?: string;
}

const contactMethods: ContactMethod[] = [
  {
    id: "phone",
    title: "پشتیبانی تلفنی",
    detail: "021-1234-5678",
    caption: "همه روزه از ۹ صبح تا ۹ شب",
    icon: "phone",
    href: "tel:02112345678",
  },
  {
    id: "email",
    title: "ایمیل ما",
    detail: "support@shopsphere.ir",
    caption: "در سریع‌ترین زمان پاسخ می‌دهیم",
    icon: "mail",
    href: "mailto:support@shopsphere.ir",
  },
  {
    id: "chat",
    title: "چت آنلاین",
    detail: "پاسخگوی شما در لحظه",
    icon: "headset",
  },
];

const iconPaths: Record<IconName, React.ReactNode> = {
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /><path d="m9 14 2 2 4-4" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.8 2.1Z" />,
  message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 4a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.4Z" /><path d="M8 11h8m-8 4h5" /></>,
  chevron: <path d="m7 10 5 5 5-5" />,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  headset: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4ZM17 19a5 5 0 0 1-5 2" /></>,
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
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {iconPaths[name]}
    </svg>
  );
}

function ContactHeader() {
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
          <Link className="transition hover:text-purple-700" href="/about">درباره ما</Link>
          <Link aria-current="page" className="border-b-2 border-purple-600 pb-1 font-semibold text-purple-700" href="/contact">تماس با ما</Link>
        </nav>
        <Link className="hidden rounded-full bg-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 sm:inline-flex" href="/">
          شروع خرید
        </Link>
      </div>
    </header>
  );
}

function EnvelopeIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto flex h-44 w-full max-w-sm items-center justify-center sm:h-52">
      <div className="absolute size-44 rounded-full bg-white/40 blur-2xl" />
      <span className="absolute left-12 top-7 size-3 rotate-12 rounded-sm bg-purple-400" />
      <span className="absolute right-10 top-12 size-2 rounded-full bg-purple-500" />
      <span className="absolute bottom-8 left-20 size-2 rounded-full bg-indigo-400" />
      <div className="absolute bottom-4 h-10 w-64 rounded-[50%] bg-purple-300/50 blur-md" />
      <div className="absolute z-10 -top-1 flex h-24 w-20 items-center justify-center rounded-t-xl border border-purple-200 bg-white shadow-sm sm:h-28 sm:w-24">
        <span className="text-5xl font-black text-purple-600">@</span>
      </div>
      <div className="absolute bottom-6 z-20 h-28 w-56 overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg sm:h-32 sm:w-64">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-purple-800/20 [clip-path:polygon(0_0,50%_70%,100%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-x-0 top-0 h-16 bg-violet-400/40 [clip-path:polygon(0_0,100%_0,50%_100%)]" />
      </div>
      <div className="absolute bottom-5 left-5 z-20 size-14 rounded-full bg-white/80 p-2 shadow-sm">
        <div className="h-full w-full rounded-full bg-gradient-to-br from-lime-300 to-emerald-500" />
      </div>
    </div>
  );
}

function ContactHero() {
  return (
    <section className="grid items-center gap-4 overflow-hidden rounded-2xl bg-gradient-to-l from-violet-100 via-purple-50 to-indigo-100 px-6 py-7 sm:px-10 lg:grid-cols-2 lg:px-14">
      <div className="text-center lg:text-right">
        <h1 className="text-3xl font-black leading-tight text-gray-950 sm:text-4xl">با ما در ارتباط باشید!</h1>
        <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">هر سوالی دارید، ما اینجا هستیم تا به شما کمک کنیم.</p>
      </div>
      <EnvelopeIllustration />
    </section>
  );
}

function FormField({
  id,
  label,
  icon,
  type = "text",
  placeholder,
  className = "",
}: {
  id: string;
  label: string;
  icon: IconName;
  type?: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <label className={`relative block ${className}`} htmlFor={id}>
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-purple-700" name={icon} />
      <input
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pe-11 ps-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
        id={id}
        name={id}
        placeholder={placeholder}
        required
        type={type}
      />
    </label>
  );
}

function ContactForm() {
  return (
    <section aria-labelledby="contact-form-heading" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-black text-gray-900" id="contact-form-heading">فرم تماس با ما</h2>
      <p className="mt-2 text-sm text-gray-500">پیام خود را برای ما بنویسید، در اسرع وقت پاسخ می‌دهیم.</p>
      <form action="mailto:support@shopsphere.ir" className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2" encType="text/plain" method="post">
        <FormField id="name" label="نام شما" placeholder="نام شما *" icon="user" />
        <FormField id="email" label="ایمیل شما" placeholder="ایمیل شما *" icon="mail" type="email" />
        <label className="relative block sm:col-span-2" htmlFor="subject">
          <span className="sr-only">موضوع پیام</span>
          <Icon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-purple-700" name="phone" />
          <select
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pe-11 ps-10 text-sm text-gray-500 outline-none transition focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            defaultValue=""
            id="subject"
            name="subject"
            required
          >
            <option disabled value="">موضوع پیام *</option>
            <option value="order">پیگیری سفارش</option>
            <option value="return">مرجوعی کالا</option>
            <option value="support">پشتیبانی محصول</option>
            <option value="other">سایر موارد</option>
          </select>
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" name="chevron" />
        </label>
        <label className="relative block sm:col-span-2" htmlFor="message">
          <span className="sr-only">متن پیام شما</span>
          <Icon className="pointer-events-none absolute right-3 top-3 size-5 text-purple-700" name="message" />
          <textarea
            className="min-h-28 w-full resize-y rounded-xl border border-gray-200 bg-white py-3 pe-11 ps-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            id="message"
            name="message"
            placeholder="پیام خود را اینجا بنویسید... *"
            required
            rows={4}
          />
        </label>
        <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 sm:col-span-2" type="submit">
          ارسال پیام <Icon name="send" className="size-5" />
        </button>
      </form>
    </section>
  );
}

function ContactMethodCard({ method }: { method: ContactMethod }) {
  const content = (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-purple-100 text-purple-700">
        <Icon className="size-6" name={method.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-gray-900">{method.title}</span>
        <span className="mt-1 block break-all text-base font-bold text-gray-800" dir={method.id === "email" || method.id === "phone" ? "ltr" : undefined}>
          {method.detail}
        </span>
        {method.caption && <span className="mt-1 block text-xs text-gray-500">{method.caption}</span>}
        {method.id === "chat" && (
          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            آنلاین
          </span>
        )}
      </span>
    </>
  );

  const className = "flex items-center gap-4 rounded-2xl border border-purple-100 bg-purple-50/60 p-4 shadow-sm transition hover:border-purple-200 hover:bg-purple-50";

  if (method.href) return <a className={className} href={method.href}>{content}</a>;
  if (method.id === "chat") return <ChatContactCard className={className}>{content}</ChatContactCard>;
  return <article className={className}>{content}</article>;
}

function ContactMethods() {
  return (
    <section aria-labelledby="contact-methods-heading" className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-black text-gray-900" id="contact-methods-heading">راه‌های ارتباطی ما</h2>
      <p className="mt-2 text-sm text-gray-500">می‌توانید از راه‌های زیر با ما در ارتباط باشید.</p>
      <div className="mt-5 grid gap-3">
        {contactMethods.map((method) => <ContactMethodCard key={method.id} method={method} />)}
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: "telegram" | "instagram" | "x" | "github" | "youtube" }) {
  const paths: Record<typeof name, React.ReactNode> = {
    telegram: <path d="m21 3-7.2 18-4-8-7.8-3L21 3Zm0 0L9.8 13" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    x: <><path d="m4 4 16 16M20 4 4 20" /></>,
    github: <><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.8a5.3 5.3 0 0 0-1.4-3.7 4.9 4.9 0 0 0-.1-3.7s-1.2-.4-3.8 1.4a13.2 13.2 0 0 0-7 0C5.4 1 4.2 1.4 4.2 1.4a4.9 4.9 0 0 0-.1 3.7 5.3 5.3 0 0 0-1.4 3.7c0 5.3 3.2 6.5 6.2 6.8A3.4 3.4 0 0 0 8 18.3V22" /></>,
    youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3V9Z" /></>,
  };

  return (
    <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function ContactFooter() {
  const socials: Array<{ name: "telegram" | "instagram" | "x" | "github" | "youtube"; label: string }> = [
    { name: "telegram", label: "تلگرام" },
    { name: "instagram", label: "اینستاگرام" },
    { name: "x", label: "ایکس" },
    { name: "github", label: "گیت‌هاب" },
    { name: "youtube", label: "یوتیوب" },
  ];

  return (
    <footer className="mt-auto border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-6 sm:px-6 lg:flex-row">
        <Link aria-label="ShopSphere صفحه اصلی" className="flex items-center gap-2 text-lg font-black text-gray-900" href="/">
          <span className="grid size-9 place-items-center rounded-xl bg-purple-100 text-purple-700"><Icon name="bag" /></span>
          <span>Shop<span className="text-purple-700">Sphere</span></span>
        </Link>
        <nav aria-label="پیوندهای راهنما" className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-600">
          <Link className="hover:text-purple-700" href="/">راهنمای خرید</Link>
          <Link className="hover:text-purple-700" href="/">قوانین و مقررات</Link>
          <Link className="hover:text-purple-700" href="/">حریم خصوصی</Link>
        </nav>
        <div aria-label="شبکه‌های اجتماعی" className="flex gap-2">
          {socials.map((social) => (
            <a
              aria-label={social.label}
              className="grid size-9 place-items-center rounded-full bg-purple-50 text-gray-700 transition hover:bg-purple-100 hover:text-purple-700"
              href="#"
              key={social.name}
            >
              <SocialIcon name={social.name} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 px-4 py-3 text-center text-xs text-gray-500">
        © 2025 ShopSphere
      </div>
    </footer>
  );
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50" dir="rtl">
      <ContactHeader />
      <main className="mx-auto grid w-full max-w-7xl flex-1 content-start gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <ContactHero />
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
          <ContactForm />
          <ContactMethods />
        </div>
      </main>
      <ContactFooter />
    </div>
  );
}
