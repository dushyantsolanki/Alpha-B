import { config } from "../config/config";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
class Storage {
  app = initializeApp(config);
  storage;

  constructor() {
    this.storage = getStorage(this.app);
  }

  uploadImage = async (file) => {
    try {
      const storageRef = ref(this.storage, `postImage/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      // console.log(imageUrl);

      return {
        code: "success",
        message: "image upload successfully",
        payload: imageUrl,
        status: true,
      };
    } catch (error) {
      console.log(
        `firebase : storage : storage.js : uploadImage : error_message => ${error.message}`
      );

      return { code: error?.code, message: error?.message, status: false };
    }

    //
  };
}

export const bucket = new Storage();
