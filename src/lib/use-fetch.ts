import { apiRequestHandler } from "@/api/api-request-handler";
import { useAdminDetails } from "@/store/admin-details-store";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useFetch = () => {
  const { token } = useAdminDetails();
  const queryClient = useQueryClient();

  const deleteUser = async (userId:number) => {
    const dlt = () => axios.request({
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/delete-user/${userId}`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    const deleteResult = await apiRequestHandler(dlt);
    if (deleteResult) {
      console.log(deleteResult);
    }
  };
  
  const blockUser = async (userId:number) => {
    const block = () => axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://api.olamax.io/api/admin/block-unblock`,
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: {
        blocked: true, 
        description: "tsr",
        user_id: userId
      }
    });

    const blockResult = await apiRequestHandler(block);
    if (blockResult && blockResult.status === 200) {
      toast.success('User successfully block');
      queryClient.invalidateQueries({queryKey: ['verified-users']});
      queryClient.invalidateQueries({queryKey: ['unverified-users']});
      queryClient.invalidateQueries({queryKey: ['pending-users']});
    }
  };

  return { deleteUser, blockUser }
}