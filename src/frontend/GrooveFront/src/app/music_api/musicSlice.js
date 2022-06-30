import { createSlice } from "@reduxjs/toolkit"

const storedQueue = JSON.parse(localStorage.getItem("queue"))
console.log("Getting state")

const initialState = storedQueue ? {
    queue: storedQueue,
    isPlaying: false,
    currentlyPlayingIndex: 0,
} : {
    queue: [],
    isPlaying: false,
    currentlyPlayingIndex: 0,
};


export const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {
        addMultipleTracks: (state, action) => {
            console.log(action.payload)
            state.queue.push(...action.payload)
            //remove duplicates
            state.queue = state.queue.filter((track, id, self) =>
                id === self.findIndex((t) => (
                    t.id === track.id
                ))
            )
            localStorage.setItem("queue", JSON.stringify(state.queue))
        },
        addTrack: (state, action) => {
            console.log(action.payload)
            state.queue.push(action.payload)
            //remove duplicated
            state.queue = state.queue.filter((track, id, self) =>
                id === self.findIndex((t) => (
                    t.id === track.id
                ))
            )
            localStorage.setItem("queue", JSON.stringify(state.queue))
        },
        removeTrack: (state, action) => {
            state.queue = state.queue.filter(function (track) {
                return track.id !== action.payload.id;
            })
        },
        clearQueue: (state) => {
            state.queue = []
        },
        nextTrack: (state) => {
            let temp = state.currentlyPlayingIndex
            temp += 1
            if (temp > state.queue.length - 1)
                temp = 0
            state.currentlyPlayingIndex = temp
        },
        prevTrack: (state) => {
            let temp = state.currentlyPlayingIndex
            temp -= 1
            if (temp < 0)
                temp = state.queue.length - 1
            state.currentlyPlayingIndex = temp
        },
        playTrack: (state) => {
            state.isPlaying = true
        },
        pauseTrack: (state) => {
            state.isPlaying = false
        },
        setPlayIndex: (state, action) => {
            state.currentlyPlayingIndex = action.payload
        }
    },
})

export const { addMultipleTracks, addTrack, removeTrack, clearQueue, nextTrack, prevTrack, playTrack, pauseTrack, setPlayIndex } = queueSlice.actions

export const selectQueue = (state) => state.queue.queue
export const selectIsPlaying = (state) => state.queue.isPlaying
export const selectCurrentlyPlayingIndex = (state) => state.queue.currentlyPlayingIndex;

export default queueSlice.reducer;