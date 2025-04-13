"use client";

import { useState } from "react";
import {
  Search,
  Globe,
  Menu,
  MessageSquare,
  ChevronDown,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data for sample messages
const mockMessages = [
  {
    id: "1",
    host: {
      name: "Julia",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Cozy Cabin in the Woods",
    lastMessage:
      "Hi there! I'm interested in booking your place for next weekend.",
    timestamp: "2h ago",
    unread: true,
    conversation: [
      {
        id: "msg1",
        sender: "user",
        content:
          "Hi Julia! I'm interested in booking your Cozy Cabin for next weekend (June 10-12). Is it available?",
        time: "2h ago",
      },
      {
        id: "msg2",
        sender: "host",
        content:
          "Hello! Thanks for your interest in my cabin. Yes, those dates are available. How many guests will be staying?",
        time: "1h ago",
      },
    ],
  },
  {
    id: "2",
    host: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Downtown Loft with City Views",
    lastMessage:
      "The check-in instructions are in the Airbnb app. Let me know if you need anything else!",
    timestamp: "Yesterday",
    unread: false,
    conversation: [
      {
        id: "msg1",
        sender: "user",
        content:
          "Hi Michael, I'm arriving tomorrow. Could you send me the check-in instructions?",
        time: "Yesterday",
      },
      {
        id: "msg2",
        sender: "host",
        content:
          "Of course! The check-in instructions are in the Airbnb app. You'll need the door code: 4582. Let me know if you need anything else!",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "3",
    host: {
      name: "Sarah",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Beachfront Paradise",
    lastMessage:
      "We'd love to have you stay with us again! I can offer a 10% discount for returning guests.",
    timestamp: "3 days ago",
    unread: true,
    conversation: [
      {
        id: "msg1",
        sender: "user",
        content:
          "Hi Sarah, we really enjoyed our stay at your Beachfront Paradise last month. We're thinking of coming back in August.",
        time: "3 days ago",
      },
      {
        id: "msg2",
        sender: "host",
        content:
          "I'm so glad you enjoyed your stay! We'd love to have you back. I can offer a 10% discount for returning guests. Just let me know the dates you're considering.",
        time: "3 days ago",
      },
    ],
  },
  {
    id: "4",
    host: {
      name: "David",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Mountain View Retreat",
    lastMessage:
      "Thank you for your stay! Hope you enjoyed the mountain views. Please leave a review when you get a chance.",
    timestamp: "1 week ago",
    unread: false,
    conversation: [
      {
        id: "msg1",
        sender: "host",
        content:
          "Thank you for your stay! Hope you enjoyed the mountain views. Please leave a review when you get a chance.",
        time: "1 week ago",
      },
    ],
  },
];

export default function MessagesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filter messages based on active filter and search query
  const filteredMessages = mockMessages.filter((message) => {
    const matchesFilter =
      activeFilter === "All" || (activeFilter === "Unread" && message.unread);
    const matchesSearch =
      message.host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const selectedMessage = mockMessages.find(
    (message) => message.id === selectedMessageId
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1000 1000"
                  className="h-8 w-8 text-[#ff385c]"
                  fill="currentColor"
                >
                  <path d="M499.9 222.7c-121.2 0-219.9 98.1-219.9 219.9 0 121.2 98.1 219.9 219.9 219.9 121.2 0 219.9-98.1 219.9-219.9 0-121.8-98.7-219.9-219.9-219.9zm0 367.5c-81.5 0-147.6-66.1-147.6-147.6 0-81.5 66.1-147.6 147.6-147.6 81.5 0 147.6 66.1 147.6 147.6 0 81.5-66.1 147.6-147.6 147.6zM499.9 98.7c-190.4 0-345.1 154.7-345.1 345.1 0 190.4 154.7 345.1 345.1 345.1 190.4 0 345.1-154.7 345.1-345.1 0-190.4-154.7-345.1-345.1-345.1zm0 641.5c-163.5 0-296.4-132.9-296.4-296.4 0-163.5 132.9-296.4 296.4-296.4 163.5 0 296.4 132.9 296.4 296.4 0 163.5-132.9 296.4-296.4 296.4z" />
                </svg>
                <span className="ml-2 text-[#ff385c] font-bold text-2xl">
                  airbnb
                </span>
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-sm font-medium rounded-full"
              >
                Switch to hosting
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
              </Button>
              <div className="flex items-center border border-gray-300 rounded-full p-1 shadow-sm">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
                <Avatar className="h-8 w-8 bg-gray-200">
                  <span className="text-xs font-medium">N</span>
                </Avatar>
                <div className="absolute top-2 right-2 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div
          className={cn(
            "w-[360px] border-r border-gray-200 flex flex-col",
            selectedMessageId && "hidden md:flex" // Hide on mobile when message is selected
          )}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="flex items-center mb-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                  placeholder="Search messages"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2 mb-6">
              <Button
                variant={activeFilter === "All" ? "default" : "outline"}
                className={`rounded-full text-sm ${
                  activeFilter === "All"
                    ? "bg-black text-white hover:bg-black/90"
                    : "text-black"
                }`}
                onClick={() => setActiveFilter("All")}
              >
                All <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
              <Button
                variant={activeFilter === "Unread" ? "default" : "outline"}
                className={`rounded-full text-sm ${
                  activeFilter === "Unread"
                    ? "bg-black text-white hover:bg-black/90"
                    : "text-black"
                }`}
                onClick={() => setActiveFilter("Unread")}
              >
                Unread
              </Button>
            </div>
          </div>

          {filteredMessages.length > 0 ? (
            <div className="flex-1 overflow-y-auto">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50",
                    message.unread && "bg-gray-50",
                    selectedMessageId === message.id && "bg-gray-100"
                  )}
                  onClick={() => setSelectedMessageId(message.id)}
                >
                  <div className="flex items-start">
                    <Avatar className="h-10 w-10 mr-3">
                      <img
                        src={message.host.avatar || "/placeholder.svg"}
                        alt={message.host.name}
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3
                          className={cn(
                            "text-sm font-medium",
                            message.unread && "font-semibold"
                          )}
                        >
                          {message.host.name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {message.property}
                      </p>
                      <p
                        className={cn(
                          "text-sm mt-1 truncate",
                          message.unread
                            ? "font-medium text-gray-900"
                            : "text-gray-600"
                        )}
                      >
                        {message.lastMessage}
                      </p>
                    </div>
                    {message.unread && (
                      <div className="ml-2 h-2 w-2 bg-[#ff385c] rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="mb-4">
                <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                We couldn&apos;t find any messages
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Try removing or adjusting your filters.
              </p>
              <Button
                variant="outline"
                className="mt-4 text-sm"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div
          className={cn(
            "flex-1 bg-gray-50 flex flex-col",
            !selectedMessageId && "hidden md:flex items-center justify-center" // Hide on mobile when no message is selected
          )}
        >
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="bg-white border-b border-gray-200 p-4 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mr-2"
                  onClick={() => setSelectedMessageId(null)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-10 w-10 mr-3">
                  <img
                    src={selectedMessage.host.avatar || "/placeholder.svg"}
                    alt={selectedMessage.host.name}
                  />
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedMessage.host.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedMessage.property}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto">
                  {selectedMessage.conversation.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex mb-4 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.sender === "host" && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <img
                            src={
                              selectedMessage.host.avatar || "/placeholder.svg"
                            }
                            alt={selectedMessage.host.name}
                          />
                        </Avatar>
                      )}
                      <div>
                        <div
                          className={cn(
                            "p-3 rounded-2xl max-w-xs sm:max-w-md",
                            msg.sender === "user"
                              ? "bg-[#ff385c] text-white rounded-tr-none"
                              : "bg-gray-200 text-gray-800 rounded-tl-none"
                          )}
                        >
                          {msg.content}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {msg.time}
                        </div>
                      </div>
                      {msg.sender === "user" && (
                        <Avatar className="h-8 w-8 ml-2 mt-1 bg-gray-300">
                          <span className="text-gray-800 text-xs">You</span>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      placeholder="Type a message..."
                    />
                    <Button className="ml-2 rounded-full bg-[#ff385c] hover:bg-[#ff385c]/90">
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Select a conversation
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
