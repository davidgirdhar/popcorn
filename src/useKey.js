import {React, useEffect} from "react";

export function useKey(key, action, ){
    useEffect(function() {
        function callbackx(e) {
          if(e.code.toLowerCase() === key.toLowerCase()){
            console.log("calling closeMovie");
            action();
          }
        }
        document.addEventListener("keydown" ,callbackx)
        // to remove event listener from the dom to avoid memory issue because every time new movie is open new eventListener is attached
        return function(){
          document.removeEventListener("keydown", callbackx);
        }
    
    },[action, key])
}