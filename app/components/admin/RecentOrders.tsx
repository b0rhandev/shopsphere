"use client";

import Link from "next/link";
import { useShopContext, type OrderStatus } from "../../context/ShopContext";

const statuses: OrderStatus[] = ["پرداخت شده", "در حال پردازش", "ارسال شد"];

function statusStyle(status: OrderStatus) {
  if (status === "ارسال شد") return "bg-blue-50 text-blue-700";
  if (status === "در حال پردازش") return "bg-amber-50 text-amber-700";
  return "bg-emerald-50 text-emerald-700";
}

export default function RecentOrders({ darkMode }: { darkMode: boolean }) {
  const { orders, updateOrderStatus } = useShopContext();
  const heading = darkMode ? "text-white" : "text-gray-900";
  const muted = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <section className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${darkMode ? "border-white/10 bg-[#151321]/90" : "border-white bg-white/90"}`} id="recent-orders">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className={`text-base font-black ${heading}`}>آخرین سفارش‌ها</h2>
          <p className={`mt-1 text-xs ${muted}`}>سفارش‌های ثبت‌شده در فروشگاه</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${darkMode ? "bg-white/5 text-gray-300" : "bg-purple-50 text-purple-700"}`}>{orders.length.toLocaleString("fa-IR")} سفارش</span>
      </div>

      {orders.length === 0 ? (
        <div className={`mt-5 rounded-2xl border border-dashed px-4 py-10 text-center ${darkMode ? "border-white/10" : "border-purple-200"}`}>
          <span className={`mx-auto grid size-12 place-items-center rounded-xl ${darkMode ? "bg-white/5 text-purple-300" : "bg-purple-50 text-purple-700"}`}>
            <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L21 9H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></svg>
          </span>
          <p className={`mt-4 text-sm font-bold ${heading}`}>هنوز سفارشی ثبت نشده است</p>
          <p className={`mt-1 text-xs ${muted}`}>با ثبت سفارش از فروشگاه، اطلاعات واقعی آن اینجا نمایش داده می‌شود.</p>
          <Link className="mt-5 inline-flex rounded-xl bg-purple-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-purple-700" href="/">رفتن به فروشگاه و ثبت سفارش</Link>
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[690px] text-right">
            <thead>
              <tr className={`border-b text-[10px] font-bold ${darkMode ? "border-white/10 text-gray-400" : "border-gray-100 text-gray-500"}`}>
                <th className="pb-3 font-semibold">شماره سفارش</th>
                <th className="pb-3 font-semibold">مشتری</th>
                <th className="pb-3 font-semibold">محصولات</th>
                <th className="pb-3 font-semibold">تاریخ</th>
                <th className="pb-3 font-semibold">مبلغ</th>
                <th className="pb-3 font-semibold">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 7).map((order) => (
                <tr className={`border-b last:border-0 ${darkMode ? "border-white/5" : "border-gray-50"}`} key={order.id}>
                  <td className={`py-4 text-xs font-bold ${heading}`} dir="ltr">{order.id}</td>
                  <td className={`py-4 text-xs font-semibold ${heading}`}>{order.customerName}</td>
                  <td className={`max-w-40 truncate py-4 text-xs ${muted}`} title={order.items.map((item) => item.name).join("، ")}>
                    {order.items.map((item) => item.name).join("، ")}
                  </td>
                  <td className={`py-4 text-xs ${muted}`}>{order.dateLabel}<span className="mt-1 block text-[10px]">{order.timeLabel}</span></td>
                  <td className={`py-4 text-xs font-bold ${heading}`}>{order.total.toLocaleString("fa-IR")} تومان</td>
                  <td className="py-4">
                    <label className="sr-only" htmlFor={`order-status-${order.id}`}>تغییر وضعیت سفارش {order.id}</label>
                    <select className={`max-w-32 rounded-full border-0 px-3 py-2 text-[10px] font-bold outline-none focus:ring-2 focus:ring-purple-300 ${statusStyle(order.status)}`} id={`order-status-${order.id}`} onChange={(event) => updateOrderStatus(order.id, event.target.value as OrderStatus)} value={order.status}>
                      {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
