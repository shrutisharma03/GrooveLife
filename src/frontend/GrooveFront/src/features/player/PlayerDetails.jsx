import { useSelector } from "react-redux";
import { selectCurrentlyPlayingIndex, selectQueue } from "../../app/music_api/musicSlice";
import Stack from '@mui/material/Stack';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import styles from './PlayerDetails.module.css'
import LikeButton from "../buttons/LikeButton";

function PlayerDetails() {
    const index = useSelector(selectCurrentlyPlayingIndex)
    const tracks = useSelector(selectQueue)

    if (typeof tracks === 'undefined' || typeof tracks[index] === 'undefined') {
        return (
            <div className={styles.details}>
                <div className={styles.left}>
                    <div className={styles.verticalcenter}>
                        <HourglassEmptyIcon fontSize="large" />
                    </div>
                </div>
                <div>
                    <div className={styles.right}>
                        <div className={styles.verticalcenter}>
                            {"No Track in Queue"}
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.details}>
            <div className={styles.left}>
                <div className={styles.verticalcenter}>
                    <img src={tracks[index].album.album_logo} alt="album-art" className={styles.img} />
                </div>
            </div>
            <div>
                <div className={styles.right}>
                    <div className={styles.verticalcenter}>
                        {tracks[index].track_title} <br />
                        {tracks[index].album.artist.name}
                        <hr />
                        <Stack direction="row" spacing={1}>
                            <LikeButton trackid={tracks[index].id} />
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerDetails