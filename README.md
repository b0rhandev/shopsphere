# ShopSphere

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Store-7c3aed?style=for-the-badge)](https://b0rhandev.github.io/shopsphere/)
[![Admin Panel](https://img.shields.io/badge/Admin_Panel-Open_Dashboard-4c1d95?style=for-the-badge)](https://b0rhandev.github.io/shopsphere/admin/)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**Language:** [English](#overview) | [فارسی](#معرفی-پروژه)

---

## Overview

**ShopSphere** is a modern, portfolio-grade Persian (RTL) e-commerce platform and live admin dashboard built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Engineered to run as a 100% self-contained static application on GitHub Pages, it eliminates dead buttons and hardcoded mockups by unifying the **Storefront**, **Admin Panel**, and **Smart Shopping Assistant** around a single reactive client-side state layer (`ShopContext` + `localStorage`).

Every product edit, order submission, status update, and wishlist toggle syncs instantaneously across the entire application—with zero external image dependencies and zero broken routes on static hosting.

---

## Key Features

### Storefront & User Experience
- **RTL-First Glassmorphic Design:** Custom purple branding with soft elevation, responsive mobile-first layouts, and clean Persian typography.
- **Midnight-Purple Dark Mode:** Custom theme provider persisting user preference across the storefront, admin dashboard, drawers, and chatbot.
- **Real-Time Live Search:** Instant product filtering with Persian/Arabic character normalization (`ی`/`ي`, `ک`/`ك`) and direct add-to-cart actions.
- **Persistent Cart & Wishlist Drawers:** Live badge counters in the header, move-to-cart controls, and subtle toast notifications.

### Two-Way Live Admin Dashboard (`/admin`)
- **Live Order Feed:** Orders placed in the storefront immediately appear in **Recent Orders** with real timestamps, totals, and editable statuses (`پرداخت شده`, `در حال پردازش`, `ارسال شد`).
- **Dynamic KPIs & Sales Chart:** Total revenue, order counts, and catalog size recalculate automatically from live state.
- **Product CRUD Sync:** Add, edit, or delete products in the **Products** tab and see updates reflect immediately in the storefront, live search, and chatbot.
- **One-Click Demo Reset:** Restore the default catalog and demo data at any time.

### Decoupled Smart Shopping Assistant
- **Always-On Client Engine:** Runs 100% locally in `app/lib/chatEngine.ts` with zero exposed API keys.
- **Inventory & Order Aware:** Handles budget queries, product lookups with interactive mini-cards, direct **Add to Cart** actions, and live order tracking.
- **Automation-Ready:** Isolated behind a single function boundary so it can be connected to an external **n8n webhook** or LLM backend without changing any UI components.

### Static Export & CI/CD
- **Zero External Asset Fragility:** All product, banner, category, and avatar images are bundled locally via Next.js `StaticImageData` imports.
- **Dual-Environment Config:** `next.config.ts` dynamically applies `basePath` and `assetPrefix` during GitHub Actions builds while keeping `localhost:3000` clean at `/`.
- **Automated Deployment:** Configured with `output: "export"`, `trailingSlash: true`, `public/.nojekyll`, and GitHub Actions (`.github/workflows/deploy.yml`).

---

## 60-Second Interactive Walkthrough

1. Open the [Live Storefront](https://b0rhandev.github.io/shopsphere/) and click the floating **Chat Assistant** in the bottom-left corner.
2. Select **"محصولات زیر ۵ میلیون"** and add a recommended product straight to your cart from inside the chat.
3. Open the **Cart Drawer**, submit the order, and ask the assistant **"پیگیری سفارش من"** to check your live status.
4. Visit the [Admin Dashboard](https://b0rhandev.github.io/shopsphere/admin/) to manage that order in **Recent Orders** and edit any product price in the **Products** tab—then return to the storefront to see the live update.
5. Toggle **Dark Mode**, try the **Live Search** bar, and save items to your **Wishlist**.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State & Persistence | React Context API (`ShopContext`, `ChatContext`, `ThemeContext`) + `localStorage` |
| Assets | Local Static Imports (`next/image` with `unoptimized: true`) |
| CI/CD & Hosting | GitHub Actions & GitHub Pages |

---

## Project Structure

```text
shopsphere/
├── .github/
│   └── workflows/          # Automated GitHub Pages deployment
├── app/
│   ├── about/              # About page
│   ├── admin/              # Live Admin Dashboard
│   ├── components/         # Modular UI, admin, chat, search & wishlist components
│   ├── contact/            # Contact page linked to live chat trigger
│   ├── context/            # ShopContext, ChatContext, ThemeContext
│   ├── data/               # Shared product catalog & static image registry
│   ├── lib/                # Decoupled local chatbot engine (n8n-ready)
│   ├── globals.css         # Tailwind v4 & dark theme styles
│   ├── layout.tsx          # Root RTL layout & providers
│   └── page.tsx            # Storefront homepage
├── public/                 # Bundled local images & .nojekyll
├── AGENTS.md               # Design system & architectural guidelines
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Static export & GitHub Pages basePath config
├── package.json            # Scripts & dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## Local Development

```bash
git clone [https://github.com/b0rhandev/shopsphere.git](https://github.com/b0rhandev/shopsphere.git)
cd shopsphere
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser, or run `npm run lint && npm run build` to verify the static export.

---

## Author

Built by **Borhan** — Front-End Developer & Workflow Automation Builder  
GitHub: [@b0rhandev](https://github.com/b0rhandev)

---

<div dir="rtl">

## معرفی پروژه

**ShopSphere** یک پلتفرم فروشگاهی مدرن و راست‌چین (RTL) همراه با پنل مدیریت زنده است که با **Next.js (App Router)**، **TypeScript** و **Tailwind CSS v4** توسعه داده شده است. این پروژه به‌گونه‌ای مهندسی شده که به‌صورت ۱۰۰٪ استاتیک و خودکفا روی GitHub Pages اجرا شود، اما به لطف همگام‌سازی لحظه‌ای داده‌ها از طریق `ShopContext` و `localStorage`، تجربه‌ای کامل و تعاملی مشابه یک اپلیکیشن فول‌استک ارائه دهد.

در این پروژه هیچ دکمه‌ی دکوری یا غیرفعالی وجود ندارد؛ **ویترین فروشگاه**، **پنل ادمین** و **دستیار هوشمند خرید** همگی به یک منبع داده‌ی واحد متصل هستند و هرگونه ثبت سفارش، ویرایش محصول یا تغییر وضعیت به‌صورت آنی در کل سایت بازتاب پیدا می‌کند.

---

## ویژگی‌های کلیدی

### ویترین فروشگاه و تجربه کاربری
- **طراحی شیشه‌ای و کاملاً راست‌چین (RTL):** هویت بصری اختصاصی با تم بنفش، چیدمان کاملاً واکنش‌گرا برای موبایل و دسکتاپ و تایپوگرافی خوانای فارسی.
- **حالت شب مخملی (Dark Mode):** سیستم تغییر تم اختصاصی با ذخیره‌سازی انتخاب کاربر در تمام صفحات فروشگاه، پنل ادمین، کشوهای کناری و چت‌بات.
- **جستجوی زنده و هوشمند:** فیلتر لحظه‌ای محصولات با یکسان‌سازی حروف فارسی و عربی (`ی`/`ي` و `ک`/`ك`) همراه با دکمه‌ی افزودن سریع به سبد خرید.
- **سبد خرید و علاقه‌مندی‌های پویا:** نمایشگر زنده تعداد آیتم‌ها در هدر، امکان انتقال مستقیم کالا از علاقه‌مندی‌ها به سبد خرید و اعلان‌های نرم (Toast).

### پنل مدیریت زنده با همگام‌سازی دوطرفه (`/admin`)
- **مدیریت سفارش‌های واقعی:** سفارش‌هایی که در فروشگاه ثبت می‌شوند، بلافاصله همراه با زمان دقیق، مبلغ کل و امکان تغییر وضعیت (`پرداخت شده`، `در حال پردازش`، `ارسال شد`) در بخش **آخرین سفارش‌ها** ظاهر می‌شوند.
- **کارت‌های آماری پویا و نمودار فروش:** درآمد کل، تعداد سفارش‌ها و تعداد کل محصولات به‌صورت خودکار بر اساس داده‌های زنده محاسبه می‌شوند.
- **مدیریت کامل محصولات (CRUD):** امکان افزودن محصول جدید، ویرایش قیمت یا تخفیف و حذف کالا در تب **محصولات**؛ تمام تغییرات در لحظه روی فروشگاه، جستجو و چت‌بات اعمال می‌شوند.
- **بازگردانی سریع داده‌های نمونه:** امکان ریست کردن کل کاتالوگ و داده‌های تست به حالت اولیه تنها با یک کلیک.

### دستیار هوشمند خرید (چت‌بات محلی)
- **همیشه روشن و مستقل از سرور:** منطق پاسخ‌دهی به‌صورت کاملاً محلی در فایل `app/lib/chatEngine.ts` پیاده‌سازی شده است تا بدون نیاز به کلید API و بدون قطعی روی GitHub Pages کار کند.
- **متصل به انبار و سفارش‌ها:** پاسخ‌گویی به سوالات بودجه‌ای (مانند محصولات زیر ۵ میلیون)، نمایش کارت محصول با دکمه‌ی مستقیم **افزودن به سبد خرید** و پیگیری زنده وضعیت آخرین سفارش کاربر.
- **آماده برای اتوماسیون و هوش مصنوعی:** ساختار مغز چت‌بات کاملاً جدا از رابط کاربری طراحی شده و در صورت نیاز می‌تواند بدون تغییر در UI به وب‌هوک **n8n** یا سرور هوش مصنوعی متصل شود.

### مهندسی انتشار استاتیک و CI/CD
- **حذف کامل وابستگی به لینک‌های خارجی:** تمام تصاویر محصولات، بنرها، دسته‌بندی‌ها و آواتار به‌صورت محلی (Static Import) داخل پروژه بسته‌بندی شده‌اند.
- **تنظیمات هوشمند دوگانه:** فایل `next.config.ts` به‌صورت خودکار هنگام بیلد در GitHub Actions مقادیر `basePath` و `assetPrefix` را اعمال می‌کند و محیط محلی (`localhost:3000`) را دست‌نخورده نگه می‌دارد.
- **انتشار خودکار با GitHub Actions:** پیکربندی کامل با `output: "export"`، `trailingSlash: true`، فایل `public/.nojekyll` و گردش‌کار خودکار انتشار.

---

## راهنمای تست ۶۰ ثانیه‌ای

1. وارد [نسخه زنده فروشگاه](https://b0rhandev.github.io/shopsphere/) شوید و دکمه‌ی شناور **چت‌بات** در گوشه پایین سمت چپ را باز کنید.
2. گزینه‌ی **«محصولات زیر ۵ میلیون»** را بزنید و یکی از کالاهای پیشنهادی را مستقیم از داخل چت به سبد خرید اضافه کنید.
3. کشوی **سبد خرید** را باز کرده، سفارش را ثبت نهایی کنید و سپس در چت‌بات بنویسید **«پیگیری سفارش من»** تا وضعیت زنده‌ی سفارشتان نمایش داده شود.
4. به [پنل مدیریت](https://b0rhandev.github.io/shopsphere/admin/) بروید، سفارش ثبت‌شده را در بخش **آخرین سفارش‌ها** ببینید و در تب **محصولات** قیمت یک کالا را تغییر دهید؛ سپس به صفحه اصلی برگردید و تغییر آنی آن را مشاهده کنید.
5. **دارک‌مود** را فعال کنید، **جستجوی زنده** را امتحان کنید و کالاها را به **علاقه‌مندی‌ها** اضافه کنید.

---

## تکنولوژی‌های استفاده‌شده

| لایه | تکنولوژی |
| :--- | :--- |
| فریم‌ورک | Next.js (App Router, Static Export) |
| زبان برنامه‌نویسی | TypeScript |
| استایل‌دهی | Tailwind CSS v4 |
| مدیریت وضعیت و ذخیره‌سازی | React Context API (`ShopContext`, `ChatContext`, `ThemeContext`) + `localStorage` |
| مدیریت تصاویر | Static Imports محلی (`next/image` با `unoptimized: true`) |
| استقرار و CI/CD | GitHub Actions و GitHub Pages |

---

## اجرای پروژه روی سیستم شخصی

<div dir="ltr">

```bash
git clone [https://github.com/b0rhandev/shopsphere.git](https://github.com/b0rhandev/shopsphere.git)
cd shopsphere
npm install
npm run dev
```

</div>

پس از اجرا، آدرس `http://localhost:3000` را در مرورگر باز کنید. برای تست بیلد استاتیک نیز از دستور `npm run lint && npm run build` استفاده کنید.

---

## توسعه‌دهنده

ساخته‌شده توسط **برهان** — برنامه‌نویس فرانت‌اند و طراح اتوماسیون گردش کار  
گیت‌هاب: [@b0rhandev](https://github.com/b0rhandev)

</div>
