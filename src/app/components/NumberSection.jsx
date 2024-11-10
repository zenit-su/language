// src/components/StoriesSection.jsx
"use client";

import React from "react";
import Number from "./Number"; // Assuming Stories is a pre-existing component
import styles from "./StoriesSection.module.css"; // CSS module for styling

const StoriesSection = () => {
  return (
    <section className={styles.storiesSection}>
      <h2 className={styles.sectionTitle}>Learn languages</h2>
      <Number /> {/* Render the Stories component */}
    </section>
  );
};

export default StoriesSection;
