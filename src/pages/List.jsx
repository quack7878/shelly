import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { get } from '../services/preferences'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from '@mui/material'

export default function List() {

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { state } = useLocation()

  const [list, setList] = useState(() => state?.list)

  useEffect(() => {
    async function init() {
      i18n.changeLanguage(await get('language'))
    }

    init()
  }, [])

  return (
    <p>{list.name}</p>
  )
}

