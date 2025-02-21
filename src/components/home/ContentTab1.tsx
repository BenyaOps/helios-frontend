import ButtonsTabs from './ButtonsTabs'
import Table2 from './Table2'
import FIlters from './FIlters'
import { useState } from 'react';

const ContentTab1 = () => {
    const [search, setSearch] = useState<string>('');
  return (
    <div >
        <div className='container_tab_header'>
            <ButtonsTabs />
            <FIlters setSearch={setSearch} />
        </div>
        <Table2 search={search} />
    </div>
  )
}

export default ContentTab1