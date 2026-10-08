import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      global: {
        'save': 'Save',
      },
      nav: {
        'home': 'Home',
        'search': 'Search',
        'settings': 'Settings',
        'search': 'Search',
      },
      bookPage: {
        'modify-book': 'Modify this book',
        'file-too-large': 'File too large',
        'empty': 'Can\'t be empty',
        'title': 'Title',
        'invalid-isbn': 'Invalid ISBN',
        'invalid-number': 'Invalid number',
        'pages': 'Pages',
        'author': 'Author',
        'publishing-house': 'Publishing House',
        'type': 'Type',
        'ebook': 'Ebook',
        'audiobook': 'Audio book',
        'paperback': 'Paperback',
        'hardcover': 'Hardcover',
        'pocket': 'Pocket',
        'collector': 'Collector',
        'signed': 'Signed',
        'status': 'Status',
        'toRead': 'To read',
        'reading': 'Reading',
        'read': 'Read',
        'abandoned': 'Abandoned',
        'paused': 'Paused',
        'publishing-date': 'Publishing Date',
      },
      searchPage: {
        'search-error': 'Unable to load books. Please try again.',
        'discover-next-read': 'Discover your next read',
        'search-by-title': 'Search by title',
        'no-books-found': 'No books found for ',
        'cant-find-book': 'Can\'t find your book?',
        'add-yourself': 'Add it yourself!',
      },
      settingsPage: {
        'tint': 'Tint',
        'pink': 'Pink',
        'green': 'Green',
        'language': 'Language',
        'en': 'English',
        'fr': 'French',
        'googlebooks': 'GoogleBooks',
        'openlibrary': 'OpenLibrary',
        'googlekey': 'Google Books Api key',
      },
    }
  },
  fr: {
    translation: {
      global: {
        'save': 'Sauvegarder',
        'search': 'Rechercher',
      },
      nav: {
        'home': 'Accueil',
        'search': 'Recherche',
        'settings': 'Réglages',
      },
      bookPage: {
        'modify-book': 'Modifier ce livre',
        'file-too-large': 'Fichier trop lourd',
        'empty': 'Ne peut être vide',
        'title': 'Titre',
        'invalid-isbn': 'ISBN invalide',
        'invalid-number': 'Nombre invalide',
        'pages': 'Pages',
        'author': 'Auteur',
        'publishing-house': 'Maison d\'édition',
        'type': 'Type',
        'ebook': 'Livre numérique',
        'audiobook': 'Livre audio',
        'paperback': 'Livre broché',
        'hardcover': 'Livre relié',
        'pocket': 'Livre de poche',
        'collector': 'Collection',
        'signed': 'Signé',
        'status': 'Status',
        'toRead': 'À lire',
        'reading': 'En cours de lecture',
        'read': 'Lu',
        'abandoned': 'Abandonné',
        'paused': 'En pause',
        'publishing-date': 'Date de publication',
      },
      searchPage: {
        'search-error': 'Impossible de charger les livres. Réessayez plus tard.',
        'discover-next-read': 'Découvre ta prochaine lecture',
        'search-by-title': 'Recherche par le titre',
        'no-books-found': 'Aucun livres trouvés pour  ',
        'cant-find-book': 'Tu ne trouves pas ton livre?',
        'add-yourself': 'Ajoute le toi-même!',
      },
      settingsPage: {
        'tint': 'Teinte',
        'pink': 'Rose',
        'green': 'Vert',
        'language': 'Langue',
        'en': 'Anglais',
        'fr': 'Français',
        'googlebooks': 'GoogleBooks',
        'openlibrary': 'OpenLibrary',
        'googlekey': 'Clé Api Google Books',
      },
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
