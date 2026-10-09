import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material'

import CustomCard from './CustomCard'

export default function BookCard({ book, styles, onClick }) {
  return (
    <CustomCard styles={ styles } >
      <CardActionArea 
        onClick={onClick}
        sx={{ 
          display: 'flex', 
          justifyContent: 'spaceAround',
          padding: 2,
        }}
      >
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
    </CustomCard>
  )
}
