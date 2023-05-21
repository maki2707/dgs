import React from 'react';
import { Videoigra } from '../../types/Videogame';
import { Button } from 'antd';
import { ColumnsType } from 'antd/lib/table';

interface VideogameColumnsProps {
  showEditModal: (videogame: Videoigra) => void;
  showDeleteModal: (videogame: Videoigra) => void;
}

export const getVideogameColumns = ({ showEditModal, showDeleteModal }: VideogameColumnsProps): ColumnsType<Videoigra> => [
  {
    title: 'Naziv videoigre',
    dataIndex: 'nazivVideoigre',
    key: 'nazivVideoigre',
    defaultSortOrder: 'ascend',
    sorter: (a: Videoigra, b: Videoigra) => a.nazivVideoigre.localeCompare(b.nazivVideoigre),
  },
  {
    title: 'Cijena',
    dataIndex: 'cijenaVideoigre',
    key: 'cijenaVideoigre',
    sorter: (a: Videoigra, b: Videoigra) => a.cijenaVideoigre - b.cijenaVideoigre,
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
        Grafička kartica: {minHardver.grafickaKartica}<br/>a
        RAM: {minHardver.ram}<br/>
        Disk: {minHardver.disk}
      </span>
    ),
  },
  {
    title: 'Akcije',
    key: 'akcije',
    width: '20%',
    render: (text: any, record: Videoigra) => (
      <div className='actionColumn'>
        <Button style={{ backgroundColor: 'yellow' }} onClick={() => showEditModal(record)}>Uredi</Button>
        <Button danger onClick={() => showDeleteModal(record)}>Obriši</Button>
      </div>
    ),
  },
];
