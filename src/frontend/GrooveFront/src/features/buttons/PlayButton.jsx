import { useGetSpecificTrackQuery } from "../../app/music_api/musicApi";
import { addTrack, selectCurrentlyPlayingIndex, selectIsPlaying, selectQueue, setPlayIndex } from "../../app/music_api/musicSlice";
import IconButton from '@mui/material/IconButton';
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const PlayButton = (props) => {
    var trackid = props.trackid
    console.log(trackid)
    const dispatch = useDispatch()
    const isPlaying = useSelector(selectIsPlaying)
    const currentPlayIndex = useSelector(selectCurrentlyPlayingIndex)
    const queue = useSelector(selectQueue)
    const currentTrackId = (queue[currentPlayIndex] !== undefined) ? queue[currentPlayIndex].id : -1
    const { data, isLoading, error } = useGetSpecificTrackQuery(trackid)

    function playHandler() {
        console.log(currentPlayIndex)
        console.log(currentTrackId)
        console.log("Clicked play")
        dispatch(addTrack(data))
        let index = queue.findIndex(t => t.id === trackid)
        dispatch(setPlayIndex(index))
    }

    if (isLoading) {
        return (
            <HourglassEmptyIcon />
        )
    }

    if (error) {
        console.log(error)
        return (
            <ErrorRoundedIcon />
        )
    }

    return (
        <IconButton aria-label="play" onClick={playHandler}>
            {(isPlaying && trackid === currentTrackId) ? <PauseCircleRoundedIcon /> : <PlayCircleRoundedIcon />}
        </IconButton>
    )
}

export default PlayButton