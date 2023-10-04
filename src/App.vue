<script setup>
import AppLyrics from '@/components/AppLyrics.vue'
import AppMenuItem from '@/components/AppMenuItem.vue'
import AppPlayer from '@/components/AppPlayer.vue'
import { useSongStore } from '@/stores/song'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import Bell from 'vue-material-design-icons/Bell.vue'
import Magnify from 'vue-material-design-icons/Magnify.vue'
import { RouterView } from 'vue-router'

const useSong = useSongStore()
const { isPlaying, currentTrack, trackTime, isLyrics } = storeToRefs(useSong)

onBeforeMount(() => {
  isPlaying.value = false
  isLyrics.value = false
  trackTime.value = '0:00'
})
</script>

<template>
  <div id="TopNav"
    class="fixed right-0 flex items-center justify-between w-[calc(100%-240px)] h-[56px] border-b border-b-[#32323d]">
    <div class="flex items-center w-full">
      <Magnify class="pl-6 mt-1 pr-2" fillColor="#7e7e88" :size="22" />
      <input type="text"
        class="p-1 bg-transparent outline-none font-light placeholder-[#bebec7] text-white w-full max-w-xl"
        placeholder="Search">
    </div>
    <div class="flex items-center pr-10">
      <div class="mr-4 p-1 hover:bg-gray-600 rounded-full cursor-pointer">
        <Bell fillColor="#fff" :size="20" />
      </div>
      <img class="rounded-full w-[33px]" src="https://picsum.photos/id/202/50" alt="">
    </div>
  </div>
  <div id="SideNav" class="fixed w-[240px] bg-[#191922] h-screen border-r border-r-[#32323d]">
    <div class="w-full pl-6 pt-3 cursor-pointer">
      <RouterLink to="/">
        <img width="130" src="/images/deezer-logo.png" alt="">
      </RouterLink>
    </div>
    <div class="mt-[53px]" />
    <AppMenuItem iconString="music" :iconSize="20" url="/" name="Music" />
    <AppMenuItem iconString="podcast" :iconSize="20" url="/podcast" name="Podcasts" />
    <AppMenuItem iconString="explore" :iconSize="20" url="/artist" name="Explore" />
    <AppMenuItem iconString="favourite" :iconSize="20" url="/favourite" name="Favourites" />
    <div class="text-[#a2a2ad] font-light text-[12px] pl-[62px] mt-[25px]">
      <div class="py-[9px] hover:text-[#ef5465] cursor-pointer">Favorite tracks</div>
      <div class="py-[9px] hover:text-[#ef5465] cursor-pointer">Playlist</div>
      <div class="py-[9px] hover:text-[#ef5465] cursor-pointer">Albums</div>
      <div class="py-[9px] hover:text-[#ef5465] cursor-pointer">Artists</div>
      <div class="py-[9px] hover:text-[#ef5465] cursor-pointer">Podcasts</div>
    </div>
  </div>
  <div class="fixed w-[calc(100%-240px)] h-[calc(100%-56px)] ml-[240px] mt-[56px] overflow-x-auto">
    <RouterView />
  </div>
  <AppPlayer v-if="currentTrack" />
  <AppLyrics v-if="isLyrics" :class="{ 'animate__animated animate__slideInUp animate__faster': isLyrics }" />
</template>


