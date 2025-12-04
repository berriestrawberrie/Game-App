import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import type {
  UserWithPasswordInterface,
  UserLoginInterface,
} from "../interfaces/interfaces";
import { userCreationSchema } from "../schemas/schemas";

const BACKEND_PORT = "4000";
const BASE_URL = `http://localhost:${BACKEND_PORT}/players`;

export const registerPlayer = async (userInfo: UserWithPasswordInterface) => {
  try {
    const validatedUserInfo = userCreationSchema.safeParse(userInfo);
    await createUserWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    if (!validatedUserInfo.success) throw validatedUserInfo.error;

    const token = await auth.currentUser?.getIdToken();
    console.log(validatedUserInfo);
    const response = await axios.post(
      `${BASE_URL}/register`,
      validatedUserInfo.data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

export const login = async (userInfo: UserLoginInterface) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userInfo.email,
      userInfo.password
    );
    const user = userCredential.user;
    // Get ID token to send to backend
    const token = await user.getIdToken();

    await axios.get(`${BASE_URL}/myaccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user, token };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("token");
    console.log("User logged out");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
