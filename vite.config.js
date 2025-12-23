import { defineConfig } from 'vite'

// Replace 'username.github.io' with your actual GitHub username
// If it's a project page (repo name != username.github.io), set it to '/repo-name/'
export default defineConfig({
  base: '/', // change this to '/repo-name/' if it's a project page
})
