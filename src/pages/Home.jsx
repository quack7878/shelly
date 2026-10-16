import { useState, useEffect } from 'react'
import { getReadingBooks } from '../services/books'
import { saveList, getLists } from '../services/lists'
import { List } from '../models/List'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useForm } from '@tanstack/react-form'
import TextField from '@mui/material/TextField'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import BookCard from '../components/BookCard'
import CustomCard from '../components/CustomCard'
import FormDialog from '../components/FormDialog'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import SortIcon from '@mui/icons-material/Sort'

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
  const [lists, setLists] = useState([])
  const [listDialogOpen, setListDialogOpen] = useState(false)

  useEffect (() => {
    async function init() {
      setReadingBooks(await getReadingBooks())
      setLists(await getLists())
    }

    init()
  }, [])

  const listForm = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: async ({ value }) => {
      saveList(new List(value))
      setListDialogOpen(false)
      listForm.reset()
    },
  })

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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant='body1'
            sx={{
              display: 'flex',
              paddingLeft: '0.5rem',
              paddingTop: '1rem',
            }}
          >
            {t('home.my-lists')}
          </Typography>

          <IconButton 
            aria-label='mode' 
            onClick={() => setListDialogOpen(true)}
            sx={{ padding: 0, alignSelf: 'end' }} 
          >
            <AddIcon />
          </IconButton>
        </Box>

        <IconButton 
          aria-label='mode' 
          onClick={() => navigate('/lists') } 
          sx={{ padding: 0, alignSelf: 'end' }} 
        >
          <SortIcon />
        </IconButton>
      </Box>

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
        {lists.map((list, index) => (
          <CustomCard key={index} styles={{ width: '50%', scrollSnapAlign: 'center', padding: '1rem', justifyContent: 'center', }} >
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
            {list.name}
          </Typography>
          </CustomCard>
        ))}
      </Box>

      <FormDialog 
        open={listDialogOpen}
        onClose={() => setListDialogOpen(false)}
      >
        <form 
          id='list'
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            listForm.handleSubmit()
          }}
        >
          <listForm.Field
            name='name'
            validators={{
              onChange: ({ value }) => {
                return !value.trim() ? t('listForm.name-empty') : undefined
              },
            }}
            children={(field) => {
              return (
                <>
                  <TextField
                    fullWidth
                    name={field.name}
                    label={t('listForm.name')}
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    error={
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
          </listForm.Field>
        </form>
      </FormDialog>

    </div>
  )
}
