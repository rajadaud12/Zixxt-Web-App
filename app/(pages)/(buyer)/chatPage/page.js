"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader, SenderMessage, ReceiverMessage, ChatInput, ChatList, SellerDetails, Offer, DateDivider} from './components/chatComponents';

// Add CSS to hide scrollbar in the chat section
const styles = `
  .chat-container::-webkit-scrollbar {
    display: none;
  }
  .chat-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const chats = [
  {
    id: 1,
    name: "Shahab",
    avatar: "/api/placeholder/48/48",
    lastMessage: "On for 12:30 PM then?",
    lastMessageTime: "3:40 PM",
    isOnline: true,
    unreadCount: 2
  },
  {
    id: 2,
    name: "Daud",
    avatar: "/api/placeholder/48/48",
    lastMessage: "Would you like to pay online or in-person...",
    lastMessageTime: "3:40 PM",
    isOnline: false,
    unreadCount: 0
  },
  {
    id: 3,
    name: "Hassan",
    avatar: "/api/placeholder/48/48",
    lastMessage: "From chew toys to cozy",
    lastMessageTime: "3:40 PM",
    isOnline: false,
    unreadCount: 0
  }
];

const currentUser = {
  id: "user1",
  name: "Shahab",
  avatar: "/api/placeholder/40/40",
  status: "last seen 45 minutes ago"
};

const seller = {
  id: "seller1",
  username: "kahmiri",
  country: "pakistan",
  level: "Gold",
  avatar: "/api/placeholder/80/80",
  location: "Islamabad, Pakistan",
  languages: ["English", "Urdu", "Spanish"],
  rating: "4.2",
  orders: 273
};

const messages = [
  {
    id: 1,
    senderId: "seller1",
    text: "thats great tell me about your requirements",
    time: "11:31 AM",
    date: "8/20/2020"
  },
  {
    id: 2,
    senderId: "user1",
    text: "Hello!!! 👋",
    time: "11:31 AM",
    date: "8/20/2020"
  },
  {
    id: 3,
    senderId: "seller1",
    text: "thats great tell me about your requirements",
    time: "11:31 AM",
    date: "8/20/2020"
  },
  {
    id: 4,
    senderId: "user1",
    text: "So I want a Logo design that just fits properly wit my brands voice it should depict it in a good way",
    time: "11:31 AM", 
    date: "8/20/2020"
  },
  {
    id: 5,
    senderId: "seller1",
    text: "thats great tell me about your requirements",
    time: "11:31 AM",
    date: "8/20/2020"
  }
];

const offer = {
  amount: 195
};

export default function ChatInterface() {
  const [showOffer, setShowOffer] = useState(false);
  const [activeChat, setActiveChat] = useState(1); // Default to first chat
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  
  // This effect handles auto-scrolling to the bottom when messages are added
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);
  
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTop = scrollHeight;
    }
  };
  
  const toggleOffer = () => {
    setShowOffer(!showOffer);
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      id: chatMessages.length + 1,
      senderId: "user1",
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };
    
    setChatMessages([...chatMessages, newMessage]);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="max-w-[1440px] mx-auto px-6 mt-[50px] md:px-[100px]">
        <div className="flex h-[700px] bg-white border p-2 rounded-[30px] font-sans">
          {/* Left sidebar - chat list */}
          <ChatList 
            chats={chats} 
            activeChat={activeChat} 
            setActiveChat={setActiveChat} 
          />
          
          {/* Main chat area */}
          <div className="flex-grow flex flex-col relative">
            {/* Chat header */}
            <ChatHeader user={currentUser} />
            
            {/* Chat messages - fixed height with scrolling */}
            <div 
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto px-6 py-4 bg-white chat-container" 
              style={{ height: 'calc(100% - 136px)' }}
            > 
              {/* Date divider */}
              <DateDivider date={chatMessages[0].date} />
              
              {/* Messages */}
              {chatMessages.map((message) => (
                message.senderId === "user1" ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              ))}
              
              {/* Conditional offer block */}
              {showOffer && <Offer amount={offer.amount} />}
              
              {/* We still keep this for accessibility and other purposes */}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input - fixed at bottom */}
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
          
          {/* Right sidebar - Seller details */}
          <SellerDetails 
            seller={seller} 
            toggleOffer={toggleOffer} 
            showOffer={showOffer} 
          />
        </div>
      </div>
    </>
  );
}