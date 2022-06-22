import fs from 'fs';
import { join } from 'path';
import { Entry } from '../entry';
import { slides, SlideWithContent } from '../slide';

const list = async (): Promise<Entry[]> => {
  const entries = slides.map((slide) => ({
    ...slide,
    path: `/slides/${slide.slug}`,
  }));

  return new Promise((resolve) => resolve(entries));
};

const slideDir = join(process.cwd(), 'contents', 'slides');

const findBySlug = async (slug: string): Promise<SlideWithContent> => {
  const slide = slides.find((slide) => slide.slug === slug)!;
  const path = join(slideDir, `${slug}.md`);
  const content = fs.readFileSync(path, 'utf-8');
  return new Promise((resolve) => resolve({ ...slide, content }));
};

const SlideRepository = { list, findBySlug };

export default SlideRepository;
