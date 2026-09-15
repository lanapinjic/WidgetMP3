import './Login.css';
import LoginSpotifyButton from "../assets/LoginSpotifyButton.svg";
import TotoroWalking from "../assets/TotoroWalking.gif";

function Login() {
    return (
        <div>
            <div className="login-page">
                <p>Welcome to Widget MP3!</p>
                <a href="/auth/login">
                    <img src={LoginSpotifyButton} alt="login-spotify-button" className='spotify-button'/>
                </a>
                <div className="footer" >
                    <p className="footer-text">
                        <span>for more</span>
                        <a href="https://lanapinjic.dev" target="_blank" rel="noopener noreferrer">
                            lanapinjic.dev
                        </a>
                    </p>
                    <img src={TotoroWalking} alt="totoro-walking-animation" className='totoro-animation'/>
                </div>
            </div>
        </div>
    )
}

export default Login