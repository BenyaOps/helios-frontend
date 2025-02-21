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
type IProps = {
    search?: string;
    setSearch: (value: string) => void;
};
const { Search } = Input;

const FIlters = ({setSearch}: IProps) => {
    const [options, setOptions] = React.useState<OptionProps[]>([]);
    const [optionValue, setOptionValue] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        setOptions([
            {value: '', label: 'Columnas'},
            {value: 'name', label: 'Division'},
        ]);
    }, []);

    const handleChangeSelect = (value: string) => {
        console.log(`selected ${value}`);
        setOptionValue(value);
      };
     
      const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        console.log(info?.source, value);
        console.log({optionValue});
        try {
            if (optionValue == undefined || optionValue == '') {
                throw new Error('Debes seleccionar una columna y agregar un texto a buscar');
            }
            console.log('Buscando en la columna: ', optionValue);
            setSearch(value);

        } catch (error : any) {
            console.error(error.message);
        }
        
      };

      const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        console.log(value.length);
        
        };
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
            <Search placeholder="input search text" onChange={e => handleChangeInput(e)} onSearch={onSearch} style={{ width: 200 }} />
        </div>
    </div>
  )
}

export default FIlters