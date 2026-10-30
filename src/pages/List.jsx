import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'

import { getBooksByList, getBooksNotInList, addBooksList } from '../services/lists'
import ListDialog from '../components/ListDialog'
import BookCard from '../components/BookCard'

import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

export default function List() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { state } = useLocation()

  const [list, setList] = useState(() => state?.list)
  const [books, setBooks] = useState([])

  const [listDialogOpen, setListDialogOpen] = useState(false)
  const [availableBooks, setAvailableBooks] = useState([])
  const [selectedBookIds, setSelectedBookIds] = useState([])

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
      setBooks(await getBooksByList(list.id))
    }

    init()
  }, [])

  const listForm = useForm({
    onSubmit: async () => {
      await addBooksList(list.id, selectedBookIds)
      setBooks(await getBooksByList(list.id))
      setListDialogOpen(false)
    },
  })

  async function openBookDialog() {
    setAvailableBooks(await getBooksNotInList(list.id))
    setSelectedBookIds([])
    setListDialogOpen(true)
  }

  function toggleBook(bookId) {
    setSelectedBookIds(ids => 
      ids.includes(bookId)
        ? ids.filter(id => id !== bookId)
        : [...ids, bookId]
    )
  }

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
        <AddIcon onClick={openBookDialog} />
      </Button>

      <ListDialog 
        open={listDialogOpen}
        onClose={() => setListDialogOpen(false)}
        title={t('listForm.title')}
      >
        <form 
          id='list'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            listForm.handleSubmit()
          }}
        >
        </form>
        <FormGroup>
          {availableBooks.map(book => {
            return (
              <FormControlLabel
                key={book.id}
                label={book.title}
                control={
                  <Checkbox
                    checked={selectedBookIds.includes(book.id)}
                    onChange={() => toggleBook(book.id)}
                  >
                  </Checkbox>
                }
              >
              </FormControlLabel>
            )
          })}
        </FormGroup>
      </ListDialog>
    </Box>

  )
}

