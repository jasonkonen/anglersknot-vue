// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import node from '@astrojs/node';

export default defineConfig({
	site: 'https://anglersknot.com',
	output: 'server',
	adapter: node({
	  mode: 'standalone',
	  host: '0.0.0.0',
	  port: 4500
	}),
	integrations: [mdx(), sitemap(), vue()],
  });
