import { Children, useEffect, useRef, useState } from "react";
import StarRating from "./components/starRating";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>    
        <h1>PopCorn</h1>
      </div>
  ) 
  
}

function Search({query, setQuery}) {
  // const [query, setQuery] = useState("");
  const inputEl = useRef(null)


  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  // useEffect(function () {

  //   function callback(e) {

  //     if (document.activeElement === inputEl.current) return; 

  //     if(e.code === "Enter"){
  //       inputEl.current.focus();
  //       setQuery("");
  //     }

      
  //   }

  //   document.addEventListener("keydown" ,callback)

  //   return ()=>(
  //     document.removeEventListener("keydown" ,callback)
  //   )

  // },[setQuery])
  return (
    <input className="search" type="input"
     placeholder="Search Movies & Shows" 
     value={query} onChange={(e)=>setQuery(e.target.value)}
     ref={inputEl}

    ></input>
  )
  
}

function NumResult({foundResult}) {

  return(
  <p className="num-results">
        <span> Found <strong>{foundResult}</strong> results</span>
      </p>)
  
}

function NavBar({children}) {
  
  return (
    <nav className="nav-bar">
        {/* <Logo></Logo>
        <Search></Search>
        <NumResult foundResult = {foundResult}></NumResult> */}
        {children}
      
    </nav>
  )
}

function Movie({movieInfo, onSelectMovie})  {
  console.log("movieInfo",movieInfo);
    return(
      <li onClick={()=>onSelectMovie(movieInfo.imdbID)}>
         <img src={movieInfo.Poster} alt={movieInfo.Title}></img>
         <h2>{movieInfo.Title}</h2>
         <div>
          <p>
            <span>📅</span>
            <span>{movieInfo.Year}</span>
          </p>
         </div> 
      </li>
    )
}

function WatchList({watchInfo, removeWatched}) {
   return (
    <li>
      <img src={watchInfo.Poster} alt={watchInfo.Title}></img>
         <h2>{watchInfo.Title}</h2>
         <div>
          <p>
            <span>📅</span>
            <span>{watchInfo.imdbRating}</span>
          </p>
          <p>
            <span>📅</span>
            <span>{watchInfo.userRating}</span>
          </p>
          <p>
            <span>📅</span>
            <span>{watchInfo.runtime}</span>
          </p>
          <button className="btn-delete" onClick={()=>removeWatched(watchInfo.imdbID)}>x-</button>
         </div>
    </li>
   )
}

function WatchedMovies({watchedList, removeWatched}) {
    return (
      <ul className="list">
      {watchedList.map((watch)=>{
        return (
          <WatchList removeWatched ={removeWatched} watchInfo={watch} key={watch.imdbID}></WatchList>)
      })
      }
    </ul>
    )
}

function Box({children}) {
  
  const [showList, setShowList] = useState(true);

  return (
    <div className="box">
    
    <button className="btn-toggle" onClick={()=>setShowList(!showList)}> {showList === true ? '-': "+"} </button>
    
    {showList && children
    }
    


    </div>
  )
}

function ListMovies({ moviesList, onSelectMovie }) {
  // Check if moviesList is undefined or null
  if (!moviesList) {
      return null; // or any fallback content you want to render
  }

  return (
      <ul className="list list-movies">
          {
              moviesList.length !== 0 && moviesList.map((movie) => { 
                  return (            
                      <Movie movieInfo={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}></Movie>
                  );
              })
          }
      </ul>
  );
}

// function MoviesList({moviesList}) {
//   const [showList, setShowList] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={()=>setShowList(!showList)}> {showList === true ? '-': "+"} </button>
      
//       {showList &&
//         }
//     </div>
//   ) 
// }
const KEY = "2f56b3db"
const tquery = "hera pheri"

