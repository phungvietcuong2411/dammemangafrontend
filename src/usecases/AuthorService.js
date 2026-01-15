import AuthorRepositoryImpl from "../infrastructure/repositories/AuthorRepository";

export default class AuthorService {

  constructor() {
    this.authorRepository = new AuthorRepositoryImpl();
  }

  async layAuthor() {
    return await this.authorRepository.getAllAuthors();
  }

  async getAllAuthors() {
    return await this.authorRepository.getAllAuthors();
  }

  async getAuthorById(id) {
    return await this.authorRepository.getAuthorById(id);
  }

  async createAuthor(author) {
    // author có thể là { nameAuthor: "Tên tác giả" }
    return await this.authorRepository.createAuthor(author.nameAuthor);
  }

  async updateAuthor(id, author) {
    // author có thể là { nameAuthor: "Tên tác giả mới" }
    return await this.authorRepository.updateAuthor(id, author.nameAuthor);
  }

  async deleteAuthor(id) {
    return await this.authorRepository.deleteAuthor(id);
  }

  async getTotalAuthors() {
    return await this.authorRepository.getTotalAuthors();
  }
}
