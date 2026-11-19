import type { StaticImageData } from "next/image";
import { imageAssets, type ProductImageKey } from "./images";

export interface Product {
  id: string;
  name: string;
  category: string;
  imageKey: ProductImageKey;
  image: StaticImageData;
  imageAlt: string;
  description: string;
  oldPrice: number;
  price: number;
  discount: number;
}

const productRecords: Omit<Product, "imageKey">[] = [
  { id: "airpods-pro", name: "هدفون بی‌سیم اپل", category: "هدفون", image: imageAssets.earbudsCategory, imageAlt: "هدفون بی‌سیم اپل", description: "صدایی شفاف و طراحی جمع‌وجور برای لحظه‌هایی که می‌خواهید در موسیقی، تماس‌ها و پادکست‌های محبوبتان غرق شوید.", oldPrice: 7_200_000, price: 6_120_000, discount: 15 },
  { id: "smart-watch", name: "ساعت هوشمند شیائومی", category: "ساعت هوشمند", image: imageAssets.smartwatch, imageAlt: "ساعت هوشمند شیائومی", description: "همراهی خوش‌ساخت برای برنامه‌های روزانه؛ اطلاعات مهم و ابزارهای کاربردی را همیشه نزدیک دستتان نگه دارید.", oldPrice: 4_500_000, price: 3_690_000, discount: 18 },
  { id: "iphone-14", name: "گوشی موبایل آیفون ۱۴", category: "موبایل", image: imageAssets.mobile, imageAlt: "گوشی موبایل آیفون ۱۴", description: "ترکیبی از طراحی چشم‌نواز و تجربه‌ای روان برای ثبت لحظه‌ها، ارتباط با دیگران و همراهی در تمام روز.", oldPrice: 62_000_000, price: 54_900_000, discount: 12 },
  { id: "wireless-earbuds", name: "هندزفری بی‌سیم سامسونگ", category: "هندزفری", image: imageAssets.wirelessEarbuds, imageAlt: "هندزفری بی‌سیم سامسونگ", description: "سبک، راحت و آماده‌ی همراهی؛ انتخابی مناسب برای گوش‌دادن روزانه و پاسخ‌دادن به تماس‌ها بدون دردسر سیم.", oldPrice: 7_500_000, price: 6_500_000, discount: 13 },
  { id: "macbook-air", name: "لپ‌تاپ مک‌بوک ایر", category: "لپ‌تاپ", image: imageAssets.macbookAir, imageAlt: "لپ‌تاپ مک‌بوک ایر", description: "یک همراه ظریف و قابل‌حمل برای ایده‌هایی که هرجا به ذهنتان می‌رسند؛ مناسب کار، مطالعه و ساختن چیزهای تازه.", oldPrice: 78_000_000, price: 71_500_000, discount: 8 },
  { id: "galaxy-phone", name: "گوشی موبایل سامسونگ سری S", category: "موبایل", image: imageAssets.galaxyPhone, imageAlt: "گوشی موبایل سامسونگ", description: "برای کسانی که از یک گوشی انتظار همراهی همه‌جانبه دارند؛ از ارتباط روزمره تا ثبت عکس و سرگرمی.", oldPrice: 49_000_000, price: 43_900_000, discount: 10 },
  { id: "studio-headphones", name: "هدفون روگوشی حرفه‌ای", category: "هدفون", image: imageAssets.headphones, imageAlt: "هدفون روگوشی حرفه‌ای", description: "پوشش راحت گوش و صدایی فراگیر، برای ساعت‌هایی که می‌خواهید محیط اطراف را کنار بگذارید و روی صدا تمرکز کنید.", oldPrice: 8_900_000, price: 7_490_000, discount: 16 },
  { id: "gaming-console", name: "کنسول بازی نسل جدید", category: "کنسول بازی", image: imageAssets.gamingConsole, imageAlt: "کنسول بازی", description: "مرکز سرگرمی خانه‌تان؛ تجربه‌ی بازی را با دوستان و خانواده به لحظه‌ای پرهیجان و به‌یادماندنی تبدیل کنید.", oldPrice: 32_000_000, price: 28_800_000, discount: 10 },
  { id: "game-controller", name: "دسته بازی بی‌سیم", category: "کنسول بازی", image: imageAssets.gameController, imageAlt: "دسته بازی بی‌سیم", description: "کنترل خوش‌دست و بی‌سیم برای بازی‌های طولانی؛ حرکت‌هایتان را دقیق‌تر دنبال کنید و آزادانه بازی کنید.", oldPrice: 4_200_000, price: 3_570_000, discount: 15 },
  { id: "bluetooth-speaker", name: "اسپیکر بلوتوثی قابل حمل", category: "صوتی", image: imageAssets.bluetoothSpeaker, imageAlt: "اسپیکر بلوتوثی", description: "موسیقی موردعلاقه‌تان را از اتاق تا دورهمی همراه ببرید و هر فضا را با حال‌وهوای دلخواهتان پر کنید.", oldPrice: 3_800_000, price: 3_230_000, discount: 15 },
  { id: "mirrorless-camera", name: "دوربین دیجیتال بدون آینه", category: "دوربین", image: imageAssets.camera, imageAlt: "دوربین دیجیتال", description: "برای دیدن جزئیات بیشتر در قاب؛ دوربینی برای ثبت سفرها، پرتره‌ها و ایده‌هایی که ارزش ماندگارشدن دارند.", oldPrice: 54_000_000, price: 49_680_000, discount: 8 },
  { id: "mechanical-keyboard", name: "کیبورد مکانیکال RGB", category: "لوازم جانبی", image: imageAssets.mechanicalKeyboard, imageAlt: "کیبورد مکانیکال", description: "حس تایپ متفاوت و چیدمانی جذاب برای میز کار یا بازی؛ هر ضربه را به بخشی لذت‌بخش از کارتان تبدیل کنید.", oldPrice: 5_600_000, price: 4_760_000, discount: 15 },
  { id: "wireless-mouse", name: "ماوس بی‌سیم ارگونومیک", category: "لوازم جانبی", image: imageAssets.wirelessMouse, imageAlt: "ماوس بی‌سیم", description: "حرکتی روان و بدون سیم اضافه، با فرمی که برای استفاده‌ی روزانه و مرتب‌ماندن میز کار طراحی شده است.", oldPrice: 2_400_000, price: 1_920_000, discount: 20 },
  { id: "tablet", name: "تبلت هوشمند", category: "تبلت", image: imageAssets.tablet, imageAlt: "تبلت هوشمند", description: "صفحه‌ای بزرگ برای مطالعه، تماشای محتوا و یادداشت‌برداری؛ سبک و آماده‌ی همراهی در خانه یا مسیر.", oldPrice: 28_000_000, price: 25_200_000, discount: 10 },
  { id: "ultrawide-monitor", name: "مانیتور حرفه‌ای ۲۷ اینچ", category: "مانیتور", image: imageAssets.monitor, imageAlt: "مانیتور حرفه‌ای", description: "فضای دید گسترده‌تر برای تمرکز بهتر؛ مناسب چیدمان کاری که جزئیات و نظم در آن اهمیت دارند.", oldPrice: 19_500_000, price: 16_575_000, discount: 15 },
  { id: "smart-home", name: "دستگاه هوشمند خانه", category: "لوازم خانگی", image: imageAssets.smartHome, imageAlt: "دستگاه خانه هوشمند", description: "قدم کوچکی برای خانه‌ای هماهنگ‌تر؛ کارهای روزمره را ساده کنید و کنترل بیشتری روی فضای زندگی‌تان داشته باشید.", oldPrice: 6_200_000, price: 5_270_000, discount: 15 },
  { id: "vacuum-cleaner", name: "جارو شارژی هوشمند", category: "لوازم خانگی", image: imageAssets.vacuumCleaner, imageAlt: "جارو شارژی", description: "برای نظافت سریع و بی‌دردسر؛ بدون درگیرشدن با سیم‌ها، خانه را مرتب نگه دارید و زمان بیشتری برای خودتان داشته باشید.", oldPrice: 14_000_000, price: 12_600_000, discount: 10 },
  { id: "smart-band", name: "مچ‌بند هوشمند ورزشی", category: "ساعت هوشمند", image: imageAssets.smartBand, imageAlt: "مچ‌بند هوشمند", description: "همراهی سبک برای روزهای پرتحرک؛ برنامه‌ها و عادت‌های روزانه‌تان را نزدیک دست و همیشه در دسترس نگه دارید.", oldPrice: 3_400_000, price: 2_890_000, discount: 15 },
  { id: "perfume", name: "عطر و ادکلن روزانه", category: "زیبایی و سلامت", image: imageAssets.perfume, imageAlt: "عطر و ادکلن", description: "رایحه‌ای برای کامل‌کردن استایل روزانه و ساختن امضای شخصی؛ انتخابی دلنشین برای خودتان یا هدیه‌دادن.", oldPrice: 5_800_000, price: 4_930_000, discount: 15 },
  { id: "camera-lens", name: "لنز دوربین پرتره", category: "دوربین", image: imageAssets.cameraLens, imageAlt: "لنز دوربین", description: "ابزاری برای نزدیک‌ترشدن به سوژه و ساختن قاب‌هایی با حال‌وهوای شخصی؛ همراهی خلاق برای عکاسی پرتره.", oldPrice: 22_000_000, price: 19_800_000, discount: 10 },
];

export const products: Product[] = productRecords.map((product) => {
  const imageKey = (Object.keys(imageAssets) as ProductImageKey[]).find(
    (key) => imageAssets[key] === product.image,
  );
  if (!imageKey) throw new Error(`Unknown local product image: ${product.id}`);
  return { ...product, imageKey };
});

const staticallyGeneratedProductIds = new Set(products.map((product) => product.id));

export function getProductHref(productId: string) {
  return staticallyGeneratedProductIds.has(productId) ? `/product/${productId}` : "/#offers";
}
