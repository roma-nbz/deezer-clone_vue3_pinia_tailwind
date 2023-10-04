<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, toRefs } from 'vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import MicrophoneVariant from 'vue-material-design-icons/MicrophoneVariant.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import Play from 'vue-material-design-icons/Play.vue'
import artist from '../artist.json'
import { useSongStore } from '../stores/song'

const useSong = useSongStore()
const { audio, isPlaying, currentTrack, isLyrics } = storeToRefs(useSong)

const isHover = ref(false)
const isHoverGif = ref(false)
const isTrackTime = ref('00:00')

const props = defineProps({
	track: {
		type: Object,
		required: true
	}
})

const { track } = toRefs(props)

const openLyrics = (track, artist) => {
	if (audio.value && !audio.value.paused && track.id === currentTrack.value.id) {
		isLyrics.value = true
	} else if (audio.value && audio.value.paused && track.id === currentTrack.value.id) {
		useSong.playOrPauseSong()
		isLyrics.value = true
	} else {
		useSong.playOrPauseThisSong(artist, track)
		setTimeout(() => isLyrics.value = true, 500)
	}
}

onMounted(() => {
	const audioMeta = new Audio(track.value.path)
	audioMeta.addEventListener('loadedmetadata', () => {
		const duration = audioMeta.duration
		const minutes = Math.floor(duration / 60)
		const seconds = Math.floor(duration % 60)
		isTrackTime.value = minutes + ':' + seconds.toString().padStart(2, '0')
	})
})
</script>

<template>
	<li @mouseenter="isHover = true" @mouseleave="isHover = false"
		class="flex items-center justify-between p-2 hover:bg-[#979797] hover:bg-opacity-5">
		<div class="flex items-center">
			<div class="relative">
				<div v-if="isHover" class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer">
					<Play v-if="!isPlaying" @click="useSong.playOrPauseThisSong(artist, track)" />
					<Play v-else-if="isPlaying && currentTrack.name !== track.name" @click="useSong.loadSong(artist, track)" />
				</div>
				<div v-if="track && currentTrack && currentTrack.name === track.name"
					class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer">
					<Pause v-if="!isHover && isPlaying" @click="useSong.playOrPauseSong" :size="25" />
				</div>
				<div v-if="isPlaying && track && currentTrack && currentTrack.name === track.name" @mouseenter="isHoverGif = true"
					@mouseleave="isHoverGif = false" class="p-1 mt-[2px] ml-[3px] absolute rounded-full bg-white cursor-pointer">
					<img v-if="!isHoverGif" src="/images/audio-wave.gif" alt="">
					<Pause v-if="isHoverGif" @click="useSong.playOrPauseSong" :size="25" />
				</div>
				<img width="37" class="border border-[#494949]" :src="artist.albumCover" alt="">
			</div>
			<div v-if="track" class="text-sm pl-4 hover:underline cursor-pointer"
				:class="track && currentTrack && currentTrack.name === track.name ? 'text-[#ef5465]' : 'text-[#d4d4d4]'">
				{{ track.id }}. {{ track.name }}
			</div>
		</div>
		<div class="flex items-center">
			<div v-if="track.lyrics" @click="openLyrics(artist, track)"
				class="rotate-45 rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer">
				<MicrophoneVariant fillColor="#ccc" :size="21" />
			</div>
			<div class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer">
				<HeartOutline fillColor="#ccc" :size="21" />
			</div>
			<div class="rounded-full p-1.5 mr-3 hover:bg-[#979797] hover:bg-opacity-20 cursor-pointer">
				<DotsHorizontal fillColor="#ccc" :size="21" />
			</div>
			<div v-if="isTrackTime" class="text-[13px] pl-10 font-extralight text-[#d4d4d4]"
				:class="track && currentTrack && currentTrack.name === track.name ? 'text-[#ef5465]' : 'text-[#d4d4d4]'">
				{{ isTrackTime }}
			</div>
		</div>
	</li>
</template>






