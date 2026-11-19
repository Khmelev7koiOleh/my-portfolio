<script setup lang="ts">
import { ref, computed, type CSSProperties } from "vue";
import { useDraggable } from "@vueuse/core";

const props = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  close: [];

  maximize: [];
}>();
const maximize = ref(false);
const minimize = ref(false);

const onMaximize = () => {
  emit("maximize");
  maximize.value = !maximize.value;
};
const windowRef = ref<HTMLElement | null>(null);
const titleBarRef = ref<HTMLElement | null>(null);

const { style, isDragging } = useDraggable(windowRef, {
  preventDefault: false,

  onStart(_, event) {
    const target = event.target;

    if (!(target instanceof Element)) return false;

    if (
      target.closest(
        "button, a, input, textarea, select, iframe, [data-no-drag]",
      )
    ) {
      return false;
    }
  },
});

const windowSize = computed(() => {
  if (maximize.value) {
    return {
      transition: "width 0.3s ease-in-out, height 0.3s ease-in-out ",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      overflow: "auto",
    };
  } else {
    return {
      transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      width: "700px",
      height: "450px",
      overflow: "auto",
    };
  }
});

const ifDragging = computed<CSSProperties>(() => ({
  cursor: isDragging.value ? "grabbing" : "grab",
  pointerEvents: isDragging.value ? "none" : "auto",
}));
</script>

<template>
  <div
    ref="windowRef"
    class="desktop-window"
    :class="{ 'desktop-window--dragging': isDragging }"
    :style="[style, windowSize]"
  >
    <header
      ref="titleBarRef"
      class="desktop-window__header"
      @dblclick="onMaximize"
    >
      <div class="desktop-window__controls">
        <button
          class="desktop-window__control desktop-window__control--close"
          aria-label="Close window"
          @click.stop="emit('close')"
        />
        <button
          class="desktop-window__control desktop-window__control--minimize"
          aria-label="Minimize window"
          @click.stop="minimize = !minimize"
        />
        <button
          class="desktop-window__control desktop-window__control--maximize"
          aria-label="Maximize window"
          @click.stop="onMaximize"
        />
      </div>

      <span class="desktop-window__title">{{ title }}</span>
    </header>

    <main class="desktop-window__content" :style="ifDragging">
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.desktop-window {
  position: fixed;

  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 12px;
  overflow: hidden;
  background: #f5f5f7;
  color: #1f2937;
  box-shadow: 0 20px 60px rgb(0 0 0 / 35%);
  transition:
    top 0.3s ease-in-out,
    left 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  z-index: 100;

  &__title {
    // for mac os
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: light;
    // text-transform: uppercase;
    color: #000;
  }
  &__header {
    position: relative;
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 14px;
    background: #e8e8ed;
    cursor: grab;
    user-select: none;
  }

  &__controls {
    display: flex;
    gap: 8px;
    z-index: 1;
  }

  &__control {
    width: 12px;
    height: 12px;
    padding: 0;
    border: none;
    border-radius: 50%;
    cursor: pointer;

    &--close {
      background: #ff5f57;
      &:hover {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E");
        background-size: 10px 10px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &--minimize {
      background: #febc2e;
      &:hover {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='6' y1='12' x2='18' y2='12'/%3E%3C/svg%3E");
        background-size: 10px 10px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &--maximize {
      background-color: #28c840;
      &:hover {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M5 5H19V19Z' fill='%230b6b27'/%3E%3Cpath d='M5 5V19H19Z' fill='%230b6b27'/%3E%3Cpath d='M21 3L3 21' stroke='%2328c840' stroke-width='4'/%3E%3C/svg%3E");
        background-size: 10px 10px;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }

  &__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: 13px;
    font-weight: 600;
  }

  &__content {
    padding: 10px;
  }

  &--dragging {
    .desktop-window__header {
      cursor: grabbing;
    }
  }
}
</style>
