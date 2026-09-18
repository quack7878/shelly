import { useState } from 'react'
import { searchBooks } from '../services/books'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const navigate = useNavigate()

  const { t, i18n } = useTranslation()

  return (
    <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column', padding: 24 }}>
    </div>
  )
}
