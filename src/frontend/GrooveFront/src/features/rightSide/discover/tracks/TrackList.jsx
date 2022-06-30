import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LikeButton from '../../../buttons/LikeButton';
import PlayButton from '../../../buttons/PlayButton';


export function TrackList(props) {
    if (typeof props.tracks === "undefined") { return (<div>No results</div>); }
    return (
        <List sx={{
            width: "60vw",
            height: "84vh",
            overflowY: 'auto'
        }}>
            {props.tracks.map((track) => {
                return (
                    <ListItem key={track.id}>
                        <ListItemButton role={undefined} dense
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: "20px",
                            }}>
                            <PlayButton trackid={track.id} edge="start" aria-label="play" />
                            <ListItemText
                                // className={styles.list}
                                primary={track.track_title}
                                secondary={<div color='white'>{track.album.album_title}</div>} />
                            <ListItemIcon>
                                <LikeButton
                                    trackid={track.id}
                                    edge="end" />
                                {/* <TrackActions/> */}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
