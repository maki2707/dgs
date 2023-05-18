import React from 'react';
import { Modal } from 'antd';
import { useDeletePublisher } from '../../../hooks/Publisher/useDeletePublisher';
import { useQueryClient } from 'react-query';
import { Proizvođač } from '../../../types/Publisher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Kategorija } from '../../../types/Category';
import { useDeleteCategory } from '../../../hooks/Category/useDeleteCategory';
interface DeleteModalProps {
    visible: boolean;
    onCancel: () => void;
    category : Kategorija | null
  }
const DeleteCategoryModal: React.FC<DeleteModalProps> = ({ visible, onCancel, category }) => {
  const deleteCategory = useDeleteCategory();
  const queryClient = useQueryClient();

  const onConfirm = () => {
    if (category) {
      
        deleteCategory.mutate(1, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('categoriesData');
          toast.success("Brisanje uspješno!")
        }
      });
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati kategoriju - "${category?.nazivKategorije}"?`}
        onCancel={onCancel}
        okText="Obriši"
        okType='danger'
        onOk={onConfirm}
        cancelText="Odustani"
      >
        <p>Želite li nastaviti?</p>
      </Modal>
    <ToastContainer/>
    </>
  );
};

export default DeleteCategoryModal;
