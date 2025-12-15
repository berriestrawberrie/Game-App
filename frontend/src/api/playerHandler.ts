import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import type {
  UserWithPasswordInterface,
  UserLoginInterface,
} from "../interfaces/interfaces";
import { userCreationSchema } from "../schemas/schemas";

const BASE_URL = `${import.meta.env.VITE_API_URL}/players`;

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

    const loggedUser = await axios.get(`${BASE_URL}/myaccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user, loggedUser, token, uid: user.uid };
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const getUserScores = async (token: string, userId: string) => {
  const res = await fetch(`${BASE_URL}/scores/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch user scores");
  return res.json();
};

export const getAllUsers = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
