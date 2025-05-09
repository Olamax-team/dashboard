import { useState } from "react";
import { X, CheckCircle, Info, Shield, Gift, Search } from "lucide-react";
import avatar from "../../../../assets/avatar.svg";
import ChatBox from "./chatBox";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "success" | "info" | "security" | "reward";
}

interface Message {
  messageIfo: string;
  avatar: string;
  label: string;
  time: string;
}

interface NotificationsPanelProps {
  setEmailIsOpen: (isOpen: boolean) => void;
}

export default function NotificationsPanel({
  setEmailIsOpen,
}: NotificationsPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "notifications" | "messages" | "chatBox"
  >("notifications");

  const notifications: Record<string, Notification[]> = {
    Today: [
      {
        id: "1",
        title: "Transaction Successful",
        message:
          "Your crypto has been converted to Naira. Check your wallet for the updated balance.",
        time: "1h",
        type: "success",
      },
      {
        id: "2",
        title: "New Feature Alert!",
        message:
          "We've added a quick-buy option for USDT. Access faster transactions directly from your dashboard.",
        time: "1h",
        type: "info",
      },
    ],
    Yesterday: [
      {
        id: "3",
        title: "Security Update Required",
        message:
          "Please verify your email address and enable two-factor authentication to keep your account secure.",
        time: "1h",
        type: "security",
      },
      {
        id: "4",
        title: "Referral Program Ending Soon!",
        message:
          "Only a few days left to earn extra BONK Tokens on every BTC purchase. Don't miss out!",
        time: "1h",
        type: "reward",
      },
      {
        id: "5",
        title: "Transaction Successful",
        message:
          "We've added a quick-buy option for USDT. Access faster transactions directly from your dashboard.",
        time: "1h",
        type: "success",
      },
    ],
  };

  const messages: Message[] = [
    {
      avatar: avatar,
      label: "Annabel Ajalenkoko",
      messageIfo:
        "We've added a quick-buy option for USDT. Access faster transactions directly from your dashboard.",
      time: "1h",
    },
    {
      avatar: avatar,
      label: "John Doe",
      messageIfo: "Your account has been successfully verified!",
      time: "1h",
    },
    {
      avatar: avatar,
      label: "Crypto Alerts",
      messageIfo: "Bitcoin price surged by 10%! Check out the latest updates.",
      time: "1h",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "security":
        return <Shield className="h-5 w-5 text-blue-500" />;
      case "reward":
        return <Gift className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-end justify-end bg-black/50"
      onClick={() => setEmailIsOpen(false)}
    >
      <div
        className="w-[350px] h-screen lg:w-[500px] bg-white rounded-lg shadow-lg pt-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          {/* Tabs: Notifications & Messages */}
          <div className="flex items-center gap-10">
            <button
              className={`py-3 px-2 text-[18px] lg:text-[20px] rounded-md font-bold ${
                activeTab === "notifications"
                  ? "text-white bg-[#039AE4] "
                  : "text-[#121826]"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              Notifications
            </button>
            <button
              className={`py-3 px-2 text-[18px] lg:text-[20px] font-bold rounded-md ${
                activeTab === "messages"
                  ? "text-white bg-[#039AE4] "
                  : "text-[#121826]"
              }`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
          </div>

          <button
            onClick={() => setEmailIsOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-4">
          {/* Display Notifications */}
          {activeTab === "notifications" && (
            <>
              {Object.entries(notifications).map(([date, items]) => (
                <div key={date} className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    {date}
                  </h3>
                  {items.map((notification) => (
                    <div key={notification.id} className="flex gap-3 py-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <p className="text-[18px] font-bold text-[#181818] leading-[150%]">
                            {notification.title}
                          </p>
                          <span className="text-[12px] font-semibold text-gray-500">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-[12px]  font-medium leading-[160%] text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          {/* Display Messages */}
          {activeTab === "messages" && (
            <>
              <div className="p-4  bg-gray-200 ">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-[#121826]" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2 pl-10 pr-4 bg-gray-200 text-[16px] border-0 rounded-md focus:ring-0 focus:outline-none "
                  />
                </div>
              </div>

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className="flex gap-5 py-3 border-b pb-3"
                  onClick={() => setActiveTab("chatBox")}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <img
                      src={msg.avatar}
                      alt={msg.label}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Message Content */}
                  <div
                    className="flex-1 min-w-0"
                    onClick={() => setActiveTab("chatBox")}
                  >
                    <div className="flex justify-between">
                      <p className="lg:text-[18px]  font-bold text-[#181818] leading-[150%]">
                        {msg.label}
                      </p>
                      <span className="text-[12px]  font-semibold text-gray-500">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-[12px] font-medium   leading-[160%] text-gray-600 mt-1">
                      {msg.messageIfo}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === "chatBox" && <ChatBox />}
        </div>
      </div>
    </div>
  );
}
