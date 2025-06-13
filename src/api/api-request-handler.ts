import { AxiosError } from 'axios'
import { toast } from 'sonner';

interface ApiErrorResponse {
  message?: string;
  error?: {
    message?: string;
  };
  errors?: any;
}

export const apiRequestHandler = async <T>( requestFn: () => Promise<T>, setLoading?: (loading: boolean) => void): Promise<T | null> => {
  if (setLoading) setLoading(true);

  try {
    const response = await requestFn();
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const errorMessage = axiosError?.response?.data?.message || axiosError?.response?.data?.error?.message;
    if (axiosError?.response?.data.errors) {
      console.log(error);
      const errorObject = axiosError?.response?.data.errors;

      if (Object.prototype.hasOwnProperty.call(errorObject, 'email') && (Array.isArray(errorObject.email) ? errorObject.email.length > 0 : errorObject.email !== '')) {
        toast.error(axiosError?.response?.data.errors.email[0]);
        return null;
      };

    } else {
      console.log(error)
      toast.error(errorMessage || 'An unexpected error occurred. Try again later.');
      return null;
    }
  } 
  finally {
    if (setLoading) setLoading(false);
  }
  return null;
};