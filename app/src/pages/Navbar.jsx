import { useNavigate } from 'react-router-dom'
import { AppBar, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'

function NavBar() {
  const navigate = useNavigate()

  return (
      <AppBar position='fixed' sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 5, paddingTop: 2, borderRadius: 4, bgcolor: 'primary.main', bottom: 0, height: 64, top: 'auto' }} >
        <IconButton aria-label='home' onClick={() => navigate('/')} sx={{ padding: 0 }} >
            <HomeIcon sx={{ fontSize: 38, color: 'black' }} />
        </IconButton>
        <IconButton aria-label='search' onClick={() => navigate('/search')} sx={{ padding: 0 }} >
            <SearchIcon sx={{ fontSize: 38, color: 'black' }} />
        </IconButton>
        <IconButton aria-label='settings' onClick={() => navigate('/settings')} sx={{ padding: 0 }} >
            <SettingsIcon sx={{ fontSize: 38, color: 'black' }} />
        </IconButton>
      </AppBar>
  )
}

export default NavBar
