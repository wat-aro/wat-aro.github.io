import fs from 'fs';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';
import PostRepository from '../lib/repositories/post';

const parseForcedSlugs = () =>
  new Set(
    (process.env.FORCE_OG_IMAGE_SLUGS ?? '')
      .split(',')
      .map((slug) => slug.trim())
      .filter(Boolean)
  );

const generateOgImages = async () => {
  const posts = await PostRepository.list();
  const forcedSlugs = parseForcedSlugs();
  const forceRegenerateAll = process.env.FORCE_REGENERATE_OG_IMAGES === 'true';

  for (const post of posts) {
    const outputPath = `public/og-images/${post.slug}.png`;
    const shouldGenerate =
      forceRegenerateAll || forcedSlugs.has(post.slug) || !fs.existsSync(outputPath);

    if (!shouldGenerate) continue;
    await takeScreenshot({ title: post.title, slug: post.slug });
  }
};

generateOgImages();
