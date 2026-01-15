export class MangaDetail {
  constructor(
    id_manga,
    name_manga,
    author_id,
    description,
    banner_url,
    poster_url,
    status,
    count_view,
    created_at,
    updated_at,
    chapters = []
  ) {
    this.id_manga = id_manga;
    this.name_manga = name_manga;
    this.author_id = author_id;
    this.description = description;
    this.banner_url = banner_url;
    this.poster_url = poster_url;
    this.status = status;
    this.count_view = count_view;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.chapters = chapters;
  }
}
