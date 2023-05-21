import React, { useState, useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { useEditPublisher } from '../../../hooks/Publisher/useEditPublisher';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface EditPublisherModalProps {
  visible: boolean;
  onConfirm: (updatedPublisher: any) => void;
  onCancel: () => void;
  publisher: any;
  setPublisherToEdit: (publisher: any) => void;
}

const EditPublisherModal: React.FC<EditPublisherModalProps> = ({ visible, onConfirm, onCancel, publisher, setPublisherToEdit }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(publisher);
    }
  }, [visible, publisher, form]);

  const handleCancel = () => {
    form.resetFields();
    setPublisherToEdit(null);
    onCancel();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      editPublisher.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('publishersData');
          toast.success('Uspješna izmjena proizvođača!');
          form.resetFields();
          onCancel();
        }, 
        onError: (error:any) => {
          if (error.response?.status === 400) {
            toast.error('Pogreška u ažuriranju: proizvođač s tim imenom već postoji!');
          }
        },
      });
    } catch (error) {
      console.log('Error validating form: ', error);
    } finally {
      setLoading(false);
    }
  };

  const editPublisher = useEditPublisher(publisher?.idProizvodac);
  const queryClient = useQueryClient();

  return (
    <Modal
      visible={visible}
      title={`Uredi proizvođača - "${publisher?.nazivProizvodac}"`}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Spremi"
      cancelText="Odustani"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Naziv proizvođača"
          name="nazivProizvodac"
          rules={[{ required: true, message: 'Molimo unesite naziv proizvođača!' },
          { max: 30, message: 'Naziv proizvođača ne smije biti duži od 30 znakova' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Godina osnutka"
          name="godOsnutka"
          rules={[{ required: true, message: 'Molimo odaberite godinu!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPublisherModal;
