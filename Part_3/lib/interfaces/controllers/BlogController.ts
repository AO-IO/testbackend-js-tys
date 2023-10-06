import { ID } from './../../domain/entities/Entity';
import { Request, Response } from 'express';
import { ValidationError } from 'joi';
// import ListUsers from '../../application/use_cases/user/ListUsers';
// import GetUser from '../../application/use_cases/user/GetUser';
import { ServiceLocator } from '../../infrastructure/config/service-locator';
import Post from '../../domain/entities/Post';
import CreatePost from '../../application/use_cases/blog/createPost';
import getPost from '../../application/use_cases/blog/getPost';
import getPosts from '../../application/use_cases/blog/getPosts';
import deletePost from '../../application/use_cases/blog/deletePost';
import updatePost from '../../application/use_cases/blog/updatePost';
import create_user_post from '../../application/use_cases/blog/create_user_post';
import get_user_post from '../../application/use_cases/blog/get_user_post';

export default {
  async createPost(request: Request, response: Response) {
    // Context
    const userId = request.userId;

    const serviceLocator: ServiceLocator = request.serviceLocator!;
    // console.log(serviceLocator)
    // console.log(request.body)
    let data = request.body;
    data = {
      title: data.title,
      author: userId,
      tags: data.tags,
      description: data.description,

    };
    // console.log(data)

    // Treatment
    let post = null;
    let error = null;
    try {
      post = await CreatePost(data, serviceLocator);
    } catch (err: unknown) {
      console.log(err)
      if (err instanceof ValidationError) {
        error = err.details[0].message;
      } else if (err instanceof Error) {
        // 'Error occurred while creating user'
        error = err.message;
      }
    }

    // Output
    if (!post) {
      return response.status(400).json({ message: error });
    }1
    const output = serviceLocator.PostSerializer.serialize(post, serviceLocator);
    // console.log(output)
    // Create an association between user and blog post
    const user_id = request.userId

    const postId_= (output as any)?.id
  

    const assoiUserPost ={
      user_id:user_id,
      blog_post_id:postId_
    }

    await create_user_post(assoiUserPost, serviceLocator);
    // const association = new UserPost({
    //   user_id,
    //   postId_
    // });

    // // Save the association to the database
    // association.save((err) => {
    //   if (err) {
    //     console.error('Error creating association:', err);
    //   } else {
    //     console.log('Association created successfully');
    //   }
    // });
    return response.status(201).json(output);
  },

  async getPost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const postId = request.params.id;

    // Treatment
    let post = null;
    try {
      post = await getPost(postId, serviceLocator);
    } catch (err) {
      console.log(err);
    }

    // Output
    if (!post) {
      return response.status(404).json({ message: 'Not Found' });
    }
    const output = serviceLocator.PostSerializer.serialize(post, serviceLocator);
    return response.json(output);
  },

  async findPosts(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Treatment
    const posts = await getPosts(serviceLocator);

    // Output
    const output = posts
      .map((post: Post) => serviceLocator.PostSerializer.serialize(post, serviceLocator));
    return response.json(output);
  },

  async deletePost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const toDeletePostId = request.params.id;

    // ---------------------------------------------
    // THIS IS HOW TO ACCESS userId FROM AccessToken
    // ---------------------------------------------
    const userId = request.userId;
    // ---------------------------------------------
    // ---------------------------------------------

    // Treatment
    let post = null;
    try {
      post = await deletePost(toDeletePostId, serviceLocator);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }

    // Output
    if (!post) {
      return response.status(404).json({ message: 'Not Found' });
    }
    return response.sendStatus(204);
  },


  async updatePost(request: Request, response: Response) {
    // Context
    const serviceLocator: ServiceLocator = request.serviceLocator!;

    // Input
    const postId = request.params.id;
    const inputData = { ...request.body, author: request.userId };
    const data: any = {
      id: postId
    };
    const acceptedFields: string[][] = [

      ['title'],
      ['description'],
      ['author'],
      ['tags'],

    ];
    acceptedFields.forEach((acceptedField) => {
      if (inputData[acceptedField[0]] === undefined) return;
      data[acceptedField.length > 1
        ? acceptedField[1]
        : acceptedField[0]
      ] = inputData[acceptedField[0]];
    });

    // Treatment
    let post = null;
    let error = null;
    try {
      post = await updatePost(data, serviceLocator);
    } catch (err) {
      if (err instanceof ValidationError) {
        error = err.details[0].message;
      } else if (err instanceof Error) {
        // 'Error occurred while creating user'
        error = err.message;
      }
    }

    // Output
    if (!post) {
      return response.status(400).json({ message: error });
    }
    const output = serviceLocator.PostSerializer.serialize(post, serviceLocator);
    // const user_id = request.userId

    // const postId_= (output as any)?.id
  
    // const blogPostData = {
    //   user_id:user_id,
    //   blog_post_id:postId_
    // }
    // const CurrentassoiUserPost = await get_user_post(blogPostData,serviceLocator)
    
    // console.log(CurrentassoiUserPost)
    // await create_user_post(assoiUserPost, serviceLocator);
    return response.json(output);
  },
}