<<<<<<< HEAD

=======
>>>>>>> 060614a (readded remote)
import { createContext, useContext, useState, ReactNode } from 'react';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  storeId: string;
  storeName: string;
  region: string;
  date: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  date: string;
}

interface ForumContextType {
  forumPosts: ForumPost[];
  addForumPost: (post: Omit<ForumPost, 'id' | 'date' | 'replies'>) => ForumPost;
  addForumReply: (postId: string, reply: Omit<ForumReply, 'id' | 'date'>) => ForumReply;
}

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const useForum = () => {
  const context = useContext(ForumContext);
  if (context === undefined) {
    throw new Error('useForum must be used within a ForumProvider');
  }
  return context;
};

export const ForumProvider = ({ children }: { children: ReactNode }) => {
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: '1',
      title: 'New inventory system',
      content: 'When are we getting the new inventory system?',
      authorId: '2',
      authorName: 'employee1',
      storeId: '1',
      storeName: 'Downtown Store',
      region: 'North',
      date: new Date().toISOString(),
      replies: [
        {
          id: '1',
          content: 'We are implementing it next month.',
          authorId: '1',
          authorName: 'owner1',
          date: new Date().toISOString(),
        }
      ]
    },
    {
      id: '2',
      title: 'Employee schedule',
      content: 'Can we discuss the summer schedule?',
      authorId: '3',
      authorName: 'owner2',
      storeId: '2',
      storeName: 'Uptown Store',
      region: 'South',
      date: new Date().toISOString(),
      replies: []
    }
  ]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addForumPost = (postData: Omit<ForumPost, 'id' | 'date' | 'replies'>) => {
    const newPost = {
      ...postData,
      id: generateId(),
      date: new Date().toISOString(),
      replies: [],
    };
    setForumPosts([...forumPosts, newPost]);
    return newPost;
  };

  const addForumReply = (postId: string, replyData: Omit<ForumReply, 'id' | 'date'>) => {
    const newReply = {
      ...replyData,
      id: generateId(),
      date: new Date().toISOString(),
    };
    
    setForumPosts(forumPosts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, newReply] } 
        : post
    ));
    
    return newReply;
  };

  return (
    <ForumContext.Provider value={{
      forumPosts,
      addForumPost,
      addForumReply
    }}>
      {children}
    </ForumContext.Provider>
  );
};
<<<<<<< HEAD
=======

export const fetchForums = async () => {
  const { data, error } = await supabase
    .from('forums')
    .select('*, forum_replies(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching forums:', error);
    return [];
  }

  return data;
};

export const createForumPost = async (post: {
  title: string;
  content: string;
  author_id: string;
  store_id: string;
  region: string;
}) => {
  const { data, error } = await supabase.from('forums').insert(post).select().single();

  if (error) {
    console.error('Error creating forum post:', error);
    return null;
  }

  return data;
};

export const addForumReply = async (reply: {
  forum_id: string;
  content: string;
  author_id: string;
}) => {
  const { data, error } = await supabase.from('forum_replies').insert(reply).select().single();

  if (error) {
    console.error('Error adding forum reply:', error);
    return null;
  }

  return data;
};
>>>>>>> 060614a (readded remote)
