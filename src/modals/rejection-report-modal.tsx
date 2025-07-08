import Modal from '@/components/ui/modal'
import { useRejectionReportModal } from '@/store/general-store'

const RejectionReportModal = () => {
  const { onClose, isOpen } = useRejectionReportModal();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      useCloseButton
      title='KYC Rejection Form'
      modalSize='max-w-[450px] 2xl:max-w-[480px] w-full'
    >
      <div className="flex flex-col gap-2">
        <input className='border w-full h-11 px-3 py-2 focus:outline-none rounded-md text-sm' placeholder='Title'/>
        <textarea className='w-full focus:outline-none border resize-none min-h-[100px] 2xl:min-h-[130px] 2xl:max-h-[190px] rounded-md max-h-[170px] px-3 py-2 text-sm' placeholder='Reason for rejection'/>
        <button type="button" className='bg-primary text-white h-11 rounded-md mt-4'>Send Message</button>
      </div>
    </Modal>
  )
}

export default RejectionReportModal