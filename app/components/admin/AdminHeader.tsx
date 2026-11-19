"use client";

import Image from "next/image";
import { imageAssets } from "../../data/images";

interface AdminHeaderProps {
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function AdminHeader({ darkMode, onToggleTheme }: AdminHeaderProps) {
  return (
    <header className={`flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-4 py-3 shadow-sm sm:px-6 ${darkMode ? "border-white/10 bg-[#151321]/90" : "border-white bg-white/80"}`}>
      <div>
        <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>پنل مدیریت ShopSphere</p>
        <h1 className={`mt-1 text-xl font-black sm:text-2xl ${darkMode ? "text-white" : "text-gray-950"}`}>سلام برهان، خوش آمدی</h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <label className={`hidden h-10 w-48 items-center gap-2 rounded-xl border px-3 md:flex xl:w-64 ${darkMode ? "border-white/10 bg-white/5 text-gray-400" : "border-gray-100 bg-gray-50 text-gray-400"}`}>
          <svg aria-hidden="true" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
          </svg>
          <input aria-label="جستجوی پنل مدیریت" className={`w-full bg-transparent text-xs outline-none placeholder:text-gray-400 ${darkMode ? "text-white" : "text-gray-700"}`} placeholder="جستجو در پنل..." />
        </label>
        <button aria-label={darkMode ? "فعال‌کردن حالت روشن" : "فعال‌کردن حالت تیره"} className={`grid size-10 place-items-center rounded-xl border transition ${darkMode ? "border-white/10 bg-white/5 text-amber-300 hover:bg-white/10" : "border-gray-100 bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700"}`} onClick={onToggleTheme} type="button">
          {darkMode
            ? <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
            : <svg aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" /></svg>}
        </button>
        <span className={`hidden h-9 w-px sm:block ${darkMode ? "bg-white/10" : "bg-gray-200"}`} />
        <div className="flex items-center gap-2">
          <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-purple-100">
            <Image alt="برهان" className="object-cover" fill sizes="40px" src={imageAssets.borhanAvatar} unoptimized />
          </span>
          <span className="hidden sm:block">
            <span className={`block text-sm font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>برهان</span>
            <span className={`mt-0.5 block text-[10px] ${darkMode ? "text-gray-400" : "text-gray-500"}`}>مدیر فروشگاه</span>
          </span>
        </div>
      </div>
    </header>
  );
}
