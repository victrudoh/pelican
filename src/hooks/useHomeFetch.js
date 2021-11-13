import { useState, useEffect, useRef } from 'react';

//API
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
}


export const useHomeFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.result] : [...movies.results],
      })); //we put () before the {} because we are trying to return an object and if we use just {} it will think its the { } of the arrow function
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  //initial render
  useEffect(() => {
    fetchMovies(1);
  }, []); //the [] is an empty dependency array, and its empty meaning that the function only run once

  return { state, loading, error };

};
