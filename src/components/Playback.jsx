import React, { useState, useEffect } from 'react'
import PlaybackStatus from './PlaybackStatus';
import WaitingPage from './WaitingPage';

function Playback() {
    const [track, setTrack] = useState(null)
    const [isPaused, setIsPaused] = useState(true)

    useEffect(() => {
        // Poll every 3 seconds to check what's currently playing
        const interval = setInterval(fetchNowPlaying, 3000)
        fetchNowPlaying() // also run once immediately
        return () => clearInterval(interval)
    }, [])

    async function fetchNowPlaying() {
        const res = await fetch('/player/now-playing')
        const data = await res.json()
        if (data && data.item) {
            setTrack(data.item)
            setIsPaused(!data.is_playing)
        }
    }

    async function sendCommand(action) {
        await fetch(`/player/${action}`, { method: 'PUT' })
        fetchNowPlaying() // refresh immediately after sending a command
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
            <img src={track.album.images[0].url} alt="" width={200} />
            <p>{track.name} — {track.artists[0].name}</p>

            <button onClick={() => sendCommand('previous')}>Prev</button>
            <button onClick={() => sendCommand(isPaused ? 'play' : 'pause')}>
                {isPaused ? 'Play' : 'Pause'}
            </button>
            <button onClick={() => sendCommand('next')}>Next</button>
        </div>
    )
}

export default Playback