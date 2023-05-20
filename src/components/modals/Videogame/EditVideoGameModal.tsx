import React, { useContext, useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useGetPublishers } from '../../../hooks/Publisher/useGetPublishers';
import { Proizvođač } from '../../../types/Publisher';
import { Videoigra } from '../../../types/Videogame';
import { MinHardver } from '../../../types/MinHardver';
import { useGetMinHardver } from '../../../hooks/MinHardver/useGetMinHardver';
import { CategoryContext } from '../../../context/categoryContext';

import queryClient from '../../../util/queryClients';
import { toast } from 'react-toastify';
import { useEditVideogame } from '../../../hooks/Videogames/useEditVideogame';

interface EditVideogameModalProps {
  visible: boolean;
  onCancel: () => void;
  videogame: Videoigra | null;
}

const EditVideogameModal: React.FC<EditVideogameModalProps> = ({ visible, onCancel, videogame }) => {
  const { category } = useContext(CategoryContext);
  const [form] = useForm();
  const { data: publishers } = useGetPublishers();
  const { data: minHardver } = useGetMinHardver();
  const [loading, setLoading] = useState(false);
  const editVideogame = useEditVideogame(videogame?.idVideoigra);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(videogame);
    }
  }, [visible, videogame, form]);

  const handleEditVideogame = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const updatedVideogame: any = {
        ...videogame,
        idProizvodac: values.idProizvodac,
        idMinHardver: values.idMinHardver,
        nazivVideoigre: values.nazivVideoigre,
        cijenaVideoigre: values.cijenaVideoigre,
        idKategorija: category.idKategorija,
      };
      console.log(updatedVideogame);
      await editVideogame.mutateAsync(updatedVideogame, {
        onSuccess: () => {
          setTimeout(() => {
            console.log("tu sam");
            queryClient.invalidateQueries('videogamesData');
          }, 1000);
          toast.success('Uspješno ažurirana videoigra!');
          form.resetFields();
          onCancel();
        },
        onError: (error: any) => {
          if (error.response && error.response.status === 400) {
            toast.warning('Greška prilikom ažuriranja videoigre: Videoigra s takvim imenom već postoji.');
          } else {
            toast.error('Greška prilikom ažuriranja videoigre!');
          }
          console.log('Edit videogame error:', error);
        },
      });
      setLoading(false);
    } catch (error) {
      console.log('Edit videogame error:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      width="50%"
      title="Uredi videoigru"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Odustani
        </Button>,
        <Button key="edit" type="primary" loading={loading} onClick={handleEditVideogame}>
          Spremi promjene
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={videogame || undefined}>
        <Form.Item
          name="nazivVideoigre"
          label="Naziv videoigre"
          rules={[{ required: true, message: 'Unesite naziv videoigre' }]}
        >
          <Input placeholder="Unesite naziv videoigre" />
        </Form.Item>
        <Form.Item name="idProizvodac" label="Proizvođač" rules={[{ required: true, message: 'Odaberite proizvođača' }]}>
          <Select placeholder="Odaberite proizvođač">
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

export default EditVideogameModal;
