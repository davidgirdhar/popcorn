import {React, useState, useEffect} from "react";

// 
export function useLocalStorage(intial, key){

    const [value, setValue] = useState(function () {
        const intialWatchedData = localStorage.getItem(key);
        return intialWatchedData ? JSON.parse(intialWatchedData):intial;
    });
    
    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(value));
    
    },[value, key])
    

    return [value, setValue];
    // const intialWatchedData = localStorage.getItem();
    // return JSON.parse(intialWatchedData);
}