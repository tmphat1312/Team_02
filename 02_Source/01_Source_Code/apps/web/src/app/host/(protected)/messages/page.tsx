"use client";

import { Send } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );

  // Filter messages based on active filter and search query
  const filteredMessages = mockMessages.filter((message) => {
    const matchesFilter =
      activeFilter === "all" || (activeFilter === "unread" && message.unread);

    return matchesFilter;
  });

  const selectedMessage = mockMessages.find(
    (message) => message.id === selectedMessageId
  );

  return (
    <div className="width-container grid grid-cols-[22.5rem_1fr] h-full">
      <div className="border-r border-border/50 flex flex-col py-6">
        <section>
          <h1 className="text-2xl font-bold mb-6">Messages</h1>

          <div className="flex gap-2 mb-6">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              className={cn(
                "rounded-full px-5",
                activeFilter === "all" &&
                  "bg-black text-white hover:bg-black/90"
              )}
              size="lg"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "unread" ? "default" : "outline"}
              className={cn(
                "rounded-full px-5",
                activeFilter === "unread" &&
                  "bg-black text-white hover:bg-black/90"
              )}
              size="lg"
              onClick={() => setActiveFilter("unread")}
            >
              Unread
            </Button>
          </div>
        </section>

        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "p-4 border-b cursor-pointer hover:bg-gray-50",
                message.unread && "bg-gray-50",
                selectedMessageId === message.id && "bg-airbnb/10"
              )}
              onClick={() => setSelectedMessageId(message.id)}
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-10">
                  <AvatarImage
                    src={`https://avatar.iran.liara.run/public`}
                    alt="@shadcn"
                  />
                  <AvatarFallback>{message.host.name.at(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <section className="flex items-center justify-between">
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
                  </section>
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
                  <div className="size-2 bg-airbnb rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        {selectedMessage && (
          <>
            <div className="bg-white border-b p-4 flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarImage
                  src={
                    selectedMessage.host.avatar ||
                    "https://avatar.iran.liara.run/public"
                  }
                  alt={selectedMessage.host.name}
                />
                <AvatarFallback>
                  {selectedMessage.host.name.at(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedMessage.host.name}</h3>
                <p className="text-xs text-gray-500">
                  {selectedMessage.property}
                </p>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 overflow-y-auto py-4 bg-gray-100">
              <div className="max-w-3xl mx-auto">
                {selectedMessage.conversation.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex mb-4",
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender === "host" && (
                      <Avatar className="size-8 mr-2">
                        <AvatarImage
                          src={
                            selectedMessage.host.avatar ||
                            "https://avatar.iran.liara.run/public"
                          }
                          alt={selectedMessage.host.name}
                        />
                        <AvatarFallback>
                          {selectedMessage.host.name.at(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={cn(
                          "p-3 rounded-2xl max-w-xs sm:max-w-md",
                          msg.sender === "user"
                            ? "bg-airbnb text-white rounded-tr-none"
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
                      <Avatar className="size-8 ml-2">
                        <AvatarImage
                          src={`https://avatar.iran.liara.run/public`}
                          alt="@shadcn"
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white border-t p-4 pb-6 flex items-center gap-4">
              <Input
                placeholder="Type your message..."
                className="text-lg p-4"
              />
              <Button className="bg-black hover:bg-black/90" size="lg">
                Send <Send size={14} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
