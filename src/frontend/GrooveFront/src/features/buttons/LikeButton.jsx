import { useState, useEffect, skipToken } from "react";
import { useIsLikedQuery, useLikeSongMutation, useUnlikeSongMutation } from "../../app/music_api/musicApi";
import IconButton from '@mui/material/IconButton';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';


const LikeButton = (props) => {
    var trackid = props.trackid
    const [like, setLike] = useState(skipToken)

    const [triggerLike, resultLike] = useLikeSongMutation()
    const [triggerUnlike, resultUnlike] = useUnlikeSongMutation()
    const { data: likeStatus, isLoading, isError } = useIsLikedQuery(trackid)

    useEffect(() => {
        if (likeStatus) {
            setLike(likeStatus["isLiked"])
        }
    }, [likeStatus])

    function likeHandler() {
        if (like === false) {
            triggerLike(trackid)
            setLike(true)
        } else {
            triggerUnlike(trackid)
            setLike(false)
        }
    }

    return (
        <IconButton aria-label="like" onClick={likeHandler}>
            {like ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
    )
}

export default LikeButton