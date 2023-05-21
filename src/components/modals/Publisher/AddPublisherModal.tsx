import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import { useAddPublisher } from '../../../hooks/Publisher/useAddPublisher';
import { useQueryClient } from 'react-query';
import { Proizvođač } from '../../../types/Publisher';
import { toast } from 'react-toastify';

interface AddPublisherModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddPublisherModal: React.FC<AddPublisherModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient()
  const addPublisher = useAddPublisher()
  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible,  form]);
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = values.godOsnutka.format('YYYY-MM-DD');
      values.godOsnutka = new Date(formattedDate);
      console.log(values);
      addPublisher.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries('publishersData');
          toast.success('Uspješno dodan proizvođač!');
          onCancel();
        },
        onError: (error:any) => {
          if (error.response?.status === 400) {
            toast.error('Pogreška u dodavanju: proizvođač s tim imenom već postoji!');
          }
        },
      });
    } catch (error) {
      console.log('Validation failed:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  

  return (
    <Modal
      title="Dodaj novog proizvođača"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      okText="Dodaj"
      cancelText="Odustani"
      confirmLoading={submitting}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nazivProizvodac"
          label="Naziv proizvođača"
          rules={[{ required: true, message: 'Molimo unesite naziv proizvođača' },
          { max: 30, message: 'Naziv proizvođača ne smije biti duži od 30 znakova' },]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="godOsnutka"
          label="Godina osnutka"
          rules={[{ required: true, message: 'Molimo unesite godinu osnutka' }]}
        >
        <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPublisherModal;
