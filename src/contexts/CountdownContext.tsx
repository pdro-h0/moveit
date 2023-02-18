import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChallengesContext } from "./ChallengesContext";

type CountdownContextData = {
    minutes:number,
    seconds:number,
    hasFinished:boolean,
    isActive:boolean,
    startCountdown:()=>void,
    resetCountDown:()=>void
};

type CountdownsProviderProps = {
  children: ReactNode;
};

export const CountdownContext = createContext({} as CountdownContextData);

export const CountdownProvider = ({ children }: CountdownsProviderProps) => {
  const { startNewChallenge } = useContext(ChallengesContext);

  const [time, setTime] = useState<number>(15 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [hasFinished, setHasfinished] = useState<boolean>(false);

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  let countdownTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time == 0) {
      setHasfinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  const startCountdown = () => {
    setIsActive(true);
  };

  const resetCountDown = () => {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(15 * 60);
    setHasfinished(false)
  };

  return (
    <CountdownContext.Provider value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountdown,
        resetCountDown
    }}>
        {children}
        </CountdownContext.Provider>
  );
};
