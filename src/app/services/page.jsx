// src/app/services/page.jsx
import React from "react";
import Header from "../components/Header"; // Adjust the path as necessary
import Chat from "../chat/chat"; // Ensure the Chat component is correctly imported

const Services = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>
        <Chat />
      </main>
    </div>
  );
};

export default Services;
