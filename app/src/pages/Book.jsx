import { useState, Form, useEffect, useRef } from 'react'
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
import { getBookCoverBlob } from '../services/covers'
import { saveBook } from '../services/books'
import { getTypes } from '../services/types'
import { Book } from '../models/Book'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

import {  
  enUS,  
  frFR,
} from '@mui/x-date-pickers/locales'

export default function Home() {

  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const [imagePreview, setImagePreview] = useState()
  const [book, setBook] = useState(() => new Book(state?.book))
  const [types, setTypes] = useState([])
  const [language, setLanguage] = useState('')
  const imageRef = useRef(null)

  const [locale, setLocale] = useState(frFR)

  const locales = {
    'fr': frFR,
    'en': enUS
  }

  useEffect(() => {
    async function init() {
      const l = await get('language')
      i18n.changeLanguage(l)
      setLanguage(l)

      setLocale(locales[l])
      setBook(new Book({...book, cover: await getBookCoverBlob(state?.book.coverUrl)}))
      setTypes(await getTypes())
    }

    init()
  }, [])

  useEffect(() => {
    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
    }

    if (book.cover) {
      reader.readAsDataURL(book.cover)
    }
  }, [book.cover])

  async function handleSubmit(event) {
    event.preventDefault()

    saveBook(book)

  }

  function updateBook(field, event) {
    setBook(new Book({...book, [field]: event.target.value}))
  }

  function handleCardClick() {
    imageRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    setBook(new Book({...book, cover: file}))

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

        <CardActionArea onClick={handleCardClick} sx={{ display: 'flex' }}>
          <Box
            component="img"
            src={imagePreview}
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
          >
          </Box>
          <input 
            type="file" 
            accept='image/*'
            ref={imageRef}
            style= {{ display: 'none' }}
            onChange={handleFileChange}
          />
        </CardActionArea>

        <TextField
          fullWidth
          value={book.title}
          onChange={(event) => updateBook('title', event)}
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
          onChange={(event) => updateBook('isbn', event)}
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
          onChange={(event) => updateBook('pages', event)}
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
          onChange={(event) => updateBook('author', event)}
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
          onChange={(event) => updateBook('publishingHouse', event)}
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
            onChange={(event) => updateBook('type', event)}
            sx={{
              width: '100%',
            }}
          >
            {
              types.map( type => 
                <MenuItem id={type.id} value={type.type}>{t({type.type})}</MenuItem>
              )
            }
          </Select>
        </FormControl>
        
        <LocalizationProvider 
          dateAdapter={AdapterDayjs} 
          adapterLocale={language} 
          localeText={locale.components.MuiLocalizationProvider.defaultProps.localeText}
        >

          <MobileDatePicker
            label={t('publishing-date')}
            closeOnSelect={true}
            value={dayjs(book.publishedDate) ?? null}
            format='YYYY/MM/DD'
            onChange={(value) => updateBook('publishedDate', value ? value.format("YYYY-MM-DD") : null)}
            sx={{
              width: '100%',
            }}
          />
        </LocalizationProvider>

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
  )
}
