import React, { useEffect, useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Department } from '../../types';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key?: React.Key;
  department_name: string,
  superior_id: number | null,
  nivel: number,
  employees_quantity: number,
  ambassador_name: string
}

const columns: TableColumnsType<DataType> = [
  { title: 'Division', dataIndex: 'department_name' },
  { title: 'Division Superior', dataIndex: 'superior_id' },
  { title: 'Colaboradores', dataIndex: 'employees_quantity' },
  { title: 'Nivel', dataIndex: 'nivel' },
  { title: 'Embajadores', dataIndex: 'ambassador_name' },
];

const dataSource = Array.from<DataType>({ length: 46 }).map<DataType>((_, i) => ({
  key: i,
  department_name: `Department ${i}`,
  superior_id: i % 2 === 0 ? i : null,
  nivel: i % 3,
  employees_quantity: i * 2,
  ambassador_name: `Ambassador ${i}`,
}));


const TableComponent = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Department[]>([]);

  useEffect(() => {
    start();
  }, []);

  function start() {  
    setLoading(true);
    // ajax request after empty completing
    //setTimeout(() => {
    //  setSelectedRowKeys([]);
    //  setLoading(false);
    //}, 1000);
    //add property key in department
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
      <Table<DataType> rowSelection={rowSelection} columns={columns} dataSource={data.length == 0 && loading == false ? dataSource : data} />
    </Flex>
  );
};

export default TableComponent;