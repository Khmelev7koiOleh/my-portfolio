<script setup lang="ts">
import { Icon } from "@iconify/vue";
// const date = useNow({ interval: 1000 });

// const formattedDate = computed(() => {
//   const weekday = date.value.toLocaleDateString("en-US", {
//     weekday: "short",
//   });

//   const month = date.value.toLocaleDateString("en-US", {
//     month: "short",
//   });

//   const day = date.value.getDate();

//   const time = date.value.toLocaleTimeString("en-GB", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: false,
//   });

//   return `${weekday} ${month} ${day} ${time}`;
// });
</script>
<template>
  <div class="menubar">
    <nav class="menubar-nav">
      <div class="menubar-nav__item">
        <img src="/../public/icons/vscode.png" alt="" width="65" height="65" />
      </div>
      <div class="menubar-nav__item">
        <a
          href="https://github.com/Khmelev7koiOleh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/../public/icons/github.png"
            alt=""
            width="65"
            height="65"
          />
        </a>
      </div>
      <div class="menubar-nav__item">
        <img src="/../public/icons/figma.png" alt="" width="65" height="65" />
      </div>

      <div class="menubar-nav__item">
        <img src="/../public/icons/finder.png" alt="" width="65" height="65" />
      </div>
    </nav>
  </div>
</template>
<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: inherit;
}

.menubar-nav {
  background-color: rgba(218, 196, 167, 0.05);
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  padding-block: 8px;

  margin-inline: 50px;
  margin-block: 10px;
  border-radius: 25px;
  position: relative;
}
.menubar-nav:before {
  position: absolute;
  content: "";
  backdrop-filter: blur(3px);
  inset: 0;
  z-index: -1;
  border-radius: 0 0 8px 8px;
}

// .menubar-nav__list__right {
//   margin-left: auto;
// }
.menubar-nav__item {
  border-radius: 10px;
  margin-inline: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-8px);
  }
}
</style>