export default function App() {
  const [query, setQuery] = useState("inception"); 
  const [isError, isLoading, movies] = useMovies(query, KEY, handleMovieClose);
  // const [movies, setMovies] = useState([]); 
  // const [isLoading, setLoading] = useState(false);
  // const [isError, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  // 
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watchedMovies"); 
  // const [watchedMovies, setWatchedMovies] = useState(function () {
  //   const intialWatchedData = localStorage.getItem("watchedMovies")
  //   return JSON.parse(intialWatchedData);
  // }); 
  // only during mount
  /*
  useEffect(function () {
    console.log("A");
  },[]);
  
  // every render
  useEffect(function () {
    console.log("B");
  })
  console.log("c");
  */


  function handleWatchedDeletion(id) {
    setWatchedMovies(watched => watched.filter(movie => movie.imdbID !== id));
    
  }

 function handleMovieClose() {
  console.log("handle movie close");
    setSelectedId((id)=> null);
 }

 function handleAddMovies(currmovie) {
  setWatchedMovies((watchedMovies) => [...watchedMovies, currmovie]);
  // localStorage.setItem("watchedMovies",JSON.stringify([...watchedMovies, currmovie]))
  handleMovieClose();
 }

  function onSelectMovie(id) {
    console.log("onSelectMovie",id);
    setSelectedId((selectedId) => id===selectedId ? null: id);
    
  }


  // useEffect(function () {
  //   localStorage.setItem("watchedMovies",JSON.stringify(watchedMovies));

  // },[watchedMovies])



  // useEffect(function() {

  //   const controller = new AbortController();

  //   async function fetchMovies() {
  //     try{
  //     setLoading(true);
  //     setError("");
  //     const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {
  //       signal:controller.signal
  //     });
  //     if(!res.ok){
  //       throw new Error("Error While Fetching Movies list");
  //     }
  //     const data = await res.json();
  //     console.log("data",data);
  //     if(data.Response === 'False'){
  //       throw new Error(data.Error);
  //     }

  //     setMovies(data.Search);

  //     setLoading(false);
  //   }
  //   catch(err){
  //     console.error(err.message);
  //     if(err.name !== "AbortError"){
  //       setError(err.message);
  //     }
      
  //   }
  //   finally{
  //     setLoading(false);      
  // }              
  //   }

  //   if(query.length < 2){
  //     setMovies([]);
  //     setError("");
  //     return;
  //   }
  //   handleMovieClose();
  //   fetchMovies();
  //   setError("");

  //   return function () {
  //       controller.abort(); 
  //   }

  // },[query])
  // 

  return (
    <div>
      <NavBar>
        <Logo></Logo>
        <Search query={query} setQuery={setQuery}></Search>
        <NumResult foundResult = {movies?.length ?? 0}></NumResult>
      </NavBar>
      <div className="main">
        <Box>
          {
            isLoading ? <Loader/> : isError ?<ErrorMessage message={isError} ></ErrorMessage>:  
           <ListMovies onSelectMovie={onSelectMovie}  moviesList={movies}></ListMovies>
          } 
        </Box>
        
        <Box>
        {
         selectedId ? <MovieDetails watchedList ={watchedMovies}  addWatchMovie ={handleAddMovies} closeMovie={handleMovieClose} selected={selectedId}/>:
         <>       
          <WatchedSummary watchedList={watchedMovies} ></WatchedSummary>
          <WatchedMovies removeWatched={handleWatchedDeletion} watchedList={watchedMovies}></WatchedMovies>
        </>
        }
        </Box>
        {/* <DisplayContent></DisplayContent> */}
      </div>
    </div>
  )
}

function ErrorMessage({message}) {
    return(
      <div className="error">
        <span>⛔</span> {message}
      </div>
    )
}


function Loader() {
  return(
    <p className="loader"> Loading...</p>

  )
}

