import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddAnnouncement from "./addAnnouncement";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import axios from "axios";
import { apiRequestHandler } from "@/api/api-request-handler";
import { AnnouncementProps } from "@/lib/types";
import { Loader2, Trash } from "lucide-react";
import { format } from "date-fns";

const EdithAnnouncement = ({activeTab, setActiveTab}:{activeTab:string; setActiveTab: React.Dispatch<React.SetStateAction<string>>}) => {

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const { token } = useAdminDetails();
  const queryClient = useQueryClient();
  
  const getNewsConfig = useApiConfigWithToken({
    method: 'get',
    url: activeTab === 'published' ? 'admin/get-announcement?per_page=15' : activeTab === 'draft' ? 'admin/get-announcement-draft?per_page=15' : 'admin/get-announcement-trash?per_page=15'
  });
  
  const getNews = () => axios.request(getNewsConfig);

  const {data:newsDataResponse, status:newsStatus } = useQuery({
    queryKey: ['announcement', activeTab],
    queryFn: () => apiRequestHandler(getNews)
  });
  
  const newsData:AnnouncementProps[] = activeTab === 'trash' ? newsDataResponse?.data?.trash || [] :   newsDataResponse?.data?.announcement || [];

  const handleDelete = async (id:number) => {
    const postconfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/delete-announcement/${id}`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    const deletePost = () => axios.request(postconfig);
    await apiRequestHandler(deletePost)
    .then((response) => {
      if (response && response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['announcement', activeTab] });
      }
    })
  };

  const selectedPost = newsData.find((post) => post.id === selectedPostId);

  if (newsStatus === 'pending') {
    return (
      <div className="w-full h-[40vh] flex items-center justify-center">
        <Loader2 className="animate-spin"/>
      </div>
    )
  };

  if (newsStatus === 'error') {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        {activeTab === 'published' && <p className="text-sm lg:text-base">An error occured while loading published announcements items</p>}
        {activeTab === 'draft' && <p className="text-sm lg:text-base">An error occured while loading draft announcements items</p>}
        {activeTab === 'trash' && <p className="text-sm lg:text-base">An error occured while loading trashed announcements items</p>}
      </div>
    )
  };

  if (newsStatus === 'success' && newsData &&  newsData.length < 1) {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        {activeTab === 'published' && <p className="text-sm lg:text-base">There is no published announcements items yet, create some</p>}
        {activeTab === 'draft' && <p className="text-sm lg:text-base">There is no draft news announcements yet, create some</p>}
        {activeTab === 'trash' && <p className="text-sm lg:text-base">There is no trashed announcements items yet.</p>}
      </div>
    )
  }


  function BlogCard({post, setSelectedPostId,}: {post: AnnouncementProps; setSelectedPostId: (id: number | null) => void;}) {
    return (
      <Card className="overflow-hidden h-full border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p>
                <span
                  className="text-[#039AE4] font-medium text-sm leading-[150%] cursor-pointer hover:underline"
                  onClick={() => setSelectedPostId(post.id)}
                >
                  Edit
                </span>
              </p>
              <span className="text-[#121826] font-semibold text-sm">
                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
              </span>
            </div>
            <div className="text-[#121826] font-semibold text-sm flex items-center justify-between">
              <span>Posted by {post.announcement_by}</span>
              <button type="button" className="bg-red-200 text-red-500 p-1 rounded cursor-pointer" onClick={() => handleDelete(post.id)}>
                <Trash className="size-4"/>
              </button>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="text-[#121826] font-normal text-sm">
            {post.description}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="w-full pt-4 pb-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData && newsData.length > 0 && newsData.map((post) => (
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
          setActiveTab={setActiveTab}
        />
      )}
    </section>
  );
};


export default EdithAnnouncement;
