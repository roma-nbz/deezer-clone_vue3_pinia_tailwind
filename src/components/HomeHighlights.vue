<script setup>
import { ref } from 'vue'
import Play from 'vue-material-design-icons/Play.vue'

const isHover = ref(false)

const props = defineProps({
	by: {
		type: String,
		required: true
	},
	song: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
})
</script>

<template>
	<RouterLink to="/artist" class="cursor-pointer">
		<div class="relative" @mouseenter="isHover = true" @mouseleave="isHover = false">
			<div
				:class="isHover ? 'transition ease-in duration-150 bg-opacity-30' : 'transition ease-out duration-150 bg-opacity-5'"
				class="absolute w-full h-full bg-black z-10 rounded-md" />
			<div class="absolute z-50 pl-4 pt-4">
				<p class="bg-black bg-opacity-40 rounded-md text-white px-2 py-1 text-sm text-center inline-block">Album</p>
				<p class="text-white text-xl mt-2 font-[700]">{{ by }}</p>
				<p class="text-white mt-2 font-[400]">{{ song }}</p>
			</div>
			<div class="absolute z-50 bottom-3 left-3 rounded-full bg-white p-1.5">
				<Play :size="27" />
			</div>
			<img class="rounded-lg" :src="image">
		</div>
	</RouterLink>
</template>



