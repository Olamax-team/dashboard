import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import AuthLayout from "@/layout/auth-layout";
import { passphraseSchema, passphraseValues } from "@/lib/validations";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const Passphrase = () => {
  const form = useForm<passphraseValues>({
    resolver: zodResolver(passphraseSchema),
    defaultValues: {
      passphrase: '',
    }
  });

  const onSubmit = (value:passphraseValues) => {
    console.log(value)
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