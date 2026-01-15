export class Comment {
  constructor(idComment, idUser, idChapter, title, createAt) {
    this.idComment = idComment;
    this.idUser = idUser;
    this.idChapter = idChapter;
    this.title = title;
    this.createAt = createAt;
  }
}
