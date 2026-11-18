<script setup lang="ts">
const date = useNow({ interval: 1000 });

const formattedDate = computed(() => {
  const weekday = date.value.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const month = date.value.toLocaleDateString("en-US", {
    month: "short",
  });

  const day = date.value.getDate();

  const time = date.value.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${weekday} ${month} ${day} ${time}`;
});
</script>
<template>
  <div class="menubar">
    <nav class="menubar-nav">
      <ul class="menubar-nav__list__left">
        <li class="menubar-nav__item"><a href="#">@</a></li>
        <li class="menubar-nav__item"><a href="#">File</a></li>
        <li class="menubar-nav__item"><a href="#">Edit</a></li>
        <li class="menubar-nav__item"><a href="#">View</a></li>
        <li class="menubar-nav__item"><a href="#">Help</a></li>
      </ul>

      <ul class="menubar-nav__list__right">
        <li class="menubar-nav__time">
          <a href="#">{{ formattedDate }}</a>
        </li>
      </ul>
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
  background: #419ada;
  display: flex;
  padding-top: 2px;
  padding-bottom: 4px;
}
.menubar-nav__list__left {
  display: flex;

  padding: 0 16px;

  margin-right: auto;
}
.menubar-nav__list__right {
  margin-left: auto;
}
.menubar-nav__item {
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  padding: 4px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: #5da9e8;
  }
}

.menubar-nav__time {
  color: white;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  padding: 4px 15px;
}
</style>
