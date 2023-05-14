import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useQueryClient } from 'react-query';
import { useAddPublisher } from '../../../hooks/Publisher/useAddPublisher';
import { Kategorija } from '../../../types/Category';


interface AddCategoryModalProps {
  visible: boolean;
  onCancel: () => void;
  
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ visible, onCancel,   }) => {
  const queryClient = useQueryClient()
  const addPublisher = useAddPublisher()
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish= async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      setLoading(true);
      addPublisher.mutate(values, {
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
  return (
    <Modal
      title="Dodaj novu kategoriju"
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Naziv kategorije"
          name="nazivKategorije"
          rules={[{ required: true, message: 'Unesite naziv kategorije!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Opis kategorije" name="opisKategorije">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Administrator"
          name="admin"
          rules={[{ required: true, message: 'Unesite ime administratora!' }]}
        >
          <Input />
        </Form.Item>
        <button type='submit'>submit</button>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
