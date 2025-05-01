
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ForumReply } from "./ForumReply";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ForumPost as PostType, ForumReply as ReplyType } from "@/context/forum-context";

interface ForumPostProps {
  post: PostType;
  onAddReply: (postId: string, content: string) => void;
}

export const ForumPost = ({ post, onAddReply }: ForumPostProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;
    onAddReply(post.id, replyContent.trim());
    setReplyContent("");
    setIsReplying(false);
  };

  return (
    <AccordionItem 
      value={post.id}
      className="border border-black dark:border-white rounded-md overflow-hidden"
    >
      <Card className="border-0">
        <CardHeader className="px-6 py-4">
          <AccordionTrigger className="hover:no-underline">
            <CardTitle className="text-left">{post.title}</CardTitle>
          </AccordionTrigger>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>By {post.authorName} from {post.storeName}</span>
            <span>
              {new Date(post.date).toLocaleDateString()} • Region: {post.region}
            </span>
          </div>
        </CardHeader>
        
        <AccordionContent className="pt-0">
          <CardContent className="border-t border-black dark:border-white">
            <p className="py-2">{post.content}</p>
            
            <div className="mt-4">
              <h3 className="font-semibold">Replies</h3>
              
              <div className="space-y-4 mt-2">
                {post.replies.map((reply: ReplyType) => (
                  <ForumReply
                    key={reply.id}
                    authorName={reply.authorName}
                    content={reply.content}
                    date={reply.date}
                  />
                ))}
                
                {post.replies.length === 0 && (
                  <p className="text-sm text-muted-foreground">No replies yet</p>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-black dark:border-white pt-4">
            {isReplying ? (
              <div className="w-full space-y-2">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setIsReplying(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-round-blue hover:bg-blue-600"
                    onClick={handleSubmitReply}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => setIsReplying(true)}
                variant="outline"
                className="w-full"
              >
                Reply to this post
              </Button>
            )}
          </CardFooter>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};
