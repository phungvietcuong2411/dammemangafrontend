import CommentRepository from "../infrastructure/repositories/CommentRepository";

export default class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  // CREATE
  async createComment(comment) {
    return await this.commentRepository.createComment(comment);
  }

  // READ ALL
  async getAllComments() {
    return await this.commentRepository.getAllComments();
  }

  // READ BY ID
  async getCommentById(id) {
    return await this.commentRepository.getCommentById(id);
  }

  // UPDATE
  async updateComment(id, title) {
    return await this.commentRepository.updateComment(id, title);
  }

  // DELETE
  async deleteComment(id) {
    return await this.commentRepository.deleteComment(id);
  }

  // GET COMMENTS BY CHAPTER
  async getCommentsByChapter(chapterId) {
    return await this.commentRepository.getCommentsByChapter(chapterId);
  }
}
