import { ChallengesContext } from '@/contexts/ChallengesContext'
import { useContext } from 'react'
import styles from './styles.module.css'

export const CompletedChallenges = ()=>{
    const{ challengesCompleted } = useContext(ChallengesContext)
    return(
        <div className={styles.CompletedChallengesContainer}>
            <span>Desafios Completos:</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}