import PostRepository from '../lib/repositories/post';
import { takeScreenshot } from '../lib/ogimage/takeScreenShot';

const BATCH_SIZE = 50;

const generateAllOgImages = async () => {
  const posts = await PostRepository.list();

  for (let index = 0; index < posts.length; index += BATCH_SIZE) {
    const batch = posts.slice(index, index + BATCH_SIZE);
    for (const post of batch) {
      await takeScreenshot({ title: post.title, slug: post.slug });
    }
  }
};

generateAllOgImages();
