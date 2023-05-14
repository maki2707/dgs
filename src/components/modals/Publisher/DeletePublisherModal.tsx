import React from 'react';
import { Modal } from 'antd';
import { useDeletePublisher } from '../../../hooks/Publisher/useDeletePublisher';
import { useQueryClient } from 'react-query';
import { Proizvođač } from '../../../types/Publisher';
interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  publisher: Proizvođač |null
}

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, publisher }) => {
  const deletePublisher = useDeletePublisher();
  const queryClient = useQueryClient();

  const onConfirm = () => {
    if(publisher){
      deletePublisher.mutate(publisher.id, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('publishersData')
        }
      })
    }
    
  }
  return (
    <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati proizvođača - "${publisher?.nazivProizvođača}"?`}
        onCancel={onCancel}
        okText="Obriši"
        okType='danger'
        onOk={onConfirm}
        cancelText="Odustani"
        >
        <p>Želite li nastaviti?</p>
        </Modal>
  );
};

export default DeleteModal;
