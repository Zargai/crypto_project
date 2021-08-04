import { Service, Inject } from 'typedi';
import argon2 from 'argon2';
import { IUser, IUserInput } from '../interfaces/users/IUser';
import jwt from 'jsonwebtoken';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
  ) { }
  //for user signup
  public async SignUp(userInputDTO: IUserInput): Promise<{ userRecord: IUser; }> {

    const { username } = userInputDTO;
    console.log(username)
    const user = await this.userModel.findOne({ username });
    console.log(user)
    if (!user) {
      const { username, password } = userInputDTO;
      console.log(username, password)
      const hashedPassword = await argon2.hash(password);
      const userRecord = await this.userModel.create({
        username: username,
        password: hashedPassword,
      })
      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      return { userRecord };
    }
    else {
      throw new Error(`user with ${username} already exist`);
    }

  }

  //for user signin
  public async SignIn(username: string, password: string): Promise<{ user: IUser,token: string  }> {

    const userRecord = await this.userModel.findOne({ username });
    console.log("user record", userRecord)
    if (!userRecord) {
      throw new Error('User not registered');
    }
    else {
      const validPassword = await argon2.verify(userRecord.password, password);
      console.log("valid password==>", validPassword)
      if (validPassword) {
        const user = userRecord.toObject();
        const token = this.generateToken(user);
          console.log("Token generated :",token )
         return { user,token };
      }
      else {
        throw new Error('Invalid Password');
      }
    }
  }
  //for getting user
  public async GetLike(username: string): Promise<{ like: IUser }> {

    const userRecord = await this.userModel.findOne({ username });
    console.log("user record", userRecord)
    if (!userRecord) {
      throw new Error('User not registered');
    }
    else {

      const data = userRecord.toObject();
      const like = data.like;
      console.log("user==>", like)
      return { like };

    }
  }

  //for deletion user account
  public async deleteuser(username: string): Promise<{ success: boolean, message: string }> {
    try {
      const userRecord = (await this.userModel.deleteOne({ "username": username }))
      console.log('delete user', userRecord)
      if (userRecord.deletedCount == 0) {
        return { success: false, message: "User not Found" }
      }
      return { success: true, message: "User Deleted Successfully" }


    } catch (e) {
      console.log('error', e)

    }
  }

  //to update User
  public async updateuser(username: string, userInputDTO: IUserInput): Promise<{ message: string, success: boolean }> {
    try {
      const user = await this.userModel.findOne({ username });
      if (user) {
        const { password } = userInputDTO;
        const hashedPassword = await argon2.hash(password);
        const UserRecord = await this.userModel.updateOne({ "username": username }, {
          username: username,
          password: hashedPassword,
        })
        if (UserRecord.nModified <= 0) {
          return { message: "No Modification", success: false }
        }
        return { message: "user Updated", success: true };
      }
      else {
        return { message: "User Not Found", success: false }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  //to UpdatE Favourite
  public async updatefav(username: string, userInputDTO: IUserInput): Promise<{ message: string, success: boolean }> {
    try {
      const user = await this.userModel.findOne({ username });
      if (user) {
        user.like.push(userInputDTO.like)
        console.log("==>", user.like)
        console.log("==>", userInputDTO.like)
        const UserRecord = await this.userModel.updateOne({ "username": username }, {
          like: user.like
        })
        if (UserRecord.nModified <= 0) {
          return { message: "No Modification", success: false }
        }
        return { message: "user Updated", success: true };
      }
      else {
        return { message: "User Not Found", success: false }
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  //to UpdatE Favourite
  public async deletefav(username: string, userInputDTO: IUserInput): Promise<{ message: string, success: boolean }> {
    try {
      const user = await this.userModel.findOne({ username });
      if (user) {
        console.log(user.like)
        const a = user.like.indexOf(userInputDTO.like, 0);
        console.log("a", a)
        if (a > -1) {
          user.like.splice(a, 1);
          console.log(user.like)
          console.log(user.like)
          const UserRecord = await this.userModel.updateOne({ "username": username }, {
            like: user.like
          })
          if (UserRecord.nModified <= 0) {
            return { message: "No Modification", success: false }
          }
          return { message: "user Updated", success: true };
        }
        else {
          return { message: "Liked Item not found in record", success: false }
        }
      }
      else {
        return { message: "User Not Found", success: false }
      }
    } catch (e) {
      console.log(e); 
      throw e;
    }
  }
  //Generating JWT Token
  private generateToken(user) {
    return jwt.sign({ _id: user._id }, 'jwt-token', { expiresIn: "1h" })
  }
}