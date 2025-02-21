import ButtonsTabs from './ButtonsTabs'
import Table2 from './Table2'
import FIlters from './FIlters'

const ContentTab1 = () => {
  return (
    <div >
        <div className='container_tab_header'>
            <ButtonsTabs />
            <FIlters />
        </div>
        <Table2 />
    </div>
  )
}

export default ContentTab1