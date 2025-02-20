import React, { useEffect, useRef, useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { InputRef, TableColumnsType, TableProps, TableColumnType } from 'antd';
import { Department } from '../../types';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import type { FilterDropdownProps } from 'antd/es/table/interface';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key?: React.Key;
  department_id: number,
  department_name: string,
  superior_id: number | null,
  nivel: number,
  employees_quantity: number,
  ambassador_name: string
}



type DataIndex = keyof DataType;


const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  department_id: i,
  department_name: `Department ${i}`,
  superior_id: i % 2 === 0 ? i : null,
  nivel: i % 3,
  employees_quantity: i * 2,
  ambassador_name: `Ambassador ${i}`,
}));

/*const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
*/

const TableComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Department[]>([]);
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    start();
  }, []);

  function start() {  
    setLoading(true);
    // ajax request after empty completing
    fetch('http://127.0.0.1:5000/api/departments/list')
      .then((response) => response.json())
      .then((data) => data?.data?.departments as Department[])
      .then((departments) => {
        const newDepartments = departments.map((department, index) => {
          return {
            ...department,
            key: `${index}${department.department_id}`
          }
        })
        setData(newDepartments);
        console.log(newDepartments);
        
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setSelectedRowKeys([]);
        setLoading(false);
      });
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      !!record && !!record[dataIndex] && record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Division', dataIndex: 'department_name',
      ...getColumnSearchProps('department_name'), sorter: true },
    { title: 'Division Superior', dataIndex: 'superior_id' },
    { title: 'Colaboradores', dataIndex: 'employees_quantity' },
    { title: 'Nivel', dataIndex: 'nivel' },
    { title: 'Embajadores', dataIndex: 'ambassador_name' },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<DataType> 
      rowSelection={rowSelection} 
      columns={columns} 
      dataSource={data.length == 0 && loading == false ? dataSource : data} 
      />
    </Flex>
  );
};

export default TableComponent;