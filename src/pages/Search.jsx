import { useState, useEffect } from 'react'
import { searchBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate } from 'react-router-dom'
import { Book } from '../models/Book'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'

export default function Search() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [books, setBooks] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
    }

    init()
  }, [])

  async function loadBooks(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    try {
      setLoading(true)
      setError('')

      const result = await searchBooks(trimmedQuery)
      setBooks(result || [])
    } catch {
      setError(t('searchPage.search-error'))
    } finally {
      setLoading(false)
    }
  }

  function BookCard({book, index}) {
    return (
      <Card
        key={index}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          p: 2,
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
          },
        }}
      >
        <CardActionArea onClick={() => navigate('/book', { state: { book } })} sx={{ display: 'flex', justifyContent: 'spaceAround',  }}>
          <Box
            component='img'
            src={book.cover}
            sx={{
              width: 90,
              height: 130,
              objectFit: 'cover',
              borderRadius: 2,
              flexShrink: 0,
              bgcolor: 'grey',
              display: 'flex'
            }}
          />

          <CardContent
            sx={{
              p: 0,
              '&:last-child': {
                pb: 0,
              },
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flexGrow: 1,
              padding: 2,
              alignSelf: 'start',
            }}
          >
            <Typography
              variant='h6'
              fontWeight={700}
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textAlign: 'start',
              }}
            >
              {book.title}
            </Typography>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{ 
                mt: 0.75,
                textAlign: 'start',
              }}
            >
              {book.author}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        px: { xs: 2, sm: 4, md: 8 },
        py: 5,
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h3'
            fontWeight={800}
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.04em',
            }}
          >
            {t('searchPage.discover-next-read')}
          </Typography>

        </Box>

        <Box
          component='form'
          onSubmit={loadBooks}
          sx={{
            display: 'flex',
            gap: 1.5,
            mb: 4,
            maxWidth: 800,
          }}
        >
          <TextField
            fullWidth
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPage.search-by-title')}
            variant='outlined'
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon color='action' />
                </InputAdornment>
              ),
            },
          }}
        />

          <Button
            type='submit'
            variant='contained'
            disabled={loading || !query.trim()}
            sx={{
              px: { xs: 2, sm: 4 },
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? <CircularProgress size={24} color='inherit' /> : t('global.search')}
          </Button>
        </Box>

        {error && (
          <Alert severity='error' sx={{ mb: 3, maxWidth: 800 }}>
            {error}
          </Alert>
        )}

        {!loading && books.length === 0 && query && !error && (
          <Typography color='text.secondary'>
            {t('searchPage.no-books-found')} “{query}”.
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Card
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              p: 2,
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
              },
            }}
          >
            <CardActionArea onClick={() => navigate('/book', { state: {book: new Book ({})} }) } sx={{ display: 'flex', justifyContent: 'spaceAround',  }}>
              <Box
                sx={{
                  borderRadius: 2,
                  flexShrink: 0,
                  display: 'flex',
                }}
              >
                <AddIcon color='primary' fontSize='large'/>
              </Box>

              <CardContent
                sx={{
                  p: 0,
                  '&:last-child': {
                    pb: 0,
                  },
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  flexGrow: 1,
                  padding: 2,
                  alignSelf: 'start',
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'start',
                  }}
                >
                  {t('searchPage.cant-find-book')}
                </Typography>

                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ 
                    mt: 0.75,
                    textAlign: 'start',
                  }}
                >
                  {t('searchPage.add-yourself')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        {books.map((book, index) => (
          <BookCard
            index={index}
            key={index}
            book={book}
          />
        ))
       }
      </Box>
    </Box>
  </Box>
  )
}
