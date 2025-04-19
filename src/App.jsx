
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'

function App() {

  return (
    <>
    <h1>This is app </h1>
    <main>
      <Routes>
          <Route path='./home' element={<Home/>}/>
      </Routes>
      {/* <Header/>
      <Home/> */}
    </main>
    </>
  )
}

export default App
