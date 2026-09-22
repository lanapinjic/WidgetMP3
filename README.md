# Mini Widget MP3

A lightweight Electron desktop widget for controlling Spotify playback. Log in once, then see what's currently playing (or a waiting screen when nothing is) and control playback — all from a small, frameless, draggable widget window.

## How it works

Widget MP3 doesn't play audio itself — it's a **remote control**, not a player. It reads and controls whatever is already playing on your phone, desktop Spotify app, or speaker, using Spotify's Web API. This avoids the DRM/Widevine requirements that in-app audio playback would need, keeping the app simple and lightweight.

**Architecture:**

- **Electron main process** (`main.js`) creates the widget window and starts a local Express server on app launch.
- **Local Express server** (`server.js`) runs inside the main process and handles two responsibilities:
  - **OAuth**: manages the Spotify Authorization Code flow (login, callback, token exchange, token storage).
  - **Player proxy**: forwards playback state requests and control commands (play, pause, skip) to the Spotify Web API using the stored access token.
- **Renderer (React UI)** polls the local server every few seconds for the current playback state and renders one of two views:
  - **Waiting view** — shown when nothing is currently playing. Includes a button to open the Spotify app directly.
  - **Now Playing view** — shown when a track is active, with track info and playback controls (previous / play-pause / next).
- **Preload bridge** exposes a minimal, safe API from the main process to the renderer (e.g. opening the Spotify app via `shell.openExternal`), keeping `contextIsolation` enabled for security.

```
User → Renderer (React) → Local Express server → Spotify Web API
                ↑                     ↓
          polls state          proxies OAuth + playback
```

## Prerequisites

- **Node.js 22.12.0 or higher** — required by Electron's current major version.
- **A Spotify Premium account** — required for playback control via the Web API.
- **A Spotify Developer app** — create one at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) to get a Client ID and Client Secret.

## Setup

**1. Clone the repository and install dependencies**
```bash
git clone <your-repo-url>
cd widget-mp3
npm install
```

**2. Create a `.env` file in the project root**
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

**3. Register the redirect URI on your Spotify app**

In the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard), open your app → **Edit Settings** → **Redirect URIs**, and add:
```
http://127.0.0.1:5173/auth/callback
```
Save. (Spotify requires the explicit loopback IP `127.0.0.1` rather than `localhost` for local redirect URIs.)

**4. Run the app**
```bash
npm start
```

This launches Electron, starts the local Express server (default port `5001`), and opens the widget window. Click **Login with Spotify** to authenticate — you'll be redirected within the same window, no external browser required.

## Available scripts

| Command | Description |
|---|---|
| `npm start` | Runs the app in development mode |
| `npm run package` | Packages the app for your current OS |
| `npm run make` | Builds distributable installers (`.dmg`, `.exe`, etc.) |

## Project structure

```
widget-mp3/
├── index.html
├── .env                    # not committed — your Spotify credentials
├── src/
│   ├── main.js              # Electron main process, creates the window, starts the server
│   ├── preload.js           # Secure bridge between main and renderer
│   ├── server.js            # Express server: OAuth + Spotify Web API proxy
│   ├── renderer.jsx         # React entry point
│   ├── App.jsx               # Top-level login gate
│   ├── Login.jsx             # Login screen
│   └── Playback.jsx          # Playback controller — switches between waiting/now-playing views
│       ├── NowPlaying.jsx
│       ├── WaitingPage.jsx
│       └── PlaybackStatus.jsx
```
## Project architecture
<img width="3906" height="6329" alt="diagram (1)" src="https://github.com/user-attachments/assets/44fe38fe-8589-497b-907f-e8bc31fc7a8a" />

## Notes & limitations

- **No in-app audio playback.** This app controls playback on your other Spotify-connected devices; it does not stream audio through the widget itself.
- **Requires Spotify Premium** for playback control endpoints to function.
- **Access tokens expire after about an hour.** Currently requires logging in again after expiry — refresh-token handling is a planned improvement.
- **The preload bridge's full implementation isn't finalized** — its wiring is currently limited to what's explicitly used by the renderer (e.g. opening the Spotify app).

## Roadmap ideas

- Use the OAuth `refresh_token` to silently renew access without requiring re-login.
- Add search functionality using Spotify's [Search endpoint](https://developer.spotify.com/documentation/web-api/reference/search).
- Add a device picker using the [Get Playback State](https://developer.spotify.com/documentation/web-api/reference/get-information-about-the-users-current-playback) endpoint, to transfer playback between devices.
