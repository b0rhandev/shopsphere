Please read the rules in #Agent.md carefully.

Based on the attached image of the "About Us" page for ShopSphere, create a new Next.js page at `src/app/about/page.tsx`.

CRITICAL REQUIREMENT: Do NOT write a single monolithic file. You must break the page into separate, modular React components within the same file (e.g., `AboutHero`, `FeaturesGrid`, `StoryAndTeam`, `CoreValues`) and assemble them in the default `AboutPage` export.

Please implement the following sections sequentially, strictly following the RTL layout and the purple-600 design system:

1. **AboutHero**: A two-column section. Right side: A small badge "درباره فروشگاه ما", heading "ShopSphere، جایی برای خرید هوشمندانه", paragraph text, and a purple CTA button. Left side: Use a placeholder image space for the 3D illustration.
2. **FeaturesGrid**: A grid of 4 small horizontal cards (بازگشت کالا، پشتیبانی، ارسال سریع، پرداخت امن) with an icon and soft shadows.
3. **StoryAndTeam**: A two-column section.
   - Right Column (Team): Heading "تیمی پرانرژی و خلاق" and a row of 3 circular avatars (mock names: مینا رضایی, علی محمدی, رضا حسینی) with their job titles.
   - Left/Middle Column (Story): A placeholder for the office image, badge "داستان ما", heading "از یک ایده ساده تا یک فروشگاه بزرگ", description text, and a purple "بیشتر بخوانید" button.
4. **CoreValues**: A section titled "ارزش‌هایی که به آن‌ها پایبندیم" containing 3 vertical cards (کیفیت بالا، تجربه کاربری عالی، تعامل با مشتری، قیمت مناسب) with an icon and short text.

Use `lucide-react` or SVG paths for the icons. Provide the complete code for `src/app/about/page.tsx` with all components separated nicely.