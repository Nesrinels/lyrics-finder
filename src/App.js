import './App.css'; 
import Axios from 'axios'; 
import { useState } from 'react'; 

function App() { 
	const [artist, setArtist] = useState(""); 
	const [song, setSong] = useState(""); 
	const [lyrics, setLyrics] = useState("");
  const [spotifyResults, setSpotifyResults] = useState([]); 

	function searchLyrics() { 
		if (artist === "" || song === "") { 
			return; 
		} 
		Axios.get( 
`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => { 
			console.log(res.data.lyrics); 
			setLyrics(res.data.lyrics); 
		}) 
	} 

  const searchSpotify = () => { 
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        const results = JSON.parse(this.responseText).contents;
        setSpotifyResults(results);
      }
    });

    xhr.open('GET', `https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5`);
    xhr.setRequestHeader('x-rapidapi-key', '82cc783c78msh8874c8d7194f782p13cd9ejsn7985ab35a592');
    xhr.setRequestHeader('x-rapidapi-host', 'spotify23.p.rapidapi.com');

    xhr.send(); 
  }

  const handleSearch = () => {
    searchLyrics();
    searchSpotify();
  }


	return ( 
		<div className="App"> 
			<h1>Lyrics Finder <i class="bi bi-music-note-beamed"></i></h1> 

			<input className="inp" type="text"
				placeholder='Artist name'
				onChange={(e) => { setArtist(e.target.value) }} /> 
			<input className="inp" type="text"
				placeholder='Song name'
				onChange={(e) => { setSong(e.target.value) }} /> 
			<button className="btn"
				onClick={() => searchLyrics()}> 
					 Search</button> 
			<hr /> 
			<pre>{lyrics}</pre> 
      <h2>Spotify Search Results:</h2>
      <ul>
        {spotifyResults.map((result, index) => (
          <li key={index}>
            {result.name} by {result.artist}
          </li>
        ))}
      </ul>
		</div> 
	); 
} 

export default App;


// import './App.css';
// import { useState, useEffect } from 'react';
// import Axios from 'axios';

// function App() {
//   const [artist, setArtist] = useState("");
//   const [song, setSong] = useState("");
//   const [lyrics, setLyrics] = useState("");
//   const [spotifyResults, setSpotifyResults] = useState([]);
//   const [playbackDevice, setPlaybackDevice] = useState(null);

//   useEffect(() => {
//     // Load the Spotify Web Playback SDK
//     const script = document.createElement('script');
//     script.src = "https://sdk.scdn.co/spotify-player.js";
//     script.async = true;
//     document.body.appendChild(script);

//     script.onload = () => {
//       if (window.Spotify) {
//         // Initialize Spotify Web Playback SDK
//         const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // You need to handle token retrieval
//         const player = new Spotify.Player({
//           name: 'Web Playback SDK Player',
//           getOAuthToken: cb => { cb(token); }
//         });

//         // Connect to the player!
//         player.connect().then(success => {
//           if (success) {
//             console.log('The Web Playback SDK successfully connected to Spotify!');
//             setPlaybackDevice(player);
//           }
//         });
//       }
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const searchLyrics = () => {
//     if (artist === "" || song === "") {
//       return;
//     }
//     Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`).then(res => {
//       console.log(res.data.lyrics);
//       setLyrics(res.data.lyrics);
//     });
//   };

//   const searchSpotify = () => {
//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.addEventListener('readystatechange', function () {
//       if (this.readyState === this.DONE) {
//         const results = JSON.parse(this.responseText).contents;
//         setSpotifyResults(results);
//       }
//     });

//     xhr.open('GET', `https://spotify23.p.rapidapi.com/search/?type=multi&offset=0&limit=10&numberOfTopResults=5`);
//     xhr.setRequestHeader('x-rapidapi-key', '82cc783c78msh8874c8d7194f782p13cd9ejsn7985ab35a592');
//     xhr.setRequestHeader('x-rapidapi-host', 'spotify23.p.rapidapi.com');

//     xhr.send();
//   };

//   const playSong = (trackUri) => {
//     if (playbackDevice) {
//       playbackDevice.play({
//         uris: [trackUri]
//       }).then(() => {
//         console.log('Playback started');
//       }).catch((error) => {
//         console.error('Error playing track:', error);
//       });
//     } else {
//       console.error('No playback device available');
//     }
//   };

//   const handleSearch = () => {
//     searchLyrics();
//     searchSpotify();
//   };

//   return (
//     <div className="App">
//       <h1>Lyrics Finder <i className="bi bi-music-note-beamed"></i></h1>

//       <input
//         className="inp"
//         type="text"
//         placeholder='Artist name'
//         onChange={(e) => { setArtist(e.target.value) }}
//       />
//       <input
//         className="inp"
//         type="text"
//         placeholder='Song name'
//         onChange={(e) => { setSong(e.target.value) }}
//       />
//       <button className="btn"
//         onClick={handleSearch}>
//         Search
//       </button>
//       <hr />
//       <h2>Lyrics:</h2>
//       <pre>{lyrics}</pre>
//       <h2>Spotify Search Results:</h2>
//       <ul>
//         {spotifyResults.map((result, index) => (
//           <li key={index}>
//             {result.name} by {result.artist}
//             <button onClick={() => playSong(result.uri)}>Play</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
