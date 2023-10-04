<script setup>
import LyricRow from '@/components/LyricRow.vue'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import Close from 'vue-material-design-icons/Close.vue'
import artist from '../artist.json'
import lyrics from '../lyrics.json'
import { useSongStore } from '../stores/song'

const useSong = useSongStore()

const { currentTrack, currentArtist, trackTime, isLyrics } = storeToRefs(useSong)

const snapToPosition = (res) => {
	if (res && res.time < trackTime.value) {
		const position = document.getElementById(res.time)
		if (position) {
			position.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
				inline: 'center'
			})
		}
	}
}

watch(() => trackTime.value, () => {
	setTimeout(() => {
		if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
			document.getElementById('Lyrics').scrollTop = 0
		}
	}, 500)
})

watch(() => currentTrack.value.id, (id) => {
	if (artist[id].lyrics) isLyrics.value = false
})

onMounted(() => {
	if (trackTime.value < lyrics[currentTrack.value.id][0].time) {
		document.getElementById('Lyrics').scrollTop = 0
	}
})
</script>

<template>
	<div
		class="fixed w-full h-[calc(100%-80px)] flex items-center mx-auto bg-gradient-to-r from-blue-400 to-transparent bg-purple-600 min-w-[100px]">
		<button type="button" @click="isLyrics = false"
			class="absolute top-0 m-8 p-2 bg-black bg-opacity-20 hover:bg-opacity-40 rounded-full">
			<Close fillColor="#fff" :size="30" />
		</button>
		<div class="w-1/2 max-w-[400px] mx-auto relative flex items-center">
			<p class="absolute z-20 font-bold rounded-xl text-white text-[20px] py-1.5 px-3 m-1">
				{{ currentTrack.name }}
			</p>
			<p class="absolute z-20 right-0 font-bold rounded-xl text-white text-[20px] py-1.5 px-3 m-1">
				{{ currentArtist.name }}
			</p>
			<div class="relative">
				<img class="rounded-3xl shadow-2xl" :src="currentArtist.albumCover">
				<div class="absolute z-10 blur-2xl rounded-3xl top-0 w-full h-full bg-black bg-opacity-10" />
			</div>
		</div>
		<div id="Lyrics" class="w-1/2 max-w-[600px] mx-auto relative h-[calc(100%-1px)] overflow-auto scrollbar-hide">
			<div class="my-[90%]"></div>
			<div v-for="res in lyrics[currentTrack.id]" :key="res" v-show="res" class="text-center text-[40px] opacity-100"
				:class="snapToPosition(res)">
				<LyricRow :time="res.time" :words="res.words" />
			</div>
			<div class="my-[90%]"></div>
		</div>
	</div>
</template>



