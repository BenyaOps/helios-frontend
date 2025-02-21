
import { Radio } from 'antd';

import { useState } from 'react';


const ButtonsTabs = () => {
    const [size, setSize] = useState<string>('list');
  return (
    <div className='container_tab_buttons'>
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value="list">Listado</Radio.Button>
            <Radio.Button value="tree">Arbol</Radio.Button>
      </Radio.Group>
  </div>
  )
}

export default ButtonsTabs