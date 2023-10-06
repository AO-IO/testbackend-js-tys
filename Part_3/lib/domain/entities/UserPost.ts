import Entity, { ID } from "./Entity";

export default class UserPost extends Entity {
  user_id?: string;
  blog_post_id: string;

  constructor({
    id,
    user_id,
    blog_post_id,
  }: {
    id?: ID;
    user_id: string;
    blog_post_id: string;
  }) {
    super({ id });
    this.user_id = user_id;
    this.blog_post_id = blog_post_id;
  }
}
