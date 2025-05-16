import { useState } from "react";
import {Card} from "@/components/ui/card";
import card from '../../../../assets/card.svg.svg'
import AddAdvert from "./addAdvert";

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  thumbnail: string;
  link?: string
}

export default function EditAdvert() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [blogPosts, setBlogPosts] = useState <BlogPost[]> ([
    {
      id: 1,
      title: "Olamax Launches New Escrow Service for Secure Transactions",
      link: "www.facebook.com",
      date: new Date().toLocaleDateString(),
      author: "Admin 3",
      thumbnail: card,
    },
    {
      id: 2,
      title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
      link: "www.facebook.com",

      date: new Date().toLocaleDateString(),
      author: "Admin 3",
      thumbnail: card,
    },
    {
      id: 3,
      title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
      link: "www.facebook.com",

      date: new Date().toLocaleDateString(),
      author: "Admin 3",
      thumbnail: card,
    },
  ]);

  // Fetch the selected post data by ID
     const selectedPost = blogPosts.find((post) => post.id === selectedPostId);
      const handleSave = (updatepost: BlogPost) =>{
        const updatedPosts = blogPosts.map((post) =>
          post.id === updatepost.id ? updatepost : post
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

      {/* Show the AddNews modal only if a post ID is selected */}
      {selectedPost && ( 
        <AddAdvert
          setShowAddNews={() => setSelectedPostId(null)} 
          post={selectedPost} 
          handleSave={handleSave}
          
        />
      )}
    </section>
  );
}

function BlogCard({
  post,
  setSelectedPostId,
}: {
  post: BlogPost;
  setSelectedPostId: (id: number | null) => void;
}) {
  return (
    <Card className="overflow-hidden h-full border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center p-4 border-b border-gray-100">
        
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
            <span className="text-[#121826] font-semibold leading-[150%] text-[14px]">{post.date}</span>
          </div>
          <p className="text-[#121826] font-semibold leading-[150%] text-[14px]">Posted by {post.author}</p>
          
        </div>
      </div>
      <div className="flex items-center justify-center flex-col p-4 ">
        <h3 className="text-[#121826] font-bold leading-[150%] text-[16px]">{post.title}</h3>
        <div className="w-full h-full mt-3  overflow-hidden rounded-md">
        <img
            src={post.thumbnail}
            alt="thumbnail"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
    </Card>
  );
}
