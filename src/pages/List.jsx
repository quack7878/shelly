import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from '@mui/material'

export default function List() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { state } = useLocation()

  const [list, setList] = useState(() => state?.list)
  const [books, setBooks] = useState([])

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
    }

    init()
  }, [])

  return (
    <Box 
      style={{ 
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        padding: 24,
        position: 'relative',
      }}
    >
      <Typography
        variant='h3'
        fontWeight={800}
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          letterSpacing: '-0.04em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {list.name}
      </Typography>

       {
          (books.length > 0) ?
            books.map((book, index) => (
              <BookCard
                key={index}
                book={book}
              />
           ))
         :
          <Typography
            variant='h5'
            sx={{
              letterSpacing: '-0.04em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
           {t('list.no-books')}
          </Typography>
       }

      <Button
        variant='contained'
        sx={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          textTransform: 'none',
          fontWeight: 700,
        }}
      >
        <AddIcon />
      </Button>

    </Box>
  )
}

