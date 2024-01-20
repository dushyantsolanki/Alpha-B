import React, { useState } from "react";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { toast, toastConfig } from "../../components/";
import { Button, Input, TextField } from "@mui/material";
import { CloudUploadRounded } from "../../icon/icon.js";
import { firestore, bucket } from "../../firebase/";

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
  const [timestamp, setTimestamp] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //   // file Upload :
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const imageUploadResponse = await bucket.uploadImage(selectedFile);

    if (imageUploadResponse.status === true) {
      setIsLoading(false);
      setImageUrl(imageUploadResponse.payload);
      toast.success(`${imageUploadResponse.message}`, toastConfig);
    }
    //
    else {
      setIsLoading(false);
      toast.error(`${imageUploadResponse.message}`, toastConfig);
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
        toast.success(`${firestoreUploadDataResponse.message}`, toastConfig);
      }
      //
      else {
        toast.error(`${firestoreUploadDataResponse.message}`, toastConfig);
      }
    }
    //
    else {
      toast.error(`Content and image is required `, toastConfig);
    }
    setIsLoading(false);
  };

  return (
    <div className="editor-form">
      <div className="left ">
        {" "}
        <form className="editor-form" onSubmit={handleSubmit}>
          <TextField
            required
            type="text"
            label="Title"
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
                  "https://img.freepik.com/vecteurs-libre/illustration-du-concept-telechargement-image_114360-996.jpg?w=740&t=st=1705302242~exp=1705302842~hmac=f6699cab996d453ffc5a59e3ae50edf91b35040a0da8177dac248e1c10d6196a"
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
