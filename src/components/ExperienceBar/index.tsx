import { ChallengesContext } from '@/contexts/ChallengesContext'
import { useContext } from 'react'
import styles from './styles.module.css'

export const ExperienceBar = ()=>{
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.floor(currentExperience * 100) / experienceToNextLevel

    return(
        <div>
            <header className={styles.experienceBar}>
                <span>0 xp</span>
                <div>
                    <div style={{ width: `${percentToNextLevel}%` }}></div>

                    <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience} xp</span>
                </div>
                <span>{experienceToNextLevel} xp</span>
            </header>
        </div>
    )
}