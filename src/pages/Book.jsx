import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useForm } from '@tanstack/react-form'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import 'dayjs/locale/en'
import { get } from '../services/preferences'
import { saveBook } from '../services/books'
import { getTypes } from '../services/types'
import { getStatuses } from '../services/statuses'
import { Book } from '../models/Book'

import {
  Box,
  Button,
  CardActionArea,
  TextField,
  Typography,
} from '@mui/material'

import {  
  enUS,  
  frFR,
} from '@mui/x-date-pickers/locales'

export default function BookPage() {

  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const [imagePreview, setImagePreview] = useState()
  const [book, setBook] = useState(() => new Book(state?.book))
  const [types, setTypes] = useState([])
  const [statuses, setStatuses] = useState([])
  const [language, setLanguage] = useState('')

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
      setTypes(await getTypes())
      setStatuses(await getStatuses())
      setImagePreview(book.cover)
    }

    init()
  }, [])

  useEffect(() => {
    const isUrl = typeof book.cover === 'string' && book.cover.startsWith('https:')

    if (!isUrl) {
      readerFile(book.cover)
    }
  }, [book.cover])

  const form = useForm({
    defaultValues: {
      title: book.title ?? '',
      isbn: book.isbn ?? '',
      pages: book.pages ?? 0,
      author: book.author ?? '',
      publishingHouse: book.publishingHouse ?? '',
      type: book.type ?? 'ebook',
      status: book.status ?? 'toRead',
      publishedDate: book.publishedDate ?? '',
      cover: book.cover ?? ''
    },
    onSubmit: async ({ value }) => {
      saveBook(new Book(value))
    },
  })

  function readerFile(value) {
    const reader = new FileReader()

    reader.onload = () => {
      setImagePreview(reader.result)
    }

    if (value) {
      reader.readAsDataURL(value)
    }
  }

  function isValidIsbn(isbn) {
    const cleaned = isbn.replace(/[-\s]/g, '');

    return (
      /^\d{13}$/.test(cleaned) ||
      /^\d{9}[\dXx]$/.test(cleaned)
    )
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
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='h3'
          fontWeight={800}
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '-0.04em',
          }}
        >
          {t('bookPage.modify-book')}
        </Typography>
      </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          style={{ gap: 30, display: 'flex', flexDirection: 'column', flexGrow: 1, alignSelf: 'stretch' }}
        >

          <form.Field
            name='cover'
            validators={{
              onChange: ({ value }) => {

                if (value.size > 5 * 1024 * 1024 ) {
                  return t('bookPage.file-too-large')
                }

                return undefined
              }
            }}
            children={(field) => (
              <CardActionArea 
                onClick={() => 
                  document.getElementById('book-image-input').click()
                } 
                sx={{ display: 'flex' }}
              >
                <Box
                  component='img'
                  src={imagePreview}
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
                  id='book-image-input'
                  type='file' 
                  accept='image/*'
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null

                    if (file) {
                      readerFile(file)
                      field.handleChange(file)
                    }
                  }}
                />

                {field.state.meta.errors.length > 0 && (
                  <FormHelperText error>
                    {field.state.meta.errors[0]} 
                  </FormHelperText>
                )}
              </CardActionArea>
            )}
          >
          </form.Field>

          <form.Field
            name='title'
            validators={{
              onChange: ({ value }) => {
                return !value.trim() ? t('bookPage.empty') : undefined
              }
            }}
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={t('bookPage.title')}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    error={
                      field.state.meta.isTouched && 
                      field.state.meta.errors.length > 0
                    }
                    helperText={
                      field.state.meta.isTouched 
                        ? field.state.meta.errors[0]
                        : ''
                    }
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='isbn'
            validators={{
              onChange: ({ value }) => {
                if (!value.trim()) {
                  return t('bookPage.empty')
                }

                if(!isValidIsbn(value)) {
                  return t('bookPage.invalid-isbn') 
                }

                return undefined

              }
            }}
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label='ISBN'
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    error={
                      field.state.meta.isTouched && 
                      field.state.meta.errors.length > 0
                    }
                    helperText={
                      field.state.meta.isTouched 
                        ? field.state.meta.errors[0]
                        : ''
                    }
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='pages'
            validators={{
              onChange: ({ value }) => {

                if (value == '') {
                  return t('bookPage.empty')
                }

                if(isNaN(value)) {
                  return t('bookPage.invalid-number') 
                }

                return undefined

              }
            }}
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={t('bookPage.pages')}
                    value={field.state.value}
                    onChange={(event) => {
                      if (Number(event.target.value)) {
                        field.handleChange(Number(event.target.value))
                      }
                      else {
                        field.handleChange(event.target.value)
                      }
                    }}
                    error={
                      field.state.meta.isTouched && 
                      field.state.meta.errors.length > 0
                    }
                    helperText={
                      field.state.meta.isTouched 
                        ? field.state.meta.errors[0]
                        : ''
                    }
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='author'
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={t('bookPage.author')}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='publishingHouse'
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={t('bookPage.publishing-house')}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    variant='outlined'
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                      },
                    }}
                  />
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='type'
            children={(field) => {
              return (
                <>
                  <FormControl sx={{ width: '100%', }}>
                    <InputLabel id='select-type-label'>
                      {t('bookPage.type')}
                    </InputLabel>
                    {types.length > 0 && (
                      <Select
                        labelId='select-type-label'
                        id='select-type'
                        label={t('bookPage.type')}
                        value={field.state.value ?? ''}
                        onChange={(event) => field.handleChange(event.target.value)}
                        sx={{
                          width: '100%',
                        }}
                      >
                        {types.map((type) => (
                          <MenuItem key={type.id} value={type.type}>
                            {t(`bookPage.${type.type}`)}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </FormControl>
                </>
              )
            }}
          >
          </form.Field>

          <form.Field
            name='status'
            children={(field) => {
              return (
                <>
                  <FormControl sx={{ width: '100%', }}>
                    <InputLabel id='select-status-label'>
                      {t('bookPage.status')}
                    </InputLabel>
                    {statuses.length > 0 && (
                      <Select
                        labelId='select-status-label'
                        id='select-status'
                        label={t('status')}
                        value={field.state.value ?? ''}
                        onChange={(event) => field.handleChange(event.target.value)}
                        sx={{
                          width: '100%',
                        }}
                      >
                        {
                          statuses.map( status => 
                            <MenuItem id={status.id} value={status.status}>{t(`bookPage.${status.status}`)}</MenuItem>
                          )
                        }
                      </Select>
                    )}
                  </FormControl>
                </>
              )
            }}
          >
          </form.Field>
          
          <form.Field
            name='publishedDate'
            children={(field) => {
              const dateValue =
                field.state.value && dayjs(field.state.value).isValid()
                  ? dayjs(field.state.value)
                  : null

              return (
                <>
                  <LocalizationProvider 
                    dateAdapter={AdapterDayjs} 
                    adapterLocale={language} 
                    localeText={locale.components.MuiLocalizationProvider.defaultProps.localeText}
                  >

                    <MobileDatePicker
                      label={t('bookPage.publishing-date')}
                      closeOnSelect={true}
                      minDate={dayjs('1000-01-01')}
                      value={dateValue}
                      format='YYYY/MM/DD'
                      onChange={(value) => field.handleChange(value ? value.format('YYYY-MM-DD') : null)}
                      sx={{
                        width: '100%',
                      }}
                    />
                  </LocalizationProvider>
                </>
              )
            }}
          >
          </form.Field>

          <form.Subscribe
            selector={(state) => ({
              canSubmit: state.canSubmit,
              isSubmitting: state.isSubmitting,
            })}
          >
            {({ canSubmit, isSubmitting }) => (
              <Button
                type='submit'
                variant='contained'
                disabled={!canSubmit || isSubmitting}
                sx={{
                  px: { xs: 2, sm: 4 },
                  borderRadius: 3,
                  textTransform: 'none',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {isSubmitting ? 'Saving...' : t('global.save')}
              </Button>
            )}
          </form.Subscribe>

        </form>
    </Box>
  )
}
