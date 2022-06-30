import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useGetHistoryQuery } from '../../../../app/music_api/musicApi';
import LikeButton from '../../../buttons/LikeButton';
import PlayButton from '../../../buttons/PlayButton';

export default function TrackList() {
    const { data, isLoading, error } = useGetHistoryQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
    return (
        <List sx={{
            width: '100vh',
            height: '75vh',
            overflowY: 'auto'
        }}>
            {data.map((track) => {
                return (
                    <ListItem>
                        <ListItemButton role={undefined} dense
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                borderRadius: "20px",
                            }}>
                            <PlayButton trackid={track.track.id} edge="start" aria-label="play" />
                            <ListItemText
                                // className={styles.list}
                                primary={<b>{track.track.track_title}</b>}
                                secondary={<div color='white'>{track.track.album.album_title}</div>} />
                            {/* <ListItemText className={styles.list} >{track.album.album_title}</ListItemText>  */}

                            <ListItemIcon>
                                <LikeButton
                                    trackid={track.track.id}
                                    edge="end"
                                />
                                {/* <TrackActions/> */}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}