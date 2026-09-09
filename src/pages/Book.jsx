import { useState, Form, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'
import { get } from '../services/preferences'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

export default function Home() {

  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const [book, setBook] = useState(state?.book)
  const [language, setLanguage] = useState('')

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
      setLanguage(await get('language'))
    }

    init()
  }, [])
  console.log(language)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 8 },
        py: 5,
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 4,
        paddingTop: 2,
      }}
      component='form'
      onSubmit={handleSubmit}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          fontWeight={800}
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '-0.04em',
          }}
        >
          {t('modify-book')}
        </Typography>
      </Box>

      <Box
        component="img"
        src={book.coverUrl}
        alt={book.title}
        sx={{
          width: 90,
          height: 130,
          objectFit: 'cover',
          borderRadius: 2,
          flexShrink: 0,
          bgcolor: 'background.default',
          display: 'flex'
        }}
      />

        <TextField
          fullWidth
          value={book.title}
          onChange={(event) => setBook({...book, title: event.target.value})}
          label={t('title')}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          value={book.isbn}
          onChange={(event) => setBook({...book, isbn: event.target.value})}
          label='ISBN'
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          value={book.pages}
          onChange={(event) => setBook({...book, pages: event.target.value})}
          label={t('pages')}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          value={book.author}
          onChange={(event) => setBook({...book, author: event.target.value})}
          label={t('author')}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <TextField
          fullWidth
          value={book.publishingHouse ?? ''}
          onChange={(event) => setBook({...book, publishingHouse: event.target.value})}
          label={t('publishing-house')}
          variant='outlined'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
            },
          }}
        />

        <FormControl sx={{ width: '100%', }}>
          <InputLabel id='select-type-label'>
            {t('type')}
          </InputLabel>
          <Select
            labelId='select-type-label'
            id='select-type'
            label={t('type')}
            value={book.type ?? 'ebook'}
            onChange={(event) => setBook({ ...book, type: event.target.value})}
            sx={{
              width: '100%',
            }}
          >
            <MenuItem value={'ebook'}>{t('ebook')}</MenuItem>
            <MenuItem value={'audiobook'}>{t('audio-book')}</MenuItem>
            <MenuItem value={'paperback'}>{t('paperback')}</MenuItem>
            <MenuItem value={'hardcover'}>{t('hardcover')}</MenuItem>
            <MenuItem value={'pocket'}>{t('pocket')}</MenuItem>
          </Select>
        </FormControl>
        
        <LocalizationProvider 
          dateAdapter={AdapterDayjs} 
          adapterLocale={language} 
          localeText={{toolbarTitle: t('select-date')  }}
        >

          <MobileDatePicker
            label={t('publishing-date')}
            closeOnSelect={true}
            value={dayjs(book.publishedDate)}
            format='YYYY/MM/DD'
            onChange={(value) => setBook({ ...book, publishedDate: value ? value.format("YYYY-MM-DD") : null})}
            sx={{
              width: '100%',
            }}
          />
        </LocalizationProvider>

    </Box>
  )
}
