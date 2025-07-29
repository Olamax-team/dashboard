import { Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useAdminDetails } from "@/store/admin-details-store";
import axios from "axios";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateAnnouncement({setShowCreateAnouncement, setActiveTab}:{setShowCreateAnouncement: (open:boolean) => void; setActiveTab: React.Dispatch<React.SetStateAction<string>>}) {

  const [link, setLink] = React.useState("");
  const [description, setDescription] = React.useState('');
  const formDataRef = React.useRef<FormData>(new FormData());
  const [isLoading, setIsLoading] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)

  const { token } = useAdminDetails();
  const queryClient = useQueryClient();

  const createPost = async () => {
    const formData = formDataRef.current;
    formData.append('description', description);
    formData.append('link', link);
    formData.append('is_publish', '0');

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/add-announcement`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setIsLoading(true)
    try {
      const response = await axios.request(config);
      if (response && response.status === 200) {
        toast.success('Announcement successfully published')
        setIsLoading(false);
        setShowCreateAnouncement(false);
        queryClient.invalidateQueries({ queryKey: ['announcement', 'published'] });
        setActiveTab('published')
      }
    } catch (error) {
      console.log(error)
      console.error('Upload failed', error);
    } finally{() => {setIsLoading(false); setShowCreateAnouncement(false);}}
  };

  const createDraft = async () => {
    const formData = formDataRef.current;
    formData.append('description', description);
    formData.append('link', link);
    formData.append('is_publish', '1')

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/add-announcement`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: formData,
    }

    setIsCreating(true);
    try {
      const response = await axios.request(config);
      if (response && response.status === 200) {
        toast.success('Draft successfully created');
        setIsCreating(false);
        setShowCreateAnouncement(false);
        queryClient.invalidateQueries({ queryKey: ['announcement', 'draft'] });
        setActiveTab('published')
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {() => {setIsCreating(false); setShowCreateAnouncement(false);}}
  };




  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-opacity-50 bg-black/50 p-3">
      <div className="w-full max-w-xl mx-auto bg-white rounded-md shadow-sm overflow-hidden">
        {" "}
        <div className="bg-[#039AE4] text-white h-[60px] px-4 py-3 flex justify-between items-center">
          <h2 className="text-lg font-medium leading-[150%]">Create New Post</h2>
          <button className="text-white hover:bg-[#039AE4] rounded-full p-1 cursor-pointer" onClick={() => setShowCreateAnouncement(false)}>
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
              className="min-h-[100px] max-h-[300px] border-0 bg-gray-100 rounded px-2 shadow-none focus-visible:ring-0 focus-visible:outline-none resize-none text-sm md:py-2"
            />
          </div>

          <div className="flex justify- pt-4 justify-between items-center">
            <button
              disabled={isLoading || isCreating}
              onClick={createPost}
              className="bg-[#039AE4] text-white px-8 md:px-12 text-sm h-10 flex items-center gap-2 cursor-pointer rounded-md"
            >
              {isLoading ? 'Creating Announcement...' : 'Create Announcement'}
              {isLoading && <Loader2 className="animate-spin"/>}
            </button>

            <button 
              disabled={isLoading || isCreating}
              onClick={createDraft}
              className="border-primary border px-8 md:px-12 text-sm h-10 rounded-md cursor-pointer flex items-center gap-2"
            >
              {isCreating ? 'Saving Draft...' : 'Save as Draft'}
              {isCreating && <Loader2 className="animate-spin"/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
