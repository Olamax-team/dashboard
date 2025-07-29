import { useState, useEffect } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NewsProps } from "@/lib/types";
import { useAdminDetails } from "@/store/admin-details-store";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type AddNewsProps = {
  setShowAddNews: (isOpen: boolean) => void;
  post: NewsProps;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
};

export default function AddNews({setShowAddNews, post, setActiveTab}: AddNewsProps) {

  const { token } = useAdminDetails();

  const [title, setTitle] = useState(post.title);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(post.description);
  const [image, setImage] = useState(post.image);

  const [updatingPost, setUpdatingPost] = useState(false);
  const [updatingDraft, setUpdatingDraft] = useState(false);
  const [deleting, setDeleting] = useState(false)

  const isPublished = post && post.is_publish === 0 && post.is_trash === 0;
  const isDraft = post && post.is_publish === 1 && post.is_trash === 0;
  const isTrash = post && post.is_trash === 1;

  const queryClient = useQueryClient();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      const formData = new FormData();
      formData.append("image", file);

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.olamax.io/api/admin/news/${post.id}/update-image`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: formData,
      }

      const response = await axios.request(config);

      if (response && response.status === 200) {
        setImage(response.data.news.image)
      }
    }
  };

  const updatePost = async () => {
    const formData = {
      id: post.id,
      description: description,
      title: title,
      link: link,
      is_publish: '0',
      is_trash: '0'
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/update-news`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setUpdatingPost(true);
    const response = await axios.request(config);

    if (response && response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      setShowAddNews(false);
      setUpdatingPost(false)
      setActiveTab('published')
    }
  };

  const updateDraft = async () => {

    const formData = {
      id: post.id,
      description: description,
      title: title,
      link: link,
      is_publish: '1',
      is_trash: '0'
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/update-news`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setUpdatingDraft(true)
    const response = await axios.request(config);

    if (response && response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      setShowAddNews(false)
      setActiveTab('draft')
      setUpdatingDraft(false);
    }
  };

  const totallyDelete = async () => {

    const formData = {
      type: 'selected',
      ids: [post.id]
    }

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/news/destroy`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setDeleting(true);
    const response = await axios.request(config);

    if (response && response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['news'] })
      setDeleting(false)
    }
  }

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
          { isPublished &&
            <div className="flex justify-center pt-4">
              <Button onClick={updatePost} className="bg-[#039AE4] hover:bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10">
                {updatingPost ? 'Updating Post...' : 'Update Post'}
              </Button>
            </div>
          }
          { isDraft &&
            <div className="flex justify- pt-4 justify-between items-center">
              <button className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md" onClick={updatePost}>
                {updatingPost ? 'Publishing post...' : 'Publish Post'}
              </button>
              <button className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2" onClick={updateDraft}>
                {updatingDraft ? 'Updating Draft...' : 'Update Draft'}
              </button>
            </div>
          }
          { isTrash &&
            <div className="flex justify- pt-4 justify-between items-center">
              <button className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md" onClick={updatePost}>
                { updatingPost ? 'Restoring as Post...' : 'Restore as Post'}
              </button>
              <button className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2" onClick={totallyDelete}>
                {deleting ? 'Deleting Post...' : 'Delete Post'}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
