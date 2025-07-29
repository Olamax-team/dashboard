import DashboardLayout from '@/layout/dash-board-layout'
import PageHeader from '../escrow/pageHeader'
import TabAnnouncement from './tabAnnouncement'

const Announcement = () => {
  return (
    <DashboardLayout>
      <section className="w-full h-full  font-Inter ">
        <PageHeader title="Announcement" />
        <div className="w-full px-4 py-2 md:px-10 md:py-4 bg-[#F8F9FA] space-y-16 md:space-y-0">
          <div>
            <TabAnnouncement />
          </div>
        </div>
      </section>
    </DashboardLayout>
    
  )
  
}

export default Announcement