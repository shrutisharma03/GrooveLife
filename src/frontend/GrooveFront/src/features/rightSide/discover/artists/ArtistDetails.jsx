import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import { useGetSpecificArtistQuery } from '../../../../app/music_api/musicApi';
import styles from '../albums/Albums.module.css'

function SwipableDrawer(props) {
    const [state, setState] = React.useState({
        right: false,
    });
    var artistid = props.artistid;
    const { data, isLoading, error } = useGetSpecificArtistQuery(artistid);
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
                {[data].map((artist) => {
                    return (
                        <>
                            <div className={styles.space}>{artist.name}</div>
                            <div className={styles.space} key={artist.thumbnail}><img
                                src={`http://127.0.0.1:8000${artist.thumbnail}`}
                                srcSet={`http://127.0.0.1:8000${artist.thumbnail}`}
                                width='300px'
                                alt={artist.name}
                                loading="lazy" /></div>
                            <div className={styles.space}>Country : {artist.country}</div>
                            <div className={styles.space}>Bio : {artist.bio}</div>
                        </>
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
