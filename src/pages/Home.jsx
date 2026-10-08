import { useState, useEffect } from 'react'
import { getBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material'

export default function Home() {

  const navigate = useNavigate()

  const { t, i18n } = useTranslation()
  const [books, setBooks] = useState([])

  useEffect (() => {
    async function loadBooks() {
      setBooks(await getBooks())
    }

    loadBooks()
  }, [])

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 24 }}>
        <h1>My books</h1>
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
                component='img'
                src={book.coverUrl}
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
            </Card>
          ))}
      </Box>
    </div>
  )
}
