import React,{useEffect,useState} from 'react';
import MoviesMainPage from "./MoviesMainPage"
import Utils from "../Utils"
import MovieComp from "./MovieComp"

const AllMoviesComp = (props) => {

    const [movies,setMovies] = useState([])
    const [input,setInput] = useState("")


    useEffect(()=>{
        Utils.getMovies().then(moviesDb =>{
            setMovies(moviesDb.data)
        })
    },[])


    const goToEditMovie = (movieId)=>{
        props.history.push(`/EditMovie/${movieId}`)
    }

    const DeleteMovie = (IdToDelete)=>{
        Utils.deleteMovie(IdToDelete)
        alert ("Movie has been deleted !")
        props.history.push('/MoviesMainPage')
    }
    


    const search = (async() =>{
        
        if (input.length > 0){
            let moviesDb = await Utils.getMovies()
            setMovies(moviesDb.data)
            
            let newArr = movies.filter(movie => {
                if (movie.name.startsWith(input)){
                    return movie
                }
            })
            setMovies(newArr)
        }else{
           let moviesDb = await Utils.getMovies()
            setMovies(moviesDb.data)
        }
    })


    let items = movies.map((movie,index)=>{
        return <div key={index}> <MovieComp key={index} data={movie} callback={(movieId) => goToEditMovie(movieId)} delete={(IdToDelete) => DeleteMovie(IdToDelete)} /></div> 
    })


    return(
        <div>
            <MoviesMainPage />  
            <h3> Find Movie : </h3>
            <input type="text" onChange={e => setInput(e.target.value)} />
            <input type="button" value="Find" onClick={search} /> <br/>
           

            <ul> 
                {items}
            </ul>
        </div>
    )

}


export default AllMoviesComp;