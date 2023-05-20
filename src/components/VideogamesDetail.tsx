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



const VideogamesDetail: React.FC = () => {
  const columns: ColumnsType<Videoigra> = [
    {
      title: 'Naziv videoigre',
      dataIndex: 'nazivVideoigre',
      key: 'nazivVideoigre',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.nazivVideoigre.localeCompare(b.nazivVideoigre),
    },
    {
      title: 'Cijena',
      dataIndex: 'cijenaVideoigre',
      key: 'cijenaVideoigre',
      sorter: (a, b) => a.cijenaVideoigre - b.cijenaVideoigre,
    },
    {
      title: 'Proizvođač',
      dataIndex: 'nazivProizvodac',
      key: 'nazivProizvodac',
      render: (nazivProizvodac: string) => <span>{nazivProizvodac}</span>,
    },
    {
      title: 'Minimalna konfiguracija',
      dataIndex: 'minHardver',
      key: 'minHardver',
      render: (minHardver: any) => (
        <span>
          Procesor: {minHardver.procesor}<br/>
          Grafička kartica: {minHardver.grafickaKartica}<br/>
          RAM: {minHardver.ram}<br/>
          Disk: {minHardver.disk}
        </span>
      ),
    },
    {
      title: 'Akcije',
      key: 'akcije',
      width: '20%',
      render: (text, record) => (
        <div className='actionColumn'>
          <Button style={{ backgroundColor: 'yellow' }} onClick={() => showEditModal(record)}>Uredi</Button>
          <Button danger onClick={() => showDeleteModal(record)}>Obriši</Button>
        </div>
      ),
    },
  ];
  const [searchText, setSearchText] = useState<string>('');
  const { category } = useContext(CategoryContext);
  const { data, isLoading, refetch } = useGetVideogames();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [videogameToDelete, setVideogameToDelete] = useState<Videoigra | null>(null);
  const [videogameToEdit, setVideogameToEdit] = useState<Videoigra | null>(null);
  const showDeleteModal = useCallback((videogame: Videoigra) => {setVideogameToDelete(videogame);setDeleteModalVisible(true);}, []);
  const showEditModal = useCallback((videogame: Videoigra) => {setVideogameToEdit(videogame);setEditModalVisible(true);}, []);
  const hideDeleteModal = () => {setDeleteModalVisible(false);setVideogameToDelete(null);refetch();};
  const [addModalVisible, setAddModalVisible] = useState(false);

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
      <div style={{ color: 'white' }}>{category.nazivKategorije}</div>
      <Table
        columns={columns}
        dataSource={data}
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
      <AddVideogameModal visible={addModalVisible} onCancel={() => {setAddModalVisible(false);refetch();}}/>
      <EditVideogameModal visible={editModalVisible} onCancel={() => {setEditModalVisible(false);refetch();}} videogame={videogameToEdit}/>
    </div>
  );
};

export default VideogamesDetail;
