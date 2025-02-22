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
  sub_departments_count: number | any,
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
  search_name?: string;
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
  {title: 'Sub Divisiones', dataIndex: 'sub_departments_count', sorter: true, 
    render: (sub_departments_count) => <div className='row_sub_department'>{sub_departments_count} <button className='button_add_circle'>+</button> </div>
  },
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
type IProps = {
  search: string;
}
const getRandomuserParams = (params: TableParams) => ({
  ...params,
});

const Table2 = ({search}: IProps) => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({});
  const [totalEmployees, setTotalEmployees] = useState(0);
  //const [filtersColumn, setFiltersColumn] = useState<Filter[]>([]);
  const fetchData = () => {
    setLoading(true);
    const URL_API = import.meta.env.VITE_API_URL;
    if (search !== '') {
      fetch(`${URL_API}departments/list?${qs.stringify(getRandomuserParams(tableParams))}&search_name=${search}`)
      .then((res) => res.json())
      .then((data) => {
       // let total = data?.data?.total;
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
        setLoading(false);
      });
      return;
    }
    fetch(`${URL_API}departments/list?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then((data) => {
        const totalData = data?.data?.total;
        const totalEmployees = data?.data?.total_employee;
        return {
          departments: data?.data?.departments as Department[],
          total: totalData as number,
          totalEmployees: totalEmployees as number
        }
      })
      .then((departmentsObj) => {
        const newDepartments = departmentsObj.departments.map((department, index) => {
          return {
            ...department,
            key: `${index}${department.department_id}`,
          }
        })
        const totalRows = departmentsObj.total;
        setData(newDepartments);
        setTotalEmployees(departmentsObj.totalEmployees);
        setLoading(false);
        
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: totalRows == undefined ? 0 : totalRows,
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
    search
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
    console.log({tableParams, pagination, filters, sorter});
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
    <span className='total'>Total colaboradores: {totalEmployees}</span>
    </>
  );
};

export default Table2;