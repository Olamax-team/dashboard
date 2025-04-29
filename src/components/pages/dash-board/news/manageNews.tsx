import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import rectangle3 from "../../../../assets/Rectangle 4896 (2).svg";
import rectangle2 from "../../../../assets/Rectangle 4896 (1).svg";
import rectangle1 from "../../../../assets/Rectangle 4896.svg";
import AddNews from "./addNews";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  thumbnail: string;
  link?: string
}

export default function ManageNews() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const [blogPosts, setBlogPosts] = useState <BlogPost[]> ([
    {
      id: 1,
      title: "Olamax Launches New Escrow Service for Secure Transactions",
      link: "www.facebook.com",
      description:
        "To enhance trust in peer-to-peer transactions, Olamax now offers a fully integrated escrow service, ensuring that funds are securely held until both parties complete their exchange, boosting security for users.",
      date: "April 12, 2024",
      author: "Admin 3",
      thumbnail: rectangle1,
    },
    {
      id: 2,
      title: "Olamax Now Supports Over 20 Cryptocurrencies, Expanding Your Options",
      link: "www.facebook.com",

      description:
        "Olamax is excited to announce the addition of several new digital assets, providing users with even more options for converting cryptocurrencies into Naira and making cross-border payments easier than ever.",
      date: "April 12, 2024",
      author: "Admin 3",
      thumbnail: rectangle2,
    },
    {
      id: 3,
      title: "Olamax Partners with Top Nigerian Banks to Streamline Crypto-to-Naira Conversions",
      link: "www.facebook.com",

      description:
        "Through new partnerships with leading Nigerian banks, Olamax has enhanced its crypto conversion process, enabling faster settlements and ensuring a more seamless experience for users.",
      date: "April 12, 2024",
      author: "Admin 3",
      thumbnail: rectangle3,
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
        <AddNews
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
      <div className="flex items-center p-4 border-b border-gray-100">
        <div className="w-12 h-12 mr-3 overflow-hidden rounded-md">
          <img
            src={post.thumbnail || "/placeholder.svg?height=48&width=48"}
            alt=""
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
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
      <CardContent className="p-4">
        <h3 className="text-[#121826] font-bold leading-[150%] text-[16px]">{post.title}</h3>
        <p className="text-[#121826] font-normal leading-[150%] text-[14px]">{post.description}</p>
      </CardContent>
    </Card>
  );
}
