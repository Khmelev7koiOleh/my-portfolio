<script setup lang="ts">
import { computed, ref } from "vue";
import { useDraggable } from "@vueuse/core";
import {
  Folder,
  FileText,
  UserRound,
  Mail,
  ChessKnight,
} from "lucide-vue-next";
// import Chess from "/../public/icons/chess.png";

import type { DesktopItem } from "~/types/desktop";

const props = defineProps<{
  item: DesktopItem;
  selected: boolean;
  workspaceRef: HTMLElement | null;
}>();

const emit = defineEmits<{
  select: [id: string];
  open: [id: string];
  move: [id: string, x: number, y: number];
}>();

const iconRef = ref<HTMLElement | null>(null);

const icons = {
  folder: Folder,
  file: FileText,
  user: UserRound,
  mail: Mail,
  chess: "/icons/chess.png",
};

const iconComponent = computed(() => icons[props.item.type]);

const isImage = computed(() => typeof iconComponent.value === "string");
let dragStart = { x: 0, y: 0 };
let moved = false;
const { x, y, style, isDragging } = useDraggable(iconRef, {
  initialValue: props.item.position,
  containerElement: () => props.workspaceRef,
  preventDefault: true,

  onStart(position) {
    dragStart = { ...position };
    moved = false;
    emit("select", props.item.id);
  },

  onMove(position) {
    if (
      Math.abs(position.x - dragStart.x) > 5 ||
      Math.abs(position.y - dragStart.y) > 5
    ) {
      moved = true;
    }
  },

  onEnd(position) {
    emit("move", props.item.id, position.x, position.y);
  },
});

function handleOpen() {
  if (moved || isDragging.value) return;

  emit("open", props.item.id);
}
</script>

<template>
  <button
    ref="iconRef"
    type="button"
    class="desktop-icon"
    :class="{
      'desktop-icon--selected': selected,
      'desktop-icon--dragging': isDragging,
    }"
    :style="style"
    :aria-label="item.name"
    @click="emit('select', item.id)"
    @dblclick="handleOpen"
    @keydown.enter.prevent="handleOpen"
  >
    <span class="desktop-icon__image">
      <img
        v-if="isImage"
        :src="iconComponent as string"
        :alt="item.name"
        class="desktop-icon__custom-image"
        draggable="false"
        width="48"
      />

      <component :is="iconComponent" v-else :size="48" :stroke-width="1.5" />
    </span>

    <span class="desktop-icon__name">
      {{ item.name }}
    </span>
  </button>
</template>

<style scoped lang="scss">
.desktop-icon {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  width: 100px;
  padding: 8px 4px;

  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: white;

  cursor: pointer;
  user-select: none;
  touch-action: none;
  text-shadow: 0 1px 4px rgb(0 0 0 / 50%);

  &__image {
    display: grid;
    place-items: center;
    width: 64px;
    height: 58px;
    color: #9dd8ff;
  }

  &__name {
    max-width: 100%;
    padding: 3px 6px;
    border-radius: 4px;

    font-size: 12px;
    text-align: center;
    overflow-wrap: anywhere;
  }

  &--selected {
    background: rgb(255 255 255 / 14%);
    border-color: rgb(255 255 255 / 25%);

    .desktop-icon__name {
      background: #2563eb;
    }
  }

  &--dragging {
    z-index: 10;
    cursor: grabbing;
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
}
</style>
