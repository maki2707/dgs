import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useAddPublisher } from '../../../hooks/Publisher/useAddPublisher';
import { useQueryClient } from 'react-query';

interface Proizvođač {
    nazivProizvođača: string;
    godOsnutka: string;
  }

interface AddPublisherModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddPublisherModal: React.FC<AddPublisherModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient()
  const addPublisher = useAddPublisher()
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      addPublisher.mutate(values, {
        onSuccess:async () => {
          await queryClient.invalidateQueries('publishersData');   
          onCancel()
        }
      })
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
      confirmLoading={submitting}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nazivProizvođača"
          label="Naziv proizvođača"
          rules={[{ required: true, message: 'Molimo unesite naziv proizvođača' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="godOsnutka"
          label="Godina osnutka"
          rules={[{ required: true, message: 'Molimo unesite godinu osnutka' }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPublisherModal;
