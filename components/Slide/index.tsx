import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import 'reveal.js/plugin/highlight/zenburn.css';

type Props = {
  content: string;
};

export const Slide: React.FC<Props> = ({ content }) => {
  return (
    <div className="reveal">
      <div
        className="slides"
        dangerouslySetInnerHTML={{
          __html: `
        <section data-markdown data-separator-vertical="^===\n">
          <textarea data-template>
            ${content}
          </textarea>
        </section>
    `,
        }}
      />
    </div>
  );
};
