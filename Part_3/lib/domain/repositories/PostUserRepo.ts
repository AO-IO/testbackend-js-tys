import { ID } from "../entities/Entity";
import PostUser from "../entities/UserPost";

export default interface PostUserRepo {
  persist(domainEntity: PostUser): Promise<PostUser | null | void>;

//   merge(domainEntity: User): Promise<User | null>;

//   remove(entityId: ID): Promise<boolean | null>;

  get(entityId: ID): Promise<PostUser | null>;

//   getByEmail(email: string): Promise<User | null>;

//   find(): Promise<User[]>;
};
