import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsProps } from "@/lib/types";

type AddNewsProps = {
  setShowAddNews: (isOpen: boolean) => void;
  post: NewsProps;
  handleSave: () => void;
};

export default function AddNews({setShowAddNews,post, handleSave}: AddNewsProps) {
  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image);

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
    handleSave();
    setShowAddNews(false);
  };

  useEffect(() => {
    setTitle(post.title);
    setDescription(post.description);
    setImage(post.image);
  }, [post]);

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-opacity-50 bg-black/50">
      <div className="w-full max-w-xl mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        {" "}
        <div className="bg-[#039AE4] text-white h-[60px] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium leading-[150%]">Edit Post</h2>
          <button className="text-white hover:bg-[#039AE4] rounded-full p-1 cursor-pointer" onClick={() => setShowAddNews(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Image upload */}
          <div className="relative h-28 md:h-32 lg:h-36 aspect-square rounded-md overflow-hidden">
            <img
              src={image}
              alt="Financial chart with coins"
              className="object-cover w-full h-full"
            />
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center absolute top-0 w-full h-full left-0 bg-gray-600/80 opacity-0 hover:opacity-100 active:opacity-100 text-white px-2 py-1 rounded text-xs cursor-pointer"
            >
              <ImagePlus className="size-[72px]"/>
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
              className="bg-gray-100 rounded md:py-2 px-2 focus-visible:ring-0 text-sm shadow-none focus-visible:outline-none border-0 md:h-10"
            />
          </div>

          <div className="space-y-1">
            <Input
              placeholder="Add Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="bg-gray-100 rounded md:py-2 px-2 focus-visible:ring-0 text-sm shadow-none focus-visible:outline-none border-0 md:h-10"
            />
          </div>

          <div className="space-y-1">
            <Textarea
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] max-h-[320px] border-0 bg-gray-100 rounded px-2 shadow-none focus-visible:ring-0 focus-visible:outline-none resize-none text-sm md:py-2"
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              onClick={handleSubmit}
              className="bg-[#039AE4] hover:bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10"
            >
              Update Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
