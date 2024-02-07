import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import parse from "html-react-parser";

function FullBlog() {
  const { blogId } = useParams();
  const [data, setData] = useState({});
  console.log(typeof blogId);

  const fatchBlog = async () => {
    const response = await firestore.fatchFullBlog(blogId);
    console.log(response.payload);
    if (response.status === true) {
      setData(response.payload);
    }
  };
  console.log(data);
  useEffect(() => {
    fatchBlog();
  }, []);
  return data ? (
    <>
      <div className="full-blog-page-main">
        <div className="blog-full-page-layout">
          <h1>{data.title}</h1>
          <img
            src={data.imageUrl}
            alt="image-url"
            width="800px"
            height="500px"
          />
          <p>{parse(data.content || "<p> Loading... </p>")}</p>
        </div>
      </div>
    </>
  ) : (
    <h1>Loading .....</h1>
  );
}

export default FullBlog;
