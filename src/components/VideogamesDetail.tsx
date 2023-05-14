import React, { useContext, useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Input } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { CategoryContext } from '../context/categoryContext';
import useGetVideogame from '../hooks/Videogames/useGetVideogames';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './modals/Category/AddCategoryModal';

interface Proizvođač {
    nazivProizvođača: string;
    godOsnutka: string;
  }
  
interface Videoigra {
  nazivVideoigre: string;
  cijenaVideoigre: number;
  proizvođač: Proizvođač;
  minHardware: string;
}

const columns: ColumnsType<Videoigra> = [
  {
    title: <span className='categoriesTable-title'>Naziv videoigre</span>,
    dataIndex: 'nazivVideoigre',
    key: 'nazivVideoigre',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.nazivVideoigre.localeCompare(b.nazivVideoigre),
  },
  {
    title: <span className='categoriesTable-title'>Cijena</span>,
    dataIndex: 'cijenaVideoigre',
    key: 'cijenaVideoigre',
    sorter: (a, b) => a.cijenaVideoigre - b.cijenaVideoigre,
  },
  {
    title: <span className='categoriesTable-title'>Proizvođač</span>,
    dataIndex: 'proizvođač',
    key: 'proizvođač',
    render: (proizvođač: Proizvođač) => proizvođač.nazivProizvođača,
  },
  {
    title: <span className='categoriesTable-title'>Minimalna konfiguracija</span>,
    dataIndex: 'minHardware',
    key: 'minHardware',
  },
  {
    title: <span className='categoriesTable-title'>Akcije</span>,
    key: 'akcije',
    width: '20%',
    render: (text, record) => (
        <div className='actionColumn'>
          <Button style={{ backgroundColor: 'yellow' }} >Uredi</Button>
          <Button danger >Obriši</Button>
        </div>
      ),
    },
];

const VideogamesDetail: React.FC = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigate = useNavigate();
    const { categoryIndex, setCategoryIndex } = useContext(CategoryContext);
    const videogamesList = useGetVideogame(categoryIndex.category)

    
    return (
        <div className='videogamesBox'> 
            <div className='videogamesTable-header'>
                <Input
                    className='videogamesTable-searchBar'
                    placeholder='Pretraži videoigre'
                    value={searchText}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                    style={{width: '25%'}}
                />
            </div>
            <div style={{color:'white'}}>{categoryIndex.category}</div>
            <Table
                columns={columns} 
                dataSource={videogamesList} 
                className='videogamesTable' 
                rowClassName='videogamesTable-row' 
                rowKey='nazivVideoigre' 
           />
                   </div>
    );
};

export default VideogamesDetail;
