import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { useQueryClient } from 'react-query';
import { useAddPublisher } from '../../../hooks/Publisher/useAddPublisher';
import { Kategorija } from '../../../types/Category';
import { useAddCategory } from '../../../hooks/Category/useAddCategory';
import useGetAdmins from '../../../hooks/Admin/useGetAdmins';
import { Admin } from '../../../types/Admin';
import { toast } from 'react-toastify';

interface AddCategoryModalProps {
  visible: boolean;
  onCancel: () => void;
}

const { Option } = Select;
const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ visible, onCancel }) => {
  const queryClient = useQueryClient();
  const addCategory = useAddCategory();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: admins, isLoading: isAdminLoading } = useGetAdmins();
  
  useEffect(() => {
    if (visible) {
      form.resetFields();
    }
  }, [visible,  form]);
  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      addCategory.mutate(values, {
        onSuccess: async () => {
          toast.success("Kategorija uspješno dodana!")
          await queryClient.invalidateQueries('categoriesData');
          onCancel();
        },
        onError: (error:any) => {
          if (error.response?.status === 400) {
            toast.error('Pogreška u dodavanju: kategorija s tim nazivom već postoji!');
          }
        },
      });
      form.resetFields();
    } catch (error) {
      console.log('Error validating form: ', error);
    } 
  };

  return (
    <Modal
      title="Dodaj novu kategoriju"
      visible={visible}
      onCancel={onCancel}
      confirmLoading={loading}
      onOk={onFinish}
      okText="Dodaj"
      cancelText="Odustani"
    >
      <Form form={form} >
        <Form.Item
          label="Naziv kategorije"
          name="nazivKategorije"
          rules={[
            { required: true, message: 'Unesite naziv kategorije!' },
            { max: 30, message: 'Maksimalna dužina naziva je 30 znakova.' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Opis kategorije"
          name="opisKategorije"
          rules={[
            { required: true, message: 'Unesite opis kategorije!' },
            { max: 500, message: 'Maksimalna opisa je 500 znakova.' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Odabir admina:"
          name="idAdmin"
          rules={[{ required: true, message: 'Unesite ime administratora!' }]}
        >
          <Select placeholder="Odaberite administratora">
            {isAdminLoading ? (
              <Option value="" disabled>
                Učitavanje...
              </Option>
            ) : (
              admins?.map((admin: Admin) => (
                <Option key={admin.idUloga} value={admin.idKorisnik}>
                  {admin.korisnickoIme}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
