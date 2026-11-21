"use client";

import { useEffect, useRef, useState } from "react";

export default function ShippingInfoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen]);

  return (
    <>
      <button
        className="mt-3 inline-flex items-center gap-1 rounded-full bg-purple-600 px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-purple-700"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        اطلاعات بیشتر
        <svg aria-hidden="true" className="size-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M19 12H5m7 7-7-7 7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" dir="rtl">
          <button
            aria-label="بستن توضیحات ارسال رایگان"
            className="absolute inset-0 bg-gray-950/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <section
            aria-labelledby="shipping-info-title"
            aria-modal="true"
            className="relative z-10 w-full max-w-md rounded-2xl border border-purple-100 bg-white p-5 shadow-2xl sm:p-7 dark:border-purple-500/20 dark:bg-[#151124]"
            role="dialog"
          >
            <button
              aria-label="بستن"
              className="absolute left-4 top-4 grid size-9 place-items-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-purple-100 hover:text-purple-700 dark:bg-[#201a35] dark:text-violet-100"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
            <div className="grid size-12 place-items-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-violet-200">
              <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24">
                <path d="M3 7h11v11H3zM14 11h4l3 3v4h-7z" />
                <circle cx="7.5" cy="18" r="1.5" />
                <circle cx="18" cy="18" r="1.5" />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-black text-gray-900 dark:text-violet-50" id="shipping-info-title">
              شرایط ارسال رایگان
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-violet-100/80">
              سفارش‌هایی که مبلغ آن‌ها بیش از ۱٬۰۰۰٬۰۰۰ تومان باشد، شامل پیشنهاد ارسال رایگان می‌شوند.
              در حال حاضر ارسال استاندارد در مرحلهٔ ثبت سفارش رایگان نمایش داده می‌شود.
            </p>
            <button
              className="mt-5 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-700"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              متوجه شدم
            </button>
          </section>
        </div>
      )}
    </>
  );
}
