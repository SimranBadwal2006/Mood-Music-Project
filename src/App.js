import React, { useState, useEffect } from "react";
import "./App.css";

/* 🎵 FULL SONG DATA */
const songsData = {
  happy: [
    { name: "Blinding Lights", id: "0VjIjW4GlUZAMYd2vXMi3b" },
    { name: "Shape of You", id: "7qiZfU4dY1lWllzX7mPBI3" },
    { name: "Levitating", id: "463CkQjx2Zk1yXoBuierM9" },
    { name: "Happy - Pharrell", id: "60nZcImufyMA1MKQY3dcCH" },
    { name: "Good Time", id: "3bidbhpOYeV4knp8AIu8Xn" },
    { name: "Best Day Of My Life", id: "5d6Mjuu2uCGRPYpFjGpCX5" },
    { name: "Shake It Off", id: "5xTtaWoae3wi06K5WfVUUH" },
    { name: "Uptown Funk", id: "32OlwWuMpZ6b0aN2RZOeMS" }
  ],

  sad: [
    { name: "Someone Like You", id: "4kflIGfjdZJW4ot2ioixTB" },
    { name: "Let Me Down Slowly", id: "7qEHsqek33rTcFNT9PFqLf" },
    { name: "Happier", id: "2VxeLyX666F8uXCJ0dZF8B" },
    { name: "Fix You", id: "7LVHVU3tWfcxj5aiPFEW4Q" },
    { name: "All I Want", id: "0NlGoUyOJSuSHmngoibVAs" },
    { name: "Before You Go", id: "7qEHsqek33rTcFNT9PFqLf" },
    { name: "Arcade", id: "1Xi84slp6FryDSCbzq4UCD" }
  ],

  chill: [
    { name: "Perfect", id: "0tgVpDi06FyKpA1z0VMD4v" },
    { name: "Let Her Go", id: "2jyj0VJ5t4VJx7C9qvQ8EJ" },
    { name: "Memories", id: "2b8fOow8UzyDFAE27YhOZM" },
    { name: "Yellow", id: "3AJwUDP919kvQ9QcozQPxg" },
    { name: "Photograph", id: "6fxVffaTuwjgEk5h9QyRjy" },
    { name: "Lovely", id: "0u2P5u6lvoDfwTYjAADbn4" },
    { name: "Sunflower", id: "3KkXRkHbMCARz0aVfEt68P" }
  ],

  angry: [
    { name: "Believer", id: "0pqnGHJpmpxLKifKRmU6WP" },
    { name: "Thunder", id: "1zi7xx7UVEFkmKfv06H8x0" },
    { name: "Enemy", id: "1r9xUipOqoNwggBpENDsvJ" },
    { name: "Radioactive", id: "62yJjFtgkhUrXktIoSjgP2" },
    { name: "Stronger", id: "5aAx2yezTd8zXrkmtKl66Z" },
    { name: "Power", id: "2gZUPNdnz5Y45eiGxpHGSc" }
  ]
};

const trending = [
  { name: "Blinding Lights", id: "0VjIjW4GlUZAMYd2vXMi3b" },
  { name: "Stay", id: "5HCyWlXZPP0y6Gqq8TgA20" },
  { name: "Levitating", id: "463CkQjx2Zk1yXoBuierM9" },
  { name: "Bad Guy", id: "2Fxmhks0bxGSBdJ92vM42m" },
  { name: "Closer", id: "7BKLCZ1jbUBVqRi2FVlTVw" }
];

