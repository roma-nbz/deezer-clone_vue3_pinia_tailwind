<script setup>
import ArtistSong from '@/components/ArtistSong.vue'
import { storeToRefs } from 'pinia'
import ClockTimeFiveOutline from 'vue-material-design-icons/ClockTimeFiveOutline.vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import Pause from 'vue-material-design-icons/Pause.vue'
import Play from 'vue-material-design-icons/Play.vue'
import artist from '../artist.json'
import { useSongStore } from '../stores/song'

const useSong = useSongStore()
const { isPlaying, currentTrack, currentArtist } = storeToRefs(useSong)

const playFunc = () => {
	if (currentTrack.value) {
		useSong.playOrPauseThisSong(currentArtist.value, currentTrack.value)
		return
	}
	useSong.playFromFirst()
}
</script>

<template>
	<div id="HeaderSection" class="max-w-[1500px] mx-auto">
		<div class="flex items-center w-full relative h-full px-8 mt-6 min-w-[650px]">
			<img width="175" class="rounded-full" :src="artist.albumCover">
			<div class="ml-8">
				<p class="text-white text-3xl w-full hover:underline cursor-pointer font-semibold">
					{{ artist.name }}
				</p>
				<p class="text-[#bfbfbf] text-[12px] py-1.5 font-light">167,026 fans</p>
				<div class="flex gap-4 items-center justify-start bottom-0 mb-1.5">
					<button @click="playFunc" class="p-2.5 px-6 rounded-full bg-[#ef5465]">
						<div v-if="!isPlaying" class="flex items-center">
							<Play fillColor="#fff" :size="20" />
							<p class="text-white font-bold text-xs pr-1">PLAY</p>
						</div>
						<div v-else class="flex items-center">
							<Pause fillColor="#fff" :size="20" />
							<p class="text-white font-bold text-xs pr-1">PAUSE</p>
						</div>
					</button>
					<button type="button" class="rounded-full p-2 border border-[#52525d] hover:bg-[#2b2b30]">
						<HeartOutline fillColor="#eaeaea" :size="20" />
					</button>
					<button type="button" class="rounded-full p-2 border border-[#52525d] hover:bg-[#2b2b30]">
						<DotsHorizontal fillColor="#eaeaea" :size="20" />
					</button>
				</div>
			</div>
		</div>
		<div class="mt-11" />
		<div class="flex justify-between pt-2 min-w-[650px]">
			<ul class="flex items-center justify-start w-full text-gray-400 h-9">
				<li class="pl-8">
					<button
						class="font-light cursor-pointer text-[#bebebe] border-b-2 border-b-[#121216] hover:border-b-[#fff] pb-[8px] hover:text-[#fff]">
						Discography
					</button>
				</li>
				<li class="text-[#fff] pl-10">
					<button class="font-semibold cursor-pointer border-b-2 border-b-[#ef5465] pb-[8px]">
						Top tracks
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer text-[#bebebe] border-b-2 border-b-[#121216] hover:border-b-[#fff] pb-[8px] hover:text-[#fff]">
						Similar artist
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer text-[#bebebe] border-b-2 border-b-[#121216] hover:border-b-[#fff] pb-[8px] hover:text-[#fff]">
						Playlist
					</button>
				</li>
				<li class="pl-10">
					<button
						class="font-light cursor-pointer text-[#bebebe] border-b-2 border-b-[#121216] hover:border-b-[#fff] pb-[8px] hover:text-[#fff]">
						Bio
					</button>
				</li>
			</ul>
		</div>
	</div>
	<div class="border-b border-b-[#302d2d]" />
	<div class="mb-10" />
	<div id="SongsSection" class="max-w-[1500px] mx-auto">
		<div class="pl-8">
			<p class="text-white text-3xl font-semibold mb-7">Top tracks</p>
			<div class="flex items-center border border-[#525254] bg-[#23232d] rounded-sm text-[#c9c9c9] w-[300px]">
				<Magnify fillColor="#9b9ba1" class="px-1" />
				<input class="w-full py-[5px] bg-[#23232d] text-sm placeholder-[#7e7e7e] outline-none ring-0 hover:ring-0"
					type="text" placeholder="Search within tracks">
			</div>
		</div>
		<div class="mb-4" />
		<div class="flex items-center justify-between min-w-[590px] mx-8 border-b border-b-[#302d2d] py-2.5 px-1.5">
			<p class="text-xs font-light text-[#aeaeae]">TRACK</p>
			<ClockTimeFiveOutline fillColor="#aeaeae" :size="20" />
		</div>
		<ul class="w-full mx-8 pr-16 min-w-[650px]" v-for="track in artist.tracks" :key="track">
			<ArtistSong v-if="track" :track="track" />
		</ul>
	</div>
	<div class="mb-40" />
</template>
