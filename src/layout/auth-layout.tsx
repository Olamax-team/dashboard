import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="flex flex-col">
      <div className="h-[70px] lg:h-[100px] flex items-center lg:px-[80px] px-6 shadow-md">
        <div className="lg:w-[154px] lg:h-[40px] w-[110px]">
          <img src="/images/OLAMAX_Logo_2.png" alt="auth_banner" className='w-full h-full object-contain object-center'/>
        </div>
      </div>
      <div className='h-[calc(100vh_-_100px)] w-full flex'>
        <div className="w-[45%] hidden lg:flex items-center justify-center">
          <img src="/images/Rectangle_21.png" alt="auth_banner" className='w-full h-full object-cover object-center'/>
        </div>
        <div className="lg:w-[55%] w-full items-center justify-center flex p-8 md:p-10">
          <div className="max-w-[550px] w-full min-h-[440px]">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthLayout