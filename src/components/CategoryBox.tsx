/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Dropdown } from "antd";
import { CategoryContext } from "../context/categoryContext";
import { handlePrevClick, handleNextClick, handleCategoryClick, handleSearch } from "../util/categoryBoxUtil";
import { categoriesList } from "../hooks/Category/useGetCategories";
import { DownOutlined } from '@ant-design/icons';
import { Kategorija } from "../types/Category";
import DeleteCategoryModal from "./modals/Category/DeleteCategoryModal";

const CategoryBox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { categoryIndex, setCategoryIndex } = useContext(CategoryContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(categoryIndex.category);
  const [categoryDesc, setCategoryDesc] = useState<string>(categoriesList[currentIndex].opisKategorije);
  const handleAdminSelect = (value: string) => {setAdmin(value);};
  const [admin, setAdmin] = useState<string>(categoriesList[currentIndex].admin);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Kategorija | null>(null);
  const hideDeleteModal = useCallback(() => {setCategoryToDelete(null);setDeleteModalVisible(false);}, []);
  const showDeleteModal = useCallback((category: Kategorija) => {setCategoryToDelete(category);setDeleteModalVisible(true);}, []);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    setEditing(false);
    console.log(categoryName,categoryDesc)
  };

  const handleCancelClick = () => {
    setEditing(false);
    setCategoryName(categoryIndex.category);
    setCategoryDesc(categoriesList[currentIndex].opisKategorije);
  };

  const adminMenu = (
    <Menu onClick={(e) => handleAdminSelect(e.key as string)}>
      <Menu.Item key="admin1">Admin 1</Menu.Item>
      <Menu.Item key="admin2">Admin 2</Menu.Item>
    </Menu>
  );

  return (
    <div className="category-con" data-testid="master-header">
      <Button
        type="primary"
        shape="circle"
        icon={<LeftCircleOutlined />}
        style={{ backgroundColor: "#1F51FF" }}
        onClick={() => handlePrevClick(currentIndex, setCurrentIndex, setCategoryIndex)}
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
              <Button type="link" style={{ marginTop: "0.5rem", marginRight: "1rem" }}>
                Admin: {admin}<DownOutlined />
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
            <h2>{categoryIndex.category}</h2>
            <p>{categoriesList[currentIndex].opisKategorije}</p>
            <p>Admin: {categoriesList[currentIndex].admin}</p>
            <Button type="primary" style={{ marginTop: "0.5rem", marginRight: '1rem' }} onClick={handleEditClick}>
              Uredi
            </Button>
            <Button danger style={{ marginTop: "0.5rem" }} onClick={() => showDeleteModal(categoriesList[currentIndex])}>
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
        onClick={() => handleNextClick(currentIndex, setCurrentIndex, setCategoryIndex)}
        disabled={editing}
      />
      <DeleteCategoryModal visible={deleteModalVisible} onCancel={hideDeleteModal} category={categoryToDelete}/>
    </div>

  );
};

export default CategoryBox;
