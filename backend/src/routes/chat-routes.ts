import {Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {validate, chatCompletionValidator } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRoutes=Router();

chatRoutes.post ("/new",validate(chatCompletionValidator),verifyToken,generateChatCompletion);

chatRoutes.get ("/all-chats",verifyToken,sendChatsToUser);

chatRoutes.delete ("/delete",verifyToken,deleteChats);
export default chatRoutes;