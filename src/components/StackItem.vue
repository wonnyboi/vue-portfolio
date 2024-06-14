<template>
  <div class="item">
    <img :src="getIconPath(iconName)" :alt="iconName" class="icon" />
    <div class="name">{{ iconName }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  iconName: {
    type: String,
    required: true
  }
});

const getIconPath = (iconName) => {
  return new URL(`../assets/icons/${iconName}.svg`, import.meta.url).href;
};
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
}

.icon {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.name {
  font-size: 20px;
}
</style>
