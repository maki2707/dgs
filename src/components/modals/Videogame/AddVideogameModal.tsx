import React, { useContext, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useGetPublishers } from '../../../hooks/Publisher/useGetPublishers';
import { Proizvođač } from '../../../types/Publisher';
import { Videoigra } from '../../../types/Videogame';
import { MinHardver } from '../../../types/MinHardver';
import { useGetMinHardver } from '../../../hooks/MinHardver/useGetMinHardver';
import { CategoryContext } from '../../../context/categoryContext';
import { useAddVideogame } from '../../../hooks/Videogames/useAddVideogame';
import queryClient from '../../../util/queryClients';
import { toast } from 'react-toastify';

interface AddVideogameModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddVideogameModal: React.FC<AddVideogameModalProps> = ({ visible, onCancel }) => {
  const { category } = useContext(CategoryContext);
  const [form] = useForm();
  const { data: publishers } = useGetPublishers();
  const { data: minHardver } = useGetMinHardver();
  const [loading, setLoading] = useState(false);
  const addVideogame = useAddVideogame();

  const handleAddVideogame = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const videoigra: any = {
        idProizvodac: values.idProizvodac,
        idMinHardver: values.idMinHardver,
        nazivVideoigre: values.nazivVideoigre,
        cijenaVideoigre: values.cijenaVideoigre,
        idKategorija: category.idKategorija
      };
      await addVideogame.mutateAsync(videoigra, {
        onSuccess: () => {setTimeout(() => {
            console.log("tu sam")
            queryClient.invalidateQueries('videogamesData');
          }, 1000);
          toast.success('Uspješno dodana videoigra!');
          form.resetFields();
          
          onCancel();
        },
        onError: (error: any) => {
            setLoading(false);
            if (error.response && error.response.status === 400) {
              toast.warning('Greška prilikom dodavanja videoigre: Videoigra s takvim imenom već postoji.');
            } else {
              toast.error('Greška prilikom dodavanja videoigre!');
            }
            console.log('Add videogame error:', error);
          },
      });
      setLoading(false);
    } catch (error) {
      console.log('Add videogame error:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      width='50%'
      title="Dodaj videoigru"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Odustani
        </Button>,
        <Button key="add" type="primary" loading={loading} onClick={handleAddVideogame}>
          Dodaj
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nazivVideoigre"
          label="Naziv videoigre"
          rules={[{ required: true, message: 'Naziv videoigre je obavezan' },
          { max: 50, message: 'Naziv videoigre ne smije biti duži od 50 znakova' },]}
        >
          <Input placeholder="Unesite naziv videoigre" />
        </Form.Item>
        <Form.Item name="idProizvodac" label="Proizvođač" rules={[{ required: true, message: 'Odaberite proizvođača' }]}>
          <Select placeholder="Odaberite proizvođača">
            {publishers?.map((publisher: Proizvođač) => (
              <Select.Option key={publisher.idProizvodac} value={publisher.idProizvodac}>
                {publisher.nazivProizvodac}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="idMinHardver"
          label="Minimalna konfiguracija"
          rules={[{ required: true, message: 'Odaberite minimalnu konfiguraciju' }]}
        >
          <Select placeholder="Odaberite minimalnu konfiguraciju">
            {minHardver?.map((item: MinHardver) => (
              <Select.Option key={item.idMinhardver} value={item.idMinhardver}>
                {item.disk + ' | ' + item.grafickaKartica + ' | ' + item.procesor + ' | ' + item.ram}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="cijenaVideoigre"
          label="Cijena videoigre"
          rules={[{ required: true, message: 'Unesite cijenu videoigre u eurima' }]}
        >
          <Input type="number" placeholder="Unesite cijenu videoigre u eurima" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddVideogameModal;
