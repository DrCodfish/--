
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface ForumHeaderProps {
  showRegionalPosts: boolean;
  onToggleRegional: () => void;
  onOpenCreatePost: () => void;
}

export const ForumHeader = ({
  showRegionalPosts,
  onToggleRegional,
  onOpenCreatePost,
}: ForumHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Forum</h1>
        
        {isMobile && (
          <Button 
            className="bg-round-blue hover:bg-blue-600"
            onClick={onOpenCreatePost}
          >
            New Post
          </Button>
        )}
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center justify-end space-x-4'}`}>
        <div className="flex items-center gap-3">
          <span className="text-sm">
            {showRegionalPosts ? "Regional Posts" : "All Posts"}
          </span>
          <Button
            variant="outline"
            className="border-black dark:border-white"
            onClick={onToggleRegional}
          >
            {showRegionalPosts ? "Show All" : "Show Regional"}
          </Button>
        </div>
        
        {!isMobile && (
          <Button 
            className="bg-round-blue hover:bg-blue-600"
            onClick={onOpenCreatePost}
          >
            New Post
          </Button>
        )}
      </div>
    </div>
  );
};
