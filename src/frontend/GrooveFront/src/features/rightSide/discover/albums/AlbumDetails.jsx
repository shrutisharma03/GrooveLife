import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import InfoIcon from '@mui/icons-material/Info';
import { useGetSpecificAlbumQuery } from '../../../../app/music_api/musicApi';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LikeButton from '../../../buttons/LikeButton';
import PlayButton from '../../../buttons/PlayButton';
import styles from './Albums.module.css'
import { useDispatch } from 'react-redux';
import { addMultipleTracks } from '../../../../app/music_api/musicSlice';

function SwipableDrawer(props) {
    const [state, setState] = React.useState({
        right: false,
    });
    var albumid = props.albumid;
    const { data, isLoading, error } = useGetSpecificAlbumQuery(albumid);
    const dispatch = useDispatch()
    if (isLoading) {
        return (<div>Loading...</div>);
    }

    if (error) {
        return (<div>Some error</div>);
    }
    console.log(data);

    function toggleDrawer(anchor, open) {
        return (event) => {
            if (event &&
                event.type === 'keydown' &&
                (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }

            setState({ ...state, [anchor]: open });
        };
    }

    function clickHandler() {
        var tracks = data["track"].map((track) => {
            var t = JSON.parse(JSON.stringify(track))
            t['audio_file'] = `http://127.0.0.1:8000${track['audio_file']}`
            t['album']['album_logo'] = `http://127.0.0.1:8000${track['album']['album_logo']}`
            return t
        })
        const temp = JSON.parse(JSON.stringify(tracks));
        dispatch(addMultipleTracks(temp))
    }

    const list = (anchor) => (
        <Box
            className={styles.drawer}
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        // background='black'
        >
            <div2>
                {[data].map((album) => {
                    return (
                        <Box>
                            <div className={styles.space}>{album.album_title}</div>
                            <Button className={styles.button} onClick={clickHandler} >Add to Queue</Button>
                            <div className={styles.space} key={album.album_logo}><img
                                src={`http://127.0.0.1:8000${album.album_logo}`}
                                srcSet={`http://127.0.0.1:8000${album.album_logo}`}
                                width='300px'
                                alt={album.album_title}
                                loading="lazy" /></div>
                            <List sx={{ width: '100%', maxWidth: 400, bgcolor: '#0099ff' }}>
                                {
                                    album.track.map((track) =>
                                        <ListItem key={track.id}>
                                            <ListItemButton role={undefined} dense>
                                                <PlayButton trackid={track.id} edge="start" aria-label="play" />
                                                <ListItemText
                                                    primary={track.track_title}
                                                    secondary={track.album.album_title}

                                                    edge="centre"
                                                />
                                                <ListItemIcon>
                                                    <LikeButton
                                                        trackid={track.id}
                                                        edge="end"
                                                    />
                                                </ListItemIcon>
                                            </ListItemButton>
                                        </ListItem>)
                                }
                            </List>
                        </Box>
                    );
                })}
            </div2>

        </Box>
    );
    return (
        <div>
            <Button
                // aria-label={`info about ${album.album_title}`}
                onClick={toggleDrawer('right', true)}><InfoIcon /></Button>
            <SwipeableDrawer
                anchor='right'
                open={state['right']}
                color='black'
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {list('right')}
            </SwipeableDrawer>
        </div>
    );
}

export default SwipableDrawer
