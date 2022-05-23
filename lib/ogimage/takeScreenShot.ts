import { chromium } from 'playwright';
import { getHtml } from './getHtml';

type Params = {
  title: string;
  slug: string;
};

export const takeScreenshot = async ({ title, slug }: Params) => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1200, height: 600 },
  });
  const page = await context.newPage();
  const html = getHtml({ title });
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({
    path: `public/og-images/${slug}.png`,
    fullPage: true,
  });
  await browser.close();
};
