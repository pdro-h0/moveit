import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from "@/components/LevelUpModal";


type ChallengesProviderProps = {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number
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
    closeLevelUpModal: ()=>void;
}

type Challenge={
  type: 'body' | 'eye';
  description:string;
  amount:number;
}

export const ChallengesProvider = ({ children, ...rest }: ChallengesProviderProps) => {
  const [level, setLevel] = useState<number>(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState<number>(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState<number>(rest.challengesCompleted ?? 0);
  const[activeChallenge, setActiveChallenge] = useState<any | null>(null)

  const experienceToNextLevel = Math.pow((level+ 1) * 4, 2)

  const[isLevelModalOpen, setIsLevelModalOpen] = useState<boolean>(false)

  useEffect(()=>{
    Notification.requestPermission()
  },[])

  useEffect(()=>{
    Cookies.set('level', level.toString())
    Cookies.set('currentExperience', currentExperience.toString())
    Cookies.set('challengesCompleted', challengesCompleted.toString())
  },[level, currentExperience, challengesCompleted])

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelModalOpen(true)
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

  const closeLevelUpModal = ()=>{
    setIsLevelModalOpen(false)
  }

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
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}

      {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
