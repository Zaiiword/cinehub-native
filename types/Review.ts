import Movie from "./Movie";
import { User } from "./User";

export class Review {
    id: number;
    user: User;
    movie: Movie;
    content: string;
    rating: number;
    likedBy: User[];

    constructor(id: number, user: User, movie: Movie, content: string, rating: number, likedBy: User[]) {
        this.id = id;
        this.user = user;
        this.movie = movie;
        this.content = content;
        this.rating = rating;
        this.likedBy = likedBy;
    }
}