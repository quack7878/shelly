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
      'modify-book': 'Modify this book',
      'title': 'Title',
      'pages': 'Pages',
      'author': 'Author',
      'publishing-house': 'Publishing House',
      'publishing-date': 'Publishing Date',
      'type': 'Type',
      'ebook': 'ebook',
      'audio-book': 'Audio book',
      'paperback': 'Paperback',
      'hardcover': 'Hardcover',
      'pocket': 'Pocket',
      'select-date': 'Select a date',
      'books-search-error': 'Unable to load books. Please try again.',
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
      'modify-book': 'Modifier ce livre',
      'title': 'Titre',
      'pages': 'Pages',
      'author': 'Auteur',
      'publishing-house': 'Maison d\'édition',
      'publishing-date': 'Date de publication',
      'type': 'Type',
      'ebook': 'Livre numérique',
      'audio-book': 'Livre audio',
      'paperback': 'Livre broché',
      'hardcover': 'Livre relié',
      'pocket': 'Livre de poche',
      'select-date': 'Choisir une date',
      'books-search-error': 'Impossible de charger les livres. Réessayez plus tard.',
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
