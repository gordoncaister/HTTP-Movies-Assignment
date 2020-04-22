import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { useInput } from "../utils/useInput"

const EditMovieCard = () => {
    
    const [movie, setMovie] = useState({id:"",title:"",director:"",metascore:"",stars:[]});

    const [id, setId, handleId] = useInput("");
    const [title, setTitle, handleTitle] = useInput("");
    const [director, setDirector, handleDirector] = useInput("");
    const [metascore, setMetascore, handleMetascore] = useInput("");
    const [stars, setStars, handleStars] = useInput([]);    

    
    const match = useRouteMatch();

    console.log("match",match)

    const fetchMovie = id => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.log(err.response));
      };


    useEffect(() => { 
        fetchMovie(match.params.id)
        console.log(1,movie)
        setTitle(movie.title)
        setDirector(movie.director)
        setMetascore(movie.metascore)
        setStars(movie.stars)
    }, [match.params.id,movie.id]);


    console.log(2)


    // if(movie.id==match.params.id){
    //     setTitle(movie.title)
    //     console.log("setting title")
    // }
    console.log("movie",movie)
    console.log("title",title)

    if (!movie) {
        return <div>Loading movie information...</div>;
    }
    
   

  return (
    <form className="movie-card">
        <label htmlFor="title"><h2>Title: {title}{"  "}
                    <input
                    id="title"
                    name="title"
                    onChange={e => handleTitle(e.target.value)}
                    placeholder="title"
                    type="text"
                    value={title}
        />
        </h2></label>
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
