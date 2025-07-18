import { ImagePlus, Loader2, TrashIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useAdminDetails } from "@/store/admin-details-store";
import axios from "axios";
import { toast } from "sonner";

export default function CreateNews({setShowCreateNews}:{setShowCreateNews: (open:boolean) => void;}) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState("");
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const formDataRef = React.useRef<FormData>(new FormData());
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)

  const { token } = useAdminDetails();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

  const formData = new FormData();
    formData.append('image', file);
    formDataRef.current = formData;
  };

  const cancelImage = () => {
    setImage('');

    const newFormData = new FormData();
    formDataRef.current = newFormData;

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const createPost = async () => {
    const formData = formDataRef.current;
    formData.append('description', description);
    formData.append('title', title);
    formData.append('link', link);
    formData.append('is_publish', '1')

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/add-news`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setIsLoading(true)
    try {
      const response = await axios.request(config);
      if (response && response.status === 200) {
        toast.success('Post successfully published')
        setIsLoading(false);
        setShowCreateNews(false);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally{() => {setIsLoading(false); setShowCreateNews(false);}}
  };

  const createDraft = async () => {
    const formData = formDataRef.current;
    formData.append('description', description);
    formData.append('title', title);
    formData.append('link', link);
    formData.append('is_publish', '0')

    setIsCreating(true);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/add-news`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setIsLoading(true)
    try {
      const response = await axios.request(config);
      if (response && response.status === 200) {
        toast.success('Draft successfully created');
        setIsCreating(false);
        setShowCreateNews(false);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {() => {setIsCreating(false); setShowCreateNews(false);}}
  };

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-opacity-50 bg-black/50 p-3">
      <div className="w-full max-w-xl mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        {" "}
        <div className="bg-[#039AE4] text-white h-[60px] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium leading-[150%]">Create New Post</h2>
          <button className="text-white hover:bg-[#039AE4] rounded-full p-1 cursor-pointer" onClick={() => setShowCreateNews(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {/* Image upload */}
          <div className="relative h-28 md:h-32 lg:h-36 aspect-square rounded-md overflow-hidden">
            { image ?
              <img
                src={image}
                alt="Financial chart with coins"
                className="object-cover w-full h-full"
              /> : 
              <div className="w-full h-full border bg-gray-100 rounded-md flex items-center justify-center text-sm flex-col ">
                <span>Add Banner</span>
                <span>(Max. 5mb)</span>
              </div>
            }
            <label
              htmlFor="image-upload"
              className="flex items-center justify-center absolute top-0 w-full h-full left-0 bg-gray-600/80 opacity-0 hover:opacity-100 active:opacity-100 text-white px-2 py-1 rounded text-xs cursor-pointer"
            >
              {image ? <TrashIcon className="size-[30px] md:size-[40px] text-red-400" onClick={cancelImage}/> : <ImagePlus className="size-[36px] md:size-[50px]"/>}
              <input
                ref={fileInputRef}
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
              className="min-h-[100px] max-h-[300px] border-0 bg-gray-100 rounded px-2 shadow-none focus-visible:ring-0 focus-visible:outline-none resize-none text-sm md:py-2"
            />
          </div>

          <div className="flex justify- pt-4 justify-between items-center">
            <button
              disabled={isLoading || isCreating}
              onClick={createPost}
              className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md"
            >
              {isLoading ? 'Creating Post...' : 'Create Post'}
              {isLoading && <Loader2 className="animate-spin"/>}
            </button>

            <button 
              disabled={isLoading || isCreating}
              onClick={createDraft}
              className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2"
            >
              {isCreating ? 'Saving Draft...' : 'Save Draft'}
              {isCreating && <Loader2 className="animate-spin"/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
