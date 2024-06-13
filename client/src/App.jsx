import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AddNotes from './pages/AddNotes'
import EditNote from './pages/EditNotes'
import ViewNote from './pages/ViewNote'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/view-note/:id" element={<ViewNote />} />
        <Route path='/add-notes' element={<AddNotes />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
