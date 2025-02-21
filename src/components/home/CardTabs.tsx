import { useState } from 'react';
//import { Card } from 'antd';


import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import ContentTab1 from './ContentTab1';





const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Divisiones',
    children: <ContentTab1 />,
  },
  {
    key: '2',
    label: 'Colaboradores',
    children: <p>content2</p>,
  },
];


const CardTabs = () => {

  const [activeTabKey1, setActiveTabKey1] = useState<string>('1');

  const onChange = (key: string) => {
    console.log(key);
    setActiveTabKey1(key);
  };



  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={activeTabKey1} 
      items={items} onChange={onChange} 
      style={{ width: '100%' }}
      />
    </>
  )
}

export default CardTabs