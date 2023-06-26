import React from "react";
import MovieSearch from "./components/MovieSearch";
import MovieList from "./components/MovieList";
import MovieCard from "./components/MovieCard";
import { useState } from "react";
function App() {
  const [searchTitle, setSearchTitle] = useState("");
  const [lang, setlan] = React.useState("");
  const [allfilterbtn, setallfilterbtn] = useState("");
  const OnlanguageChnage = (data) => {
    setlan(data);
  };
  const handleSearchTitleChange = (data) => {
    setSearchTitle(data);
  };
  const OnallfilterHandler = () => {
    setallfilterbtn(Math.random());
  };
  return (
    <div>
      <MovieSearch
        languagechangeHandler={OnlanguageChnage}
        titleChangeHandler={handleSearchTitleChange}
        allfilterHandler={OnallfilterHandler}
      />
      <MovieList
        allfilterbtn={allfilterbtn}
        lang={lang}
        title={searchTitle}
        allfilterHandler={OnallfilterHandler}
      />
    </div>
  );
}

export default App;
