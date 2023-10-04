<script setup>
import PlayerVolume from '@/components/PlayerVolume.vue'
import { storeToRefs } from 'pinia'
import uniqolor from 'uniqolor'
import { onMounted, ref, watch } from 'vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import PictureInPictureBottomRight from 'vue-material-design-icons/PictureInPictureBottomRight.vue'
import Play from 'vue-material-design-icons/Play.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import ShuffleVariant from 'vue-material-design-icons/ShuffleVariant.vue'
import SkipBackward from 'vue-material-design-icons/SkipBackward.vue'
import SkipForward from 'vue-material-design-icons/SkipForward.vue'
import Tune from 'vue-material-design-icons/Tune.vue'
import VolumeHigh from 'vue-material-design-icons/VolumeHigh.vue'
import VolumeMute from 'vue-material-design-icons/VolumeMute.vue'
import { useSongStore } from '../stores/song'


const useSong = useSongStore()
const { isPlaying, audio, currentTrack, currentArtist, trackTime, isLyrics, currentVolume } = storeToRefs(useSong)

const randColor = ref('')
const isHover = ref(false)
const isVolumeHover = ref(false)
const isTrackTimeCurrent = ref('0:00')
const isTrackTimeTotal = ref('0:00')
const seeker = ref(null)
const seekerContainer = ref(null)
const range = ref(0)

randColor.value = uniqolor.random()

const timeupdate = () => {
	audio.value.addEventListener('timeupdate', () => {
		const minutes = Math.floor(audio.value.currentTime / 60)
		const seconds = Math.floor(audio.value.currentTime - minutes * 60)
		isTrackTimeCurrent.value = minutes + ':' + seconds.toString().padStart(2, '0')
		trackTime.value = isTrackTimeCurrent.value
		const value = (100 / audio.value.duration) * audio.value.currentTime
		range.value = value
		seeker.value.value = value
	})
}

const loadedmetadata = () => {
	audio.value.addEventListener('loadedmetadata', () => {
		const duration = audio.value.duration
		const minutes = Math.floor(duration / 60)
		const seconds = Math.floor(duration % 60)
		isTrackTimeTotal.value = minutes + ':' + seconds.toString().padStart(2, '0')
	})
}

watch(() => audio.value, () => {
	timeupdate()
	loadedmetadata()
})

watch(() => isTrackTimeCurrent.value, (time) => {
	if (time && time == isTrackTimeTotal.value) {
		useSong.nextSong(currentTrack.value)
	}
})

watch(() => currentTrack.value.id, (val) => {
	randColor.value = uniqolor.random()
	if (currentTrack.value.lyrics) {
		isLyrics.value = true
		return
	}
	isLyrics.value = false
})

onMounted(() => {
	if (audio.value) {
		setTimeout(() => {
			timeupdate()
			loadedmetadata()
		}, 300)
	}
	if (currentTrack.value) {
		seeker.value.addEventListener('change', () => {
			const time = audio.value.duration * (seeker.value.value / 100)
			audio.value.currentTime = time
		})
		seeker.value.addEventListener('mousedown', () => {
			audio.value.pause()
			isPlaying.value = false
		})
		seeker.value.addEventListener('mouseup', () => {
			audio.value.play()
			isPlaying.value = true
		})
		seekerContainer.value.addEventListener("click", (e) => {
			const clickPosition = (e.pageX - seekerContainer.value.offsetLeft) / seekerContainer.value.offsetWidth
			const time = audio.value.duration * clickPosition
			audio.value.currentTime = time
			seeker.value.value = (100 / audio.value.duration) * audio.value.currentTime
		})
	}
})
</script>

