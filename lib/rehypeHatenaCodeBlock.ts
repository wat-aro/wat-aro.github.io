import { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import { Element, ElementContent } from 'hast';

export const rehypeHatenaCodeBlock: Plugin = () => {
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
