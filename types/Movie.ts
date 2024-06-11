import Genre from "./Genre";

export default class Movie {
    id: number;
    name: string;
    duration: number;
    rating: number;
    directors: string;
    actors: string;
    synopsis: string;
    trailer: string;
    poster: string;
    genres: Genre[];
    released: Date;
    productionCountry: string;
    imdbId: string;
    reviews: string[];

    constructor(id: number, name: string, duration: number, rating: number, directors: string, actors: string, synopsis: string, trailer: string, poster: string, genres: Genre[], released: Date, productionCountry: string, imdbId: string, reviews: string[]) {
        this.id = id;
        this.name = name;
        this.duration = duration;
        this.rating = rating;
        this.directors = directors;
        this.actors = actors;
        this.synopsis = synopsis;
        this.trailer = trailer;
        this.poster = poster;
        this.genres = genres;
        this.released = released;
        this.productionCountry = productionCountry;
        this.imdbId = imdbId;
        this.reviews = reviews;
    }

    toString(): string {
        return `Movie [id=${this.id}, name=${this.name}]`;
    }
}
