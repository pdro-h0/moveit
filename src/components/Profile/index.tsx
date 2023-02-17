import { ChallengesContext } from "@/contexts/ChallengesContext";
import { useContext } from "react";
import styles from "./styles.module.css";

export const Profile = () => {
  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/pdro-h0.png" alt="Prefil" />
      <div>
        <strong>Pedro Henrique</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};
