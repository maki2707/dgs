import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { useEditPublisher } from '../../../hooks/Publisher/useEditPublisher';
import { useQueryClient } from 'react-query';

interface EditPublisherModalProps {
  visible: boolean;
  onConfirm: (updatedPublisher: any) => void;
  onCancel: () => void;
  publisher: any;
}

const EditPublisherModal: React.FC<EditPublisherModalProps> = ({ visible, onConfirm, onCancel, publisher }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      setLoading(true);
      editPublisher.mutate(values, {
        onSuccess:async () => {
          await queryClient.invalidateQueries('publishersData');   
          onCancel()
        }
      })
      form.resetFields();
    } catch (error) {
      console.log('Error validating form: ', error);
    } finally {
      setLoading(false);
    }
  };

  const editPublisher = useEditPublisher(publisher?.id)
  const queryClient = useQueryClient();

  return (
    <Modal
      visible={visible}
      title={`Uredi proizvođača - "${publisher?.nazivProizvođača}"`}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Spremi"
      cancelText="Odustani"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" initialValues={{ ...publisher }}>
        <Form.Item
          label="Naziv proizvođača"
          name="nazivProizvođača"
          rules={[{ required: true, message: 'Molimo unesite naziv proizvođača!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
            label="Godina osnutka" 
            name="godOsnutka" 
            rules={[
                {
                pattern: /^\d+$/,
                message: 'Godina osnutka može sadržavati samo brojeve!',
                },
            ]}>
        
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPublisherModal;
