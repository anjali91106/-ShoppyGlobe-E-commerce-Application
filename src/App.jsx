
import { Outlet} from 'react-router-dom'
import './App.css'
import Header from './Components/Header'

function App() {

  return (
    <>
    <h1>This is app </h1>
    <main>
      <Header/>
      <Outlet/>
    </main>
    </>
  )
}

export default App
