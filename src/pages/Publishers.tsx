/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState,useCallback } from 'react';
import { Table, Button, Input } from 'antd';
import type { ColumnsType, } from 'antd/es/table';
import { CategoryContext } from '../context/categoryContext';
import DeleteModal from '../components/modals/Publisher/DeletePublisherModal';
import EditPublisherModal from '../components/modals/Publisher/EditPublisherModal';
import AddPublisherModal from '../components/modals/Publisher/AddPublisherModal';
import { Proizvođač } from '../types/Publisher';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetPublishers } from '../hooks/Publisher/useGetPublishers';
import useSearchPublishers from '../hooks/Publisher/useSearchPublishers';
import queryClient from '../util/queryClients';
import { getPublisherColumns } from './columns/PublisherColumns';


const Publishers: React.FC = () => {

const [searchText, setSearchText] = useState<string>('');
  const { data: searchResults, isLoading: isSearchLoading } = useSearchPublishers(searchText);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [publisherToDelete, setPublisherToDelete] = useState<Proizvođač | null>(null);
    const [publisherToEdit, setPublisherToEdit] = useState<Proizvođač | null>(null);
      const hideDeleteModal = useCallback(() => {setPublisherToDelete(null);setDeleteModalVisible(false);}, []);
      const showDeleteModal = useCallback((publisher: Proizvođač) =>
      {setPublisherToDelete(publisher);setDeleteModalVisible(true);}, []);
      const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        if(searchText.length > 2){
          queryClient.invalidateQueries('categoriesDataSearch')
        }
      }; 
        const showEditModal = useCallback((publisher: Proizvođač) =>
        {setPublisherToEdit(publisher);setEditModalVisible(true);}, []);
        const showAddModal = useCallback(() => {setAddModalVisible(true);}, []);
        const hideAddModal = useCallback(() => {setAddModalVisible(false);}, []);
        const {data, isLoading} = useGetPublishers()
        const filteredPublishers = searchResults ? searchResults : data ;
        const publisherColumns = getPublisherColumns({
        showEditModal,
        showDeleteModal,
        });
        return (
        <div className='categoriesTable' data-testid="publisherTable">
          <div className='categoriesTable-header'>
            <Input className='categoriesTable-searchBar' placeholder='Pretraži proizvođače' value={searchText}
              onChange={handleSearch} style={{width: '25%'}} />
            <Button type="primary" className='categoriesTable-addButton' onClick={()=> showAddModal()}>
              Dodaj novog proizvođača
            </Button>
          </div>
          <Table columns={publisherColumns} dataSource={filteredPublishers} className='publisherTable'
            rowClassName='publisherTable-row' rowKey='idProizvodac' size='small' pagination={{
                hideOnSinglePage: true,
              }} />

          <DeleteModal visible={deleteModalVisible} onCancel={hideDeleteModal} publisher={publisherToDelete} />
          <EditPublisherModal visible={editModalVisible} publisher={publisherToEdit} onConfirm={(publisher)=>
            console.log('Potvrda uređivanja', publisher)}
            onCancel={() => setEditModalVisible(false)}
            setPublisherToEdit={(publisher) => setPublisherToEdit(publisher)}
            />
            <AddPublisherModal visible={addModalVisible} onCancel={hideAddModal} />
        </div>
        );
        };

        export default Publishers;