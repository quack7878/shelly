export class Book {
  
  constructor({
    isbn,
    title,
    author,
    publishedDate,
    pages,
    publishingHouse,
    cover,
    type = 'ebook',
  }) {
    this.isbn = isbn
    this.title = title
    this.author = author
    this.publishedDate = publishedDate
    this.pages = pages
    this.publishingHouse = publishingHouse
    this.cover = cover
    this.type = type
  }

  get data() {
    return {
      isbn: this.isbn,
      title: this.title,
      author: this.author,
      publishedDate: this.publishedDate,
      pages: this.pages,
      publishingHouse: this.publishingHouse,
      cover: this.cover,
      type: this.type
    }
  }
}
