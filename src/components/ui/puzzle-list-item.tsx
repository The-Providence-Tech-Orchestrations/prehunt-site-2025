interface PuzzleListItemProps {
  slug: string;
  title: string;
  answer?: string;
}

export default function PuzzleListItem( {slug, title, answer }: PuzzleListItemProps) {
  return <div><a href='{slug}'>{title}</a>{answer ? <div>answer</div> : ''}
}