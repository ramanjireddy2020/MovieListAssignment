import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
const MovieSearch = (props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [lang, setlan] = React.useState("");
  const [filteredMovies, setfilteredMovies] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const OnLanguageChange = (event) => {
    props.languagechangeHandler(event.target.value);
    setlan(event.target.value);
  };
  const OntitleChnageHandler = (event) => {
    props.titleChangeHandler(event.target.value);
    setSearchTitle(event.target.value);
  };
  const applyallfilterSearch = () => {
    props.allfilterHandler();
    let searchTextfilteredMoviesfortext = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    let searchLanguagefilteredMoviesforlan =
      searchTextfilteredMoviesfortext.filter(
        (movie) => movie.original_language === searchLanguage
      );

    setfilteredMovies(searchLanguagefilteredMoviesforlan);
    const newSearch = {
      term: searchTitle,
      language: lang,
    };
    setSearchHistory((prevSearchHistory) => [newSearch, ...prevSearchHistory]);
    setSearchTitle("");
    setlan("");
    // const newSearch = {
    //   title: searchTitle,
    //   language: searchLanguage,
    //   timestamp: new Date().toLocaleString(),
    // };

    // setSearchHistory((prevSearchHistory) => [
    //   newSearch,
    //   ...prevSearchHistory.slice(0, 2),
    // ]);
  };
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);
  const removeSearchHistoryItem = (index) => {
    setSearchHistory((prevSearchHistory) => {
      const updatedSearchHistory = [...prevSearchHistory];
      updatedSearchHistory.splice(index, 1);
      return updatedSearchHistory;
    });
  };
  const onClearSearch = () => {
    setSearchHistory([]);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <div>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "50ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="Title Search"
              variant="filled"
              onChange={OntitleChnageHandler}
            />
          </Box>
        </div>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Langauge</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label="Age"
              onChange={OnLanguageChange}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">France</MenuItem>
              <MenuItem value="ru">Arabic</MenuItem>
              <MenuItem value="es">Spain</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div>
          <Button variant="contained" onClick={applyallfilterSearch}>
            Apply Filters
          </Button>
        </div>
      </div>
      <div>
        {searchHistory.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "400px",
            }}
          >
            <div>Search History:</div>
            <ul style={{ display: "flex", alignItems: "center" }}>
              {searchHistory.map((search, index) => (
                <div
                  style={{
                    display: "flex",
                    padding: "10px",
                    backgroundColor: "#454545",
                    margin: "5px",
                  }}
                >
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {`${search.term}(${search.language})`}

                    <CloseIcon
                      style={{ cursor: "pointer" }}
                      fontSize="small"
                      onClick={() => removeSearchHistoryItem(index)}
                    />
                  </div>
                </div>
              ))}
            </ul>
            <Button variant="contained" onClick={onClearSearch}>
              Claer Search
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieSearch;
