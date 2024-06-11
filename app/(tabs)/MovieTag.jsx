import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Rating } from 'react-native-ratings';

const MovieTag = ({ movie }) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('MovieDetailScreen', { movieId: movie.id });
    };

    return (
        <TouchableOpacity style={styles.movie} onPress={handleClick}>
            <Image source={{ uri: movie.poster }} style={styles.image} />
            <Text style={styles.movieTitle}>{movie.name}</Text>
            <View style={styles.starRating}>
                <Rating
                    type='star'
                    imageSize={20}
                    readonly
                    startingValue={movie.rating}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    movie: {
        margin: 5,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 5,
    },
    movieTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    starRating: {
        marginTop: 5,
    }
});

export default MovieTag;
