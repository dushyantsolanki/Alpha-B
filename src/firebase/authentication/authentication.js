import { config } from "../config/config";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
  FacebookAuthProvider,
  signOut,
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
      await sendEmailVerification(this.auth.currentUser);
      updateProfile(this.auth.currentUser, {
        displayName: userName,
      });
      return {
        code: "success",
        message: `We send the email verification link to your email ${email} `,
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

  login_with_email_password = async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return {
        code: "success",
        message: `Login successfull !!! `,
        payload: response.user,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : login_with_email_password() : error_message => ${error.message}`
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

  password_reset = async (email) => {
    try {
      const response = await sendPasswordResetEmail(this.auth, email);
      return {
        code: "success",
        message: `password reset link send to your ${email} !!! `,
        payload: response,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : password_reset() : error_message => ${error.message}`
      );
      return { code: error?.code, message: error?.message, status: false };
    }
  };

  //  custom function to varify the user email

  email_varify_checker = async (status) => {
    if (status === true) {
      return true;
    } else {
      const response = await signOut(this.auth);
      return !response ? false : 1;
    }
  };

  logout = async () => {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.log(
        `firebase : authentication : authentication.js : logout() : error_message => ${error.message}`
      );
      return { code: error?.code, message: error?.message, status: false };
    }
  };
}

export const authentication = new Authentication_Firebase();
