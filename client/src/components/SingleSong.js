import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, Redirect } from "react-router-dom";
import { getSongsListById } from "../list-music-user";
import ReactPlayer from "react-player";
import SongsQueue from "./SongsQueue";
import queryString from "query-string";

function SingleSong() {
	const [currentSong, setCurrentSong] = useState({});
	const [songName, setSongName] = useState("");
	const [songLength, setSongLength] = useState("");
	const [songArtist, setSongArtist] = useState("");
	const [songAlbum, setSongAlbum] = useState("");
	const [songImg, setSongImg] = useState("");
	const [songsLinkArray, setSongsLinkArray] = useState([]);
	const [queueSongs, setQueueSongs] = useState([]);
	const [error, setError] = useState(false);

	const { pathname, search } = useLocation();
	const params = useParams();

	const currentSongSetter = (songDataObj) => {
		setCurrentSong(songDataObj);
		setSongName(songDataObj.title);
		setSongLength(songDataObj.length);
		setSongArtist(songDataObj.artist.artistName);
		if (songDataObj.albumId) {
			setSongAlbum(songDataObj.album.name);
			setSongImg(songDataObj.album.coverImg);
		} else {
			setSongImg(songDataObj.artist.coverImg);
		}
	};

	useEffect(() => {
		getSongsListById(`${pathname}${search}`).then(
			(data) => {
				const tempSong = data.find((song) => {
					return parseInt(song.id) === parseInt(params.id);
				});
				currentSongSetter(tempSong);
				const tempQueue = data.filter((song) => {
					return parseInt(song.id) !== parseInt(params.id);
				});
				setQueueSongs(tempQueue);
				let tempLinksArray = tempQueue.map((song) => {
					return song.youtubeLink;
				});
				// console.log('links 1', tempLinksArray);
				tempLinksArray.unshift(tempSong.youtubeLink);
				setSongsLinkArray(tempLinksArray);
			},
			(error) => {
				console.error("there was an error", error);
				alert("No Such Song");
				setError(true);
			}
		);
	}, [pathname, search, params]);

	const redirectByHistory = () => {
		const queryObj = queryString.parse(search, { parseNumbers: true });
		if (!queryObj.id) {
			return "/song";
		} else {
			return `/${queryObj.type}/${queryObj.id}`;
		}
	};

	return (
		<>
			{error ? (
				<Redirect
					to={
						redirectByHistory
					} /* implement where user came from using querry params */
				/>
			) : (
				<div className="song-page">
					<div className="song-player">
						<ReactPlayer
							url={songsLinkArray}
							playing
							controls
							width="300px"
							height="300px"
						/>
					</div>
					<div className="song-info">
						<span className="song-title-img">
							<h2 className="song-name">{songName}</h2>
							<img src={songImg} alt="Album or Artist" className="song-img" />
						</span>
						<div className="song-artist">
							<Link to={`/artist/${currentSong.artistId}`}>{songArtist}</Link>
							{songAlbum ? (
								<Link to={`/artist/${currentSong.albumId}`}>
									{" - "}
									{songAlbum}
								</Link>
							) : null}
						</div>
						<span className="song-length">{songLength}</span>
					</div>
					<SongsQueue songsArray={queueSongs} />
				</div>
			)}
		</>
	);
}

export default SingleSong;
