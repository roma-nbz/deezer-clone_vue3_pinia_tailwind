<script setup>
import { storeToRefs } from 'pinia'
import { toRefs, watch } from 'vue'
import GuitarElectric from 'vue-material-design-icons/GuitarElectric.vue'
import lyrics from '../lyrics.json'
import { useSongStore } from '../stores/song'

const useSong = useSongStore()
const { trackTime, currentTrack, lyricsPosition } = storeToRefs(useSong)

const props = defineProps({
	time: {
		type: String,
		required: true
	},
	words: {
		type: String,
		required: true
	}
})

const { time, words } = toRefs(props)

watch(() => trackTime.value, (trackTime) => {
	setTimeout(() => {
		lyrics[currentTrack.value.id].forEach(res => {
			if (res.time == trackTime) lyricsPosition.value = res.time
		})
	}, 1000)
})
</script>

<template>
	<div :id="time" class="my-10 text-white opacity-100" :class="{ 'opacity-30': lyricsPosition !== time }">
		<div v-if="words === 'INSTRAMENTAL SECTION'" class="flex w-full">
			<GuitarElectric class="mx-auto" :size="200" />
		</div>
		<p v-else>{{ words }}</p>
	</div>
</template>



