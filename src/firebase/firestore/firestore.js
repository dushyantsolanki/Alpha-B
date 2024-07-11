import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  FieldValue,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { config } from "../config/config";

class Firebase_Firestore {
  app = initializeApp(config);
  db;
  auth;
  constructor() {
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  sendDoc = async ({
    title,
    content,
    imageUrl,
    tags,
    timestamp,
    price,
    authorId = "123456789",
  }) => {
    try {
      const docRef = await addDoc(collection(this.db, "posts"), {
        authorId,
        content,
        imageUrl,
        price,
        tags,
        timestamp,
        title,
      });
      return {
        code: "success",
        message: "Post was uploaded successfully",
        payload: docRef,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : sendDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  sendConatactDoc = async (fullName, company, email, phone, message) => {
    try {
      const docRef = await addDoc(collection(this.db, "contacts"), {
        fullName,
        company,
        email,
        phone,
        message,
      });
      return {
        code: "success",
        message: " Thanks for contact.",
        payload: docRef,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : sendConatactDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  receveDoc = async () => {
    try {
      const querySnapshot = await getDocs(collection(this.db, "posts"));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        code: "success",
        message: "Data sent successfully",
        payload: documents,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : receveDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  registerDoc = async (
    { userName, firstName, lastName, email, password },
    userData
  ) => {
    try {
      const docRef = await addDoc(collection(this.db, "register"), {
        userName,
        firstName,
        lastName,
        email,
        password,
        userImage: userData.photoURL,
        userId: userData.uid,
      });
      return {
        code: "success",
        message: "Data was uploaded successfully",
        payload: docRef,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : registerDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  retriveDoc = async ({ userName }) => {
    try {
      const usersCollection = collection(this.db, "register");

      const snapshot = await getDocs(
        query(usersCollection, where("userName", "==", userName))
      );

      return {
        code: "success",
        message: "username was fetch successfully",
        payload: !snapshot.empty,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : retriveDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  retriveFirestoreDocRegister = async (userId) => {
    try {
      const usersCollection = collection(this.db, "register");

      const snapshot = await getDocs(
        query(usersCollection, where("userId", "==", userId))
      );
      const documents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return {
        code: "success",
        message: "register was fetch successfully",
        payload: documents,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : retriveFirestoreDocRegister : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };
  fatchFullBlog = async (blogId) => {
    try {
      const querySnapshot = await getDoc(doc(this.db, "posts", blogId));

      return {
        code: "success",
        message: "Data sent successfully",
        payload: querySnapshot.data(),
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : receveDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };
  updateRegisterDoc = async (
    { userName, firstName, lastName, imageUrl },
    uid,
    id,
    userImage,
    email,
    password
  ) => {
    try {
      const docRef = await setDoc(doc(this.db, "register", id), {
        userName,
        firstName,
        lastName,
        email: email,
        password: password,
        userImage: imageUrl || userImage,
        userId: uid,
      });

      // Firebase authentication service profile update
      updateProfile(this.auth.currentUser, {
        displayName: userName,
        photoURL: imageUrl || userImage,
      });

      return {
        code: "success",
        message: "Data was updated successfully",
        payload: docRef,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : updateRegisterDoc : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  updateLikeInPost = async (postId) => {
    try {
      const updatePostPath = this.db.collection("post").doc(`${postId}`);
      const result = await updatePostPath.update({
        likes: FieldValue.arrayUnion(`${postId}`),
      });

      return {
        code: "success",
        message: "Data was updated successfully",
        payload: result,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : firestore : firestore.js : updateLikeInPost : error_message => ${error.message}`
      );
    }
  };
}

export const firestore = new Firebase_Firestore();
