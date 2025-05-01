
interface ForumReplyProps {
  authorName: string;
  content: string;
  date: string;
}

export const ForumReply = ({ authorName, content, date }: ForumReplyProps) => {
  return (
    <div className="bg-secondary/30 p-3 rounded-md">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{authorName}</span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <p>{content}</p>
    </div>
  );
};
