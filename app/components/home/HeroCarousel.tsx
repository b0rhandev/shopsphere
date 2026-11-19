"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState, type FocusEvent } from "react";
import { imageAssets } from "../../data/images";

interface HeroSlide {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  images: Array<{ label: string; src: StaticImageData }>;
  accent: string;
}

const slides: HeroSlide[] = [
  {
    id: "technology",
    eyebrow: "جدیدترین محصولات با بهترین قیمت",
    title: "تکنولوژی در دستان شما",
    description: "دنیایی از انتخاب‌های هوشمند، فقط با یک کلیک.",
    action: "مشاهده محصولات",
    images: [
      { label: "ساعت هوشمند", src: imageAssets.smartwatch },
      { label: "موبایل", src: imageAssets.mobile },
      { label: "هدفون", src: imageAssets.headphones },
    ],
    accent: "from-indigo-100 via-purple-50 to-violet-100",
  },
  {
    id: "sound",
    eyebrow: "لحظه‌هایت را با صدای بهتر زندگی کن",
    title: "صدایی که حال‌وهوایت را عوض می‌کند",
    description: "هدفون و هندزفری دلخواهت را پیدا کن؛ موسیقی همیشه همراه توست.",
    action: "کشف دنیای صدا",
    images: [
      { label: "اسپیکر بلوتوثی", src: imageAssets.bluetoothSpeaker },
      { label: "هندزفری بی‌سیم", src: imageAssets.wirelessEarbuds },
      { label: "هدفون روگوشی", src: imageAssets.headphones },
    ],
    accent: "from-fuchsia-100 via-purple-50 to-pink-100",
  },
  {
    id: "workspace",
    eyebrow: "برای ایده‌هایی که متوقف نمی‌شوند",
    title: "فضای کارتو، هوشمندانه بساز",
    description: "از لپ‌تاپ تا لوازم جانبی؛ ابزارهای تازه برای کارهای بزرگ.",
    action: "ارتقای فضای کار",
    images: [
      { label: "ماوس بی‌سیم", src: imageAssets.wirelessMouse },
      { label: "لپ‌تاپ", src: imageAssets.macbookAir },
      { label: "کیبورد مکانیکال", src: imageAssets.mechanicalKeyboard },
    ],
    accent: "from-sky-100 via-indigo-50 to-purple-100",
  },
  {
    id: "gaming",
    eyebrow: "وقتشه وارد مرحله بعدی بشی",
    title: "بازی را جور دیگری تجربه کن",
    description: "کنسول و تجهیزات بازی را انتخاب کن و آماده رقابت شو.",
    action: "شروع ماجراجویی",
    images: [
      { label: "دسته بازی", src: imageAssets.gameController },
      { label: "کنسول بازی", src: imageAssets.gamingConsole },
      { label: "تجهیزات بازی", src: imageAssets.gamingGear },
    ],
    accent: "from-violet-100 via-purple-50 to-blue-100",
  },
];

function ArrowIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      className={`size-4 ${direction === "next" ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M19 12H5m7 7-7-7 7-7" />
    </svg>
  );
}

function ProductShowcase({ items }: { items: HeroSlide["images"] }) {
  return (
    <div aria-hidden="true" className="relative mx-auto flex h-48 w-full max-w-md items-center justify-center sm:h-60">
      <div className="absolute bottom-1 h-20 w-4/5 rounded-[50%] bg-purple-300/50 blur-md" />
      <div className="absolute right-8 top-2 size-28 rounded-full bg-white/40 blur-2xl sm:size-40" />
      <div className="relative z-10 flex items-end gap-2 sm:gap-4">
        {items.map((item, index) => (
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-2 shadow-lg transition duration-500 ${
              index === 1 ? "h-44 w-28 sm:h-52 sm:w-36" : "h-32 w-24 sm:h-40 sm:w-28"
            }`}
            key={item.label}
          >
            <Image
              alt={item.label}
              className="rounded-xl object-cover"
              fill
              sizes="(max-width: 640px) 100px, 140px"
              src={item.src}
              unoptimized
            />
          </div>
        ))}
      </div>
      <span className="absolute right-8 top-6 size-2 rounded-full bg-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.8)]" />
      <span className="absolute bottom-10 left-8 size-3 rounded-sm bg-indigo-300/80" />
    </div>
  );
}

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  function moveSlide(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
  }

  return (
    <section
      aria-label="پیشنهادهای فروشگاه"
      aria-roledescription="اسلایدر"
      className={`relative isolate overflow-hidden rounded-2xl bg-gradient-to-l ${activeSlide.accent} px-6 py-8 transition-colors duration-700 sm:px-12 sm:py-10`}
      dir="rtl"
      onBlur={handleBlur}
      onFocus={() => setIsPaused(true)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -left-12 -top-20 -z-10 size-72 rounded-full bg-white/40 blur-3xl" />
      <div className="grid min-h-64 items-center gap-6 md:grid-cols-2">
        <div className="text-center md:text-right" key={activeSlide.id}>
          <p className="mb-3 text-sm font-bold text-purple-700">{activeSlide.eyebrow}</p>
          <h1 className="text-3xl font-black leading-tight text-gray-950 sm:text-5xl">{activeSlide.title}</h1>
          <p className="mt-4 text-sm text-gray-600 sm:text-base">{activeSlide.description}</p>
          <Link
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_18px_rgba(109,40,217,0.2)] transition hover:-translate-y-0.5 hover:bg-purple-700 hover:shadow-md"
            href="#offers"
          >
            {activeSlide.action} <ArrowIcon direction="previous" />
          </Link>
        </div>
        <ProductShowcase items={activeSlide.images} />
      </div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          aria-label="بنر قبلی"
          className="grid size-8 place-items-center rounded-full border border-purple-200/80 bg-white/60 text-purple-700 transition hover:bg-white"
          onClick={() => moveSlide(-1)}
          type="button"
        >
          <ArrowIcon direction="previous" />
        </button>
        <div aria-label={`اسلاید ${activeIndex + 1} از ${slides.length}`} className="flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`رفتن به بنر ${index + 1}: ${slide.title}`}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex ? "h-2.5 w-7 bg-purple-600" : "size-2.5 bg-purple-300 hover:bg-purple-400"
              }`}
              key={slide.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
        <button
          aria-label="بنر بعدی"
          className="grid size-8 place-items-center rounded-full border border-purple-200/80 bg-white/60 text-purple-700 transition hover:bg-white"
          onClick={() => moveSlide(1)}
          type="button"
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">
        بنر {activeIndex + 1} از {slides.length}: {activeSlide.title}
      </span>
    </section>
  );
}
