import React from 'react';
import { Modal } from 'antd';
import { useDeletePublisher } from '../../../hooks/Publisher/useDeletePublisher';
import { useQueryClient } from 'react-query';
import { Proizvođač } from '../../../types/Publisher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  publisher: Proizvođač | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, publisher }) => {
  const deletePublisher = useDeletePublisher();
  const queryClient = useQueryClient();

  const onConfirm = () => {
    if (publisher) {
      
      deletePublisher.mutate(publisher.idProizvodac, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('publishersData');
          toast.success("Brisanje uspješno!")
         
        }
      });
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati proizvođača - "${publisher?.nazivProizvodac}"?`}
        onCancel={onCancel}
        okText="Obriši"
        okType='danger'
        onOk={onConfirm} // Pass the function reference to onOk prop
        cancelText="Odustani"
      >
        <p>Želite li nastaviti?</p>
      </Modal>
    <ToastContainer/>
    </>
  );
};

export default DeleteModal;
