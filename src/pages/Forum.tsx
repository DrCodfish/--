
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store-context";
import { useForum } from "@/context/forum-context";
import { Accordion } from "@/components/ui/accordion";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { CreatePostDialog } from "@/components/forum/CreatePostDialog";
import { ForumPost } from "@/components/forum/ForumPost";

const Forum = () => {
  const { currentUser } = useAuth();
  const { stores } = useStore();
  const { forumPosts, addForumPost, addForumReply } = useForum();
  const [showRegionalPosts, setShowRegionalPosts] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  
  const userStore = currentUser?.storeId 
    ? stores.find(s => s.id === currentUser.storeId)
    : null;
  
  const visiblePosts = showRegionalPosts
    ? forumPosts.filter(post => userStore && post.region === userStore.region)
    : forumPosts;
  
  const handleCreatePost = (title: string, content: string) => {
    if (!currentUser || !userStore || !title.trim() || !content.trim()) return;
    
    addForumPost({
      title: title.trim(),
      content: content.trim(),
      authorId: currentUser.id,
      authorName: currentUser.username,
      storeId: userStore.id,
      storeName: userStore.name,
      region: userStore.region
    });
    
    setIsCreatePostOpen(false);
  };
  
  const handleAddReply = (postId: string, content: string) => {
    if (!currentUser || !content.trim()) return;
    
    addForumReply(postId, {
      content: content.trim(),
      authorId: currentUser.id,
      authorName: currentUser.username,
    });
  };

  return (
    <DashboardLayout>
      <ForumHeader
        showRegionalPosts={showRegionalPosts}
        onToggleRegional={() => setShowRegionalPosts(!showRegionalPosts)}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
      />
      
      <div className="space-y-4">
        {visiblePosts.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-lg text-muted-foreground">No posts yet</p>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-4">
            {visiblePosts.map((post) => (
              <ForumPost
                key={post.id}
                post={post}
                onAddReply={handleAddReply}
              />
            ))}
          </Accordion>
        )}
      </div>

      <CreatePostDialog
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
      />
    </DashboardLayout>
  );
};

export default Forum;
