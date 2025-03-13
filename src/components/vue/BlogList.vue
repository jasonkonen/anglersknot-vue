<template>
  <div class="blog-list pixelated">
    <h2 class="section-title">{{ title || 'Latest Posts' }}</h2>
    
    <div v-if="posts.length === 0" class="no-posts">
      <p>No posts found.</p>
    </div>
    
    <div v-else class="posts-grid">
      <article v-for="post in posts" :key="post.id" class="post-card">
        <a :href="`/blog/${post.slug}/`" class="post-link">
          <div v-if="post.featuredImage" class="card-image">
            <img 
              :src="post.featuredImage.node.sourceUrl" 
              :alt="post.featuredImage.node.altText || post.title"
              class="pixelated-image"
            />
          </div>
          <div v-else class="card-image placeholder-image">
            <div class="fishing-icon">🎣</div>
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ post.title }}</h3>
            <div class="card-meta">
              <span class="card-date">{{ formatDate(post.date) }}</span>
              <div class="card-categories">
                <span v-for="category in post.categories.nodes" :key="category.slug" class="card-category">
                  {{ category.name }}
                </span>
              </div>
            </div>
            <div class="card-excerpt" v-html="post.excerpt"></div>
          </div>
        </a>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  posts: {
    id: string;
    title: string;
    date: string;
    slug: string;
    excerpt: string;
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
  }[];
  title?: string;
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
.blog-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #0066cc;
  text-shadow: 2px 2px 0 #000;
  text-align: center;
  font-family: 'Press Start 2P', monospace;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  border: 4px solid #000;
  background-color: #f0f8ff;
  transition: transform 0.2s;
  overflow: hidden;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.post-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.card-image {
  height: 200px;
  overflow: hidden;
  border-bottom: 4px solid #000;
}

.pixelated-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.placeholder-image {
  background-color: #0066cc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fishing-icon {
  font-size: 4rem;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #0066cc;
  font-family: 'Press Start 2P', monospace;
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.7rem;
}

.card-date {
  color: #666;
}

.card-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-category {
  background-color: #0066cc;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6rem;
}

.card-excerpt {
  font-size: 0.8rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.no-posts {
  text-align: center;
  padding: 2rem;
  font-family: 'Press Start 2P', monospace;
}

.pixelated {
  font-family: 'Press Start 2P', monospace;
}

@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
