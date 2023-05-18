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

  const onConfirm = async () => {
    if (publisher) {
      try {
        await deletePublisher.mutateAsync(publisher.idProizvodac);
        await queryClient.invalidateQueries('publishersData');
        toast.success('Brisanje proizvođača uspješno!');
        onCancel();
      } catch (error) {
        toast.error('Došlo je do pogreške prilikom brisanja proizvođača.');
      }
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati proizvođača - "${publisher?.nazivProizvodac}"?`}
        onCancel={onCancel}
        okText="Obriši"
        okType="danger"
        onOk={onConfirm}
        cancelText="Odustani"
      >
        <p>Želite li nastaviti?</p>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default DeleteModal;
