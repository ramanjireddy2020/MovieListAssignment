import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState } from "react";
const MovieCard = ({ moviedata }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    maxWidth: 345,
    transform: isHovered ? "scale(1.06)" : "scale(1)",
    transition: "transform 0.3s ease-in-out",
    Zindex: 2,
  };
  const typographyStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  };
  return (
    <>
      <Card
        sx={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://images.thedirect.com/media/article_full/avatar-2-reviews.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {moviedata.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={typographyStyle}
            >
              <b>Story Line:</b> {moviedata.overview}
            </Typography>
            <br></br>
            <div>
              <div>
                <b>User Rating:</b> {moviedata.vote_average}
              </div>
              <div>
                <b>Total Users:</b> {moviedata.vote_count}
              </div>
              <div>
                <b>Release Date:</b> {moviedata.release_date}
              </div>
              <div>
                <b>Language:</b>
                {moviedata.original_language}
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default MovieCard;
