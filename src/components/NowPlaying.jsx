import './NowPlaying.css';

function NowPlaying({ sendCommand, isPaused, track }) {
    return (
        <div>
            <div className="now-playing-page">
                <img src={track.album.images[0].url} alt="album-image" className="song-image"/>
                <p>{track.name} — {track.artists[0].name}</p>

                <button onClick={() => sendCommand('previous')}>Prev</button>
                <button onClick={() => sendCommand(isPaused ? 'play' : 'pause')}>
                    {isPaused ? 'Play' : 'Pause'}
                </button>
                <button onClick={() => sendCommand('next')}>Next</button>
            </div>
        </div>
    )
}

export default NowPlaying