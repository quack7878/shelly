import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Container from '@mui/material/Container'
import Home from './pages/Home'
import Settings from './pages/Settings'
import Search from './pages/Search'
import NavBar from './pages/Navbar'
import List from './pages/List'
import Books from './pages/Books'
import CustomTheme from './theme/CustomTheme'
import BookPage from './pages/Book'

function App() {

  return (
    <CustomTheme>
      <main style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100dvh' }} >
        <Container 
          sx={{ 
            bgcolor: 'background.default',
            display: 'flex',
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            flexDirection: 'column',
            padding: 0 
          }}
      >
            <BrowserRouter basename='/'>
              <Container sx={{ bgcolor: 'background.default', display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 0, flexWrap: 'nowrap', overflowX: 'hidden', overflowY: 'auto' }}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/search' element={<Search />} />
                  <Route path='/book' element={<BookPage />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/Books' element={<Books />} />
                </Routes>
              </Container>
              <NavBar></NavBar>
            </BrowserRouter>
        </Container>
      </main>
    </CustomTheme>
  )
}

export default App
