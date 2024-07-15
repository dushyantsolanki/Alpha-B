import {
  Button,
  TextField,
  Input,
  InputAdornment,
  Avatar,
} from "@mui/material";
import {
  IconButton,
  MailIcon,
  AccountCircleIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CloudUploadRounded,
} from "../../icon/icon";
import { firestore, bucket } from "../../firebase/";
import { toast } from "../../components/";
import { useSelector } from "../../redux";
import { useState, useEffect } from "react";

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const userData = useSelector((state) => state.authReducer.userData.payload);

  const retriveFirestoreData = async () => {
    const response = await firestore.retriveFirestoreDocRegister(userData?.uid);
    if (response?.payload[0]) {
      setRegisterData(response.payload[0]);
    }
  };
  useEffect(() => {
    retriveFirestoreData();
  }, []);

  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    imageUrl: registerData?.userImage,
    showPassword: false,
    isValidUser: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isEditable, setIsEditable] = useState(false);

  // for uniuqe user name
  const user = async () => {
    const res = await firestore.retriveDoc(formData);
    if (res.status === false) {
      toast.error(`${res.message}`, toastConfig);
    } else {
      if (formData.userName.length > 0) {
        setFormData((prev) => ({ ...prev, isValidUser: res.payload }));
      } else {
        setFormData((prev) => ({ ...prev, isValidUser: false }));
      }
    }
  };
  // onChange event run
  const onChangeHadler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    user();
  }, [formData.userName]);

  // send data to firebase firestore for update user information .

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const response = await firestore.updateRegisterDoc(
      formData,
      userData.uid,
      registerData.id,
      registerData.userImage,
      registerData.email,
      registerData.password
    );
    if (response.status === true) {
      toast.success(`User data updated .`);
    } else {
      toast.error(`${response.message}`);
    }
    setIsEditable(false);
  };

  // for image change handle upload sections.
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // for image upload handle section .

  const handleUpload = async () => {
    setIsLoading(true);
    const imageUploadResponse = await bucket.uploadUserImage(selectedFile);

    if (imageUploadResponse.status === true) {
      setIsLoading(false);
      setFormData((prev) => ({
        ...prev,
        imageUrl: imageUploadResponse.payload,
      }));
      toast.success(`${imageUploadResponse.message}`);
    }
    //
    else {
      setIsLoading(false);
      toast.error(`${imageUploadResponse.message}`);
    }
    setSelectedFile(null);
  };

  return false ? (
    <h1 data-aos="zoom-in">You Can not change or view your profile.</h1>
  ) : (
    <>
      <div className="profile-main" data-aos="zoom-in">
        <div className="profile-back">
          <div className="image-profile-section">
            <div className="image-profile">
              <div className="form-profile">
                <div className="previewImage-profile">
                  <Avatar
                    alt="User"
                    className="preview-image-profile"
                    src={
                      formData.imageUrl == null
                        ? registerData.userImage ||
                          "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=626&ext=jpg"
                        : formData.imageUrl
                    }
                    style={{
                      width: "10rem",
                      height: "10rem",
                      marginTop: "1rem",
                    }}
                  />
                </div>{" "}
                {isEditable === true ? (
                  <div className="select-item -profile">
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
                        style={{ margin: "0 17px" }}
                      >
                        Choose File
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={isLoading}
                        startIcon={<CloudUploadRounded />}
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="user-profile-information">
              <h6 className="width">{registerData?.userName}</h6>
              <p className="width">{registerData?.email}</p>
            </div>
          </div>
        </div>
        <div className="editable-section-profile">
          <form onSubmit={onHandleSubmit}>
            <div className="username-profile">
              <div className="edit-profile-btn full-width ">
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isEditable}
                  onClick={() => {
                    setIsEditable(true);
                  }}
                >
                  Update
                </Button>
              </div>
              <div className="username full-width">
                <TextField
                  required
                  type="text"
                  placeholder="Username"
                  name="userName"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <AccountCircleIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  disabled={!isEditable}
                  value={isEditable ? formData.userName : registerData.userName}
                  onChange={onChangeHadler}
                  error={formData.isValidUser}
                  helperText={
                    formData.isValidUser &&
                    `${formData.userName} is already use`
                  }
                />
              </div>
              <div className="fullname full-width">
                <div className="firstName half-width">
                  {" "}
                  <TextField
                    required
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    fullWidth
                    disabled={!isEditable}
                    onChange={onChangeHadler}
                    value={
                      isEditable ? formData.firstName : registerData.firstName
                    }
                  />
                </div>
                <div className="lastName half-width ">
                  {" "}
                  <TextField
                    required
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    fullWidth
                    disabled={!isEditable}
                    onChange={onChangeHadler}
                    value={
                      isEditable ? formData.lastName : registerData.lastName
                    }
                  />
                </div>
              </div>
              <div className="email full-width">
                <TextField
                  required
                  id="outline-required"
                  type="email"
                  placeholder="Email"
                  name="email"
                  fullWidth
                  onChange={onChangeHadler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <MailIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  disabled={true}
                  value={registerData.email}
                />
              </div>
              <div className="password full-width">
                {" "}
                <TextField
                  required
                  type={formData.showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  fullWidth
                  disabled={true}
                  onChange={onChangeHadler}
                  value={registerData.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              showPassword: !prev.showPassword,
                            }));
                          }}
                          edge="end"
                        >
                          {formData.showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="btn-profile full-width">
              <Button
                variant="contained"
                type="submit"
                className="btn-save-profile"
                fullWidth
                disabled={formData.isValidUser || isEditable === false}
                style={{ margin: "2rem 0 2rem 0 " }}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
