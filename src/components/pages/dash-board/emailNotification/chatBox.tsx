import React from "react";

import { useState } from "react";
import { ChevronLeft, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import avatar from "../../../../assets/avatar.svg";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  isSystemMessage?: boolean;
}

export default function ChatBox() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "", sender: "user" },
    { id: "2", content: "", sender: "other" },
    { id: "3", content: "", sender: "user" },
    {
      id: "4",
      content: "Buyer Joined The chat",
      sender: "other",
      isSystemMessage: true,
    },
    { id: "5", content: "", sender: "other" },
  ]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), content: inputValue, sender: "user" },
      ]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="">
      {/* Header */}

      {/* User Info */}
      <div className="flex items-center p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 h-8 w-8 rounded-full"
        >
          <ChevronLeft className="h-5 w-5  " />
        </Button>
        <div className="flex items-center flex-1">
          <div className="h-10 w-10 mr-3">
            <img
              src={avatar}
              alt="User avatar"
              className="rounded-full size-10"
            />
          </div>
          <span className="font-semibold text-lg">Annabel Ajalenkoko</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-500 border-blue-500 hover:bg-blue-50"
        >
          Invite Buyer
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
        {messages.map((message) =>
          message.isSystemMessage ? (
            <div key={message.id} className="flex justify-center  my-2">
              <span className="text-[16px] text-[#121826]">
                {message.content}
              </span>
            </div>
          ) : (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              {message.sender === "user" && (
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex-shrink-0" />
              )}
              <div
                className={`rounded-lg py-5 px-3 w-[50%] h-[50px] ${
                  message.sender === "user"
                    ? "bg-gray-200 text-[#121826]"
                    : "bg-gray-200 text-[#121826]"
                }`}
              >
                {message.content}
              </div>
              {message.sender === "other" && (
                <div className="h-8 w-8 rounded-full bg-gray-200 ml-2 flex-shrink-0" />
              )}
            </div>
          )
        )}
      </div>

      <div className="p-3 border-t flex items-center">
        <div className="flex-1 border rounded-full overflow-hidden flex items-center bg-white">
          <input
            type="text"
            placeholder="Send a message!"
            className="flex-1 px-4 py-2 outline-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-500"
            onClick={handleSendMessage}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 h-10 w-10 rounded-b-md bg-blue-500 text-white"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
