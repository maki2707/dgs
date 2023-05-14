/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState,useCallback } from 'react';
import {  Table,  Button, Input } from 'antd';
import type { ColumnsType,  } from 'antd/es/table';
import { CategoryContext } from '../context/categoryContext';
import { proizvođačiList, useGetPublishers } from "../hooks/Publisher/useGetPublishers";
import DeleteModal from '../components/modals/Publisher/DeletePublisherModal';
import EditPublisherModal from '../components/modals/Publisher/EditPublisherModal';
import AddPublisherModal from '../components/modals/Publisher/AddPublisherModal';
import { Proizvođač } from '../types/Publisher';

const Publishers: React.FC = () => {

    const publisherColumns: ColumnsType<Proizvođač> = [
      {
        title: 'ID',
        key: 'id',
        dataIndex: 'id',
      },
        {
          title: <span className='categoriesTable-title'>Naziv proizvođača</span>,
          dataIndex: 'nazivProizvođača',
          key: 'nazivProizvođača',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.nazivProizvođača.localeCompare(b.nazivProizvođača),
        },
        {
          title: <span className='categoriesTable-title'>Godina osnutka</span>,
          dataIndex: 'godOsnutka',
          key: 'godOsnutka',
        },
        {
          title: <span className='categoriesTable-title'>Akcije</span>,
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
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [publisherToDelete, setPublisherToDelete] = useState<Proizvođač | null>(null);
    const [publisherToEdit, setPublisherToEdit] = useState<Proizvođač | null>(null);
    const hideDeleteModal = useCallback(() => {setPublisherToDelete(null);setDeleteModalVisible(false);}, []);
    const showDeleteModal = useCallback((publisher: Proizvođač) => {setPublisherToDelete(publisher);setDeleteModalVisible(true);}, []);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {setSearchText(e.target.value);}; 
    const filteredPublishers = proizvođačiList.proizvođači.filter((p) => {return p.nazivProizvođača.toLowerCase().includes(searchText.toLowerCase());});
    const showEditModal = useCallback((publisher: Proizvođač) => {setPublisherToEdit(publisher);setEditModalVisible(true);}, []);
    const showAddModal = useCallback(() => {setAddModalVisible(true);}, []);
    const hideAddModal = useCallback(() => {setAddModalVisible(false);}, []);
    const {data, isLoading} = useGetPublishers() //fali BE
    return (
        <div className='categoriesTable'> 
            <div className='categoriesTable-header'>
                <Input
                    className='categoriesTable-searchBar'
                    placeholder='Pretraži proizvođače'
                    value={searchText}
                    onChange={handleSearch}
                    style={{width: '25%'}}
                />
                <Button type="primary" className='categoriesTable-addButton' onClick={()=> showAddModal()}>
                    Dodaj novog proizvođača
                </Button>
            </div>
            <Table
                columns={publisherColumns}
                dataSource={filteredPublishers} 
                className='publisherTable' 
                rowClassName='publisherTable-row' 
                rowKey='nazivKategorije' 
                size='small'
            />
           <DeleteModal visible={deleteModalVisible} onCancel={hideDeleteModal} publisher={publisherToDelete}            />
           <EditPublisherModal visible={editModalVisible} publisher={publisherToEdit} onConfirm={(publisher) => console.log('Potvrda uređivanja', publisher)} 
                                onCancel={() => setEditModalVisible(false)}/>
            <AddPublisherModal visible={addModalVisible}  onCancel={hideAddModal}/>
        </div>
    );
};

export default Publishers;
