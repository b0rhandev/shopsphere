"use client";

export default function AdminConfirmDialog({
  title,
  description,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0c0a14]/55 p-4 backdrop-blur-sm" dir="rtl">
      <button aria-label="بستن پنجره تأیید" className="absolute inset-0" onClick={onCancel} type="button" />
      <section aria-labelledby="admin-confirm-title" aria-modal="true" className="relative z-10 w-full max-w-md rounded-2xl border border-white/80 bg-white p-6 shadow-2xl dark:border-purple-500/20 dark:bg-[#151124]" role="dialog">
        <h2 className="text-lg font-black text-gray-950 dark:text-violet-50" id="admin-confirm-title">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-violet-200/75">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-bold text-gray-600 transition hover:bg-gray-50 dark:border-purple-500/20 dark:text-violet-200 dark:hover:bg-[#211a37]" onClick={onCancel} type="button">انصراف</button>
          <button className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700" onClick={onConfirm} type="button">{confirmLabel}</button>
        </div>
      </section>
    </div>
  );
}
