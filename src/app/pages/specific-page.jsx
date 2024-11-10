// pages/specific-page.jsx

import Link from "next/link";
import Image from "next/image";
import styles from "../src/components/SpecificPage.module.css"; // Create this CSS module

const SpecificPage = () => {
  return (
    <div className={styles.specificPage}>
      <h1>Exclusive Story: Story One</h1>
      <Image
        src="/images/tiger.png"
        alt="Story One"
        width={400}
        height={600}
        className={styles.storyImage}
      />
      <p>
        This is the exclusive content for Story One. Here you can add more
        detailed information, multimedia, or any other special features that
        differentiate this story from others.
      </p>
      <Link href="/stories">
        <a className={styles.backButton}>Go Back to Stories</a>
      </Link>
    </div>
  );
};

export default SpecificPage;
