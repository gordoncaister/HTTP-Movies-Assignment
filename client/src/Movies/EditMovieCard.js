import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { useInput } from "../utils/useInput"

const EditMovieCard = () => {
    const [movie, setMovie] = useState({
        id: null,
        title: '',
        director: '',
        metascore: null,
        stars: [],
    });

    const [title, setTitle, handleTitle] = useInput(movie.title);
    const [director, setDirector, handleDirector] = useInput(movie.director);
    const [metascore, setMetascore, handleMetascore] = useInput(movie.metascore);
    const [stars, setStars, handleStars] = useInput(movie.stars);    

    
    const match = useRouteMatch();

    const fetchMovie = id => {
        console.log("Fetchmovie")
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err.response));
    };

    useEffect(() => {
        console.log("useEfefct")
        fetchMovie(match.params.id);
        setTitle(movie.title)
        setDirector(movie.director)
        setMetascore(movie.metascore)
        setStars(movie.stars)
    }, [match.params.id,movie]);


    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    
    
    console.log("movie",movie)

  return (
    <form className="movie-card">
        
      <h2>{title}</h2>
      <div className="movie-director">
        Director: <em>{director}</em>
      </div>
      <div className="movie-metascore">
        Metascore: <strong>{metascore}</strong>
      </div>
      <h3>Actors</h3>

      {stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </form>
  );

};

export default EditMovieCard;
