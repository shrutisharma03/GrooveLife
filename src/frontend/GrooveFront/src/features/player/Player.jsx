import React from "react";
import { useGetTrackListQuery } from "../../app/music_api/musicApi";
import { useState, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";
import PlayerQueue from "./PlayerQueue";
import styles from './Player.module.css'
import { addMultipleTracks, selectQueue } from "../../app/music_api/musicSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import shuffle from "../../utils/shuffle";


function Player() {
    const { data, isLoading, error } = useGetTrackListQuery()
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1)

    const dispatch = useDispatch()
    const tracks = useSelector(selectQueue)

    useEffect(() => {
        setNextSongIndex(() => {
            if (tracks) {
                if (currentSongIndex + 1 > tracks.length - 1) {
                    return 0
                } else {
                    return currentSongIndex + 1
                }
            }
        })
    }, [currentSongIndex, tracks])


    const makeQueue = () => {
        console.log(data)
        const temp = JSON.parse(JSON.stringify(data));
        shuffle(temp)
        dispatch(addMultipleTracks(temp))
    }

    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        return (<div>Some error</div>)
    }

    if (typeof tracks === 'undefined') {
        return (<div>No tracks</div>)
    }
    return (
        <div className={styles.player}>
            <button onClick={makeQueue} className={styles.button}>Make Queue</button>
            <div className={styles.playerQueue}>
                <PlayerQueue tracks={tracks} />
            </div>
            <div className={styles.playerDetails}>
                <PlayerDetails />
            </div>
            <div className={styles.playerControls}>
                <PlayerControls />
            </div>
        </div>
    )
}

export default Player