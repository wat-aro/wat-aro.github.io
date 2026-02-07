import PostRepository from '../lib/repositories/post';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const generateOgImages = async () => {
  const start = process.argv[2];
  const end = process.argv[3];

  const posts = await PostRepository.list();

  await Promise.all(
    posts
      .slice(Number(start), Number(end))
      .map((post) => takeScreenshot({ title: post.title, slug: post.slug }))
  );
};

generateOgImages();
