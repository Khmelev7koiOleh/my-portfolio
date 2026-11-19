<script setup lang="ts">
defineProps<{
  maximized: boolean;
}>();
</script>

<template>
  <iframe
    src="/cv.pdf"
    class="pdf-viewer"
    :class="{ 'pdf-viewer--maximized': maximized }"
    title="My CV"
  />
</template>

<style scoped lang="scss">
.pdf-viewer {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 450px;
  border: none;

  padding-bottom: 60px;
}

.pdf-viewer--maximized {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
