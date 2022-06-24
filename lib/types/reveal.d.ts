declare module 'reveal.js' {
  const content: RevealStatic & { destroy: () => void };
  export default content;
}

declare module 'reveal.js/plugin/markdown/markdown.esm' {
  const content: RevealMarkdown;
  export default content;
}

declare module 'reveal.js/plugin/highlight/highlight.esm' {
  const content: RevealHighlight;
  export default content;
}
