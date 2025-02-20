
import './App.css'
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
    
    <h1>HOme</h1>
    <CardTabs />  
  </div>
    </>
  )
}

export default App
