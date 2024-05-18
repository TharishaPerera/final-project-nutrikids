"use server";

import { currentUser } from "@/lib/auth";

// interface chatUserProps {
//   username: string | null | undefined;
//   email: string | null | undefined;
//   role: string;
// }

// interface chatUserInterface {
//   _id: string;
//   username: string;
//   email: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

const CHAT_BASE_URL = process.env.CHAT_API_BASE_URL;

// register user to chats
export const chatRegisterUser = async ({
  username,
  email,
  role,
}) => {
  try {
    const userData = {
      username: username,
      email: email,
      role: role,
    };
    const response = await fetch(`${CHAT_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    return { success: "User registered successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Error occurred when registering user" };
  }
};

// login users to chats

// get chats for current users
export const chatFindCurrentUsersChats = async ({
    username,
    email,
    role,
  }) => {
  try {
    const currentLoggedinUser = await currentUser();

    const senderEmail = currentLoggedinUser?.email;
    const receiverEmail = email

    // check users exist
    const senderExists = chatFindUserByEmail(senderEmail, currentLoggedinUser?.name, currentLoggedinUser?.role.role)
    const receiverExists = chatFindUserByEmail(receiverEmail, username, role)

    // get chats
    const response = await fetch(`${CHAT_BASE_URL}/chats/find/${senderExists._id}/${receiverExists._id}`);
    const data = await response.json();
    console.log(data)
    return false



  } catch (error) {
    console.error(error);
    return { error: "Error occurred when retrieving chats" };
  }
};

// find user by email in the chat server
export const chatFindUserByEmail = async (email, username, role ) => {
    try {
        const CHAT_BASE_URL = process.env.CHAT_API_BASE_URL;
        const response = await fetch(`${CHAT_BASE_URL}/users/find?email=${email}`);
        const data = await response.json();

        if (data.message == "User does not exists!") {
          chatRegisterUser({ username: username, email: email, role: role })
        }

        return data
      } catch (error) {
        console.error(error);
        return { error: "Error occurred when retrieving chats" };
      }
}