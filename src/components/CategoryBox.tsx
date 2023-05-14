/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Input, Menu, Dropdown } from "antd";
import { CategoryContext } from "../context/categoryContext";
import { handlePrevClick, handleNextClick, handleCategoryClick, handleSearch } from "../components/util/categoryBoxUtil";
import { categoriesList } from "../hooks/Category/useGetCategories";

interface Category {
  nazivKategorije: string;
  opisKategorije: string;
  admin: string;
}

const CategoryBox: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { categoryIndex, setCategoryIndex } = useContext(CategoryContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>(categoryIndex.category);
  const [categoryDesc, setCategoryDesc] = useState<string>(categoriesList[currentIndex].opisKategorije);

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

  return (
    <div className="category-con">
      <Button
        type="primary"
        shape="circle"
        icon={<LeftCircleOutlined />}
        style={{ backgroundColor: "#1F51FF" }}
        onClick={() => handlePrevClick(currentIndex, setCurrentIndex, setCategoryIndex)}
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
            <Input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
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
          </>
        ) : (
          <>
            <h2>{categoryIndex.category}</h2>
            <p>{categoriesList[currentIndex].opisKategorije}</p>
            <Button type="primary" style={{ marginTop: "1rem", marginRight: '1rem' }} onClick={handleEditClick}>
              Uredi
            </Button>
            <Button danger style={{ marginTop: "1rem" }} onClick={handleEditClick}>
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
      />
    </div>
  );
};

export default CategoryBox;
