import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      'search': 'Search',
      'language': 'Language',
      'tint': 'Tint',
      'english': 'English',
      'french': 'French',
      'pink': 'Pink',
      'green': 'Green',
      'discover-next-read': 'Discover your next read',
      'search-by-title': 'Search by title',
      'no-books-found': 'No books found for ',
      'googlekey': 'Google Books Api key',
      'save': 'Save',
    }
  },
  fr: {
    translation: {
      'search': 'Rechercher',
      'language': 'Langue',
      'tint': 'Teinte',
      'english': 'Anglais',
      'french': 'Français',
      'pink': 'Rose',
      'green': 'Vert',
      'discover-next-read': 'Découvre ta prochaine lecture',
      'search-by-title': 'Recherche par le titre',
      'no-books-found': 'Aucun livres trouvés pour  ',
      'googlekey': 'Clé Api Google Books',
      'save': 'Sauvegarder',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',

    interpolation: {
      escapeValue: false
    }
  })

  export default i18n
