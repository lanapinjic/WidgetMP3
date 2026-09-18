import './WaitingPage.css';
import gigi from '../assets/gigi.gif'
import gigiWha from '../assets/gigiWha.gif'
import YakulWaitingMusic from '../assets/YakulWaitingMusic.mp3'
import OpenSpotifyButton from '../assets/OpenSpotifyButton.svg'
import MusicBars from '../assets/MusicBars.svg'


const WaitingPage = () => {
    return (
        <div>
            <div className="waiting-page">
                <p className="waiting-page-title" >Time to play some music on Spotify </p>
                <img src={OpenSpotifyButton} alt="open-spotify-button" className='spotify-button' onClick={() => window.electronAPI.openSpotify()}/>
                <div className="waiting-footer">
                    <div className="background-music">
                        <img src={MusicBars} alt="music-bars-icon" className='music-bars'/>
                        <p> secret forest - Studio Ghibli </p>
                    </div>
                    <img src={gigi} alt="waiting-animation" className='waiting-animation'/>
                </div>
            </div>
            <audio src={YakulWaitingMusic} autoPlay loop />
        </div>
    );
};

export default WaitingPage;