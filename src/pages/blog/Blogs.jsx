import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import {
  CardActionArea,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { SwiperCompo } from "../index";
import { firestore } from "../../firebase/";

function Blogs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await firestore.receveDoc();
    console.log(response.payload);
    if (response.status === true) {
      setData(response.payload);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className="main-blog-page"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <SwiperCompo />
        {data?.map((html, index) => {
          return (
            <Card sx={{ maxWidth: 345 }} key={index}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={html.imageUrl}
                  alt="green iguana"
                  onClick={() => {
                    navigate(`/home/blogs/${html.id}`);
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {parse(html.title)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    style={{
                      "text-align": "left",
                      display: "-webkit-box",
                      "-webkit-box-orient": "vertical",
                      overflow: "hidden",
                      "-webkit-line-clamp": "4",
                    }}
                  >
                    {parse(html.content)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Blogs;
