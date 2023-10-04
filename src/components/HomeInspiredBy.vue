<script setup>
import { ref, toRefs } from 'vue'
import Play from 'vue-material-design-icons/Play.vue'

const props = defineProps({
	by: {
		type: String,
		required: true
	},
	image: {
		type: String,
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

const { by, image, text, to } = toRefs(props)

const isHover = ref(false)
</script>

<template>
	<div>
		<RouterLink :to="to" class="relative">
			<div class="flex items-center bg-[#23232d] rounded-sm h-[54px] relative">
				<div @mouseenter="isHover = true" @mouseleave="isHover = false" class="flex items-center w-[54px]">
					<div class="absolute h-full z-10 w-[54px] bg-black rounded-sm"
						:class="isHover ? 'transition ease-in duration-100 bg-opacity-40' : 'transition ease-in duration-100 bg-opacity-5'" />
					<div class="absolute z-20 p-1.5 rounded-full bg-white left-[6px]"
						:class="isHover ? 'transition ease-in duration-100 bg-opacity-100' : 'transition ease-in duration-100 opacity-0'">
						<Play :size="30" />
					</div>
					<img class="min-h-[54px] min-w-[54px] rounded-sm z-0" :src="image" alt="">
				</div>
				<div class="truncate w-full ml-4">
					<p class="hover:underline truncate max-w-[95%] text-gray-200 font-light text-[15px] cursor-pointer">
						{{ text }}
					</p>
					<p class="text-[#787882] truncate text-[12px] max-w-[95%] font-light">
						by <span class="hover:underline cursor-pointer">{{ by }}</span>
					</p>
				</div>
			</div>
		</RouterLink>
	</div>
</template>


