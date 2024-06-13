import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, TextInput, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { User } from '@/types/User';
import Movie from '@/types/Movie';
import { RootStackParamList } from '@/types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating, { StarRatingDisplay } from 'react-native-star-rating-widget';

  
type MovieDetailPageRouteProp = RouteProp<RootStackParamList, 'MovieDetailPage'>;

export default function MovieDetailPage() {
    const navigation = useNavigation();
    const route = useRoute<MovieDetailPageRouteProp>();
    const movieId : number = route.params?.id;

    const [movie, setMovie] = useState<Movie>();
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [user, setUser] = useState<User>();

    useEffect(() => {
        setIsLoading(true);
        fetchMovie();
        fetchUser();
    }, []);

    function fetchMovie() {
        axios
            .get(`http://localhost:8080/movie/${movieId}`)
            .then(data => {
                setMovie(data.data);
            })
            .then(() => setIsLoading(false));
    }

    function fetchUser() {
        axios.get('http://localhost:8080/user/me').then(response => {
            setUser(response.data);
        });
    }
    
    function handleCommentSubmit() {

        if (user && rating && comment) {
            const review = {
                userId: user.id,
                rating: rating,
                comment: comment
            };
            axios
                .post(`http://localhost:8080/movie/${movieId}/review`, review, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    setComment('');
                    setRating(0);
                    fetchMovie();
                });
        }
    }

    const changeRating = (newRating: number) => {
        setRating(newRating);
    };

    const handleLike = async (reviewId: number) => {
        await axios.patch(`http://localhost:8080/movie/review/${reviewId}`, user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetchMovie();
    };

    const handleWatchList = async () => {
        await axios.post(`http://localhost:8080/user/watchlist/${movieId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        fetchUser();
    };

    function deleteReview(id: number) {
        axios.delete(`http://localhost:8080/movie/review/${id}`).then(() => {
            fetchMovie();
        });
    }

    const isMovieInWatchlist = user?.watchlist.some(
        watchlistMovie => watchlistMovie?.id === movie?.id
    );

    return (
        <View>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                <View>
                    {movie && (
                        <>
                            <Text>{movie.name}</Text>
                            <Text>{movie.directors}</Text>
                            <Text>{movie.actors}</Text>
                            <Text>{movie.duration}</Text>

                            <TouchableOpacity onPress={handleWatchList}>
                            <Icon
                            name='clock-o'
                            size={30}
                            color={isMovieInWatchlist ? '#000' : '#ccc'}
                            />
                            </TouchableOpacity>
                                
                            <Image source={{ uri: movie.poster }} />

                            <StarRatingDisplay
                            maxStars={5}
                            rating={movie.rating}
                            emptyColor={'gray'}
                            color={'gold'}
                            starSize={50}
                            />
                            <Text>{movie.synopsis}</Text>
                        </>
                    )}
                    <TextInput
                        value={comment}
                        onChangeText={text => setComment(text)}
                    />


                    <Button title="Submit Comment" onPress={handleCommentSubmit} />
                    <StarRating
                        maxStars={5}
                        rating={rating}
                        onChange={(rating) => changeRating(rating)}
                        color={'gold'}
                        emptyColor={'gray'}
                        starSize={40}
                    />
                    {movie?.reviews.map((review, index) => {
                        const isLikedByUser = review.likedBy.some(
                            like => like.id === (user?.id ?? null)
                        );
                        return (
                            <View key={index}>
                                <Text>{review.content}</Text>
                                <StarRatingDisplay
                                    maxStars={5}
                                    rating={review.rating}
                                    emptyColor={'gray'}
                                    color={'gold'}
                                    starSize={20}
                                />
                                <Text>
                                    {review.user.firstName} {review.user.name}
                                </Text>
                                <Text>{review.likedBy.length}</Text>
                                <TouchableOpacity onPress={() => handleLike(review.id)}>
                                    <Icon
                                    name= {isLikedByUser ? 'heart' : 'heart-o' }
                                    size={15}
                                    color={ isLikedByUser ? 'red':'#000'}
                                    />
                                </TouchableOpacity>                            
                                {user?.role === 'admin' && (
                                    <Button
                                        title="Delete"
                                        onPress={() => deleteReview(review.id)}
                                    />
                                )}
                            </View>
                        );
                    })}
                </View>
            )}
        </View>
    );
}