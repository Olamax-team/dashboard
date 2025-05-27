import { useAdminDetails } from "@/store/admin-details-store";


const useApiConfig = ({formdata, method, url}:{url:string, method:string, formdata?:any}) => {
  
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `https://api.olamax.io/api/${url}`,
    headers: {
      'Content-Type':'application/json',
    },
    data: formdata ? formdata : null,
  };

  return config;
}

const useApiConfigWithToken = ({formdata, method, url}:{url:string, method:string, formdata?:any}) => {

  const { token } = useAdminDetails();
  
  const config = {
    method: method,
    maxBodyLength: Infinity,
    url: `https://api.olamax.io/api/${url}`,
    headers: {
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token ? token : ''}`
    },
    data: formdata ? formdata : null,
  };

  return config;
}

export { useApiConfig, useApiConfigWithToken };