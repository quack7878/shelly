import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../theme/CustomTheme' 
import { useColorScheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { save, get } from '../services/preferences'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import SunnyIcon from '@mui/icons-material/Sunny'
import BedtimeIcon from '@mui/icons-material/Bedtime'

import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

function Settings() {

  const { t, i18n } = useTranslation()
  const { tint, setTint } = useContext(ThemeContext)
  const { mode, setMode } = useColorScheme()
  const [ api, setApi ] = useState('openlibrary')
  const [ googlekey, setGooglekey ] = useState('')

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
      setTint(await get('tint'))
      setMode(await get('mode'))
      setApi(await get('api'))
      setGooglekey(await get('google_key'))
    }

    init()
  }, [])

  const changeTint = (event) => {
    setTint(event.target.value)
  }

  const changeMode = () => {
    setMode(mode == 'dark' ? 'light' : 'dark')
  }

  const changeLanguage = (event) => {
    save('language', event.target.value)
    i18n.changeLanguage(event.target.value)
  }

  const changeApi = (event) => {
    setApi(event.target.value)
    save('api', event.target.value)
  }

  const changeGooglekey = (event) => {
    event.preventDefault()

    const trimmedKey = googlekey.trim()

    if (!trimmedKey) {
      return
    }

    save('google_key', trimmedKey)
  }

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 24, gap: 16 }}>
      <div style={{ display: 'flex', gap: 4 }}>

        <FormControl sx={{ flexGrow: 1 }}>
          <InputLabel id='select-tint-label'>
            {t('tint')}
          </InputLabel>
          <Select
            labelId='select-tint'
            label={t('tint')}
            id='select-tint-label'
            value={tint ?? 'GREEN'}
            onChange={changeTint}
            style = {{ flexGrow: 1 }}
          >
            <MenuItem value={'PINK'}>{t('pink')}</MenuItem>
            <MenuItem value={'GREEN'}>{t('green')}</MenuItem>
          </Select>
        </FormControl>

        <IconButton aria-label='mode' onClick={changeMode} sx={{ padding: 0 }} >
            {
              mode == 'dark' ?
                <BedtimeIcon sx={{ fontSize: 38, color: 'white' }} />
              :
                <SunnyIcon sx={{ fontSize: 38, color: 'black' }} />
            }
        </IconButton>
      </div>

        <FormControl>
          <InputLabel id='select-language-label'>
            {t('language')}
          </InputLabel>
          <Select
            labelId='select-language-label'
            id='select-language'
            label={t('select-language-label')}
            value={i18n.language}
            onChange={changeLanguage}
          >
            <MenuItem value={'fr'}>{t('french')}</MenuItem>
            <MenuItem value={'en'}>{t('english')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id='select-api-label'>
            Api
          </InputLabel>
          <Select
            labelId='select-api-label'
            id='select-api'
            label='Api'
            value={api ?? 'openlibrary'}
            onChange={changeApi}
          >
            <MenuItem value={'openlibrary'}>OpenLibrary</MenuItem>
            <MenuItem value={'googlebooks'}>Google Books</MenuItem>
          </Select>
        </FormControl>

        <Box
          component='form'
          onSubmit={changeGooglekey}
          sx={{
            display: 'flex',
            gap: 1.5,
            mb: 4,
            maxWidth: 800,
          }}
        >
          <TextField
            fullWidth
            value={googlekey}
            onChange={(event) => setGooglekey(event.target.value)}
            label={t('googlekey')}
            variant='outlined'
            type='password'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
        />

          <Button
            type="submit"
            variant="contained"
            sx={{
              px: { xs: 2, sm: 4 },
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {t('save')}
          </Button>
        </Box>

    </div>
  )
}

export default Settings
