<script setup lang="ts">
import { projects } from "~/types/projects.ts";
import { Icon } from "@iconify/vue";
defineProps<{
  maximized: boolean;
}>();
</script>

<template>
  <div class="wrapper">
    <div
      class="projects"
      data-no-drag
      v-for="project in projects"
      :key="project.id"
    >
      <img :src="project.image" :alt="project.title" class="projects__image" />
      <div class="projects__info">
        <h3 class="projects__title">{{ project.title }}</h3>
        <p class="projects__description">{{ project.description }}</p>

        <ul class="projects__technologies">
          Technologies: [
          <li
            v-for="tech in project.technologies"
            :key="tech"
            class="projects__technology"
          >
            {{ tech }}
          </li>
          ]
        </ul>
      </div>
      <div class="projects__links">
        <a
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="projects__github"
        >
          <Icon icon="mdi:github" />
          GitHub
        </a>

        <a
          :href="project.link"
          target="_blank"
          rel="noopener noreferrer"
          class="projects__link"
        >
          <Icon icon="mdi:link" />
          View Project
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h3,
p {
  margin: 0;
  font-weight: normal;
  // font-weight: normal;
}
a {
  text-decoration: none;
  color: #000;
}
.wrapper {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  gap: 15px;
}
.projects {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 20px;
  padding-inline: 10px;

  &__image {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    padding-inline: 10px;
    padding-block: 5px;
  }
  &__title {
    font-size: 24px;
    font-style: italic;
    font-weight: light;

    margin-bottom: 10px;
  }
  &__description {
    font-weight: normal;
    font-size: 16px;
  }
  &__technologies {
    display: flex;
    gap: 10px;
    padding: 0;
    list-style: none;
  }
  &__links {
    display: flex;

    justify-content: space-between;
    gap: 10px;
  }
  &__link {
    display: flex;
    align-items: center;

    gap: 5px;
    color: #fff;
    background: #2563eb;
    border-radius: 10px;
    padding: 8px 14px;
    font-weight: bold;

    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: translateY(-3px);

      background: #0746a6;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }

  &__github {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff;
    background: #000;
    border-radius: 10px;
    padding: 8px 14px;
    font-weight: bold;

    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      transform: translateY(-3px);
      background: #333;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