<template>
	<div v-if="audio" id="AppPlayer"
		class="fixed flex items-center justify-between min-w-[1000px] bottom-0 w-full z-50 h-[80px] bg-[#23232d] border-t border-t-[#383838]">
		<div class="flex items-center w-2/12">
			<div class="flex items-center justify-center h-[30px] pl-4">
				<button type="button" @click="useSong.prevSong(currentTrack)" :disabled="currentTrack.id === 1" class="mx-2 p-2"
					:class="{ 'rounded-full hover:bg-[#363636]': currentTrack.id !== 1 }">
					<SkipBackward :fillColor="currentTrack.id === 1 ? '#747474' : '#fff'" :size="25" />
				</button>
				<button @click="useSong.playOrPauseThisSong(currentTrack,
					currentArtist)" type="button" class="p-2 rounded-full hover:bg-[#363636]">
					<Play v-if="!isPlaying" fillColor="#fff" :size="45" />
					<Pause v-else fillColor="#fff" :size="45" />
				</button>
				<button @click="useSong.nextSong(currentTrack)" type="button" class="mx-2 p-2 rounded-full hover:bg-[#363636]">
					<SkipForward fillColor="#fff" :size="25" />
				</button>
			</div>
		</div>
		<div class="mb-2.5 w-full max-w-[50%] mx-10">
			<div class="flex items-center justify-between pl-1 relative top-1 mx-7">
				<div class="flex items-center">
					<p class="bg-[#2e2e39] py-0.5 px-1 text-[10px] text-[#72727d]">ALBUM</p>
					<p class="text-white text-[14px] font-light ml-3">{{ currentTrack.name }}</p>
					<p class="text-white relative -top-1 left-[6px]">.</p>
					<p class="text-white text-[14px] font-light ml-3">{{ currentArtist.name }}</p>
				</div>
				<div class="flex items-center">
					<div class="p-1.5 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
						<Plus fillColor="#fff" :size="20" />
					</div>
					<div class="p-1.5 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
						<HeartOutline fillColor="#fff" :size="20" />
					</div>
					<div class="p-1.5 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
						<Tune fillColor="#fff" :size="20" />
					</div>
				</div>
			</div>
			<div class="flex items-center">
				<p v-if="isTrackTimeCurrent" class="text-[#8a8a8a] text-[10px] pr-2 relative -bottom-[5px]">
					{{ isTrackTimeCurrent }}
				</p>
				<div ref="seekerContainer" @mouseenter="isHover = true" @mouseleave="isHover = false"
					class="w-full relative mt-2 mb-3">
					<input v-model="range" ref="seeker" type="range"
						class="absolute rounded-full my-[7px] w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none cursor-pointer"
						:class="{ 'rangeDotHidden': !isHover }, { 'rangeDot': isHover }">
					<div class="rounded-full pointer-events-none absolute z-10 inset-y-0 left-0 w-0"
						:style="`width: ${range}%; background-color: ${randColor.color}`"
						:class="isHover ? 'h-[4px] mt-[5px]' : 'h-[2px] mt-[6px]'" />
					<div class="absolute z-[-0] inset-y-0 left-0 w-full bg-[#c4c4c4] rounded-full"
						:class="isHover ? 'h-[4px] mt-[5px]' : 'h-[2px] mt-[6px]'" />
				</div>
				<p v-if="isTrackTimeTotal" class="text-[#8a8a8a] text-[10px] pl-2 relative -bottom-[5px]">
					{{ isTrackTimeTotal }}
				</p>
			</div>
		</div>
		<div class="flex items-center w-1/4 justify-end pr-6">
			<div class="flex items-center">
				<div class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
					<PictureInPictureBottomRight class="block" fillColor="#fff" :size="17" />
				</div>
				<div class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
					<ShuffleVariant class="block" fillColor="#fff" :size="17" />
				</div>
				<div @mouseenter="isVolumeHover = true" @mouseleave="isVolumeHover = false" class="relative">
					<div class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
						<VolumeHigh v-if="currentVolume > 0" class="block" fillColor="#fff" :size="17" />
						<VolumeMute v-else class="block" fillColor="#fff" :size="17" />
					</div>
					<div v-show="isVolumeHover" class="absolute -top-12 -left-20 p-2 px-4 bg-[#2a2a37] rounded-xl shadow-xl">
						<PlayerVolume />
					</div>
				</div>
				<div class="p-2 ml-2 hover:bg-[#5a5a5a] hover:bg-opacity-50 rounded-full cursor-pointer">
					<Tune class="block" fillColor="#fff" :size="17" />
				</div>
			</div>
			<div class="flex items-center ml-6 border-l border-l-[#363636]">
				<img class="rounded-sm ml-6" width="28" :src="currentArtist.albumCover" alt="">
				<p class="text-xs ml-1.5 text-white font-light">Queue</p>
			</div>
		</div>
	</div>
</template>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 0;
	height: 0;
}

.rangeDot[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	background-color: white;
	border-radius: 100%;
	width: 12px;
	height: 12px;
}
</style>



import MicrophoneVariant from 'vue-material-design-icons/MicrophoneVariant.vue';
import lyrics from '../lyrics.json'