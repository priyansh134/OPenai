import React from 'react'
import { TypeAnimation } from 'react-type-animation'
const TypingAnim=() =>{

    return (
        <TypeAnimation 
        sequence={[
            "Chat with you own AI",
            1000,
            "Built with OpenAI",
            2000,
            "Your Own Customized Chatgpt",
            1500,
        ]}
        speed={50}
        style ={{ fontSize :"60px",color :"white",display:"inline-block",textShadow:"1px 1px 20px #000",
    }}
    repeat={Infinity}
    />
    );
};

export default TypingAnim;