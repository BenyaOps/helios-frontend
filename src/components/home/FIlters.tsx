import { Select } from 'antd';
import React from 'react'
import { Input } from 'antd';
import type { GetProps } from 'antd';


type OptionProps = {
    value: string;
    label: string;
    disabled?: boolean;
};
type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const FIlters = () => {
    const [options, setOptions] = React.useState<OptionProps[]>([]);
    React.useEffect(() => {
        setOptions([
            {value: '', label: 'Columnas'},
            { value: 'department_name', label: 'Division' },
            { value: 'superior_name', label: 'Division Superior' },
            { value: 'employees_quantity', label: 'Colaboradores' },
            { value: 'nivel', label: 'Nivel' },
            { value: 'sub_departments_count', label: 'Sub Divisiones' },
            { value: 'ambassador_name', label: 'Embajadores' },
        ]);
    }, []);

    const handleChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
      };
     
      const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className='container_filters'>
        <div>
            <Select
            defaultValue=""
            style={{ width: 120, color: '#ccc' }}
            onChange={handleChangeSelect}
            options={options}
            />
        </div>
        <div>
            <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
        </div>
    </div>
  )
}

export default FIlters