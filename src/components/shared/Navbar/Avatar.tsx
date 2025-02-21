import React from 'react';
import { UserOutlined, SmileOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';


const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

const AvatarComponent: React.FC = () => (
  <Space direction="vertical" size={16}>

    <Dropdown menu={{ items }}>
    <a onClick={(e) => e.preventDefault()}>
     
      <Space wrap size={16} className='container_avatar'>
      <Avatar size={48} icon={<UserOutlined />} />
      <p>Administrador</p>
      <DownOutlined />
    </Space>
      
    </a>
  </Dropdown>
  </Space>
);

export default AvatarComponent;