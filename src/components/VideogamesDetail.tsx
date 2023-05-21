import React, { useCallback, useContext, useState } from 'react';
import { Space, Table, Tag, Button, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CategoryContext } from '../context/categoryContext';
import { useGetVideogames } from '../hooks/Videogames/useGetVideogames';
import { Videoigra } from '../types/Videogame';
import DeleteVideogameModal from './modals/Videogame/DeleteVideogameModal';
import AddVideogameModal from './modals/Videogame/AddVideogameModal';
import queryClient from '../util/queryClients';
import EditVideogameModal from './modals/Videogame/EditVideoGameModal';
import { getVideogameColumns } from '../pages/columns/VideogameColumns';
import useSearchVideogame from '../hooks/Videogames/useSearchVideogame';

const VideogamesDetail: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { category } = useContext(CategoryContext);
  const { data, isLoading, refetch } = useGetVideogames();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [videogameToDelete, setVideogameToDelete] = useState<Videoigra | null>(null);
  const [videogameToEdit, setVideogameToEdit] = useState<Videoigra | null>(null);
  const { data: searchResults, isLoading: isSearchLoading } = useSearchVideogame(searchText);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if(searchText.length > 2){
      queryClient.invalidateQueries('videogamesDataSearch')
    }
  }; 
  const showDeleteModal = useCallback((videogame: Videoigra) => {
    setVideogameToDelete(videogame);
    setDeleteModalVisible(true);
  }, []);

  const showEditModal = useCallback((videogame: Videoigra) => {
    setVideogameToEdit(videogame);
    setEditModalVisible(true);
  }, []);

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setVideogameToDelete(null);
    refetch();
  };

  const [addModalVisible, setAddModalVisible] = useState(false);
  const columns = getVideogameColumns({
    showEditModal,
    showDeleteModal,
  });
  const filteredVideogames = searchResults ? searchResults : data ;
  return (
    <div className='videogamesBox'>
      <div className='videogamesTable-header'>
        <Input
          className='videogamesTable-searchBar'
          placeholder='Pretraži videoigre'
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
          style={{ width: '25%' }}
        />
        <Button type="primary" className='categoriesTable-addButton' onClick={() => setAddModalVisible(true)}>
          Dodaj novu videoigru
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredVideogames}
        loading={isLoading}
        className='videogamesTable'
        rowClassName='videogamesTable-row'
        rowKey='idVideoigre'
      />
      <DeleteVideogameModal
        visible={deleteModalVisible}
        onCancel={hideDeleteModal}
        videogame={videogameToDelete}
      />
      <AddVideogameModal visible={addModalVisible} onCancel={() => { setAddModalVisible(false); refetch(); }} />
      <EditVideogameModal visible={editModalVisible} onCancel={() => { setEditModalVisible(false); refetch(); }} videogame={videogameToEdit} />
    </div>
  );
};

export default VideogamesDetail;
