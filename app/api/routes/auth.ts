import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import AuthService from '../../services/auth';
import { IUserInput } from '../../interfaces/users/IUser';
// import Auth from '../middleware/auth';

const route  = Router();  

export default (app:Router)=>{
    app.use('/auth', route)
    const authServiceInstance = Container.get(AuthService);

    //for sign up 
    route.post('/signup', async(req:Request, res:Response, next: NextFunction)=>{
 
    console.log(req.body);
      
        try{
            const { userRecord } = await authServiceInstance.SignUp(req.body as IUserInput);
            return res.status(201).json({userRecord})
        }catch(e){
            console.log(e);
            return next(e)
        }
    })

    //for sigin
    route.post('/signin', async (req:Request, res:Response, next:NextFunction)=>{
        try{
            console.log('body',req.body)
        const {username, password} = req.body;
        const {user } = await authServiceInstance.SignIn(username, password);
        console.log("user in route",user)
        return res.json({user}).status(200);
                 
    }catch(e){
       
        next(e)
    }
    })

    //for deleting user
    route.delete('/delete/:username', async(req:Request, res:Response, next: NextFunction)=>{
        try{

            const {  success,message } = await authServiceInstance.deleteuser(req.params.username as string);
            return res.status(201).json({ success,message});
        }catch(e){
            console.log(e);
            return next(e)
        }
    })

    //update user
  route.post('/updateuser', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
      try{
           const {username,like}=req.body;
          const { message, success } = await authServiceInstance.updateuser(username as string, req.body as IUserInput);
          return res.status(201).json({message, success})
      }catch(e){
          console.log(e);
          return next(e)
      }
  })
  route.post('/updatefav', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
  try{
    const {username}=req.body;
   const { message, success } = await authServiceInstance.updatefav(username as string, req.body as IUserInput);
   return res.status(201).json({message, success})
}catch(e){
   console.log(e);
   return next(e)
}   
  })
  route.post('/deletefav', async(req:Request, res:Response, next: NextFunction)=>{
  console.log(req.body);
  try{
    const {username}=req.body;
   const { message, success } = await authServiceInstance.deletefav(username as string, req.body as IUserInput);
   return res.status(201).json({message, success})
}catch(e){
   console.log(e);
   return next(e)
}   
  })


}

