import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchTop250Movies } from '../services/movieService.js';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_MOVIE = {
    name: 'Unknown Title',
    year: 'Unknown Year',
    datePublished: 'Unknown Date',
    image: 'https://via.placeholder.com/300x450?text=No+Image',
    description: 'No description available.',
    contentRating: 'Not Rated',
    duration: 'Unknown Duration',
    genre: ['Unknown'],
    keywords: 'No keywords',
    actor: [{ name: 'Unknown Actor' }],
    director: [{ name: 'Unknown Director' }],
    creator: [{ name: 'Unknown Creator' }],
    aggregateRating: { ratingValue: 'N/A', ratingCount: 0 },
    trailer: { embedUrl: '' },
};

const useRandomMovieData = () => {
    const [movieList, setMovieList] = useState([]);
    const [randomMovie, setRandomMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const initialFetchDone = useRef(false);

    const fetchMovies = useCallback(async () => {
        if (initialFetchDone.current) return movieList;
        setIsLoading(true);
        setError(null);
        try {
            const cachedMovies = localStorage.getItem('cachedMovieList');
            let movies;
            if (cachedMovies) {
                movies = JSON.parse(cachedMovies);
            } else {
                movies = await fetchTop250Movies();
                if (!Array.isArray(movies) || movies.length === 0) {
                    throw new Error('Invalid movie data received');
                }
                localStorage.setItem('cachedMovieList', JSON.stringify(movies));
            }
            setMovieList(movies);
            initialFetchDone.current = true;
            return movies;
        } catch (error) {
            setError('Failed to fetch movie data: ' + error.message);
            return [];
        } finally {
            setIsLoading(false);
        }
    }, [movieList]);

    const createRandomMovie = useCallback((movies) => {
        if (movies.length === 0) {
            setError('No movies available to randomize');
            return null;
        }

        const getRandomItem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };

        const randomMovie = {
            id: uuidv4(),
            name: getRandomItem(movies).name || DEFAULT_MOVIE.name,
            datePublished: getRandomItem(movies).datePublished || DEFAULT_MOVIE.datePublished,
            image: getRandomItem(movies).image || DEFAULT_MOVIE.image,
            description: getRandomItem(movies).description || DEFAULT_MOVIE.description,
            contentRating: getRandomItem(movies).contentRating || DEFAULT_MOVIE.contentRating,
            duration: getRandomItem(movies).duration || DEFAULT_MOVIE.duration,
            genre: getRandomItem(movies).genre || DEFAULT_MOVIE.genre,
            keywords: getRandomItem(movies).keywords || DEFAULT_MOVIE.keywords,
            actor: getRandomItem(movies).actor || DEFAULT_MOVIE.actor,
            director: getRandomItem(movies).director || DEFAULT_MOVIE.director,
            creator: getRandomItem(movies).creator || DEFAULT_MOVIE.creator,
            aggregateRating: getRandomItem(movies).aggregateRating || DEFAULT_MOVIE.aggregateRating,
            trailer: getRandomItem(movies).trailer || DEFAULT_MOVIE.trailer,
            year: getRandomItem(movies).year || DEFAULT_MOVIE.year
        };

        setRandomMovie(randomMovie);
        return randomMovie;
    }, []);

    useEffect(() => {
        if (!initialFetchDone.current) {
            fetchMovies().then(movies => {
                if (movies.length > 0 && !randomMovie) {
                    createRandomMovie(movies);
                }
            });
        }
    }, [fetchMovies, createRandomMovie, randomMovie]);

    const fetchRandomMovie = useCallback(() => {
        return fetchMovies().then(movies => createRandomMovie(movies));
    }, [fetchMovies, createRandomMovie]);

    return { randomMovie, isLoading, error, fetchRandomMovie };
};

export default useRandomMovieData;