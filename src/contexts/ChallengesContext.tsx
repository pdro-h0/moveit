import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json'


type ChallengesProviderProps = {
  children: ReactNode;
};

export const ChallengesContext = createContext({} as ChallengesContextData);


type ChallengesContextData ={
    level:number,
    currentExperience:number;
    challengesCompleted:number;
    experienceToNextLevel:number;
    activeChallenge:Challenge;
    levelUp: ()=>void;
    startNewChallenge: ()=>void;
    resetChallenge: ()=>void;
    completeChallenge: ()=>void;
}

type Challenge={
  type: 'body' | 'eye';
  description:string;
  amount:number;
}

export const ChallengesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = useState<number>(1);
  const [currentExperience, setCurrentExperience] = useState<number>(0);
  const [challengesCompleted, setChallengesCompleted] = useState<number>(0);
  const[activeChallenge, setActiveChallenge] = useState<any | null>(null)

  const experienceToNextLevel = Math.pow((level+ 1) * 4, 2)

  useEffect(()=>{
    Notification.requestPermission()
  },[])

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    const ramdomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[ramdomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('notification.mp3').play()

    if(Notification.permission === 'granted'){
      new Notification('Novo Desafio🎉',{
        body: `Valendo ${challenge.amount}xp`
      })
    }
  };

  const resetChallenge = ()=>{
    setActiveChallenge(null)
  }

  const completeChallenge = ()=>{
    if(!activeChallenge){
      return
    }
    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if(finalExperience >= experienceToNextLevel){
      // finalExperience =- experienceToNextLevel
      finalExperience = finalExperience - experienceToNextLevel

      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
