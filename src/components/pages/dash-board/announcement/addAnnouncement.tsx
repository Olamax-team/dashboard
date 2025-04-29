import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BlogPost = {
  id: number;
  body: string;
  date: string;
  author: string;
};

type AddNewsProps = {
  setShowAddNews: (isOpen: boolean) => void;
  post: BlogPost;
  handleSave: (updatedPost: BlogPost) => void;
};

export default function AddAnnouncement({ setShowAddNews, post, handleSave }: AddNewsProps) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(post.body);

  const handleSubmit = () => {
    const updatedPost = {
      ...post,
      body: description,
      // You can store the link somewhere else if needed
    };
    handleSave(updatedPost);
    setShowAddNews(false);
  };

  useEffect(() => {
    setDescription(post.body);
  }, [post]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50">
      <div className="w-full max-w-md mx-auto border bg-white border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#039AE4] text-white h-[60px] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium leading-[150%]">Edit Post</h2>
          <button
            className="text-white hover:bg-[#039AE4] rounded-full p-1"
            onClick={() => setShowAddNews(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <Input
              placeholder="Add Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[14px] font-medium leading-[150%]"
            />
          </div>

          <div className="space-y-1 pt-4">
            <Textarea
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400 resize-none text-[14px] font-medium leading-[150%]"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#039AE4] hover:bg-[#039AE4] text-white px-8 text-[14px] font-medium leading-[150%]"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
