export interface IUser {
    id?: string;
    googleId?: string;
    twitterId?: string;
    githubId?: string;
    firstName: string;
    isAdmin: boolean;
    lastName: string;
    email: string;
    subscriptions: any;
    provider: string;
    profilePicture: string;
    __v: number;
    _id: string;
}
