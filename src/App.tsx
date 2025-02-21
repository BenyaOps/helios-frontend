
import './App.css'
import ButtonsTItle from './components/home/ButtonsTItle'
//import ButtonsTItle from './components/home/ButtonsTItle'
import CardTabs from './components/home/CardTabs'
//import TableComponent from './components/home/Table'
//import Table2 from './components/home/Table2'
import Navbar from './components/shared/Navbar'



function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
  <div className='container'>
    <h2 className='title_home'>Organizacion</h2>
    <ButtonsTItle />
    <br />
    <CardTabs />  
  </div>
    </>
  )
}

export default App
