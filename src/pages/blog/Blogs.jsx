import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/";

function Blogs() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await firestore.receveDoc();
    console.log(response.payload);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Blogs</div>;
}

export default Blogs;
