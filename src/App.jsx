import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Search from './pages/Search'
import NavBar from './pages/Navbar'
import CustomTheme from './theme/CustomTheme'
import Book from './pages/Book'

function App() {

  return (
    <CustomTheme>
      <main style={{ display: 'flex', flexGrow: 1, flexDirection: 'column'}} >
        <Container sx={{ bgcolor: 'background.default', display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 0 }}>
            <BrowserRouter basename='/'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/search' element={<Search />} />
                <Route path='/book' element={<Book />} />
              </Routes>
              <NavBar></NavBar>
            </BrowserRouter>
        </Container>
      </main>
    </CustomTheme>
  )
}

export default App
