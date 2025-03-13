<template>
  <footer class="site-footer pixelated">
    <div class="footer-container">
      <div class="footer-logo">
        <span class="footer-icon">🎣</span>
        <span class="footer-title">Angler's Knot</span>
      </div>
      
      <div class="footer-links">
        <div class="footer-section">
          <h3 class="footer-heading">Navigation</h3>
          <ul class="footer-menu">
            <li><a href="/" class="footer-link">Home</a></li>
            <li><a href="/blog/" class="footer-link">Blog</a></li>
            <li><a href="/about/" class="footer-link">About</a></li>
            <li><a href="/fishing-video-games/" class="footer-link">Video Games</a></li>
            <li><a href="/fishing-board-games/" class="footer-link">Board Games</a></li>
            <li><a href="/fishing-shows/" class="footer-link">Shows</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-heading">Categories</h3>
          <ul class="footer-menu">
            <li v-for="category in categories.slice(0, 5)" :key="category.slug">
              <a :href="`/blog/category/${category.slug}/`" class="footer-link">
                {{ category.name }}
              </a>
            </li>
            <li v-if="categories.length > 5">
              <a href="/blog/" class="footer-link">More...</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3 class="footer-heading">Connect</h3>
          <ul class="footer-menu social-links">
            <li><a href="#" class="footer-link social-link">Twitter</a></li>
            <li><a href="#" class="footer-link social-link">Facebook</a></li>
            <li><a href="#" class="footer-link social-link">Instagram</a></li>
            <li><a href="#" class="footer-link social-link">YouTube</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">
        &copy; {{ new Date().getFullYear() }} Angler's Knot. All rights reserved.
      </p>
      <p class="powered-by">
        Powered by WordPress, Astro, and Vue.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
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
</script>

<style>
.site-footer {
  background-color: #003366;
  color: white;
  border-top: 4px solid #000;
  padding: 2rem 1rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.footer-icon {
  font-size: 2rem;
  margin-right: 0.5rem;
}

.footer-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 0 #000;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.footer-section {
  min-width: 200px;
}

.footer-heading {
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #66ccff;
  text-shadow: 1px 1px 0 #000;
}

.footer-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-menu li {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 0.8rem;
  display: inline-block;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}

.footer-link:hover {
  border-bottom-color: #66ccff;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding-top: 1rem;
  border-top: 1px solid #0055aa;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.7rem;
  color: #aaccee;
}

.pixelated {
  font-family: 'Press Start 2P', monospace;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
}
</style>
