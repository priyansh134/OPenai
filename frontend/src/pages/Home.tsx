import { Box ,useMediaQuery,useTheme} from "@mui/material";
import React from "react";
import { Footer } from "../componenets/footer/Footer";
import TypingAnim from "../componenets/typer/TypingAnim";
const Home =()=>{
    const theme =useTheme();
    const isBelowMd =useMediaQuery(theme.breakpoints.down("md"));
    return(
    <Box width ={"100%"} height ={"100%"}> 
    <Box
    sx ={{
        display :"flex",
        width :"100%",
        flexDirection :"column",
        alignItems :"center",
        mx: "auto",
        mt :"3",
    }}
    >
        <Box><TypingAnim/></Box>
        <Box
        sx ={{
            width :"100%",
            display :"flex",
            flexDirection :{md :"row" ,xs :"column",sm :"column"},
            gap :5,
            my :10,
        }}
        >
            <img src ="roboto.jpg" alt ="roboto"  style ={{width :"200px",margin :"auto"}}/>
            <img 
            className="image-inverted rotate"
            src ="openai.jpg" alt ="openai"  style ={{width :"200px",margin :"auto"}}/>
        </Box>

        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
    <img src="https://chatgpt.pro/wp-content/uploads/2022/12/dialogue.png" alt="chatbot"
    
    style ={{
        display :"flex",
        margin :"auto ",
        width :"60%",
        borderRadius :20,
        boxShadow :"-5px -5px 105px #64f3d5",
        marginTop :20,
        marginBottom:20,
        padding :10,
    }}
    
    />
</Box>

    </Box>
<Footer/>
</Box>
    );
};
export default Home;