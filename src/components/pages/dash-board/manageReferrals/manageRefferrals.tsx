import PageHeader from '../escrow/pageHeader'
import TabReferral from './tabReferral'

const ManageRerrals = () => {
  return (
    
    <section className="w-full h-full  font-Inter ">
        <PageHeader title="Manage Referrals" />
        <div className="w-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
          <div><TabReferral /></div>
        </div>
      </section>
    
  )
  
}

export default ManageRerrals