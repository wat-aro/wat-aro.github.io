import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkEmoji from 'remark-emoji';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkBreaks from 'remark-breaks';
import rehypeSlug from 'rehype-slug';
import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import rehypeRaw from 'rehype-raw';
import { Element, ElementContent } from 'hast';

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    .use(remarkBreaks)
    .use(remarkEmoji)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeHatenaCodeBlock)
    .use(rehypePrismPlus, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
};

const rehypeHatenaCodeBlock: Plugin = () => {
  return (tree, file) => {
    visit(tree, 'element', (node: Element) => {
      if (
        node.tagName == 'pre' &&
        node.properties?.className &&
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('code')
      ) {
        const children = node.children;
        const code = {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: children,
        } as ElementContent;
        node.children = [code];
      }
      return true;
    });
  };
};
