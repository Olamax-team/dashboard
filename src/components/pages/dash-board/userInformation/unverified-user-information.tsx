import DashboardLayout from '@/layout/dash-board-layout'
import PageHeader from '../escrow/pageHeader'
import UnVerifiedUserTab from './unverified-user-tab'

const UnverifiedUserInformation = () => {
  return (
    <DashboardLayout>
      <section className="w-full h-full  font-Inter ">
        <PageHeader title="User Informations" />
        <div className="w-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
          <div>
            <UnVerifiedUserTab />
          </div>
        </div>
      </section>
    </DashboardLayout>
  )
}

export default UnverifiedUserInformation