import Modal from '@/components/ui/modal'
import React from 'react';
import { useRejectionReportModal } from '@/store/general-store'
import { useApiConfig } from '@/lib/use-api-config';
import axios from 'axios';
import { apiRequestHandler } from '@/api/api-request-handler';
import { toast } from 'sonner';

const RejectionReportModal = () => {
  const { onClose, isOpen, formData } = useRejectionReportModal();
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');

  const data = {
    label: formData?.label,
    status: formData?.status,
    target: formData?.target,
    title: title,
    description: description
  };

  const config = useApiConfig({
    url: 'update-kyc-status',
    method: 'put',
    formdata: data
  })

  const rejectUser = async () => {
    const updateUser = () => axios.request(config);
    const response = await apiRequestHandler(updateUser);
    if (response && response.status === 200) {
      toast.success(formData?.label === 'users' && formData.target === 'status' ? 'User details rejected' : formData?.label === 'kyc_documents' && formData.target === 'status' ? 'User documents rejected':  'User video rejected');
      onClose();
    };
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {onClose(); setTitle(''); setDescription('');}}
      useCloseButton
      title='KYC Rejection Form'
      modalSize='max-w-[450px] 2xl:max-w-[480px] w-full'
    >
      <div className="flex flex-col gap-2">
        <input className='border w-full h-11 px-3 py-2 focus:outline-none rounded-md text-sm' placeholder='Title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea className='w-full focus:outline-none border resize-none min-h-[100px] 2xl:min-h-[130px] 2xl:max-h-[190px] rounded-md max-h-[170px] px-3 py-2 text-sm' placeholder='Reason for rejection'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="button" className='bg-primary text-white h-11 rounded-md mt-4' onClick={() => rejectUser()}>Send Message</button>
      </div>
    </Modal>
  )
}

export default RejectionReportModal