function MovieDetails({selected, closeMovie, addWatchMovie, watchedList}) {
  
  const [loading , setLoading] = useState(false);
  const [error , setError] = useState("");
  const [movieRating, setMovieRating] = useState(0);
  const [movie, setMovie] = useState([]);
  const title = movie.Title; 
  const watchedRating = watchedList.find(movie=>movie.imdbID === selected)?.userRating; 

  const countRef = useRef(0);
  console.log('watchedRating',watchedRating);
  const watchedCheck = watchedList.filter((watched)=>{
    return watched.imdbID === selected;
  })
  console.log('watched',watchedCheck,watchedCheck.length );

  const isWatched  = watchedCheck.length > 0 ? false:true;
  // console.log('isWatched');




  function handleMovieRating(rating) {
    setMovieRating(rating);

  }

  
  function handleAddWatchedMovie() {
    const newMovie ={
      imdbID:selected,
      imdbRating:+(movie.imdbRating),
      Title:movie.Title,
      Poster:movie.Poster,
      Year:+(movie.year),
      runtime:+(movie.Runtime.split(" ")[0]),
      userRating:movieRating,
      countRatingDecisions:countRef.current
  
    }
    addWatchMovie(newMovie);
  }

  useEffect(function () {
    async function fetchMovieDetail() {
      try{
      setLoading(true);
      setError("");
      console.log("selected",selected);
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selected}`);
      if(!res.ok){
        throw new Error("Error While Fetching Movies list");
      }
      const data = await res.json();
      setLoading(false);

      console.log("data asdjasjn",data,typeof(data));
      console.log("loading",loading);
      setMovie(data)
      if(data.Response === 'False'){
        throw new Error(data.Error);
      }

    }
    catch(err){
      console.error(err.message);
      setError(err.message);
      
    }
    finally{
      setLoading(false);      
  }              
    }
    fetchMovieDetail()
  },[selected])

  // useEffect(function () {
  //   console.log('title',title);
  //   document.title = `Movie | ${movie.Title}`;

  //   return  function () {
  //     document.title = "usePopcorn";
  //     console.log(`movie title now after cleanup ${title}`); // now Even after Unmount Title value will still remain same because of js property called closure 
  //   }

  // },[title])
  
  useKey("Escape",closeMovie);

  // useEffect(function() {
  //   function callbackx(e) {
  //     if(e.code === "Escape"){
  //       console.log("calling closeMovie");
  //       closeMovie();
  //     }
  //   }
  //   document.addEventListener("keydown" ,callbackx)
  //   // to remove event listener from the dom to avoid memory issue because every time new movie is open new eventListener is attached
  //   return function(){
  //     document.removeEventListener("keydown", callbackx);
  //   }

  // },[closeMovie])

  useEffect(function () {
    if(movieRating>0){
      countRef.current += 1; 
    }
  },[movieRating])


  console.log("movie",movie.Title);

  return(
    <div className="details">
          {            
          loading === true ? <Loader/> :
      <>
      <header>
        <button className="btn-back" onClick={closeMovie}>&larr;</button>
        <img src={movie.Poster} alt="Girl in a jacket"></img>
        <div className="details-overview">
          <h2>{movie.Title}</h2>
          <p>{movie.Released} &bull; {movie.Runtime}</p>
          <p>{movie.Genre}</p>
          <p><span>{movie.imdbRating}</span>⭐ IMDB rating</p>

        </div>

      </header>
      <section>
      <div className="rating">
      {
        movieRating > 0 && 
        <button className="btn-add" onClick={handleAddWatchedMovie}>+Add to the list</button>
        }
        {isWatched ?
        <StarRating setOutRating={handleMovieRating} size={24}></StarRating>
        : <p>You already rated with ⭐{watchedRating}</p>}

      </div>
        <p>{movie.Plot}</p>
        <p>Cast: {movie.Actors}</p>
        <p>Directed By: {movie.Director}</p>
      </section>
      </>
      }      
    </div>
    
  )
}


function WatchedSummary({watchedList}) {


  const numWatched = watchedList.length;
  const avgWatchHour = average(watchedList.map((cur)=>  cur.runtime));
  const avgUsrRating = average(watchedList.map((cur)=>  cur.userRating));
  const avgImdbRating = average(watchedList.map((cur)=>  cur.imdbRating));
  const avgWatchedInfo = {
    'hours':avgWatchHour,
    'usrRating':avgUsrRating,
    'imdbRating':avgImdbRating
  }
    return (
      <div className="summary">
        <h2>Movies You have Watched</h2>
        <div>
          <p>
            <span>
              #️⃣</span>
              <span>{numWatched} Movies</span>  
            
          </p>
          <p>
            <span>
              🌟</span> 
             <span>{+(avgWatchedInfo.usrRating.toFixed(2))} </span>  
            
          </p>
            <p>
            <span>⭐ {+(avgWatchedInfo.imdbRating).toFixed(2)}</span>

            </p>
            <p>
            <span> ⌛</span> 
             <span>{+(avgWatchedInfo.hours.toFixed(2))}</span>   
            

            </p>
          
        </div>
      </div>
    )
}