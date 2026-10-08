import { useState, useEffect } from 'react'
import { getReadingBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MenuBookIcon from '@mui/icons-material/MenuBook'

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
          gap: 4,
          padding: 2,
        }}
      >
        {readingBooks.map((book, index) => (
          <Card
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: '324px',
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
            <CardActionArea onClick={() => navigate('/books')} sx={{ display: 'flex', justifyContent: 'spaceAround',  }}>
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

      <Card
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          p: 2,
          marginTop: 2,
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
          },
        }}
      >
        <CardActionArea onClick={() => navigate('/books', { state: {list: {name: 'aa'}} }) } sx={{ display: 'flex', justifyContent: 'spaceAround',  }}>
          <CardContent
            sx={{
              p: 0,
              '&:last-child': {
                pb: 0,
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexGrow: 1,
              padding: 1,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', flex: 1, }}>
              <MenuBookIcon sx={{ display: 'flex', alignItems: 'start' }} color='disabled' fontSize='large'/>
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
      </Card>
    </div>
  )
}
