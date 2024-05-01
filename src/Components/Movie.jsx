import React, { useState } from 'react';
import search from '../Images/search.png';
import './movies.css';

function Movie() {
  const [inputValue, setInputValue] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const apiKey = 'fa1c9c03';
      const movieName = inputValue.trim();
      const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieName}`);
      const data = await response.json();
      if (data.Response === 'False') {
        setError(data.Error);
        setMovieData(null);
      } else {
        setError(null);
        setMovieData(data);
      }
    } catch (error) {
      console.error('Error', error);
      setError('An error occurred while fetching data');
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className="movieMain w-100">
      <div className="movie my-5">
        <h1>Movie Search App</h1>
      </div>
      <div className="search">
        <input id="input" type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={fetchData}><img src={search} alt="Search" /></button>
      </div>
      {error && <p className="warnings">{error}</p>}
      {movieData && (
        <div className="row p-5">
          <div className="col-lg-6 h-100">
            <img src={movieData.Poster} className="my-auto  mx-auto border border-dark d-flex justify-content-center align-items-center" width="90%" height="200px" alt="Movie Poster" />
          </div>
          <div className="col-lg-6 h-100">
            <h5 className="card-title  fw-bolder "style={{color:'#d94e67 ', fontSize:'25px'}} >{movieData.Title}</h5>
            <p className="card-text">
              <div> The Movie is released in {movieData.Year},
               with a story genre  {movieData.Genre},</div>
              <div>Movie is directed by {movieData.Director},</div>
              <div>Boxoffice collection of {movieData.BoxOffice},</div>
              <div>Released {movieData.Released}</div>
              <div>IMDB Rating: {movieData.imdbRating}</div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Movie;
