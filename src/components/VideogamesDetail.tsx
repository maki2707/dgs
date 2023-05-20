import React, { useContext, useState } from 'react';
import { Space, Table, Tag, Button, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CategoryContext } from '../context/categoryContext';
import useGetVideogame, { useGetVideogames } from '../hooks/Videogames/useGetVideogames';
import { Proizvođač } from '../types/Publisher';
import { Videoigra } from '../types/Videogame';

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
    dataIndex: 'idProizvodac',
    key: 'idProizvodac',
    render: (proizvodac: Proizvođač) => proizvodac.idProizvodac,
  },
  {
    title: 'Minimalna konfiguracija',
    dataIndex: 'minHardver',
    key: 'minHardver',
  },
  {
    title: 'Akcije',
    key: 'akcije',
    width: '20%',
    render: (text, record) => (
      <div className='actionColumn'>
        <Button style={{ backgroundColor: 'yellow' }}>Uredi</Button>
        <Button danger>Obriši</Button>
      </div>
    ),
  },
];

const VideogamesDetail: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const { category } = useContext(CategoryContext);
  const {data, isLoading} = useGetVideogames(category.idKategorija)
  return (
    <div className='videogamesBox'>
      <div className='videogamesTable-header'>
        <Input
          className='videogamesTable-searchBar'
          placeholder='Pretraži videoigre'
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchText(e.target.value)
          }
          style={{ width: '25%' }}
        />
      </div>
      <div style={{ color: 'white' }}>{category.nazivKategorije}</div>
      <Table
        columns={columns}
        dataSource={data}
        className='videogamesTable'
        rowClassName='videogamesTable-row'
        rowKey='idVideoigre'
      />
    </div>
  );
};

export default VideogamesDetail;
