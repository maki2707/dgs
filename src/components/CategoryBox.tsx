/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { LeftCircleOutlined, RightCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Dropdown, Select, Form } from "antd";
import { CategoryContext } from "../context/categoryContext";
import { handlePrevClick, handleNextClick, handleCategoryClick, handleSearch } from "../util/categoryBoxUtil";
import { Kategorija } from "../types/Category";
import DeleteCategoryModal from "./modals/Category/DeleteCategoryModal";
import useGetCategories from "../hooks/Category/useGetCategories";
import { useGetAdmins } from "../hooks/Admin/useGetAdmins";
import { Admin } from "../types/Admin";
import { useEditCategory } from "../hooks/Category/useEditCategory";
import queryClient from "../util/queryClients";
import { toast } from "react-toastify";

const CategoryBox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data: admins, isLoading: isAdminLoading } = useGetAdmins();
  const { data: categories, isLoading: isCategoryLoading, refetch} = useGetCategories();
  const { category, setCategory } = useContext(CategoryContext);
  const [form] = Form.useForm();
  const [editing, setEditing] = useState<boolean>(false);
  const [admin, setAdmin] = useState<Admin>();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Kategorija | null>(null);

  useEffect(() => {
    form.setFieldsValue({
      nazivKategorije: category.nazivKategorije,
      opisKategorije: category.opisKategorije,
      idAdmin: category.idAdmin
    });
  }, [category, form]);
  const editCategory = useEditCategory(category.idKategorija);
  const handleEditClick = () => {setEditing(true);};

  const handleSaveClick = async () => {
    try {
      const values = await form.validateFields();
      const selectedAdmin = admins.find((admin: Admin) => admin.idKorisnik === values.idAdmin);
      const kategorija: any = {
        nazivKategorije: values.nazivKategorije,
        opisKategorije: values.opisKategorije,
        idAdmin: values.idAdmin,
        nazivAdmin: selectedAdmin ? selectedAdmin.korisnickoIme : '',
      };
      editCategory.mutate(kategorija, {
        onSuccess: async () => {
          refetch()
          toast.success("Kategorija uspješno ažurirana!");
          await queryClient.invalidateQueries('categoriesData');
          refetch()
          setCategory({ ...category, ...kategorija });
        },
        onError: (error:any) => {
          if (error.response?.status === 400) {
            toast.error('Pogreška u ažuriranju: kategorija s tim nazivom već postoji!');
          }
        },
      });
      setEditing(false);
      queryClient.invalidateQueries('categoriesData');
    } catch (error) {
      console.log('Form validation error:', error);
    }
  };
  

  const handleCancelClick = () => {
    setEditing(false);
  };
  const hideDeleteModal = useCallback(() => {
    setCategoryToDelete(null);
    setDeleteModalVisible(false);
  }, []);

  const showDeleteModal = useCallback((category: Kategorija) => {
    setCategoryToDelete(category);
    setDeleteModalVisible(true);
  }, []);

  return (
    <div className="category-con" data-testid="master-header">
      <Button
        type="primary"
        shape="circle"
        icon={<LeftCircleOutlined />}
        style={{ backgroundColor: "#1F51FF" }}
        onClick={() => handlePrevClick(categories, currentIndex, setCurrentIndex, setCategory)}
        disabled={editing}
      />

      <div
        style={{
          marginLeft: "1rem",
          marginRight: "1rem",
          width: "80%",
          textAlign: "center",
        }}
      >
        {editing ? (
          
        <Form form={form} >
          <div style={{display: 'flex'}}>
          <Form.Item 
            name="nazivKategorije"
            rules={[
              { required: true, message: 'Unesite naziv kategorije!' },
              { max: 30, message: 'Maksimalna dužina naziva je 30 znakova.' },
            ]}>
            <Input style={{ width: "20rem", marginRight: '1rem' }} />
          </Form.Item>
          <Form.Item
            label="Odabir admina:"
            name="idAdmin"
            rules={[{ required: true, message: 'Unesite ime administratora!' }]}
          >
            <Select placeholder="Odaberite administratora">
              {isAdminLoading ? (
                <Select.Option value="" disabled>
                  Učitavanje...
                </Select.Option>
              ) : (
                admins?.map((admin: Admin) => (
                  <Select.Option key={admin.idKorisnik} value={admin.idKorisnik}>
                  {admin.korisnickoIme}
                </Select.Option>
                ))
              )}
            </Select>
          </Form.Item>
          </div>
          <Form.Item 
            name="opisKategorije"
            rules={[
              { required: true, message: 'Unesite opis kategorije!' },
              { max: 500, message: 'Maksimalna dužina opisa je 500 znakova.' },
            ]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleSaveClick}>
              Spremi
            </Button>
            <Button style={{ marginLeft: "1rem" }} onClick={handleCancelClick}>
              Odustani
            </Button>
          </Form.Item>
        </Form>

         
        ) : (
          <>
            <h2>{category.nazivKategorije}</h2>
            <p>
              <span style={{ fontWeight: "800", marginRight: "1rem" }}>Opis: </span>
              {category.opisKategorije}
            </p>
            <p>
              <span style={{ fontWeight: "800", marginRight: "1rem" }}>Admin: </span> {category.nazivAdmin}
            </p>
            <Button type="primary" style={{ marginTop: "0.5rem", marginRight: "1rem" }} onClick={handleEditClick}>
              Uredi
            </Button>
            <Button danger style={{ marginTop: "0.5rem" }} onClick={() => showDeleteModal(category)}>
              Obriši
            </Button>
          </>
        )}
      </div>

      <Button
        type="primary"
        shape="circle"
        icon={<RightCircleOutlined />}
        style={{ backgroundColor: "#1F51FF" }}
        onClick={() => handleNextClick(categories, currentIndex, setCurrentIndex, setCategory)}
        disabled={editing}
      />
      <DeleteCategoryModal visible={deleteModalVisible} onCancel={hideDeleteModal} category={categoryToDelete} />
    </div>
  );
};

export default CategoryBox;
