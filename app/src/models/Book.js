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
