import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Table } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import qs from 'qs';
import { Department } from '../../types';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
/*type Filter = {
  text: string;
  value: string;
  children?: Filter[];
}*/
interface DataType {
  key?: React.Key;
  department_id: number,
  department_name: string,
  superior_id: number | null,
  nivel: number,
  employees_quantity: number,
  ambassador_name: string,
  sub_departments_count: number,
  superior_name: string
}

interface TableParams {
  pagination?: TablePaginationConfig;
  item_to_page?: number;
  page ?: number;
  order_column ?: string | null | SorterResult<any>['field'];
  order?: string | null | SorterResult<any>['order'];
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Division',
    dataIndex: 'department_name',
    sorter: true,
    //render: (name) => `${name.first} ${name.last}`,
    
    width: '20%',

  },
  { title: 'Division Superior', dataIndex: 'superior_name', sorter: true },
  { title: 'Colaboradores', dataIndex: 'employees_quantity' , sorter: true},
  { title: 'Nivel', dataIndex: 'nivel', sorter: true },
  {title: 'Sub Divisiones', dataIndex: 'sub_departments_count', sorter: true},
  { title: 'Embajadores', dataIndex: 'ambassador_name' },
  /*{
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  }*/
];

const getRandomuserParams = (params: TableParams) => ({
  ...params,
});

const Table2: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({});
  //const [filtersColumn, setFiltersColumn] = useState<Filter[]>([]);
  const [totalRows, setTotalRows] = useState<number | string>(0);
  const fetchData = () => {
    setLoading(true);
    fetch(`http://127.0.0.1:5000/api/departments/list?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then((data) => {
        const total = data?.data?.total_employee;
        setTotalRows(total);
        return data?.data?.departments as Department[];
      })
      .then((departments) => {
        const newDepartments = departments.map((department, index) => {
          return {
            ...department,
            key: `${index}${department.department_id}`
          }
        })
        setData(newDepartments);
        console.log({newDepartments});
        setLoading(false);
        console.log('fetchData');
        
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 40,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(fetchData, [
    tableParams.page,
    tableParams.item_to_page,
    tableParams.order_column,
    tableParams.order,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    let valueOrder = undefined;
    let valueOrderColumn = undefined;
    if(!Array.isArray(sorter)){
      if(sorter.order === 'ascend'){
        valueOrder = 'asc';
      }else if(sorter.order === 'descend'){
        valueOrder = 'desc';
      }
      valueOrderColumn = sorter.field;
    }
    setTableParams({
      page: pagination.current,
      item_to_page: pagination.pageSize,
      //filters,
      //order: Array.isArray(sorter) ? undefined :  sorter.order,
      order: valueOrder,
      //order_column : Array.isArray(sorter) ? undefined : sorter.field,
      order_column : valueOrderColumn,
    });
    console.log('handleTableChange');
    console.log(tableParams);
    console.log(pagination);
    console.log(filters);
    console.log(sorter);
    console.log('-------');
    
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
    <Table<DataType>
      columns={columns}
      rowKey={(record) => record.department_id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
    <span>Total colaboradores: {totalRows}</span>
    </>
  );
};

export default Table2;