import { useState, useEffect } from 'react'
import { searchBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { save, get } from '../services/preferences'

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

import SearchIcon from '@mui/icons-material/Search'

export default function Search() {
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
      setError('Unable to load books. Please try again.')
    } finally {
      setLoading(false)
    }
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
            variant="h3"
            fontWeight={800}
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.04em',
            }}
          >
            {t('discover-next-read')}
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
            placeholder={t('search-by-title')}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !query.trim()}
            sx={{
              px: { xs: 2, sm: 4 },
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : t('search')}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, maxWidth: 800 }}>
            {error}
          </Alert>
        )}

        {!loading && books.length === 0 && query && !error && (
          <Typography color="text.secondary">
            {t('no-books-found')} “{query}”.
          </Typography>
        )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {books.map((book, index) => (
          <Card
            key={book.id || index}
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
              }}
            >
              <Typography
                variant="h6"
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
                variant="body2"
                color="text.secondary"
                sx={{ 
                  mt: 0.75,
                  textAlign: 'start',
                }}
              >
                {book.author || 'Unknown author'}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  </Box>
  )
}

