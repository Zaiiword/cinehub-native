import Movie from "./Movie";

export default class Genre {
    id: number;
    name: string;
    movies: Movie[];

    constructor(id: number, name: string, movies: Movie[]) {
        this.id = id;
        this.name = name;
        this.movies = movies;
    }

    toString(): string {
        return `Genre {id=${this.id}, name='${this.name}'}`;
    }
}

