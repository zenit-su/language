// src/components/Home.jsx
"use client"; // Enables client-side rendering and hooks

import React from "react";
import Header from "./Header"; // Correct import path
import styles from "./Home.module.css"; // Import CSS module for additional styling
import BackgroundImage from "./BackgroundImage"; // Import the BackgroundImage component
import StoriesSection from "./StoriesSection";
import NumberSection from "./NumberSection";

const Home = () => {
  return (
    <div className={styles.container}>
      <Header /> {/* Include the Header */}
      <div className={styles.content}>
        <BackgroundImage /> {/* Include the BackgroundImage component */}
        <StoriesSection />
        <NumberSection />
      </div>
    </div>
  );
};

export default Home;
