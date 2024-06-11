// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button, TextInput, Image } from 'react-native';
// import axios from 'axios';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import ReactStars from 'react-native-stars';

// export default function MovieDetailPage() {
//     const navigation = useNavigation();
//     const route = useRoute();
//     const movieId = route.params.id;
//     const commentRef = useRef();

//     const [movie, setMovie] = useState();
//     const [isLoading, setIsLoading] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         setIsLoading(true);
//         fetchMovie();
//         fetchUser();
//     }, []);

//     function fetchMovie() {
//         axios
//             .get(`http://localhost:8080/movie/${movieId}`)
//             .then(data => {
//                 setMovie(data.data);
//             })
//             .then(() => setIsLoading(false));
//     }

//     function fetchUser() {
//         axios.get('http://localhost:8080/user/me').then(response => {
//             setUser(response.data);
//         });
//     }

//     function handleCommentSubmit() {
//         const review = {
//             userId: user.id,
//             rating: rating,
//             comment: commentRef.current.value,
//         };
//         axios
//             .post(`http://localhost:8080/movie/${movieId}/review`, review, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             .then(() => {
//                 commentRef.current.value = '';
//                 setRating(0);
//                 fetchMovie();
//             });
//     }

//     const changeRating = newRating => {
//         setRating(newRating);
//     };

//     const handleLike = async reviewId => {
//         await axios.patch(`http://localhost:8080/movie/review/${reviewId}`, user, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         fetchMovie();
//     };

//     const handleWatchList = async () => {
//         await axios.post(`http://localhost:8080/user/watchlist/${movieId}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         fetchUser();
//     };

//     function deleteReview(id) {
//         axios.delete(`http://localhost:8080/movie/review/${id}`).then(() => {
//             fetchMovie();
//         });
//     }

//     const isMovieInWatchlist = user?.watchlist.some(
//         watchlistMovie => watchlistMovie?.id === movie?.id
//     );

//     return (
//         <View>
//             {isLoading ? (
//                 <Text>Loading...</Text>
//             ) : (
//                 <View>
//                     <Text>{movie?.name}</Text>
//                     <Text>{movie?.directors}</Text>
//                     <Text>{movie?.actors}</Text>
//                     <Text>{movie?.duration}</Text>
//                     <Button title="Add to Watchlist" onPress={handleWatchList} />
//                     <Image source={{ uri: movie?.poster }} />
//                     <ReactStars
//                         count={5}
//                         value={movie?.rating}
//                         isHalf={true}
//                         fullStar={<Icons.FAStar />}
//                         emptyStar={<Icons.FAStarO />}
//                         halfStar={<Icons.FAStarHalf />}
//                     />
//                     <Text>{movie?.synopsis}</Text>
//                     <TextInput
//                         placeholder="Add a comment..."
//                         ref={commentRef}
//                         onChangeText={setComment}
//                     />
//                     <Button title="Submit Comment" onPress={handleCommentSubmit} />
//                     <ReactStars
//                         count={5}
//                         onChange={changeRating}
//                         isHalf={true}
//                         fullStar={<Icons.FAStar />}
//                         emptyStar={<Icons.FAStarO />}
//                         halfStar={<Icons.FAStarHalf />}
//                     />
//                     {movie?.reviews.map((review, index) => {
//                         const isLikedByUser = review.likedBy.some(
//                             like => like.id === user.id
//                         );
//                         return (
//                             <View key={index}>
//                                 <Text>{review.content}</Text>
//                                 <ReactStars
//                                     count={5}
//                                     value={review.rating}
//                                     isHalf={true}
//                                     fullStar={<Icons.FAStar />}
//                                     emptyStar={<Icons.FAStarO />}
//                                     halfStar={<Icons.FAStarHalf />}
//                                 />
//                                 <Text>
//                                     {review.user.firstName} {review.user.name}
//                                 </Text>
//                                 <Button title="Like" onPress={() => handleLike(review.id)} />
//                                 {user?.role === 'admin' && (
//                                     <Button
//                                         title="Delete"
//                                         onPress={() => deleteReview(review.id)}
//                                     />
//                                 )}
//                             </View>
//                         );
//                     })}
//                 </View>
//             )}
//         </View>
//     );
// }