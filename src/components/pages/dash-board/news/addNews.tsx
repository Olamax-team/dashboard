import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type BlogPost = {
  id: number;
  description: string;
  title: string;
  date: string;
  author: string;
  thumbnail: string;
  link?: string;
};

type AddNewsProps = {
  setShowAddNews: (isOpen: boolean) => void;
  post: BlogPost;
  handleSave: (updatepost: BlogPost) => void;
  // post: { id: number; title: string; description: string; date: string; author: string; thumbnail: string };
};

export default function AddNews({
  setShowAddNews,
  post,
  handleSave,
}: AddNewsProps) {
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.thumbnail);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const updatedPost = {
      ...post,
      title: title,
      description: description,
      thumbnail: image,
      link: link,
    };
    // console.log({ title, link, description, image });
    handleSave(updatedPost);
    setShowAddNews(false);
  };

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setImage(post.thumbnail);
  }, [post]);

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-opacity-50 bg-black/50">
      <div className="w-full   max-w-md mx-auto border  bg-white border-gray-200 rounded-md shadow-sm overflow-hidden">
        {" "}
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
          {/* Image upload */}
          <div className="relative w-full h-28">
            <img
              src={image}
              alt="Financial chart with coins"
              className="object-cover w-[71px] h-[71px] "
            />
            <label
              htmlFor="image-upload"
              className="absolute bottom-2 left-2 bg-white/80 hover:bg-white text-blue-500 px-2 py-1 rounded text-xs cursor-pointer"
            >
              Add Image
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[14px] font-medium leading-[150%]"
            />
          </div>

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
