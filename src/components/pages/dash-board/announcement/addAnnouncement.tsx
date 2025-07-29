import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnnouncementProps } from "@/lib/types";
import { useAdminDetails } from "@/store/admin-details-store";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

type AddNewsProps = {
  setShowAddNews: (isOpen: boolean) => void;
  post: AnnouncementProps;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
};

export default function AddAnnouncement({ setShowAddNews, post, setActiveTab }: AddNewsProps) {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState(post.description);

  const [updatingPost, setUpdatingPost] = useState(false);
  const [updatingDraft, setUpdatingDraft] = useState(false);

  const queryClient = useQueryClient();
  

  const { token } = useAdminDetails();

  const isPublished = post && post.is_publish === 0 && post.is_trash === 0;
  const isDraft = post && post.is_publish === 1 && post.is_trash === 0;
  const isTrash = post && post.is_trash === 1;


  console.log(post)



  const updatePost = async () => {
    const formData = {
      id: post.id,
      description: description,
      link: link,
      is_publish: '0',
      is_trash: '0'
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/update-announcement`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setUpdatingPost(true);
    const response = await axios.request(config);

    if (response && response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['announcement'] })
      setShowAddNews(false);
      setUpdatingPost(false)
      setActiveTab('published')
    }
  }

  const updateDraft = async () => {

    const formData = {
      id: post.id,
      description: description,
      link: link,
      is_publish: '1',
      is_trash: '0'
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/update-announcement`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setUpdatingDraft(false)
    const response = await axios.request(config);

    if (response && response.status === 200) {
      queryClient.invalidateQueries({ queryKey: ['announcement'] })
      setShowAddNews(false)
      setActiveTab('draft')
      setUpdatingDraft(false);
    }
  }

  useEffect(() => {
    setDescription(post.description);
  }, [post]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 bg-black/50">
      <div className="w-full max-w-xl mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        <div className="bg-[#039AE4] text-white h-[60px] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium leading-[150%]">Edit Announcement</h2>
          <button
            className="text-white hover:bg-[#039AE4] rounded-full p-1 cursor-pointer"
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
                {updatingPost ? 'Updating Announcement...' : 'Update Announcement'}
              </Button>
            </div>
          }
          { isDraft &&
            <div className="flex justify- pt-4 justify-between items-center">
              <button className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md" onClick={updatePost}>
                {updatingPost ? 'Publishing Announcement...' : 'Publish Announcement'}
              </button>
              <button className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2" onClick={updateDraft}>
                {updatingDraft ? 'Updating Draft...' : 'Update Draft'}
              </button>
            </div>
          }
          { isTrash &&
            <div className="flex justify- pt-4 justify-between items-center">
              <button className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md" onClick={updatePost}>
                Restore Announcement
              </button>
              <button className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2">
                Delete Announcement
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
