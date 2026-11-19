<script setup lang="ts">
import { ref } from "vue";
import type { DesktopItem } from "~/types/desktop.ts";
import HeaderMenuBar from "./HeaderMenuBar.vue";
import FooterMenuBar from "./FooterMenuBar.vue";
import CvApp from "../applications/CvApp.vue";
import ProjectsApp from "../applications/ProjectsApp.vue";
import AboutApp from "../applications/AboutApp.vue";
import ContactApp from "../applications/ContactApp.vue";
import Chess from "../Chess.vue";

import { TheChessboard } from "vue3-chessboard";
import "vue3-chessboard/style.css";

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

  {
    id: "chess",
    name: "Chess",
    type: "chess",
    position: { x: 152, y: 35 },
  },
]);
const workspaceRef = ref<HTMLElement | null>(null);
const selectedId = ref<string | null>(null);
const activeItem = ref<string | null>(null);

const applications = {
  cv: CvApp,
  projects: ProjectsApp,
  about: AboutApp,
  contact: ContactApp,
  chess: Chess,
};
type AppId = keyof typeof applications;
const activeWindow = ref<AppId | null>(null);
const maximizeWindow = ref(false);
const activeComponent = computed(() => {
  if (activeWindow.value == null) return;
  else return applications[activeWindow.value];
});
function selectItem(id: string) {
  selectedId.value = id;
}

function isAppId(id: string): id is AppId {
  return Object.prototype.hasOwnProperty.call(applications, id);
}

function openItem(id: string) {
  if (!isAppId(id)) return;

  if (activeWindow.value === id) {
    activeWindow.value = null;
  } else {
    activeWindow.value = id;
  }

  maximizeWindow.value = false;
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

    <section
      ref="workspaceRef"
      class="desktop__workspace"
      @click.self="selectedId = null"
    >
      <DesktopIcon
        v-for="item in items"
        :key="item.id"
        :item="item"
        :selected="selectedId === item.id"
        :workspace-ref="workspaceRef"
        @select="selectItem"
        @open="openItem"
        @move="moveItem"
      />
      <!-- <div class="chess-app">
        <Chess />
      </div> -->

      <!-- <div class="chess-app" data-no-drag>
        <ClientOnly>
          <TheChessboard />
        </ClientOnly>
      </div> -->

      <DesktopWindow
        v-if="activeWindow"
        :title="activeWindow"
        @close="((activeWindow = null), (maximizeWindow = false))"
        @maximize="maximizeWindow = !maximizeWindow"
      >
        <component
          class="desktop__component"
          v-if="activeComponent"
          :is="activeComponent"
          :maximized="maximizeWindow"
        />
      </DesktopWindow>
    </section>
    <FooterMenuBar />
    <Dock />
  </main>
</template>

<style scoped lang="scss">
.chess-app {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;
  z-index: 10000;
}
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
}
</style>
