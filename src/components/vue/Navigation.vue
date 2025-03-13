<template>
  <nav class="navigation pixelated">
    <div class="nav-container">
      <div class="logo">
        <a href="/" class="logo-link">
          <span class="logo-icon">🎣</span>
          <span class="logo-text">Angler's Knot</span>
        </a>
      </div>
      
      <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen" aria-label="Toggle menu">
        <div class="hamburger" :class="{ 'is-active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      
      <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <a href="/" class="nav-link" :class="{ 'active': currentPath === '/' }">Home</a>
        <a href="/blog/" class="nav-link" :class="{ 'active': currentPath.startsWith('/blog') }">Blog</a>
        <a href="/about/" class="nav-link" :class="{ 'active': currentPath === '/about/' }">About</a>
        <a href="/video-games/" class="nav-link" :class="{ 'active': currentPath === '/video-games/' || currentPath === '/fishing-video-games/' }">Video Games</a>
        <a href="/board-games/" class="nav-link" :class="{ 'active': currentPath === '/board-games/' || currentPath === '/fishing-board-games/' }">Board Games</a>
        <a href="/shows/" class="nav-link" :class="{ 'active': currentPath === '/shows/' || currentPath === '/fishing-shows/' }">Shows</a>
        
        <div class="categories-dropdown">
          <button class="dropdown-toggle" @click="isCategoriesOpen = !isCategoriesOpen">
            Categories
            <span class="dropdown-arrow">▼</span>
          </button>
          <div class="dropdown-menu" :class="{ 'is-open': isCategoriesOpen }">
            <a 
              v-for="category in categories" 
              :key="category.slug" 
              :href="`/blog/category/${category.slug}/`"
              class="dropdown-item"
            >
              {{ category.name }} ({{ category.count }})
            </a>
          </div>
        </div>
        
        <div class="search-form">
          <form @submit.prevent="handleSearch">
            <input 
              type="text" 
              v-model="searchTerm" 
              placeholder="Search..." 
              class="search-input"
            />
            <button type="submit" class="search-button">🔍</button>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

interface Props {
  categories: Category[];
}

const props = defineProps<Props>();
const isMenuOpen = ref(false);
const isCategoriesOpen = ref(false);
const searchTerm = ref('');
const currentPath = ref('');

onMounted(() => {
  currentPath.value = window.location.pathname;
  
  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const nav = document.querySelector('.navigation');
    
    if (nav && !nav.contains(target)) {
      isMenuOpen.value = false;
      isCategoriesOpen.value = false;
    }
  });
});

function handleSearch() {
  if (searchTerm.value.trim()) {
    window.location.href = `/blog/search/?q=${encodeURIComponent(searchTerm.value.trim())}`;
  }
}
</script>

<style>
.navigation {
  background-color: #0066cc;
  padding: 1rem;
  border-bottom: 4px solid #000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo {
  margin-right: 2rem;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
}

.logo-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  padding: 0.5rem;
  border: 2px solid transparent;
}

.nav-link:hover, .nav-link.active {
  border-color: white;
}

.categories-dropdown {
  position: relative;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: white;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 2px solid transparent;
}

.dropdown-toggle:hover {
  border-color: white;
}

.dropdown-arrow {
  font-size: 0.7rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #0066cc;
  border: 4px solid #000;
  min-width: 200px;
  z-index: 10;
  display: none;
}

.dropdown-menu.is-open {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  border-bottom: 2px solid #0055aa;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background-color: #0055aa;
}

.search-form {
  margin-left: 1rem;
}

.search-form form {
  display: flex;
  align-items: center;
}

.search-input {
  padding: 0.5rem;
  border: 2px solid #000;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.8rem;
  width: 150px;
}

.search-button {
  background-color: #000;
  border: 2px solid #000;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
}

.hamburger span {
  display: block;
  height: 4px;
  width: 100%;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.is-active span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

.pixelated {
  font-family: 'Press Start 2P', monospace;
}

@media (max-width: 992px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-links {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: none;
    padding-top: 1rem;
  }
  
  .nav-links.is-open {
    display: flex;
  }
  
  .search-form {
    margin: 1rem 0 0 0;
    width: 100%;
  }
  
  .search-form form {
    width: 100%;
  }
  
  .search-input {
    flex-grow: 1;
    width: auto;
  }
  
  .categories-dropdown {
    width: 100%;
  }
  
  .dropdown-menu {
    position: static;
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
