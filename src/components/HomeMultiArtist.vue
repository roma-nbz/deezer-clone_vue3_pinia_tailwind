<script setup>
import { ref, toRefs } from 'vue'
import Play from 'vue-material-design-icons/Play.vue'

const props = defineProps({
	category: {
		type: String,
		required: true
	},
	images: {
		type: Object,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	},
})

const { category, images, text, to } = toRefs(props)

const isHover = ref(false)
</script>

<template>
	<div>
		<RouterLink :to="to" class="relative">
			<div @mouseenter="isHover = true" @mouseleave="isHover = false"
				class="flex justify-center items-center contrast-[2] brightness-[0.87] rounded-md aspect-square overflow-hidden">
				<div class="absolute w-full h-full z-10 bg-black rounded-md"
					:class="isHover ? 'transition ease-in duration-150 bg-opacity-20' : 'transition ease-in duration-150 bg-opacity-5'" />
				<img class="absolute contrast-[0.55] right-0 top-0 w-1/2" :src="images.one" alt="">
				<img class="absolute contrast-[0.55] left-0 top-0 w-1/2" :src="images.two">
				<img class="absolute contrast-[0.55] right-0 bottom-0 w-1/2" :src="images.three">
				<img class="absolute contrast-[0.55] left-0 bottom-0 w-1/2" :src="images.four">
				<div class="absolute z-10 rounded-full bg-white inline-block">
					<Play :size="33" />
				</div>
				<div class="absolute z-30 flex items-center bottom-1 left-0 h-7ml-1 bg-black rounded-full px-3 bg-opacity-10">
					<img class="pr-2 opacity-[0.75] brightness-[1.2]" src="/images/deezer-sound-icon.png" width="30" alt="">
					<p class="text-white font-bold text-[21px]">{{ category }}</p>
				</div>
			</div>
		</RouterLink>
		<div class="h-2" />
		<RouterLink :to="to">
			<p class="hover:underline text-gray-200 font-light text-sm">
				{{ text }}
			</p>
		</RouterLink>
	</div>
</template>



