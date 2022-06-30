import * as React from 'react';
import { useGetAlbumListQuery } from '../../../../app/music_api/musicApi';
import { AlbumList } from './AlbumsList';

export default function Albums() {
    const { data, isLoading, error } = useGetAlbumListQuery()
    if (isLoading) {
        return (<div>Loading...</div>)
    }

    if (error) {
        return (<div>Some error</div>)
    }
    console.log(data)
    return (<AlbumList albums={data} />)
}
