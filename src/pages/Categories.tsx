import React, { useContext, useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Input } from 'antd';
import { ColumnsType, TableProps } from 'antd/lib/table';
import { CategoryContext } from '../context/categoryContext';
import { categoriesList } from "../hooks/Category/useGetCategories";
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../components/modals/Category/AddCategoryModal';
import { Kategorija } from '../types/Category';

const columns: ColumnsType<Kategorija> = [
  {
    title: <span className='categoriesTable-title'>Naziv kategorije</span>,
    dataIndex: 'nazivKategorije',
    key: 'nazivKategorije',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.nazivKategorije.localeCompare(b.nazivKategorije),
  },
  {
    title: <span className='categoriesTable-title'>Opis kategorije</span>,
    dataIndex: 'opisKategorije',
    key: 'opisKategorije',
  },
  {
    title: <span className='categoriesTable-title'>Administrator</span>,
    dataIndex: 'admin',
    key: 'admin',
  },
];

const Categories: React.FC = () => {
    const { categoryIndex, setCategoryIndex } = useContext(CategoryContext);
    const [searchText, setSearchText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const navigate = useNavigate();
    
    const filteredCategories = categoriesList.filter((category) => {
        return category.nazivKategorije.toLowerCase().includes(searchText.toLowerCase());
    });
    
    const handleClickRow = (record: Kategorija, index: number ) => {
        setCategoryIndex({category: record.nazivKategorije, index: index})
        navigate(`/${record.nazivKategorije}`);
        
    };
    
    const rowProps: TableProps<Kategorija>['onRow'] = (record, index) => {
        return {
            onClick: () => handleClickRow(record, index!)
        };
    };

    
    return (
        <div className='categoriesTable' id="categories-table"> 
            <div className='categoriesTable-header'>
                <Input
                    className='categoriesTable-searchBar'
                    placeholder='Pretraži kategorije'
                    value={searchText}
                    onChange={handleSearch}
                    style={{width: '25%'}}
                />
                <Button type="primary" className='categoriesTable-addButton' onClick={() => setModalVisible(true)}>
                    Dodaj novu kategoriju
                </Button>
            </div>
            <Table
                columns={columns} 
                dataSource={filteredCategories} 
                className='categoriesTable' 
                rowClassName='categoriesTable-row' 
                rowKey='nazivKategorije' 
                onRow={rowProps}
            />
           <AddCategoryModal visible={modalVisible} onCancel={() => setModalVisible(false)}  />


        </div>
    );
};

export default Categories;
