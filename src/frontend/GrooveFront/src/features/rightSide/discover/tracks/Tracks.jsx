import * as React from 'react';
import { useGetTrackListQuery } from '../../../../app/music_api/musicApi';
import { TrackList } from './TrackList';

export default function Tracks() {
    const { data, isLoading, error } = useGetTrackListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }
    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
    return (
        <TrackList tracks={data} />
    );
}