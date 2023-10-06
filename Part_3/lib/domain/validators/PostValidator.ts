import Joi from 'joi';

export default Joi.object({
  title: Joi.string()
    .label('title')
    .min(5)
    .required(),

  description: Joi.string()
    .label('description')
    .min(10)
    .required(),

  author: Joi.string()
    
   
    .required(),



  }).options({ abortEarly: false }).unknown();
