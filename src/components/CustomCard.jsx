import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material'

export default function CustomCard({ children, styles }) {
  return (
    <Card
      sx={[
        (theme) => ({
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          gap: 2,
          padding: 0,
          borderRadius: 3,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.14)',
          },
          flexShrink: 0,
        }),
        (theme) =>
          theme.applyStyles('dark', {
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.55)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.75)',
            },
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }),
          styles
      ]}
    >
    { children }
    </Card>
  )
}
