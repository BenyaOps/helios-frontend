import React, { useEffect, useState } from 'react';
import { DownloadOutlined, PlusOutlined, UploadOutlined, } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

const ButtonsTItle = () => {
    const [size, setSize] = useState<SizeType>(); // default is 'middle'
    useEffect(() => {
      setSize('middle');
    }, []);
    return (

    <div>
        <Flex gap="small" wrap>
                <Button type="primary" icon={<DownloadOutlined />} size={size} />
                <Button type="primary" icon={<UploadOutlined />} size={size} />
                <Button type="primary" icon={<PlusOutlined />} size={size} />
        </Flex>
    </div>
  )
}

export default ButtonsTItle