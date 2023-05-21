/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Table, Button, Input } from 'antd';
import { TableProps } from 'antd/lib/table';
import { CategoryContext } from '../context/categoryContext';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from '../components/modals/Category/AddCategoryModal';
import { Kategorija } from '../types/Category';
import { categoryColumns } from './columns/CategoryColumns';
import useGetCategories from '../hooks/Category/useGetCategories';
import useSearchCategories from '../hooks/Category/useSearchCategory';
import queryClient from '../util/queryClients';

const Categories: React.FC = () => {
  const { category, setCategory } = useContext(CategoryContext);
  const [searchText, setSearchText] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useGetCategories();
  const { data: searchResults, isLoading: isSearchLoading } = useSearchCategories(searchText);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (searchText.length > 2) {
      queryClient.invalidateQueries('categoriesDataSearch');
    }
  };
  const navigate = useNavigate();

  const filteredCategories = searchResults ? searchResults : data;
  const handleClickRow = (record: Kategorija, index: number) => {
    setCategory(record);
    navigate(`/${record.nazivKategorije}`);
  };

  const rowProps: TableProps<Kategorija>['onRow'] = (record, index) => {
    return {
      onClick: () => handleClickRow(record, index!),
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
          style={{ width: '25%' }}
          minLength={3}
        />
        <Button type="primary" className='categoriesTable-addButton' onClick={() => setModalVisible(true)}>
          Dodaj novu kategoriju
        </Button>
      </div>
      <Table
        columns={categoryColumns}
        dataSource={filteredCategories}
        className='categoriesTable'
        rowClassName='categoriesTable-row'
        rowKey='nazivKategorije'
        onRow={rowProps}
      />
      <AddCategoryModal visible={modalVisible} onCancel={() => setModalVisible(false)} />
    </div>
  );
};

export default Categories;
