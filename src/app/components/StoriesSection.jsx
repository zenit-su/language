// src/components/StoriesSection.jsx
"use client";

import React from "react";
import Stories from "./Stories"; // Assuming Stories is a pre-existing component
import styles from "./StoriesSection.module.css"; // CSS module for styling

const StoriesSection = () => {
  return (
    <section className={styles.storiesSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>
          Learn About Tribals Through Their Stories
        </h2>
        <p className={styles.description}>
          Discover the rich cultures, traditions, and experiences of tribal
          communities through their personal narratives.
        </p>
        <div className={styles.storiesWrapper}>
          <Stories /> {/* Render the Stories component */}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
