import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const AvatarComponent: React.FC = () => (
  <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size={48} icon={<UserOutlined />} />
      <p>Administrador</p>
    </Space>
  </Space>
);

export default AvatarComponent;