import expressLoader from './express';
import mongooseLoader from './mongoose';
import injector from './injector'

export default async ({ expressApp }) => {

  const mongoConnection = await mongooseLoader()
 
  const userModel = { 
     name: 'userModel', 
     model: require('../models/Users/user').default, 
    };

  const { agenda } = await injector({
    mongoConnection,
    models: [
      userModel
        ]  
  });

    await expressLoader({ app: expressApp });
    console.log('Express ready to go!!');
  
  };