<script setup lang="ts">
import { ref } from "vue";
import type { DesktopItem } from "~/types/desktop.ts";
import HeaderMenuBar from "./HeaderMenuBar.vue";
import FooterMenuBar from "./FooterMenuBar.vue";

const items = ref<DesktopItem[]>([
  {
    id: "projects",
    name: "Projects",
    type: "folder",
    position: { x: 32, y: 35 },
  },
  {
    id: "cv",
    name: "Lebenslauf.pdf",
    type: "file",
    position: { x: 32, y: 150 },
  },
  {
    id: "about",
    name: "About Me",
    type: "user",
    position: { x: 32, y: 265 },
  },
  {
    id: "contact",
    name: "Contact",
    type: "mail",
    position: { x: 32, y: 380 },
  },
]);

const selectedId = ref<string | null>(null);
const activeItem = ref<string | null>(null);

function selectItem(id: string) {
  selectedId.value = id;
}

function openItem(id: string) {
  activeItem.value = id;
}

function moveItem(id: string, x: number, y: number) {
  const item = items.value.find((item) => item.id === id);

  if (!item) return;

  item.position = { x, y };
}
</script>

<template>
  <main class="desktop">
    <HeaderMenuBar />

    <section class="desktop__workspace" @click.self="selectedId = null">
      <DesktopIcon
        v-for="item in items"
        :key="item.id"
        :item="item"
        :selected="selectedId === item.id"
        @select="selectItem"
        @open="openItem"
        @move="moveItem"
      />

      <div v-if="activeItem" class="desktop__message">
        Opening {{ activeItem }}...
        <button @click="activeItem = null">Close</button>
      </div>
    </section>
    <FooterMenuBar />
    <Dock />
  </main>
</template>

<style scoped lang="scss">
.desktop {
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100dvh;
  overflow: hidden;

  background-image: url("/background.jpeg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &__workspace {
    position: relative;
    flex: 1;
    min-height: 0;
  }

  &__message {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 24px;
    border-radius: 12px;
    background: rgb(20 30 50 / 85%);
    color: white;
    backdrop-filter: blur(16px);

    z-index: 20;
  }
}
</style>
