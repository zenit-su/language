// src/components/Stories.jsx
"use client"; // Enables client-side rendering and hooks

import React, { useRef } from "react";
import Image from "next/image";
import styles from "./Stories.module.css"; // Import CSS module for styling
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Importing icons

// Sample data for stories
const storiesData = [
  {
    id: 1,
    title: "Story One",
    image: "/images/tiger.png",
  },
  {
    id: 2,
    title: "Story One",
    image: "/images/tiger.png",
  },
  {
    id: 3,
    title: "Story One",
    image: "/images/tiger.png",
  },
];

const Stories = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: -300, // Adjust scroll distance as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      top: 0,
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.storiesSection}>
      <h2 className={styles.title}>Stories</h2>
      <div className={styles.scrollContainer}>
        <button
          onClick={scrollLeft}
          className={styles.scrollButton}
          aria-label="Scroll Left"
        >
          <FaArrowLeft />
        </button>
        <div className={styles.storiesContainer} ref={scrollRef}>
          {storiesData.map((story) => (
            <div key={story.id} className={styles.storyItem}>
              <Image
                src={story.image}
                alt={story.title}
                width={200}
                height={300}
                className={styles.storyImage}
              />
              <h3 className={styles.storyTitle}>{story.title}</h3>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className={styles.scrollButton}
          aria-label="Scroll Right"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Stories;