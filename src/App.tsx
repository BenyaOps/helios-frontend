
import './App.css'
import TableComponent from './components/home/Table'
import Navbar from './components/shared/Navbar'



function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
  <div className='container'>
    <Navbar />
    <h1>HOme</h1>
    <TableComponent />
  </div>
    </>
  )
}

export default App
