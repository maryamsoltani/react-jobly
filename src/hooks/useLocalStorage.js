import { useState, useEffect } from "react";

// Creating a custom useState like hook to initally check LS for token. 
// If not found, then return null
const useLocalStorage = (key, firstVal = null) => {
  // Try to get LS key if not populate firstVal
  const initialVal = localStorage.getItem(key) || firstVal;
  // Create state managed here - lsToken will be actual token or null
  const [lsToken, setlsToken] = useState(initialVal);

  // Manage updating
  useEffect(() => {
    if (lsToken === null) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, lsToken)
    }

  }, [key, lsToken]);

  return [lsToken, setlsToken]


  // const [value, setValue] = useState(() => {
  //   const localStorageItem = localStorage.getItem(localStorageKey);
  //   if (localStorageItem === null) return defaultValue;
  //   try {
  //     return JSON.parse(localStorageItem);
  //   } catch (err) {
  //     return defaultValue;
  //   }
  // });

  // useEffect(() => {
  //   localStorage.setItem(localStorageKey, JSON.stringify(value));
  // }, [value]);

  // // Expose the value and the updater function.
  // return [value, setValue];
  // const [lsToken, setLsToken] = useState(null);
  
  // // Store, retrive, or delete localStorage data for token
  // if (operation === "SET") {
  //   console.log("setting LS, TOKEN ISSSSS", res);
  //   localStorage.setItem("lsToken", JSON.stringify(res))
  //   setLsToken(res)

  // } else if (operation === "GET" && lsToken) {
  //   const retrivedToken = JSON.parse(localStorage.getItem("lsToken"))
  //   return retrivedToken;

  // } else if (operation === "REMOVE" && lsToken) {
  //   localStorage.removeItem("lsToken")

  // } else {
  //   let error = "Unknown useLocalStorage Operation, please try again"
  //   console.error(error)
  // }
  


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(url, options);
  //       const json = await res.json();
  //       setResponse(json);
  //     } catch (error) {
  //       setError(error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // return lsToken;
  // return "Hello world";
};

export default useLocalStorage;
