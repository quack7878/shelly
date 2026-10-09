import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate, useLocation } from 'react-router-dom'
import { getBooks } from '../services/books'
import BookCard from '../components/BookCard'

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

      {
        books.map((book, index) => (
          <BookCard
            key={index}
            book={book}
          />
       ))
     }

    </Box>
  )
}

