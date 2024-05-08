"use client";

import * as React from "react";
import { Check, Plus, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface MessageInterface {
  role?: string
  message: string
}

export const Chat = () => {
  const [messages, setMessages] = React.useState<MessageInterface[]>([
    {
      role: "agent",
      message: "Hi, how can I help you today?",
    },
    {
      role: "user",
      message: "Hey, I'm having trouble with my account.",
    },
    {
      role: "agent",
      message: "What seems to be the problem?",
    },
    {
      role: "user",
      message: "I can't log in.",
    },
    {
      role: "agent",
      message: "What seems to be the problem?",
    },
  ]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <Card className="">
      <div className="flex flex-col justify-between">
        <CardContent className="h-[500px] overflow-auto scroll-smooth py-7">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-lg flex-col gap-2 rounded-lg px-3 py-2 text-sm break-all",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.message}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              setMessages([
                ...messages,
                {
                  role: "user",
                  message: input,
                },
              ]);
              setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Chat;