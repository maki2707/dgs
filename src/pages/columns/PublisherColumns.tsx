import type { ColumnsType } from 'antd/es/table';
import { Button } from 'antd';
import { Proizvođač } from '../../types/Publisher';

interface PublisherColumnProps {
  showEditModal: (publisher: Proizvođač) => void;
  showDeleteModal: (publisher: Proizvođač) => void;
}

export const getPublisherColumns = ({
  showEditModal,
  showDeleteModal,
}: PublisherColumnProps): ColumnsType<Proizvođač> => [
  {
    title: 'ID',
    key: 'idProizvodac',
    dataIndex: 'idProizvodac',
  },
  {
    title: <span className='categoriesTable-title'>Naziv proizvođača</span>,
    dataIndex: 'nazivProizvodac',
    key: 'nazivProizvodac',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.nazivProizvodac.localeCompare(b.nazivProizvodac),
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
        <Button style={{ backgroundColor: 'yellow' }} onClick={() => showEditModal(record)}>
          Uredi
        </Button>
        <Button danger onClick={() => showDeleteModal(record)}>
          Obriši
        </Button>
      </div>
    ),
  },
];
