import React, { useState } from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { toast } from "../../components/";
import { Button, Input, TextField } from "@mui/material";
import { CloudUploadRounded } from "../../icon/icon.js";
import { firestore, bucket } from "../../firebase/";
import { useSelector } from "../../redux/";

// tinyMCE configuration object
const editorConfig = {
  menubar: true,
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | bold italic backcolor  | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat  | help",
};

const Editor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // userId fetch from redux

  const { uid } = useSelector((state) => state.authReducer.userData.payload);

  //   // file Upload :
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const imageUploadResponse = await bucket.uploadPostImage(selectedFile);

    if (imageUploadResponse.status === true) {
      setIsLoading(false);
      setImageUrl(imageUploadResponse.payload);
      toast.success(`${imageUploadResponse.message}`);
    }
    //
    else {
      setIsLoading(false);
      toast.error(`${imageUploadResponse.message}`);
    }
    setSelectedFile(null);
  };

  //  data send to the firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const tagArr = tags.split(" ");
    if (content.length > 0 && imageUrl) {
      const firestoreUploadDataResponse = await firestore.sendDoc({
        title,
        content,
        tags: tagArr,
        timestamp,
        imageUrl,
        price,
        authorId: uid,
      });
      console.log(firestoreUploadDataResponse);
      if (firestoreUploadDataResponse.status === true) {
        console.log(
          "Blog post uload to firestore : ",
          firestoreUploadDataResponse.payload
        );
        setContent("");
        setTags("");
        setImageUrl("");
        setTimestamp("");
        setTitle("");
        setPrice("");
        toast.success(`${firestoreUploadDataResponse.message}`);
      }
      //
      else {
        toast.error(`${firestoreUploadDataResponse.message}`);
      }
    }
    //
    else {
      toast.error(`Content and image is required `);
    }
    setIsLoading(false);
  };

  return (
    <div className="editor-form" data-aos="zoom-in">
      <div className="left ">
        {" "}
        <form className="editor-form" onSubmit={handleSubmit}>
          <TextField
            required
            type="text"
            label="Product Name"
            name="title"
            fullWidth
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {/* here i add a editor */}

          <div className="tinyMce-editor">
            <TinyEditor
              apiKey="xgnn79cw0ykhybh79jqwz553bic3fsx0hdfm69ihuh3f17cf"
              init={editorConfig}
              onEditorChange={(e) => {
                setContent(e);
              }}
            ></TinyEditor>
          </div>
          <TextField
            required
            // id="outlined-required"
            label="Tags"
            name="tags"
            type="text"
            value={tags}
            fullWidth
            onChange={(e) => {
              setTags(e.target.value);
            }}
          />
          <TextField
            required
            type="text"
            label="Price"
            name="Price"
            fullWidth
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            required
            // id="outlined-required"
            type="date"
            name="timestamp"
            value={timestamp}
            fullWidth
            onChange={(e) => {
              setTimestamp(e.target.value);
            }}
          />
          <div className="form">
            <div className="previewImage">
              <img
                className="upload-image"
                src={
                  imageUrl ||
                  "https://user-images.githubusercontent.com/6290720/91559755-9d6e8c00-e973-11ea-9bde-4b60c89f441a.png"
                }
                alt="Preview Image Logo"
              />
              <label htmlFor="file-name">
                {" "}
                <p style={{ fontSize: "small" }}> {selectedFile?.name}</p>
              </label>
            </div>{" "}
            <div className="select-item">
              <Input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button
                  component="span"
                  disabled={isLoading}
                  variant="contained"
                  startIcon={<CloudUploadRounded />}
                  style={{ margin: "0 17px" }}
                >
                  Choose File
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  disabled={isLoading}
                >
                  Upload
                </Button>
              </label>
            </div>
          </div>
          <Button
            variant="outlined"
            type="submit"
            disabled={isLoading}
            startIcon={<CloudUploadRounded />}
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Upload Post
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Editor;
