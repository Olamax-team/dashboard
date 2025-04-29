import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddAnnouncement from "./addAnnouncement";

interface BlogPost {
  id: number;
  body: string;
  date: string;
  author: string;
}

const EdithAnnouncement = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: 1,
      body: "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL. FOR ENQUIRIES.",
      date: "April 12, 2024",
      author: "Admin 1",
    },
    {
      id: 2,
      body: "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL. FOR ENQUIRIES",
      date: "April 12, 2024",
      author: "Admin 1",
    },
    {
      id: 3,
      body: "GET MORE VALUE FOR YOUR USDT AND BTC WHEN YOU BUY OR SELL USDT/BTC AND EARN BONK TOKEN. PROMO STARTS FROM 6TH OF MARCH TILL 6TH OF APRIL. FOR ENQUIRIES",
      date: "April 12, 2024",
      author: "Admin 1",
    },
  ]);

  const selectedPost = blogPosts.find((post) => post.id === selectedPostId);

  const handleSave = (updatedPost: BlogPost) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setBlogPosts(updatedPosts);
  };

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              setSelectedPostId={setSelectedPostId}
            />
          ))}
        </div>
      </div>

      {selectedPost && (
        <AddAnnouncement
          setShowAddNews={() => setSelectedPostId(null)}
          post={selectedPost}
          handleSave={handleSave}
        />
      )}
    </section>
  );
};

function BlogCard({
  post,
  setSelectedPostId,
}: {
  post: BlogPost;
  setSelectedPostId: (id: number | null) => void;
}) {
  return (
    <Card className="overflow-hidden h-full border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p>
              <span
                className="text-[#039AE4] font-medium text-[14px] leading-[150%] cursor-pointer hover:underline"
                onClick={() => setSelectedPostId(post.id)}
              >
                Edit
              </span>
            </p>
            <span className="text-[#121826] font-semibold leading-[150%] text-[14px]">
              {post.date}
            </span>
          </div>
          <p className="text-[#121826] font-semibold leading-[150%] text-[14px]">
            Posted by {post.author}
          </p>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-[#121826] font-normal leading-[150%] text-[14px]">
          {post.body}
        </p>
      </CardContent>
    </Card>
  );
}

export default EdithAnnouncement;
