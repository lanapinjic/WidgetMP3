import './WaitingPage.css';
import WaitingAnimation from '../assets/YakulWaiting.gif';
import YakulWaitingMusic from '../assets/YakulWaitingMusic.mp3'
import OpenSpotifyButton from '../assets/OpenSpotifyButton.svg'
import MusicBars from '../assets/MusicBars.svg'
// import liveIndicator from '../assets/live-indicator.svg'


const WaitingPage = () => {
    return (
        <div>
            <div className="waiting-page">
                <p>Time to play some music on Spotify </p>
                <img src={OpenSpotifyButton} alt="open-spotify-button" className='spotify-button'/>
                <p>While you wait, Yakul will keep you company. </p>
                <img src={WaitingAnimation} alt="animation" className='yakul-waiting-animation'/>
                <div className="background-music">
                    <img src={MusicBars} alt="music-bars-icon" className='music-bars'/>
                    <p> secret forest - Studio Ghibli </p>
                </div>
            </div>
            <audio src={YakulWaitingMusic} autoPlay loop />
        </div>
    );
};

export default WaitingPage;