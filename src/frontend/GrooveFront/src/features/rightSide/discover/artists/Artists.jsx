import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ArtistDetails from './ArtistDetails'
import { useGetArtistListQuery } from '../../../../app/music_api/musicApi';

export default function TitlebarImageList() {
    const { data, isLoading, error } = useGetArtistListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
    return (
        <ImageList
            cols={3}
            sx={{
                width: "60vw",
                height: "84vh",
                padding: "10px"
            }}>
            {data.map((artist) => (
                <ImageListItem key={artist.thumbnail}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: "20px",
                        padding: '20px'
                    }}>
                    <img
                        src={`http://127.0.0.1:8000${artist.thumbnail}`}
                        srcSet={`http://127.0.0.1:8000${artist.thumbnail}`}
                        alt={artist.name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        sx={{
                            background:
                                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        }}
                        title={artist.name}
                        subtitle={artist.name}
                        actionIcon={< ArtistDetails artistid={artist.id} />}
                    />

                </ImageListItem>
            ))}
        </ImageList>
    );
}