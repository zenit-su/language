// src/app/page.jsx
import React from "react";
import Chat from "./chat/chat"; // Ensure the path is correct

export const runtime = "edge";

const Page = () => {
  return <Chat />;
};

export default Page;
