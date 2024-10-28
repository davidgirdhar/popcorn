import { Children, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:"https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:"https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

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

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input className="search" type="input" placeholder="Search Movies & Shows" value={query} onChange={(e)=>setQuery(e.target.value)}></input>
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

function Movie({movieInfo})  {
    return(
      <li>
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


function WatchList({watchInfo}) {
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
         </div>
    </li>
   )
}

function WatchedMovies({watchedList}) {
    return (
      <ul className="list">
      {watchedList.map((watch)=>{
        return (
          <WatchList watchInfo={watch} key={watch.imdbID}></WatchList>)
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

function ListMovies({moviesList}) {
  return (
  <ul className="list">
      {
        moviesList.map((movie) =>{ 
        
          return(
            <Movie movieInfo={movie} key={movie.imdbID}></Movie>
          )
        })
      }

      </ul>
 ) 
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

export default function App() {
  const [movies, setMovies] = useState(tempMovieData); 
  const [watchedMovies, setWatchedMovies] = useState(tempWatchedData); 
  return (
    <div>
      <NavBar>
        <Logo></Logo>
        <Search></Search>
        <NumResult foundResult = {movies.length}></NumResult>
      </NavBar>
      <div className="main">
        <Box>
           <ListMovies  moviesList={movies}></ListMovies>
        </Box>
        
        <Box>
        <WatchedSummary watchedList={watchedMovies} ></WatchedSummary>
        <WatchedMovies watchedList={watchedMovies}></WatchedMovies>
        </Box>
        {/* <DisplayContent></DisplayContent> */}
      </div>
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
             <span>{avgWatchedInfo.usrRating} </span>  
            
          </p>
            <p>
            <span>⭐ {avgWatchedInfo.imdbRating}</span>

            </p>
            <p>
            <span> ⌛</span> 
             <span>{avgWatchedInfo.hours}</span>   
            

            </p>
          
        </div>
      </div>
    )
}