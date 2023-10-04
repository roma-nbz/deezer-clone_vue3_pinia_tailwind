<script setup>
import { ref } from 'vue'
import DotsHorizontal from 'vue-material-design-icons/DotsHorizontal.vue'
import HeartOutline from 'vue-material-design-icons/HeartOutline.vue'
import Play from 'vue-material-design-icons/Play.vue'

const isHover = ref(false)

const props = defineProps({
	slide: {
		type: Object,
		required: true
	}
})
</script>

<template>
	<div class="pl-8">
		<RouterLink to="/artist" class="cursor-pointer">
			<div class="relative" @mouseenter="isHover = true" @mouseleave="isHover = false">
				<div class="absolute w-full h-full bg-black z-10 rounded-md"
					:class="isHover ? 'transition ease-in duration-150 bg-opacity-30' : 'transition ease-out duration-150 bg-opacity-5'" />
				<div class="absolute z-50 bottom-3 left-3 rounded-full bg-white p-1.5">
					<Play :size="27" />
				</div>
				<div class="absolute z-50 bottom-3 left-[60px] rounded-full bg-white p-2"
					:class="isHover ? 'transition ease-in duration-150 bg-opacity-100' : 'transition ease-out duration-150 bg-opacity-0'">
					<HeartOutline :size="23"
						:class="isHover ? 'transition ease-in duration-150 opacity-100' : 'transition ease-out duration-150 opacity-0'" />
				</div>
				<div class="absolute z-50 bottom-3 left-[107px] rounded-full bg-white p-1.5"
					:class="isHover ? 'transition ease-in duration-150 bg-opacity-100' : 'transition ease-out duration-150 bg-opacity-0'">
					<DotsHorizontal :size="27"
						:class="isHover ? 'transition ease-in duration-150 opacity-100' : 'transition ease-out duration-150 opacity-0'" />
				</div>
				<img class="absolute z-40 right-0 bottom-0 pb-3 mr-3 contrast-[1.4] brightness-[1.1]" width="25"
					src="/images/deezer-sound-icon.png" alt="">
				<img class="rounded-md aspect-square" :src="slide.url">
			</div>
			<div class="text-white text-left mt-2">
				<p class="text-sm hover:underline cursor-pointer">{{ slide.song }}</p>
				<p class="text-[13px] flex hover:underline text-[#858590] pt-0.5">by {{ slide.by }}</p>
				<p class="text-[11px] pt-0.5 text-[#858590]">Released on {{ slide.releasedOn }}</p>
			</div>
		</RouterLink>
	</div>
</template>





