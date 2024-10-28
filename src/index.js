import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from "./components/starRating";
const root = ReactDOM.createRoot(document.getElementById('root'));


function Test() {
    const [movieRating, setMovieRating] = useState(0);

    function handleMovieRating(rating) {
      setMovieRating(rating);
    }
    return(
      <div>
        <StarRating maxRating={10} color='red' setOutRating={handleMovieRating}/>
        <p>Your have rated {movieRating} for this movie </p>
      </div>

    )
}



root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={10} />
    <StarRating maxRating={10} color='white' size={20} defaultRating={2} className="" />
    <Test></Test> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

