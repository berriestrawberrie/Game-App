import axios from "axios";
import { getCurrentUserToken } from "./token";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import type { UserWithPasswordInterface } from "../interfaces/interfaces";
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
