import { Typography } from "@mui/material";
import ChatContent from "../components/chatbot/chatContent/ChatContent";
import ChatFab from "../components/chatbot/chatFab";
import ChatList from "../components/chatbot/chatList/ChatList";
import ChatTest from "../components/chatbot/chatTest";
import ChatBody from "../components/chatbot/chatbody/ChatBody";
import UserProfile from "../components/chatbot/userProfile/UserProfile";
import Meta from "../components/seo/Meta";
const Chat = () => {
  return (
    <>
      <Meta title="Resolutio Chat Page" />
      <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
        Chat
      </Typography>
      <div className="">
        <ChatBody />
      </div>

    </>
  );
};

export default Chat;
