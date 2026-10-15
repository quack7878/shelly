import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useTranslation } from 'react-i18next'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function FormDialog({ open, onClose, children }) {

  const { t, i18n } = useTranslation()

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle> {t('listForm.title')} </DialogTitle>
      <DialogContent sx={{ paddingTop: '4px !important' }}>
        { children }
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}> {t('global.cancel')} </Button>
        <Button type='submit' form='list'>
          {t('global.save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

