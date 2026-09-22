import React, { useState, useEffect } from 'react'
import PlaybackStatus from './helpers/playbackStatus/PlaybackStatus';
import WaitingPage from './waiting/WaitingPage';
import NowPlaying from './nowPlaying/NowPlaying';

function Playback() {
    const [track, setTrack] = useState(null)
    const [isPaused, setIsPaused] = useState(true)

    useEffect(() => {
        // Poll every 3 seconds to check what's currently playing
        fetchNowPlaying()
        const interval = setInterval(fetchNowPlaying, 3000)
        return () => clearInterval(interval)
    }, [])

    async function fetchNowPlaying() {
        const res = await fetch('/player/now-playing')
        const data = await res.json()
        if (data && data.item) {
            setTrack(data.item)
            setIsPaused(!data.is_playing)
        }
        else{
            //reset to default values
            setTrack(null)
            setIsPaused(true)
        }
    }

    async function sendCommand(action) {
        await fetch(`/player/${action}`, { method: 'PUT' })
        fetchNowPlaying()
    }

    if (!track) return (
        <>
            <PlaybackStatus input="waiting" />
            <WaitingPage />
        </>
    )

    return (
        <div>
            <PlaybackStatus input="" />
            <NowPlaying sendCommand={sendCommand} isPaused={isPaused} track={track} />
        </div>
    )
}

export default Playback