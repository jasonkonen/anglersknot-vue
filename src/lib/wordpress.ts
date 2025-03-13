import { request, gql } from 'graphql-request';

// Define types for WordPress data
interface WordPressImage {
  node: {
    sourceUrl: string;
    altText: string;
  };
}

interface WordPressCategory {
  nodes: {
    name: string;
    slug: string;
  }[];
}

interface WordPressPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: WordPressImage;
  categories: WordPressCategory;
}

interface WordPressPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage: WordPressImage;
}

interface PostsResponse {
  posts: {
    nodes: WordPressPost[];
  };
}

interface PostResponse {
  post: WordPressPost;
}

interface PageResponse {
  page: WordPressPage;
}

interface CategoriesResponse {
  categories: {
    nodes: {
      id: string;
      name: string;
      slug: string;
      count: number;
    }[];
  };
}

const WORDPRESS_API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL || 'https://anglersknot.wpenginepowered.com/graphql';

/**
 * Fetch posts from WordPress GraphQL API
 * @param {number} first - Number of posts to fetch
 * @param {string} category - Category slug to filter by (optional)
 * @param {string} search - Search term (optional)
 * @returns {Promise<WordPressPost[]>} - WordPress posts
 */
export async function getPosts(first = 10, category = '', search = '') {
  const query = gql`
    query GetPosts($first: Int!, $category: String, $search: String) {
      posts(
        first: $first, 
        where: { 
          categoryName: $category,
          search: $search
        }
      ) {
        nodes {
          id
          title
          date
          slug
          excerpt
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const variables = {
    first,
    category: category || null,
    search: search || null
  };

  try {
    const data = await request<PostsResponse>(WORDPRESS_API_URL, query, variables);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<WordPressPost | null>} - WordPress post
 */
export async function getPostBySlug(slug: string) {
  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        date
        slug
        content
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  try {
    const data = await request<PostResponse>(WORDPRESS_API_URL, query, { slug });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch all categories from WordPress
 * @returns {Promise<{id: string, name: string, slug: string, count: number}[]>} - WordPress categories
 */
export async function getCategories() {
  const query = gql`
    query GetCategories {
      categories {
        nodes {
          id
          name
          slug
          count
        }
      }
    }
  `;

  try {
    const data = await request<CategoriesResponse>(WORDPRESS_API_URL, query);
    return data.categories.nodes;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Search posts by term
 * @param {string} searchTerm - Search term
 * @returns {Promise<WordPressPost[]>} - Search results
 */
export async function searchPosts(searchTerm: string) {
  return getPosts(100, '', searchTerm);
}

/**
 * Fetch a single page by slug
 * @param {string} slug - Page slug
 * @returns {Promise<WordPressPage | null>} - WordPress page
 */
export async function getPageBySlug(slug: string) {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        title
        slug
        content
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  `;

  try {
    const data = await request<PageResponse>(WORDPRESS_API_URL, query, { slug });
    return data.page;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}
