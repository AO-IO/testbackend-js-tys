import constants from './constants';
import environment from './environment';

// Types
import PasswordManager from '../../domain/services/PasswordManager';
import AccessTokenManager from '../../application/security/AccessTokenManager';

import Serializer from '../../interfaces/serializers/Serializer';

import UserRepository from '../../domain/repositories/UserRepository';

// Implementations

import BcryptPasswordManager from '../security/BcryptPasswordManager';
import JwtAccessTokenManager from '../security/JwtAccessTokenManager';

import UserSerializer from '../../interfaces/serializers/UserSerializer';

// Mongo
import UserRepositoryMongo from '../repositories/mongoose/UserRepositoryMongo';

// post repo 

import postRepo from '../../domain/repositories/PostRepo'
import PostSerializer from '../../interfaces/serializers/PostSerializer';
import PostRepoMongo from '../repositories/mongoose/PostRepoMongo';
import PostUserRepoMongo from '../repositories/mongoose/Post_UserRepoMongo';
import PostUserRepo from '../../domain/repositories/PostUserRepo'
export type ServiceLocator = {
  passwordManager: PasswordManager,
  accessTokenManager: AccessTokenManager,
  PostRepo : postRepo,
  userSerializer: Serializer,
  PostSerializer: Serializer,
  userRepository?: UserRepository,
  PostUserRepo: PostUserRepo
};

function buildBeans() {
  const beans: ServiceLocator = {
    passwordManager: new BcryptPasswordManager(),
    accessTokenManager: new JwtAccessTokenManager(),
    PostSerializer: new PostSerializer(),
    PostRepo : new PostRepoMongo(),
    PostUserRepo: new PostUserRepoMongo(),
    userSerializer: new UserSerializer(),
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    beans.userRepository = new UserRepositoryMongo();
  }

  return beans;
}

export default buildBeans();
