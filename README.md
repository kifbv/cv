# Franck Ratier - CV Website

CV website built with HTML5, Tailwind CSS, and vanilla JavaScript. Automatically generates PDF from HTML using GitHub Actions.

## Features

- Clean, responsive design optimized for desktop and mobile
- Tailwind CSS for professional styling
- Floating PDF download button
- Auto-generated PDF from HTML source (GitHub Actions automation)
- GitHub Pages ready

## Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

The site will be available at: `https://kifbv.github.io/cv/`

### 2. Setup Custom Domain (Subdomain)

1. In the DNS provider, add a CNAME record:
   - **Name**: `cv`
   - **Value**: `kifbv.github.io`

2. In GitHub repository settings → Pages:
   - Enter the custom domain: `cv.yourdomain.com`
   - Click **Save**
   - Wait for DNS check to complete
   - Enable **Enforce HTTPS** (recommended)

## License

This is a personal CV website. Feel free to fork and adapt for your own use.
