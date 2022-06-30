import React from "react";
import styles from './PlayerQueue.module.css'

function PlayerQueue(props) {
    console.log(props)
    const queue = props.tracks.map(track => {
        return <li key={track.id}>{track.track_title}</li>
    })

    return (
        <div className={styles.queue}>
            <ul className={styles.list}>
                {queue}
            </ul>
        </div>
    )
}

export default PlayerQueue