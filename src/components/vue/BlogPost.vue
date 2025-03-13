<template>
  <article class="blog-post pixelated">
    <header>
      <h1 class="title">{{ post.title }}</h1>
      <div class="meta">
        <span class="date">{{ formatDate(post.date) }}</span>
        <div class="categories">
          <span v-for="category in post.categories.nodes" :key="category.slug" class="category">
            {{ category.name }}
          </span>
        </div>
      </div>
    </header>
    
    <div v-if="post.featuredImage" class="featured-image">
      <img 
        :src="post.featuredImage.node.sourceUrl" 
        :alt="post.featuredImage.node.altText || post.title"
        class="pixelated-image"
      />
    </div>
    
    <div class="content" v-html="post.content"></div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  post: {
    title: string;
    date: string;
    content: string;
    featuredImage?: {
      node: {
        sourceUrl: string;
        altText: string;
      }
    };
    categories: {
      nodes: {
        name: string;
        slug: string;
      }[]
    }
  }
}

const props = defineProps<Props>();

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<style>
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: 'Press Start 2P', monospace;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0066cc;
  text-shadow: 2px 2px 0 #000;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 0.8rem;
}

.date {
  color: #666;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category {
  background-color: #0066cc;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.7rem;
}

.featured-image {
  margin-bottom: 1.5rem;
  border: 4px solid #000;
}

.pixelated-image {
  image-rendering: pixelated;
  width: 100%;
  height: auto;
}

.content {
  line-height: 1.6;
}

.content img {
  max-width: 100%;
  height: auto;
  image-rendering: pixelated;
  border: 4px solid #000;
}

.content a {
  color: #0066cc;
  text-decoration: none;
  border-bottom: 2px solid #0066cc;
}

.content a:hover {
  background-color: #0066cc;
  color: white;
}

.pixelated {
  font-family: 'Press Start 2P', monospace;
}
</style>
