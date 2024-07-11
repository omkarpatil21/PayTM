import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { DashBoard } from './components/Dashboard'
import { Send } from './components/Send'
function App() {

  return (
    <div className='p-10'>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/signin" element={<Signin/>}></Route>
            <Route path="/dashboard" element={<DashBoard/>}></Route>
            <Route path="/send" element={<Send/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
