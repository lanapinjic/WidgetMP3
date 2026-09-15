import React from 'react';
import './PlaybackStatus.css';

function PlaybackStatus({ input }) {
    return (
        <div className="playback-status">
            <div className="live-icon"></div>
            <p>{input === 'waiting' ? 'READY TO PLAY' : 'CURRENTLY PLAYING'}</p>
        </div>
    )

}
export default PlaybackStatus
