import { ColumnsType } from "antd/lib/table";
import { Kategorija } from "../../types/Category";

export const categoryColumns: ColumnsType<Kategorija> = [
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
      dataIndex: 'nazivAdmin',
      key: 'nazivAdmin',
    },
  ];