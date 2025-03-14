import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import AuthLayout from '@/layout/auth-layout';
import { otpSchema, otpValues } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Authenticate = () => {
  const form = useForm<otpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    }
  });

  const onSubmit = (value:otpValues) => {
    console.log(value)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <h2 className="text-center lg:text-[32px] text-[25px] leading-normal font-semibold">Authy Code</h2>
            <p className="text-center">We&apos;re happy to see you again !</p>
          </div>
          <FormField
            control={form.control}
            name='otp'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className='w-full lg:h-[70px] md:h-[70px] h-[62px] gap-2 md:gap-3 xl:gap-4 font-inter'>
                      <InputOTPSlot index={0} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal'/>
                      <InputOTPSlot index={1} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={2} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={3} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={4} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                      <InputOTPSlot index={5} className='h-full w-full rounded-md border border-solid text-[23px] leading-normal' />
                    </InputOTPGroup>
                  </InputOTP>
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

export default Authenticate