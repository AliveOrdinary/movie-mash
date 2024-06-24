import React from 'react';
import { FaPlay, FaShare } from 'react-icons/fa';
import SocialShare from './SocialShare';
import RandomMovieButton from './RandomMovieButton';

const MovieDetails = ({ movieData, onRandomize }) => {
    if (!movieData) return null;

    const {
        name,
        year,
        image,
        genre,
        description,
        duration,
        contentRating,
        aggregateRating,
        director,
        actor,
        datePublished
    } = movieData;

    return (
        <div className="relative min-h-screen w-full bg-gray-900 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-black">
                <div
                    className="absolute inset-0  opacity-50"
                    style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'

                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent opacity-75" />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-8">
                <header className="text-orange-500 font-bold text-xl md:text-2xl mb-4 md:mb-8">Movie Mash</header>

                <div className="flex-grow flex flex-col justify-center max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {name} <span className="text-xl md:text-3xl font-normal">({datePublished || 'Unknown Year'})</span>
                    </h1>
                    <p className="text-white mb-2 md:mb-4">{genre?.join(', ') || 'Unknown Genre'}</p>
                    <p className="text-white mb-4 md:mb-6 text-sm md:text-base">{description || 'No description available.'}</p>
                    <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mb-4 md:mb-6">
                        <span className="text-white text-sm md:text-base">{duration || 'Unknown Duration'}</span>
                        <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm md:text-base">{contentRating || 'Not Rated'}</span>
                        <span className="text-white text-sm md:text-base">IMDb: {aggregateRating?.ratingValue || 'N/A'}</span>
                    </div>
                    <p className="text-white mb-2 md:mb-4 text-sm md:text-base">
                        <span className="font-semibold">Director:</span> {director?.[0]?.name || 'Unknown Director'}
                    </p>
                    <p className="text-white mb-4 md:mb-6 text-sm md:text-base">
                        <span className="font-semibold">Cast:</span> {actor?.map(a => a.name).join(', ') || 'Unknown Cast'}
                    </p>
                    <div className="flex flex-wrap space-x-2 md:space-x-4 mb-4">
                        {/* <button className="bg-orange-500 text-white px-4 md:px-6 py-2 rounded flex items-center text-sm md:text-base mb-2">
                            <FaPlay className="mr-2" /> Play Trailer
                        </button> */}
                        <button className="bg-gray-700 text-white px-4 md:px-6 py-2 rounded flex items-center text-sm md:text-base mb-2">
                            <FaShare className="mr-2" /> Share
                        </button>
                    </div>
                </div>

                <SocialShare movie={movieData} />

                {/* Random Movie Button */}
                <div className="mt-4 md:mt-8 text-center flex justify-center">
                    <RandomMovieButton onClick={onRandomize} />
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;