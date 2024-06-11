import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieTag from './MovieTag';

export default function MovieList() {

  type Genre = {
    id: number;
    name: string;
  };
  
  type Movie = {
    id: number;
    genres: Genre[];
    poster: string;
    // ajoutez ici d'autres propriétés de film si nécessaire
  };

  const [genres, setGenres] = useState<Genre[]>([]);
    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [displayedMovies, setDisplayedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [showFilter, setShowFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [user, setUser] = useState(null);
    const moviesPerPage = 9;
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        loginAndFetchData();
    }, []);

    const loginAndFetchData = async () => {
        try {
            // Perform login to get the token
            const authResponse = await axios.post('http://localhost:8080/login', {
                username: 'admin',
                password: 'admin'
            });
            const { token } = authResponse.data;

            // Store the token in AsyncStorage for later use
            await AsyncStorage.setItem('authToken', token);

            // Set the Axios global header for subsequent requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            // Fetch user, movies and genres
            await fetchData();
        } catch (error) {
            console.error('Authentication or data fetching failed:', error);
        }
    };

    const fetchData = async () => {
        try {
            const userResponse = await axios.get('http://localhost:8080/user/me');
            setUser(userResponse.data);

            const moviesResponse = await axios.get('http://localhost:8080/movie');
            setAllMovies(moviesResponse.data);

            const genresResponse = await axios.get('http://localhost:8080/movie/genres');
            setGenres(genresResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (!isLoading) {
            updateDisplayedMovies();
        }
    }, [selectedGenre, allMovies, currentPage]);

    const updateDisplayedMovies = () => {
        const filteredMovies = selectedGenre ? allMovies.filter(movie =>
            movie.genres.some(genre => genre.id === Number(selectedGenre))
        ) : allMovies;

        const indexOfLastMovie = currentPage * moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
        const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

        setDisplayedMovies(currentMovies);
        setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    };

    function handleCheckboxChange(value: any) {
        setSelectedGenre(selectedGenre === value ? null : value);
    }

    return (
        <View style={styles.pageContainer}>
            <ScrollView style={styles.pageContent}>
                <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
                    <Text style={styles.filterToggle}>Filter</Text>
                </TouchableOpacity>

                {showFilter && (
                    <View style={styles.filterContainer}>
                        {genres.map(genre => (
                            <View style={styles.filterItem} key={genre.id}>
                                <CheckBox
                                    value={Number(selectedGenre) === genre.id}
                                    onValueChange={() => handleCheckboxChange(genre.id)}
                                />
                                <Text>{genre.name}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <View style={styles.showList}>
                        {displayedMovies.map(movie => (
                            <MovieTag movie={movie} key={movie.id} />
                        ))}
                    </View>
                )}

                <View style={styles.pageNumber}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                        <TouchableOpacity key={number} onPress={() => setCurrentPage(number)}>
                            <Text>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10
    },
    pageContent: {
        flex: 1
    },
    filterToggle: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    filterContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    showList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    pageNumber: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10
    }
});
