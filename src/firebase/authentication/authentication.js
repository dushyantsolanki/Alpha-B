import { config } from "../config/config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

class Authentication_Firebase {
  app = initializeApp(config);
  auth;
  googleProvider;
  twitterProvider;
  facebookProvider;
  constructor() {
    this.auth = getAuth(this.app);
    this.googleProvider = new GoogleAuthProvider();
    this.twitterProvider = new TwitterAuthProvider();
    this.facebookProvider = new FacebookAuthProvider();
  }

  signupUser = async ({ email, password, userName }) => {
    try {
      const response = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
        userName
      );
      return {
        code: "success",
        message: `Welcom to Alpha-Blog family ${userName} `,
        payload: response.user,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : signupUser() : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  login_with_google = async () => {
    try {
      const response = await signInWithPopup(this.auth, this.googleProvider);
      return {
        code: "success",
        message: `sucessfull login with google `,
        payload: response.user,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : login_with_google : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  login_with_twitter = async () => {
    try {
      const response = await signInWithPopup(this.auth, this.twitterProvider);
      return {
        code: "success",
        message: `sucessfull login with twitter `,
        payload: response.user,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : login_with_twitter : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };

  login_with_facebook = async () => {
    try {
      const response = await signInWithPopup(this.auth, this.facebookProvider);
      return {
        code: "success",
        message: `sucessfull login with facebook `,
        payload: response.user,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : login_with_facebook : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }
  };
}

export const authentication = new Authentication_Firebase();
