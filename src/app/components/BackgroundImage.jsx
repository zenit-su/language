// src/components/BackgroundImage.jsx
"use client"; // Enables client-side rendering and hooks

import React from "react";
import Image from "next/image";
import styles from "./BackgroundImage.module.css"; // CSS module for styling

const BackgroundImage = () => {
  return (
    <div className={styles.backgroundImageContainer}>
      <Image
        src="/images/bg.png" // Absolute path to your image in the public directory
        alt="Background Image" // Descriptive alt text for accessibility
        layout="fill" // Makes the image fill its parent container
        objectFit="cover" // Ensures the image covers the container without distortion
        priority // (Optional) Loads the image with high priority
        className={styles.backgroundImage} // Apply CSS module styles
      />
      <div className={styles.contentOverlay}>
        {/* You can add more content here if needed */}
      </div>
    </div>
  );
};

export default BackgroundImage;
