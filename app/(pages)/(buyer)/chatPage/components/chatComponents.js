import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Star } from 'lucide-react';
import { Paperclip, Send } from 'lucide-react';
import { Check } from 'lucide-react';
import { Search } from 'lucide-react';

export const ChatHeader = ({ user }) => {
  return (
    <div className="bg-secondary px-6 py-4 border-b border-border flex justify-between items-center">
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-black">{user.name}</h3>
          <p className="text-xs text-textLight">{user.status}</p>
        </div>
      </div>
      <button>
        <MoreHorizontal className="text-textLight" />
      </button>
    </div>
  );
};


export const SenderMessage = ({ message }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-primary rounded-tl-[30px] rounded-tr-[30px] rounded-bl-[30px] p-4 max-w-xs md:max-w-md">
        <p className="text-sm text-white">{message.text}</p>
        <div className="flex justify-end items-center gap-1 mt-1">
          <span className="text-xs text-white/80">{message.time}</span>
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};


export const ReceiverMessage = ({ message }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-secondary rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] p-4 max-w-xs md:max-w-md">
        <p className="text-sm text-text">{message.text}</p>
        <span className="text-xs text-textLight block text-right mt-1">{message.time}</span>
      </div>
    </div>
  );
};


export const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 border-t border-border bg-white">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <button type="button" className="absolute left-4 text-textLight">
          <Paperclip className="w-5 h-5" />
        </button>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message" 
          className="w-full bg-whiteGrey rounded-full py-3 pl-12 pr-12 focus:outline-none"
        />
        <button type="submit" className="absolute right-4 text-primary">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${isActive ? 'border-l-4 border-primary' : ''}`}
      onClick={() => onClick(chat.id)}
    >
      <div className="relative">
        <img 
          src={chat.avatar} 
          alt={chat.name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        {chat.isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="ml-3 flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-black">{chat.name}</h3>
          <span className="text-xs text-textLight">{chat.lastMessageTime}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs ${chat.unreadCount ? 'text-primary' : 'text-textLight'} truncate`}>
            {chat.lastMessage}
          </p>
          {chat.unreadCount > 0 && (
            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


export const ChatList = ({ chats, activeChat, setActiveChat }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-100 border-r border-border bg-white">
      {/* Search bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-textLight w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none"
          />
        </div>
      </div>
      
      {/* Chat list */}
      <div className="overflow-y-auto">
        {filteredChats.map(chat => (
          <ChatListItem 
            key={chat.id}
            chat={chat}
            isActive={activeChat === chat.id}
            onClick={setActiveChat}
          />
        ))}
      </div>
    </div>
  );
};

export const SellerDetails = ({ seller, toggleOffer, showOffer }) => {
  return (
    <div className="w-80 border-l border-border bg-white">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-medium text-black">Seller Details</h2>
      </div>
      
      <div className="p-4 flex flex-col items-center">
        <div className="relative mb-2">
          <img 
            src={seller.avatar} 
            alt="Profile" 
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        <div className="flex max-w-[200px] items-center mb-2">
          <div className='flex-1 justify-start pr-5'>
            <h3 className="font-medium text-black">{seller.username}</h3>
            <p className="text-sm text-textLight mb-2">{seller.country}</p>
          </div>
          <span className="flex text-center justify-center bg-software bg-opacity-20 text-levelGold text-sm font-medium rounded-[50px] w-[80px] h-[30px] mb-4 pt-1">
            {seller.level}
          </span>
        </div>

        <button className="w-full py-2 border border-border rounded-[50px] text-black hover:bg-gray-50 transition-colors mb-6">
          View Profile
        </button>
        
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-textLight">From</span>
            <span className="text-sm font-medium">{seller.location}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-textLight">Languages</span>
            <span className="text-sm font-medium">{seller.languages.join(', ')}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-textLight">Rating</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-software text-software mr-1" />
              <span className="text-sm font-medium">{seller.rating}/5 ({seller.orders} Orders)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button for demo purposes */}
      <div className="p-4 flex justify-center">
        <button 
          onClick={toggleOffer}
          className="bg-primary text-white rounded-full px-4 py-2 text-sm hover:bg-blue-600 transition-colors"
        >
          {showOffer ? "Hide Offer" : "Show Offer"}
        </button>
      </div>
    </div>
  );
};

export const Offer = ({ amount }) => {
  return (
    <div className="bg-green-50 rounded-[20px] p-5 mb-4 border border-green-100">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <span className="text-sm text-black">Seller has sent the </span>
          <span className="text-sm text-primary ml-1">milestones</span>
        </div>
        <button className="text-sm text-primary">View Details</button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="font-normal text-black">Total: <span className="text-primary font-semibold">${amount}</span></div>
        <div className="flex gap-2">
          <button className="bg-white text-success border border-success rounded-full px-6 py-2 text-sm hover:bg-green-50 transition-colors">
            Start Order
          </button>
          <button className="bg-white text-failure border border-failure rounded-full px-6 py-2 text-sm hover:bg-red-50 transition-colors">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export const DateDivider = ({ date }) => {
  return (
    <div className="text-xs text-center text-textLight mb-4">{date}</div>
  );
};