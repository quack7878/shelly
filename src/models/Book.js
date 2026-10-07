export class Book {
  
  constructor({
    isbn = '',
    title = '',
    author = '',
    publishedDate = new Date(),
    pages = 0,
    publishingHouse = '',
    cover = null,
    type = 'ebook',
    status = 'toRead'
  }) {
    this.isbn = isbn
    this.title = title
    this.author = author
    this.publishedDate = publishedDate
    this.pages = pages
    this.publishingHouse = publishingHouse
    this.cover = cover
    this.type = type
    this.status = status
  }

}
