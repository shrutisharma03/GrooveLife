import { Box } from '@mui/material';
import { useSearchTrackQuery } from "../../../app/music_api/musicApi"
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { TrackList } from "../discover/tracks/TrackList";
import { HourglassBottom } from '@mui/icons-material';

function Search() {
    const [trackQuery, setTrackQuery] = useState('asdfgh')
    const { data: tracks, isLoading: isTracksLoading, error: isTracksError } = useSearchTrackQuery(trackQuery)
    const handleChange = (event) => {
        if (event.target.value !== '') { setTrackQuery(event.target.value) }
        else {
            setTrackQuery('asdfgh')
        }
        console.log(event.target.value);
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        onChange={handleChange}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                </Paper>
                {(isTracksLoading || isTracksError) ? <HourglassBottom /> : <TrackList tracks={tracks} />}
            </Box>
        </Box>
    )
}

export default Search