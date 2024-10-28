import {React, useState, useEffect} from "react";


export function useMovies(query, KEY, callback){
    const [isloading , setLoading] = useState(false);
    const [isError , setError] = useState("");
    const [movies, setMovies] = useState([]); 

    useEffect(function() {

        const controller = new AbortController();
    
        async function fetchMovies() {
          try{
          setLoading(true);
          setError("");
          const res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`, {
            signal:controller.signal
          });
          if(!res.ok){
            throw new Error("Error While Fetching Movies list");
          }
          const data = await res.json();
          console.log("data",data);
          if(data.Response === 'False'){
            throw new Error(data.Error);
          }
    
          setMovies(data.Search);
    
          setLoading(false);
        }
        catch(err){
          console.error(err.message);
          if(err.name !== "AbortError"){
            setError(err.message);
          }
          
        }
        finally{
          setLoading(false);      
      }              
        }
    
        if(query.length < 2){
          setMovies([]);
          setError("");
          return;
        }
        callback?.();
        fetchMovies();
        setError("");
    
        return function () {
            controller.abort(); 
        }
    
      },[query])

      return [isError, isloading, movies];
}