export interface IUser {
  _id: string;
  username: string;
  password: string;
  like?:Array<any>;
  }
  
  export interface IUserInput {
    username?: string;
    password?: string;
    like?:Array<any>;
  }
  