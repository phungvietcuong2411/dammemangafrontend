import axiosClient from "../http/axiosClient";
import { Comment } from "../../domain/models/Comment";

const BASE_URL = "/comments";

export default class CommentRepository {
  _toComment(raw) {
    if (!raw) return null;
    return new Comment(
      raw.idComment,
      raw.idUser,
      raw.idChapter,
      raw.title,
      raw.createAt
    );
  }

  // CREATE
  async createComment(commentData) {
    const response = await axiosClient.post(`${BASE_URL}`, commentData);
    return this._toComment(response.data);
  }

  // READ ALL
  async getAllComments() {
    const response = await axiosClient.get(`${BASE_URL}`);
    return response.data.map((item) => this._toComment(item));
  }

  // READ BY ID
  async getCommentById(id) {
    const response = await axiosClient.get(`${BASE_URL}/${id}`);
    return this._toComment(response.data);
  }

  // UPDATE
  async updateComment(id, title) {
    const response = await axiosClient.put(`${BASE_URL}/${id}`, { title });
    return this._toComment(response.data);
  }

  // DELETE
  async deleteComment(id) {
    const response = await axiosClient.delete(`${BASE_URL}/${id}`);
    return response.data;
  }

  // GET COMMENTS BY CHAPTER
  async getCommentsByChapter(chapterId) {
    const response = await axiosClient.get(`${BASE_URL}/chapter/${chapterId}`);
    return response.data;
  }
}
