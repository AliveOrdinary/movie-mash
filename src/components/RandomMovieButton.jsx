import React from 'react';
import { FaRandom } from 'react-icons/fa';

const RandomMovieButton = ({ onClick }) => {
    return (
        <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center transition duration-300 text-sm md:text-base"
            onClick={onClick}
        >
            <FaRandom className="mr-2" />
            Randomize Movie
        </button>
    );
};

export default RandomMovieButton;