import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AddNews from "./addNews";
import axios from "axios";
import { useApiConfigWithToken } from "@/lib/use-api-config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequestHandler } from "@/api/api-request-handler";
import { NewsProps } from "@/lib/types";
import { Loader2, Trash } from "lucide-react";
import { format } from "date-fns";
import { useAdminDetails } from "@/store/admin-details-store";


export default function ManageNews({activeTab, setActiveTab}:{activeTab:string, setActiveTab: React.Dispatch<React.SetStateAction<string>>}) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const { token } = useAdminDetails();
  const queryClient = useQueryClient();

  const getNewsConfig = useApiConfigWithToken({
    method: 'get',
    url: activeTab === 'published' ? 'admin/get-news?per_page=15' : activeTab === 'draft' ? 'admin/get-news-draft?per_page=15' : 'admin/get-trash?per_page=15'
  });

  const getNews = () => axios.request(getNewsConfig);

  const {data:newsDataResponse, status:newsStatus } = useQuery({
    queryKey: ['news', activeTab],
    queryFn: () => apiRequestHandler(getNews)
  });

  const newsData:NewsProps[] = activeTab === 'trash' ? newsDataResponse?.data?.trash || [] :   newsDataResponse?.data?.news || [];

  // Fetch the selected post data by ID
  const selectedPost = newsData.find((post) => post.id === selectedPostId);

  // const handleDeleteImage = async (id:number) => {
  //   const pictureconfig = {
  //     method: 'get',
  //     maxBodyLength: Infinity,
  //     url: `https://api.olamax.io/api/admin/delete-news-picture/${id}`,
  //     headers: {
  //       'Content-Type':'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //     }

  //     const deletePicture = () => axios.request(pictureconfig);
  //     await apiRequestHandler(deletePicture)
  //   .then((response) => {
  //     if (response) {
  //      console.log(response) 
  //     }
  //   })
  // };

  
  const BlogCard = ({post,setSelectedPostId}: {post: NewsProps; setSelectedPostId: (id: number | null) => void;}) =>{

    const isTrash = post && post.is_trash === 1;

    const handleDelete = async () => {
  
      const postconfig = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://api.olamax.io/api/admin/delete-news/${post.id}`,
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
      };

      const formData = {
        type: 'selected',
        ids: [post.id]
      }

      const deleteconfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://api.olamax.io/api/admin/news/destroy`,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: formData,
      }

      if (isTrash) {
        const deletePostTotally  = () => axios.request(deleteconfig)
        await apiRequestHandler(deletePostTotally)
        .then((response) => {
          if (response && response.status === 200) {
            queryClient.invalidateQueries({ queryKey: ['news', 'trash'] });
          }
        })
      }


  
      const deletePost = () => axios.request(postconfig);
      await apiRequestHandler(deletePost)
      .then((response) => {
        if (response && response.status === 200) {
         queryClient.invalidateQueries({ queryKey: ['news', 'published'] });
        }
      })
    };

    return (
      <Card className="overflow-hidden h-full rounded-lg shadow-sm hover:shadow-md transition-shadow w-full">
        <div className="flex items-center p-4 border-b border-gray-100">
          <div className="w-12 h-12 mr-3 overflow-hidden rounded-md">
            <img
              src={post.image || "/placeholder.svg?height=48&width=48"}
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
              <span className="text-[#121826] font-semibold leading-[150%] text-[14px]">
                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
              </span>
            </div>
            <div className="text-[#121826] font-semibold text-sm flex items-center justify-between">
              <span>Posted by {post.news_by}</span>
              <button type="button" className="bg-red-200 text-red-500 p-1 rounded cursor-pointer" onClick={() => handleDelete()}>
                <Trash className="size-4"/>
              </button>
            </div>
          </div>
        </div>
        <CardContent className="lg:p-4 p-3">
          <h3 className="text-[#121826] font-semibold text-base line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[#121826] text-sm mt-3 line-clamp-4">
            {post.description}
          </p>
        </CardContent>
      </Card>
    );
  }

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
        {activeTab === 'published' && <p className="text-sm lg:text-base">An error occured while loading published news items</p>}
        {activeTab === 'draft' && <p className="text-sm lg:text-base">An error occured while loading draft news items</p>}
        {activeTab === 'trash' && <p className="text-sm lg:text-base">An error occured while loading trashed news items</p>}
      </div>
    )
  };

  if (newsStatus === 'success' && newsData &&  newsData.length < 1) {
    return (
      <div className="w-full h-[40vh] flex justify-center py-20">
        {activeTab === 'published' && <p className="text-sm lg:text-base">There is no published news items yet, create some</p>}
        {activeTab === 'draft' && <p className="text-sm lg:text-base">There is no draft news items yet, create some</p>}
        {activeTab === 'trash' && <p className="text-sm lg:text-base">There is no trashed news items yet.</p>}
      </div>
    )
  }

  return (
    <section className="w-full pt-8 pb-14">
      <div className="">
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

      {/* Show the AddNews modal only if a post ID is selected */}
      {selectedPost && (
        <AddNews
          setShowAddNews={() => setSelectedPostId(null)}
          post={selectedPost}
          setActiveTab={setActiveTab}
        />
      )}
    </section>
  );
}
