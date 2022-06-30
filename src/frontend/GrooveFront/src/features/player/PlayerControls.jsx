import React, { useState } from "react";
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import './rhap.css';
import { useDispatch, useSelector } from "react-redux";
import { nextTrack, prevTrack, playTrack, pauseTrack, selectCurrentlyPlayingIndex, selectQueue } from "../../app/music_api/musicSlice";
import { useAddToHistoryMutation } from "../../app/music_api/musicApi";
import styles from './PlayerControls.module.css'

const RhapEmpty = (src) => {
    return (
        <div className={styles.player}>
            <AudioPlayer
                autoPlay={false}
                src={src}
                showJumpControls={false}
                showSkipControls={true}
                customAdditionalControls={
                    [
                        RHAP_UI.CURRENT_TIME
                    ]
                }
                customVolumeControls={
                    [
                        RHAP_UI.DURATION
                    ]
                }
                customProgressBarSection={
                    [
                        RHAP_UI.PROGRESS_BAR,
                    ]
                }
            />
        </div>
    )
}

function PlayerControls() {
    const [lastHistory, setLastHistory] = useState(-1)
    const index = useSelector(selectCurrentlyPlayingIndex)
    const tracks = useSelector(selectQueue)
    const dispatch = useDispatch()
    const [triggerHistory, resultHistory] = useAddToHistoryMutation()

    if (typeof tracks === 'undefined' || typeof tracks[index] === 'undefined') {
        return (
            <RhapEmpty src={null} />
        )
    }
    const listenHandler = () => {
        if (tracks[index].id !== lastHistory) {
            triggerHistory(tracks[index].id)
            setLastHistory(tracks[index].id)
        }
    }
    return (
        <div className={styles.player}>
            <AudioPlayer
                autoPlay={false}
                src={tracks[index].audio_file}
                showJumpControls={false}
                showSkipControls={true}
                listenInterval={60000}
                customAdditionalControls={
                    [
                        RHAP_UI.CURRENT_TIME
                    ]
                }
                customVolumeControls={
                    [
                        RHAP_UI.DURATION
                    ]
                }
                customProgressBarSection={
                    [
                        RHAP_UI.PROGRESS_BAR,
                    ]
                }
                onPlay={() => dispatch(playTrack())}
                onPause={() => dispatch(pauseTrack())}
                onClickPrevious={() => dispatch(prevTrack())}
                onClickNext={() => dispatch(nextTrack())}
                onEnded={() => dispatch(nextTrack())}
                onListen={listenHandler}
            />
        </div>
    )
}

export default PlayerControls