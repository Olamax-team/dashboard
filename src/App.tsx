import { useForm } from "react-hook-form"
import AuthLayout from "./layout/auth-layout"
import { loginSchema, loginValues } from "./lib/validations"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from "./components/ui/form";
import { Input } from "./components/ui/input";
import { useNavigate } from "react-router-dom";

function App() {

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      access_id: '',
      password: ''
    }
  });

  const navigate = useNavigate();

  const onSubmit = async (values:loginValues) => {
    localStorage.setItem('loginDetails', JSON.stringify(values));
    navigate('/passphrase');
  }; 

  return (
    <AuthLayout>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-center lg:text-[32px] text-[25px] leading-normal font-semibold">Log In</h2>
            <p className="text-center">We&apos;re happy to see you again !</p>
          </div>
          <FormField
            control={form.control}
            name='access_id'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full lg:h-[70px] h-[60px] rounded-md">
                    <Input {...field} className="w-full h-full placeholder:text-black px-8" placeholder="Access ID"/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="w-full lg:h-[70px] h-[60px] rounded-md">
                    <Input {...field} className="w-full h-full placeholder:text-black px-8" placeholder="Enter Password" type="password"/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className="mt-8">
            <button type="submit" className="w-full lg:h-[70px] h-[60px] rounded-md bg-black text-white">
              Continue
            </button>
            <div className="mt-8 text-center font-semibold">Contact support</div>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}

export default App
