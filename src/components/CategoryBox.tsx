/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { LeftCircleOutlined, RightCircleOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Dropdown } from "antd";
import { CategoryContext } from "../context/categoryContext";
import { handlePrevClick, handleNextClick, handleCategoryClick, handleSearch } from "../util/categoryBoxUtil";
import { Kategorija } from "../types/Category";
import DeleteCategoryModal from "./modals/Category/DeleteCategoryModal";
import useGetCategories from "../hooks/Category/useGetCategories";
import { useGetAdmins } from "../hooks/Admin/useGetAdmins";
import { Admin } from "../types/Admin";

const CategoryBox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data: admins, isLoading: isAdminLoading } = useGetAdmins();
  const { data: categories, isLoading: isCategoryLoading } = useGetCategories();
  const { category, setCategory } = useContext(CategoryContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(category.nazivKategorije);
  const [categoryDesc, setCategoryDesc] = useState<string>(category.opisKategorije);
  const handleAdminSelect = (value: string) => {
    setAdmin(value);
  };
  const [admin, setAdmin] = useState<string>(category.nazivAdmin);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Kategorija | null>(null);
  const hideDeleteModal = useCallback(() => {
    setCategoryToDelete(null);
    setDeleteModalVisible(false);
  }, []);
  const showDeleteModal = useCallback((category: Kategorija) => {
    setCategoryToDelete(category);
    setDeleteModalVisible(true);
  }, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    console.log(categoryName, categoryDesc);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setCategoryName(category.nazivKategorije);
    setCategoryDesc(category.opisKategorije);
  };

  const adminMenu = (
    <Menu onClick={(e) => handleAdminSelect(e.key as string)}>
      {admins?.map((admin: Admin) => (
        <Menu.Item key={admin.idKorisnik.toString()}>{admin.korisnickoIme}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="category-con" data-testid="master-header">
      <Button
        type="primary"
        shape="circle"
        icon={<LeftCircleOutlined />}
        style={{ backgroundColor: "#1F51FF" }}
        onClick={() => handlePrevClick(categories, currentIndex, setCurrentIndex, setCategory, )}
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
          <>
          <div>
            <div style={{display:'flex'}}>
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Dropdown overlay={adminMenu} trigger={['click']} overlayStyle={{backgroundColor: 'blue'}}>
              <Button type="link" style={{ marginTop: "0.5rem", marginRight: "1rem",  }}>
              <span style={{fontWeight:'800',marginRight:'1rem'}}>Admin: </span>{category.nazivAdmin}<DownOutlined />
              </Button>
            </Dropdown>
          </div>
            <Input.TextArea
              value={categoryDesc}
              onChange={(e) => setCategoryDesc(e.target.value)}
              rows={4}
            />
            

            <Button type="primary" onClick={handleSaveClick}>
              Spremi
            </Button>
            <Button style={{ marginLeft: "1rem" }} onClick={handleCancelClick}>
              Odustani
            </Button>
          </div>
          </>
        ) : (
          <>
            <h2>{category.nazivKategorije}</h2>
            <p><span style={{fontWeight:'800', marginRight:'1rem'}}>Opis: </span>{category.opisKategorije}</p>
            <p><span style={{fontWeight:'800',marginRight:'1rem'}}>Admin: </span> {category.nazivAdmin}</p>
            <Button type="primary" style={{ marginTop: "0.5rem", marginRight: '1rem' }} onClick={handleEditClick}>
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
        onClick={() => handleNextClick(categories, currentIndex, setCurrentIndex, setCategory, )}
        disabled={editing}
      />
      <DeleteCategoryModal visible={deleteModalVisible} onCancel={hideDeleteModal} category={categoryToDelete}/>
    </div>

  );
};

export default CategoryBox;
