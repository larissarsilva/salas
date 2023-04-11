export class User {
    email!: string;
    password!: string;
}

export interface ValidateUser {
    email: string;
    code: string;
}