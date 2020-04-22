import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useInput } from "../utils/useInput"

const EditMovieCard = () => {
    const history = useHistory()
    const [movie, setMovie] = useState({id:"",title:"",director:"",metascore:"",stars:[]});

    
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

    
    
   const handleSubmit = (e) =>{
       e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${match.params.id}`,{id:movie.id,title:title,director:director,metascore:metascore,stars:stars})
        .then(res=>{
            console.log("res:",res)
        })
        .catch(err => console.log(err))
        
        console.log(history)
        history.push("/")
        history.go(0)
   }

   const handleDelete = (e) => {
       e.preventDefault();
       axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
       .then(res => console.log(res))
       .catch(err => console.log(err))
       history.push("/")
        history.go(0)
   }

  return (
      <>
    <form className="movie-card" onSubmit={handleSubmit}>
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

      <button >Submit</button>
    </form>
    <button onClick={handleDelete}>delete</button>
    </>
  );

};

export default EditMovieCard;
