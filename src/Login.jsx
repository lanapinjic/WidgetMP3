import React from 'react'

// Just a button. Clicking it hits our own backend route (/auth/login),
// which redirects the browser to Spotify's login page.
function Login() {
    return (
        <a href="/auth/login">Login with Spotify</a>
    )
}

export default Login