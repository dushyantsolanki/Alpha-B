import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { config } from "../config/config";

class Firebase_Firestore {
  app = initializeApp(config);
  db;
  constructor() {
    this.db = getFirestore(this.app);
  }

  sendDoc = async ({
    title,
    content,
    imageUrl,
    tags,
    timestamp,
    authorId = "123456789",
  }) => {
    try {
      const docRef = await addDoc(collection(this.db, "posts"), {
        authorId,
        content,
        imageUrl,
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

  receveDoc = async () => {
    try {
      const querySnapshot = await getDocs(collection(this.db, "posts"));
      return {
        code: "success",
        message: "Data sent successfully",
        payload: querySnapshot,
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
}

export const firestore = new Firebase_Firestore();
