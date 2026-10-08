import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate, useLocation } from 'react-router-dom'
import { getBooks } from '../services/books'

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material'

export default function Books() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { state } = useLocation()

  const [books, setBooks] = useState([])

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
      setBooks(await getBooks())
    }

    init()
  }, [])

  return (
      <Box
        sx={{
          display: 'flex',
          gap: 4,
          padding: 2,
          flexDirection: 'column',
        }}
      >

        <Typography
          variant='h3'
          fontWeight={800}
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            letterSpacing: '-0.04em',
          }}
        >
          {t('home.all-books')}
        </Typography>

        {books.map((book, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              padding: 2,
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
              },
              flexShrink: 0,
            }}
          >
            <CardActionArea sx={{ display: 'flex', justifyContent: 'spaceAround', }}>
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
                  {book.author || 'Unknown author'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}

      </Box>
  )
}

