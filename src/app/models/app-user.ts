
export interface IAppUser{
    name:string;
    email:string;
    isAdmin:boolean;
    userid:string;
    passwordHash:string;
    passwordSalt:string;
}