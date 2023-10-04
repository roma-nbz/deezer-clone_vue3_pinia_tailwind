import { defineStore } from 'pinia'
import { ref } from 'vue'
import artist from '../artist.json'

export const useSongStore = defineStore(
	'song',
	() => {
		const isPlaying = ref(false)
		const audio = ref(null)
		const currentArtist = ref(null)
		const currentTrack = ref(null)
		const trackTime = ref(null)
		const currentVolume = ref(80)
		const isLyrics = ref(false)
		const lyricsPosition = ref('0:00')

		const loadSong = (artist, track) => {
			currentArtist.value = artist
			currentTrack.value = track

			if (audio.value && audio.value.src) {
				audio.value.pause()
				isPlaying.value = false
				audio.value.src = ''
			}

			audio.value = new Audio()
			audio.value.src = track.path

			setTimeout(() => {
				isPlaying.value = true
				audio.value.play()
			}, 200)
		}

		const playOrPauseSong = () => {
			if (audio.value.paused) {
				isPlaying.value = true
				audio.value.play()
			} else {
				isPlaying.value = false
				audio.value.pause()
			}
		}

		const playOrPauseThisSong = (artist, track) => {
			if (
				!audio.value ||
				!audio.value.src ||
				currentTrack.value.id !== track.id
			) {
				loadSong(artist, track)
				return
			}
			playOrPauseSong()
		}

		const prevSong = currentTrack => {
			const track = artist.tracks[currentTrack.id - 2]
			loadSong(artist, track)
		}

		const nextSong = currentTrack => {
			if (currentTrack.id === artist.tracks.length) {
				const track = artist.tracks[0]
				loadSong(artist, track)
			} else {
				const track = artist.tracks[currentTrack.id]
				loadSong(artist, track)
			}
		}

		const resetState = () => {
			isPlaying.value = false
			audio.value = null
			currentArtist.value = null
			currentTrack.value = null
		}

		const playFromFirst = () => {
			resetState()
			const track = artist.track[0]
			loadSong(artist, track)
		}

		return {
			isPlaying,
			audio,
			currentArtist,
			currentTrack,
			trackTime,
			currentVolume,
			isLyrics,
			lyricsPosition,
			loadSong,
			playOrPauseSong,
			playOrPauseThisSong,
			prevSong,
			nextSong,
			resetState,
			playFromFirst,
		}
	},
	{ persist: true }
)
