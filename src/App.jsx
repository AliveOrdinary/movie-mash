import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import useRandomMovieData from './hooks/useRandomMovieData';

const App = () => {
  const { randomMovie, isLoading, error, fetchRandomMovie } = useRandomMovieData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-center">
          <p className="text-2xl mb-4">Error: {error}</p>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            onClick={fetchRandomMovie}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!randomMovie) {
    return null;  // or you could show a loading state here
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieDetails movieData={randomMovie} onRandomize={fetchRandomMovie} />} />
        <Route path="/:id" element={<MovieDetails movieData={randomMovie} onRandomize={fetchRandomMovie} />} />
      </Routes>
    </Router>
  );
};

export default App;