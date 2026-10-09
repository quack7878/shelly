import { useState, useEffect } from 'react'
import { getReadingBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BookCard from '../components/BookCard'
import CustomCard from '../components/CustomCard'

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material'

export default function Home() {

  const navigate = useNavigate()

  const { t, i18n } = useTranslation()
  const [readingBooks, setReadingBooks] = useState([])

  useEffect (() => {
    async function init() {
      setReadingBooks(await getReadingBooks())
    }

    init()
  }, [])

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 24 }}>
      
      <Typography
        variant='h3'
        fontWeight={800}
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '-0.04em',
        }}
      >
        {t('home.welcome')}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          boxSizing: 'border-box',
          overflowX: 'auto',
          overflowY: 'hidden',
          width: '100%',
          gap: 2,
          padding: 2,
          scrollSnapType: 'x mandatory',
        }}
      >
        {readingBooks.map((book, index) => (
          <BookCard key={index} book={book} styles={{ width: '90%', scrollSnapAlign: 'center', }} ></BookCard>
        ))}
      </Box>

      <CustomCard
        styles={{ marginTop: 2, }}
      >
        <CardActionArea 
          onClick={() => navigate('/books') } 
          sx={{ 
            display: 'flex', 
            justifyContent: 'spaceAround', 
          }}
        >
          <CardContent
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              padding: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', flex: 1, }}>
              <MenuBookIcon sx={{ display: 'flex', alignItems: 'start', marginLeft: 0.5 }} color='disabled' fontSize='large'/>
            </div>

            <Typography
              variant='h5'
              sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              {t('home.all-books')}
            </Typography>

            <div style={{ display: 'flex', flex: 1}}></div>

          </CardContent>
        </CardActionArea>
      </CustomCard>

    </div>
  )
}
