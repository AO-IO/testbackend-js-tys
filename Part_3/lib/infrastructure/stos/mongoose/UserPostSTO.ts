import UserPost from '../../../domain/entities/UserPost';

export default (schemaEntity: any): UserPost | null => {
  if (!schemaEntity) return null;
  return new UserPost({
    id: schemaEntity.id,
    user_id: schemaEntity.user_id,
    blog_post_id: schemaEntity.blog_post_id,
 
  });
};
