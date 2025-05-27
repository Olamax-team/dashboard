import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from "@/layout/auth-layout";
import { passphraseSchema, passphraseValues } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useApiConfig } from "@/lib/use-api-config";
import { apiRequestHandler } from "@/api/api-request-handler";
import axios from "axios";

const Passphrase = () => {
  const form = useForm<passphraseValues>({
    resolver: zodResolver(passphraseSchema),
    defaultValues: {
      passphrase: '',
    }
  });

  const navigate = useNavigate();
  const loginDetails = localStorage.getItem('loginDetails');

  const loginConfig = useApiConfig({
    method: 'post',
    url: 'admin/login',
    formdata: {
      access_id: loginDetails ? JSON.parse(loginDetails).access_id : '',
      password: loginDetails ? JSON.parse(loginDetails).password : '',
      seedphrase: form.getValues('passphrase')
    }
  })

  const login = () => axios.request(loginConfig);

  const onSubmit = async () => {
    const loginUser = await apiRequestHandler(login);
    if (loginUser?.status === 200) {
      localStorage.removeItem('loginDetails');
      navigate('/dashboard');
    }
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-center lg:text-[32px] text-[25px] leading-normal font-semibold">Passphrase</h2>
            <p className="text-center">We&apos;re happy to see you again !</p>
          </div>
          <FormField
            control={form.control}
            name='passphrase'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full lg:h-[150px] h-[130px] rounded-md">
                    <Textarea className="w-full  resize-none block h-full p-5 placeholder:text-black" {...field} placeholder="Enter your 12 words or 24 words passphrase"/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className="mt-8">
            <button type="submit" className="w-full lg:h-[70px] h-[60px] rounded-md bg-black text-white">
              Login
            </button>
            <div className="mt-8 text-center font-semibold">Contact support</div>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default Passphrase