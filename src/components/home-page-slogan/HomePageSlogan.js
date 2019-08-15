import React, {useEffect, useState} from "react";
import styles from "./HomePageSlogan.module.css";
import Button from "../button/button";


const HomePageSlogan = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0)

    const words = [
        "Morning Coffee",
        // "Tea",
        // "Frapucchino",
        // "Cold Brew"
    ]

    const _getWords = () => {
        return words.map(word => <span className={styles.slogan_line__word}>{word}</span> )
    }

    return(
        <div className={styles.slogan_container}>
            <div className={styles.slogan_line__1}>
                Get your 
            </div>
            <div className={styles.slogan_line__2}>
                {_getWords()}
            </div>
            <div className={styles.slogan_line__3}>
                <p>
                    Welcome to a new way of working and getting caffinated. 
                    Cafesa tells you where to work and get your coffee for a flat fee — that's it.
                </p>
            </div>
            <Button>SEE ALL STORES</Button>
        </div>
    )
}

export default HomePageSlogan;