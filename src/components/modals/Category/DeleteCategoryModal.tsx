import React from 'react';
import { Modal } from 'antd';
import { useDeleteCategory } from '../../../hooks/Category/useDeleteCategory';
import { useQueryClient } from 'react-query';
import { Kategorija } from '../../../types/Category';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  category: Kategorija | null;
}

const DeleteCategoryModal: React.FC<DeleteModalProps> = ({ visible, onCancel, category }) => {
  const deleteCategory = useDeleteCategory();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onConfirm = async () => {
    if (category) {
      try {
        await deleteCategory.mutateAsync(category.idKategorija);
        await queryClient.invalidateQueries('categoriesData');
        toast.success('Brisanje kategorije uspješno!');
        setTimeout(() => {
          navigate(`/categories`);
        }, 2500);
        onCancel();
      } catch (error) {
        toast.error('Došlo je do pogreške prilikom brisanja kategorije.');
      }
    }
  };
  

  return (
    <>
      <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati kategoriju - "${category?.nazivKategorije}"?`}
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

export default DeleteCategoryModal;
