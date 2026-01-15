export class Manga {
  constructor(
    id_manga,
    name_manga,
    author_id,
    description,
    banner_url,
    poster_url,
    status,
    count_view,
    create_at,
    update_at
  ) {
    this.id_manga = id_manga;
    this.name_manga = name_manga;
    this.author_id = author_id;
    this.description = description;
    this.banner_url = banner_url;
    this.poster_url = poster_url;
    this.status = status;
    this.count_view = count_view;
    this.create_at = create_at;
    this.update_at = update_at;
  }
}
