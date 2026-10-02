import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Paper from '@mui/material/Paper'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import SearchIcon from '@mui/icons-material/Search'

function NavBar() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const [path, setPath] = useState(0)
  const [language, setLanguage] = useState('')

  const routes = {
    0: '/',     
    1: '/search',      
    2: '/settings',    
  }

  useEffect(() => {
    async function init() {
      const l = await get('language')
      i18n.changeLanguage(l)
      setLanguage(l)
    }

    init()
  }, [])

  return (
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.default' }} elevation={3}>
        <BottomNavigation
          showLabels
          value={path}
          onChange={(event, value) => {
            setPath(value)
            navigate(routes[value])
          }}
        >
          <BottomNavigationAction label={t('home')} icon={<HomeIcon />} />
          <BottomNavigationAction label={t('search')} icon={<SearchIcon />} />
          <BottomNavigationAction label={t('settings')} icon={<SettingsIcon />} />
        </BottomNavigation>
     </Paper>
  )
}

export default NavBar
