import { ChallengesContext } from "@/contexts/ChallengesContext";
import { CountdownContext } from "@/contexts/CountdownContext";
import { useContext } from "react";
import styles from "./styles.module.css";

export const ChallengeBox = () => {
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)

    const { resetCountDown } = useContext(CountdownContext)

    const handleChallengeSucceeded = ()=>{
      completeChallenge()
      resetCountDown()
    }

    const handleChallengeFailed = ()=>{
      resetChallenge()
      resetCountDown()
    }


  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Corpo" />
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
              <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}>
                Falhei
              </button>

              <button 
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}>
                Completei
                </button>
            </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Inicie um ciclo para receber desafios a serem completados
          </strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando os desafios
          </p>
        </div>
      )}
    </div>
  );
};
