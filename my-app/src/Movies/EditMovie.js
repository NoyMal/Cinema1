import React,{useEffect,useState} from 'react';
import MoviesMainPage from "./MoviesMainPage"
import Utils from "../Utils";

const EditMovie = (props) => {

    const [movie, setMovie] = useState({})
    const [movieName, setMovieName] = useState("")
    const [movieLink,setMovieLink] = useState("")
    

    useEffect(()=>{
        let id = props.match.params.id
        Utils.getMovieById(id).then(movieDb =>{
            setMovie(movieDb.data)
            setMovieName(movieDb.data.name)
            let tempLink = movieDb.data.image.original
            setMovieLink(tempLink)
        })
    },[])
        

    const editMovie = async () => {
        let id =  props.match.params.id
        let newMovie = {
            name: movie.name,
            genres: movie.genres,
            image: {
                medium: movie.image.medium,
                original: movieLink
            },
            premiered: movie.premiered
        }
        await Utils.updateMovie(id, newMovie)
        alert(" The Movie Was Updated Successfully ! ")
        props.history.push("/AllMoviesComp")
    }

    const GoToMoviesPage = () => {
        props.history.push("/AllMoviesComp")
    }

    return(

        <div>
            <MoviesMainPage />

            <h3> Edit Movie :  {movieName} </h3>
            Name : <input type="text" value={movie.name} onChange={e => setMovie({...movie, name: e.target.value})}></input><br/>
            Genres : <input type="text" value={movie.genres} onChange={e => setMovie({...movie, genres: e.target.value})}></input><br/>
            Image URL : <input type="text" value={movieLink} onChange={e => setMovieLink(e.target.value)}></input><br/>
            Premiered : <input type="text" value={movie.premiered} onChange={e => setMovie({...movie, premiered: e.target.value})}></input><br/>
            <br/><br/>

            <input type="button" value="Update" onClick = {editMovie}/>
            <input type="button" value="Cancel" onClick = {GoToMoviesPage}/>



            <br/><br/><br/><br/>

        </div>
        
    )
};


export default EditMovie ;