import React from 'react';
import { Modal } from 'antd';
import { useDeleteCategory } from '../../../hooks/Category/useDeleteCategory';
import { useQueryClient } from 'react-query';
import { Kategorija } from '../../../types/Category';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Videoigra } from '../../../types/Videogame';
import { useDeleteVideogame } from '../../../hooks/Videogames/useDeleteVideogame';

interface DeleteModalProps {
  visible: boolean;
  onCancel: () => void;
  videogame: Videoigra | null;
}

const DeleteVideogameModal: React.FC<DeleteModalProps> = ({ visible, onCancel, videogame }) => {
  const deleteVideogame = useDeleteVideogame();
  const queryClient = useQueryClient();
  
  const onConfirm = async () => {
    if (videogame) {
      try {
        await deleteVideogame.mutateAsync(videogame?.idVideoigra);
        await queryClient.invalidateQueries('videogamesData');
        toast.success('Brisanje videoigre uspješno!');
        onCancel();
      } catch (error) {
        toast.error('Došlo je do pogreške prilikom brisanja videoigre.');
      }
    }
  };
  

  return (
    <>
      <Modal
        visible={visible}
        title={`Jeste li sigurni da želite obrisati kategoriju - "${videogame?.nazivVideoigre}"?`}
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

export default DeleteVideogameModal;