function App() {

  const [user, setUser] = useState(localStorage.getItem("user"));
  const [input, setInput] = useState("");

  const [songs, setSongs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [search, setSearch] = useState("");
  const [currentMood, setCurrentMood] = useState("happy");

  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem("liked")) || []
  );

  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("playlist")) || []
  );

  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recent")) || []
  );

  useEffect(() => {
    setSongs(songsData["happy"]);
  }, []);

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("recent", JSON.stringify(recent));
  }, [liked, playlist, recent]);

  const handleLogin = () => {
    if (!input.trim()) return;

    localStorage.setItem("user", input);
    setUser(input);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const loadSongs = (mood) => {
    setCurrentMood(mood);
    setSongs(songsData[mood]);
    setSearch("");
  };

  const playSong = (song) => {

    setCurrentTrack(song);

    setRecent((prev) => {
      const updated = [song, ...prev.filter((s) => s.id !== song.id)];
      return updated.slice(0, 5);
    });
  };

  const toggleLike = (song) => {

    setLiked((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };

  const togglePlaylist = (song) => {

    setPlaylist((prev) =>
      prev.find((s) => s.id === song.id)
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song]
    );
  };

  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLowerCase())
  );

  /* LOGIN PAGE */

  if (!user) {
    return (
      <div className="login-container">

        <div className="login-box">

          <h1>🎧 Moodify</h1>

          <input
            placeholder="Enter name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleLogin()
            }
          />

          <button
            className="login-btn"
            onClick={handleLogin}
          >
            Enter
          </button>

        </div>
      </div>
    );
  }

  return (

    <div className="app">

      {/* TOP BAR */}

      <div className="top-bar">

        <h1>🎧 Moodify</h1>

        <div className="user-box">
          👤 {user}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>

      {/* SEARCH */}

      <input
        className="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MOODS */}

      <div className="moods">

        <button onClick={() => loadSongs("happy")}>
          😊
        </button>

        <button onClick={() => loadSongs("sad")}>
          😢
        </button>

        <button onClick={() => loadSongs("chill")}>
          😌
        </button>

        <button onClick={() => loadSongs("angry")}>
          😡
        </button>

      </div>

      {/* TRENDING */}

      <h2>🔥 Trending Now</h2>

      <div className="songs-grid">

        {trending.map((song, i) => (

          <div key={i} className="song">

            <img
              src={`https://picsum.photos/300/300?random=trend${i}`}
              alt={song.name}
            />

            <h3>{song.name}</h3>

            <div className="actions">

              <button onClick={() => playSong(song)}>
                ▶
              </button>

              <button onClick={() => toggleLike(song)}>
                {liked.find((s) => s.id === song.id)
                  ? "❤️"
                  : "🤍"}
              </button>

              <button onClick={() => togglePlaylist(song)}>
                ➕
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* SONGS */}

      <h2>🎵 {currentMood.toUpperCase()}</h2>

      <div className="songs-grid">

        {filteredSongs.map((song, i) => (

          <div key={i} className="song">

            <img
              src={
                currentMood === "happy"
                  ? `https://picsum.photos/300/300?random=${i + 1}`
                  : currentMood === "sad"
                  ? `https://picsum.photos/300/300?random=${i + 20}`
                  : currentMood === "chill"
                  ? `https://picsum.photos/300/300?random=${i + 40}`
                  : `https://picsum.photos/300/300?random=${i + 60}`
              }
              alt={song.name}
            />

            <h3>{song.name}</h3>

            <div className="actions">

              <button onClick={() => playSong(song)}>
                ▶
              </button>

              <button onClick={() => toggleLike(song)}>
                {liked.find((s) => s.id === song.id)
                  ? "❤️"
                  : "🤍"}
              </button>

              <button onClick={() => togglePlaylist(song)}>
                ➕
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* RECENT */}

      <h2>🕒 Recently Played</h2>

      <div className="songs-grid">

        {recent.map((song, i) => (

          <div key={i} className="song">

            <h4>{song.name}</h4>

          </div>
        ))}
      </div>

      {/* PLAYLIST */}

      <h2>🎧 Playlist</h2>

      <div className="songs-grid">

        {playlist.map((song, i) => (

          <div key={i} className="song">

            <h4>{song.name}</h4>

            <div className="actions">

              <button onClick={() => playSong(song)}>
                ▶
              </button>

              <button onClick={() => togglePlaylist(song)}>
                🗑️
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* PLAYER */}

      {currentTrack && (

        <div className="bottom-player">

          <iframe
            title="spotify-player"
            src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>

        </div>
      )}

    </div>
  );
}

export default App;