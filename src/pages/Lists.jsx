import { useEffect, useState } from 'react'
import { useDragAndDrop } from 'react-aria-components/useDragAndDrop'
import { useListData } from 'react-aria-components/useListData'
import { ListBox, ListBoxItem } from 'react-aria-components'
import { Box, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { getLists, updateByPositions } from '../services/lists'
import CustomCard from '../components/CustomCard'

export default function Lists() {

  const { t, i18n } = useTranslation()

  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getLists()
      .then(setItems)
      .catch(setError)
    }, [])

    if (items === null) return <p>{t('loading-lists')}</p>

    return <SortableLists items={items} />
  }

  function SortableLists({ items }) {
    const { t, i18n } = useTranslation()

    const list = useListData({
      initialItems: items,
      getKey: item => String(item.id),
    })

    const { dragAndDropHooks } = useDragAndDrop({
      getItems: (keys, draggedItems) =>
        draggedItems.map(item => ({ 'text/plain': item.name })),

      onReorder(event) {
        if (event.target.dropPosition === 'before') {
          list.moveBefore(event.target.key, event.keys)
        } else if (event.target.dropPosition === 'after') {
          list.moveAfter(event.target.key, event.keys)
        }
    },
  })

  function handleSaveOrder() {
    updateByPositions(list.items)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, alignSelf: 'stretch', flexGrow: 1 }}>
      <ListBox
        aria-label="Your lists"
        items={list.items}
        dragAndDropHooks={dragAndDropHooks}
        orientation='vertical'
         selectionMode='multiple'
        style={{
          display: 'flex',
          gap: 2,
          width: 'max-content',
          margin: 0,
          padding: 0,
          flexDirection: 'column',
          alignSelf: 'stretch', 
          flexGrow: 1,
          width: '100%',
          alignItems: 'center',
        }}
      >
        {item => (
          <ListBoxItem
            id={String(item.id)}
            textValue={item.name}
            style={{ listStyle: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CustomCard
              styles={{
                padding: '1rem',
                justifyContent: 'center',
                width: '80%',
              }}
            >
              <Typography variant="h6" fontWeight={700} noWrap>
                {item.name}
              </Typography>
            </CustomCard>
          </ListBoxItem>
        )}
      </ListBox>

      <Button
        variant='contained'
        onClick={() => handleSaveOrder()}
        sx={{
          px: { xs: 2, sm: 4 },
          borderRadius: 3,
          textTransform: 'none',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        {t('global.save')}
      </Button>
    </Box>
  )
}

