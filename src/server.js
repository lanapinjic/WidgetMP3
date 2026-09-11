import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

let access_token = ''

function generateRandomString(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function startServer(port, redirectBase) {
    const app = express()

    app.get('/auth/login', (req, res) => {
        const scope = 'user-read-playback-state user-modify-playback-state'
        const state = generateRandomString(16)

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: spotify_client_id,
            scope,
            redirect_uri: `${redirectBase}/auth/callback`,
            state
        })

        res.redirect('https://accounts.spotify.com/authorize/?' + params.toString())
    })

    app.get('/auth/callback', async (req, res) => {
        const code = req.query.code

        const body = new URLSearchParams({
            code,
            redirect_uri: `${redirectBase}/auth/callback`,
            grant_type: 'authorization_code'
        })

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization:
                    'Basic ' +
                    Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body
        })

        const data = await response.json()
        access_token = data.access_token
        res.redirect('/')
    })

    app.get('/auth/token', (req, res) => {
        res.json({ access_token })
    })

    app.listen(port, () => {
        console.log(`Auth server listening on port ${port}`)
    })

    app.get('/player/now-playing', async (req, res) => {
        const response = await fetch('https://api.spotify.com/v1/me/player', {
            headers: { Authorization: `Bearer ${access_token}` }
        })

        if (response.status === 204) {
            return res.json(null) // nothing currently playing
        }

        const data = await response.json()
        res.json(data)
    })

    app.put('/player/:action', async (req, res) => {
        const { action } = req.params // 'play', 'pause', 'next', 'previous'
        const method = (action === 'next' || action === 'previous') ? 'POST' : 'PUT'

        await fetch(`https://api.spotify.com/v1/me/player/${action}`, {
            method,
            headers: { Authorization: `Bearer ${access_token}` }
        })

        res.sendStatus(204)
    })
}


export { startServer }