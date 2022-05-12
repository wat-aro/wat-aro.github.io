import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrismPlus from 'rehype-prism-plus';

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkEmoji)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
};
