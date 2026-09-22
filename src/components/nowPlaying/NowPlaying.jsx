import './NowPlaying.css';
import PreviousTrackButtonAction from "../../assets/PreviousTrackButtonAction.svg";
import NextTrackButtonAction from "../../assets/NextTrackButtonAction.svg";
import PauseButtonAction from "../../assets/PauseButtonAction.svg";
import PlayButtonAction from "../../assets/PlayButtonAction.svg";

function NowPlaying({ sendCommand, isPaused, track }) {
    return (
        <div>
            <div className="now-playing-page">
                <img src={track.album.images[0].url} alt="album-image" className="song-image"/>
                <p className="track-title">{track.name} </p>
                <p className="track-artists">{track.artists[0].name}</p>
                <div className="action-buttons">
                    <img src={PreviousTrackButtonAction} alt="previous-track-button" onClick={() => sendCommand('previous')}/>
                    <img src={isPaused ? PlayButtonAction : PauseButtonAction} alt="play-pause-button" onClick={() => sendCommand(isPaused ? 'play' : 'pause')}/>
                    <img src={NextTrackButtonAction} alt="next-track-button" onClick={() => sendCommand('next')}/>
                </div>
            </div>
        </div>
    )
}

export default NowPlaying