import React,{useRef, useState,useLayoutEffect,useEffect} from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../componenets/chat/ChatItem";
import {IoMdSend} from  "react-icons/io";
import {deleteUserChats, getUserChats, sendChatRequest} from "../helpers/api-communicator";
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom";

  type Message ={
    role:"user"|"assistant";
    content :string ;
  }







const Chat = () => {
  const navigate =useNavigate();
    const inputRef =useRef<HTMLInputElement|null >(null);
  const auth = useAuth();

  const [chatMessages,setChatMessages]=useState<  Message[]>([]);

  const handleSubmit=async () =>{
    const content =inputRef.current?.value as string ;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }

    const newMessage:Message={role :"user",content};
    setChatMessages((prev)=>[...prev,newMessage]);
   const chatData=await sendChatRequest(content);
   setChatMessages([...chatData.chats]);

  };

const handleDeleteChats =async()=>{
  try{
    toast.loading("Delecting chats ",{ id: "deletechats"});
    await deleteUserChats();
    setChatMessages([]);
    toast.success("Deleted Chats Sueccessfully",{id :"deletechats"});

  } catch(error){
    console.log(error);
    toast.error("Deleting chats failed", {id :"deletechats"});
  }
};



  useLayoutEffect(()=>{
    if(auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats",{ id:"loadchats"});
      getUserChats().then((data)=>{
        setChatMessages([...data.chats]);
        toast.success("Successfully loaded chats",{id:"loadchats"});
      }).catch((err)=> {
        console.log(err)
        toast.error("Loading Failed ", {id :"loadchats"});

      });
    
    }
  },[auth]);

useEffect(()=>{
  if(!auth?.user){
    return navigate("/login");
  }

},[auth]);


  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh", // Adjust height to full viewport height
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2, // Take up 20% of the width
          flexDirection: "column",
          bgcolor: "rgb(17,29,39)",
          borderRadius: 5,
          mx: 3,
        }}
      >
        <Avatar
          sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontWeight: 700,
          }}
        >
          {auth?.user?.name[0]}
          {auth?.user?.name.split("")[1][0]}
        </Avatar>
        <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
          You are talking to a Chatbot
        </Typography>

        <Typography
          sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}
        >
          You can ask some questions related to Knowledge, Business, Advices, Education, etc. But avoid sharing personal information
        </Typography>

        <Button 
        onClick ={handleDeleteChats}
          sx={{
            width: "200px",
            my: "auto",
            color: "white",
            fontWeight: "700",
            borderRadius: 3,
            mx: "auto",
            bgcolor: red[300],
            ":hover": {
              bgcolor: red.A400,
            },
          }}
        >
          Clear Conversation
        </Button>
      </Box>

      <Box sx={{ display: "flex", flex: 0.8, justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }}>
        <Typography
          sx={{ textAlign: "center", fontSize: "40px", color: "white", mb: 2 ,mx:"auto ",
          fontWeight :"600",}}
        >
          Model-GPT 3.5 Turbo
        </Typography>
<Box  
sx={{
    width :"100%",
    height :"60vh",
    borderRadius :3,
    mx: "auto",
    display :"flex",
    flexDirection:"column",
    overflow :"scroll",
    overflowX:"hidden",
    overflowY:"auto",
    scrollBehavior:"smooth",
}}

> {chatMessages.map((chat,index)=>(
    //@ts-ignore
   <ChatItem content ={chat.content} role ={chat.role} key={index}/>
))}
    </Box>

    <div style={{
        width :"100%",
        padding :"20px",
        borderRadius:8,
        backgroundColor :"rgb(17,27,39)",
        display :"flex",
        margin:"auto",
    }} >
        {" "}
    <input
    ref={inputRef}
    type ="text"
    style={{
        width: "calc(100% - 50px)",
        backgroundColor:"transparent",
        padding :"10px",
        border :"none",
        outline:"none",
        color :"white",
        fontSize :"20px",
    }}



    />


<IconButton onClick ={handleSubmit} sx ={{ ml :"auto",color :"white"}}>
    <IoMdSend/>
    </IconButton>
    </div>

   
      </Box>
    </Box>
  );
};

export default Chat;
