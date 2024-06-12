import Movie from "./Movie";
import { Review } from "./Review";


export class User {
    id: number;
    name: string;
    firstName: string;
    mail: string;
    language: string;
    password: string;
    role: string;
    accountCreated: Date;
    lastConnection: Date;
    profilePicture: string;
    watchlist: Movie[];
    reviews: Review[];

    constructor(id: number, name: string, firstName: string, mail: string, language: string, password: string, role: string, accountCreated: Date, lastConnection: Date, profilePicture: string, watchlist: Movie[], reviews: Review[]) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.mail = mail;
        this.language = language;
        this.password = password;
        this.role = role;
        this.accountCreated = accountCreated;
        this.lastConnection = lastConnection;
        this.profilePicture = profilePicture;
        this.watchlist = watchlist;
        this.reviews = reviews;
    }

}