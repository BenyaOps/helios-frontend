import React, { useState } from 'react';
import { Card } from 'antd';
import Table2 from './Table2';


const tabList = [
  {
    key: 'tab1',
    tab: 'Divisiones',
  },
  {
    key: 'tab2',
    tab: 'Colaboradores',
  },
];


const contentList: Record<string, React.ReactNode> = {
  tab1: <Table2 />,
  tab2: <p>content2</p>,
};

const CardTabs = () => {

  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');


  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };


  return (
    <>
      <Card
        style={{ width: '100%' }}
        title="Card title"
        extra={<a href="#">More</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  )
}

export default CardTabs