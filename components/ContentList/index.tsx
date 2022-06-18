import { Entry } from '../../lib/entry';
import { ContentListItem } from '../ContentListItem';

type Props = {
  entries: Entry[];
};

export const ContentList: React.FC<Props> = ({ entries }) => {
  return (
    <>
      {entries.map((entry) => (
        <ContentListItem {...entry} key={entry.title} />
      ))}
    </>
  );
};
