import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Spinner from "./Spinner";
import "./MovieList.css";

const MovieList = ({ lang, title, allfilterbtn }) => {
  const [moviesdata, setmoviedata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=${currentPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setisLoading(false);
        console.log("data", data.results);
        setmoviedata(data.results);
        setfilteredMovies(data.results);
      });
  }, [currentPage]);

  useEffect(() => {
    let filteredMoviesonsearch = filteredMovies.filter(
      (movie) => movie.original_language == lang
    );
    setfilteredMovies(filteredMoviesonsearch);
  }, [lang]);

  useEffect(() => {
    let filteredMoviesonsearch = moviesdata.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
    setfilteredMovies(filteredMoviesonsearch);
  }, [moviesdata, title]);
  useEffect(() => {
    console.log("button clicked");
    let searchTextfilteredMoviesfortext = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );

    let searchLanguagefilteredMoviesforlan =
      searchTextfilteredMoviesfortext.filter(
        (movie) => movie.original_language === lang
      );

    setfilteredMovies(searchLanguagefilteredMoviesforlan);
  }, [allfilterbtn]);
  // const handleSearchTitleChange = (event) => {
  //   setSearchTitle(event.target.value);
  // };

  const handleSearchLanguageChange = (event) => {
    setSearchLanguage(event.target.value);
  };

  const handleSearch = () => {
    let searchTextfilteredMoviesfortext = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );

    let searchLanguagefilteredMoviesforlan =
      searchTextfilteredMoviesfortext.filter(
        (movie) => movie.original_language === searchLanguage
      );

    setfilteredMovies(searchLanguagefilteredMoviesforlan);
    const newSearch = {
      title: title,
      language: lang,
      timestamp: new Date().toLocaleString(),
    };

    setSearchHistory((prevSearchHistory) => [
      newSearch,
      ...prevSearchHistory.slice(0, 2),
    ]);
  };

  const handleDeleteSearch = (index) => {
    setSearchHistory((prevSearchHistory) =>
      prevSearchHistory.filter((_, i) => i !== index)
    );
  };

  const handleClearSearchHistory = () => {
    setSearchHistory([]);
  };
  const handlePageChange = (event, page) => {
    console.log("cuurent", page);
    setCurrentPage(page);
  };

  //copy end
  return (
    <>
      {filteredMovies.length === 0 ? (
        <h1>No Data Available for Searched filter</h1>
      ) : (
        <div className="main">
          <div className="movielist">
            {isLoading && <Spinner />}

            {!isLoading &&
              filteredMovies.map((moviedata, i) => (
                <MovieCard key={i} moviedata={moviedata} />
              ))}
          </div>
          {!isLoading && filteredMovies.length > 0 && (
            <div className="pagination">
              <Stack spacing={2}>
                <Pagination
                  count={10}
                  variant="outlined"
                  shape="rounded"
                  page={currentPage}
                  onChange={handlePageChange}
                />
              </Stack>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MovieList;
