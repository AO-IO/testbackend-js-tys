import Entity, { ID } from "./Entity";

export default class Post extends Entity {
  title: string;
  description: string;
  author: string;
  tags: string;

  constructor({
    id,
    title,
    description,

    author,
    tags,
  }: {
    id?: ID;
    title: string;
    author: string;
    tags: string;
    description: string;
  }) {
    super({ id });
    this.title = title;
    this.author = author;
    this.tags = tags;
    this.description = description;
  }
}
