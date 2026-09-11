import React, { useState, useEffect } from 'react'
import Playback from './Playback'
import Login from './Login'

function App() {
    // Empty string = not logged in yet. Once we get a real token, this flips.
    const [token, setToken] = useState('')

    useEffect(() => {
        // On load, ask our backend if it already has a token stored
        // (e.g. user already logged in earlier during this session).
        fetch('/auth/token')
            .then(res => res.json())
            .then(json => setToken(json.access_token))
    }, [])

    // No token yet -> show login button. Token exists -> show the player.
    return token === '' ? <Login /> : <Playback token={token} />
}

export default App