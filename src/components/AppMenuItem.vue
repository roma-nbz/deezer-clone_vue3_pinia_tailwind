<script setup>
import { ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps({
	iconString: {
		type: String,
		required: true
	},
	iconSize: {
		type: Number,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
})

const { iconString, url, name } = toRefs(props)

const icon = ref(null)

const isHover = () => {
	if (icon.value === iconString.value + '-red') {
		icon.value = iconString.value + '-white'
	} else if (icon.value === iconString.value + '-white') {
		icon.value = iconString.value + '-red'
	}
}

watchEffect(() => {
	if (route.path == url.value && icon.value === iconString.value + '-red') return

	if (route.path == url.value) {
		icon.value = iconString.value + '-red'
	} else {
		icon.value = iconString.value + '-white'
	}
})
</script>

<template>
	<div class="flex items-center w-full my-[20px]">
		<RouterLink :to="url"
			:class="url === route.path ? 'border-l-[#ef5465] text-[#ef5465]' : 'border-l-[#191922] text-white'"
			class="border-l-4 w-full hover:text-[#ef5465]" @mouseenter="isHover" @mouseleave="isHover">
			<div class="flex items-center pl-3 mx-3 cursor-pointer">
				<img :width="iconSize" :src="`/images/icons/${icon}.png`">
				<div class="pl-3.5 font-semibold text-[17px]">{{ name }}</div>
			</div>
		</RouterLink>
	</div>
</template>


