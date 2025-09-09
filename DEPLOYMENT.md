# Deployment Guide - Netlify

This Angular portfolio application is ready for deployment to Netlify.

## Quick Deployment Steps

### Option 1: Drag & Drop Deployment
1. Build the project locally:
   ```bash
   ng build --configuration production
   ```
2. Go to [Netlify.com](https://netlify.com) and login
3. Drag the `dist/` folder to the deploy area
4. Your site will be live immediately!

### Option 2: Git-based Deployment (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Go to [Netlify.com](https://netlify.com) and login
3. Click "New site from Git"
4. Connect your repository
5. Netlify will automatically detect the build settings from `netlify.toml`

## Build Configuration

The `netlify.toml` file is configured with:
- **Build command**: `ng build --configuration production`
- **Publish directory**: `dist/`
- **Node version**: 18
- **SPA routing**: Redirects configured for Angular routing
- **Performance**: Cache headers for static assets
- **Security**: Security headers included

## Features Included

✅ **Home & Blog Tabs**: Interactive tab navigation
✅ **GitHub Integration**: Displays your repositories via GitHub API
✅ **X/Twitter Widget**: Shows your latest posts
✅ **Dark/Light Theme**: Theme switching functionality
✅ **Responsive Design**: Mobile-friendly layout
✅ **Material Design**: Angular Material components
✅ **Performance Optimized**: Production build with optimizations

## Environment Variables

If you need to add environment variables:
1. Go to Site Settings → Environment Variables in Netlify
2. Add any required API keys or configuration

## Custom Domain (Optional)

To use a custom domain:
1. Go to Site Settings → Domain management
2. Add your custom domain
3. Configure DNS settings as instructed

## GitHub API

The GitHub integration will work automatically using the public GitHub API. If you experience rate limiting, you can add a GitHub personal access token as an environment variable.

## Troubleshooting

- **404 errors**: The `netlify.toml` includes SPA redirects for Angular routing
- **Build failures**: Check the build logs in Netlify deploy section
- **Missing dependencies**: Ensure all dependencies are in `package.json`

Your portfolio is now ready for the world! 🚀