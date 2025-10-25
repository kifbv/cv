# Franck Ratier - CV Website

Professional CV website built with HTML5, Tailwind CSS, and vanilla JavaScript. Automatically generates PDF from DOCX using GitHub Actions.

## Features

- Clean, responsive design optimized for desktop and mobile
- Tailwind CSS for professional styling
- Floating PDF download button
- Auto-generated PDF from DOCX source
- GitHub Actions automation
- GitHub Pages ready

## Setup Instructions

### 1. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: CV website"
```

### 2. Create GitHub Repository

```bash
# Create a new repository on GitHub (e.g., cv)
git remote add origin git@github.com:YOUR_USERNAME/cv.git
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be available at: `https://YOUR_USERNAME.github.io/cv/`

### 4. Setup Custom Domain (Subdomain)

1. In your DNS provider, add a CNAME record:
   - **Name/Host**: `cv` (or your preferred subdomain)
   - **Value/Target**: `YOUR_USERNAME.github.io`
   - **TTL**: 3600 (or default)

2. In GitHub repository settings → Pages:
   - Enter your custom domain: `cv.yourdomain.com`
   - Click **Save**
   - Wait for DNS check to complete
   - Enable **Enforce HTTPS** (recommended)

### 5. Generate Initial PDF

The GitHub Action will automatically generate a PDF when you push changes to the `.docx` file. To trigger it manually:

1. Go to **Actions** tab in your GitHub repository
2. Select **Generate PDF from DOCX** workflow
3. Click **Run workflow**

Alternatively, generate the PDF locally:

```bash
pandoc CV_Franck_Ratier_2025.docx -o CV_Franck_Ratier_2025.pdf --pdf-engine=pdflatex
git add CV_Franck_Ratier_2025.pdf
git commit -m "Add PDF version of CV"
git push
```

## Updating Your CV

### Method 1: Update DOCX (Recommended)

1. Edit `CV_Franck_Ratier_2025.docx`
2. Commit and push changes
3. GitHub Actions will automatically generate the PDF
4. Update `index.html` with new content if needed

### Method 2: Direct HTML Edit

1. Edit `index.html` directly
2. Update the `.docx` file to keep them in sync
3. Commit and push changes

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── generate-pdf.yml    # GitHub Actions workflow
├── index.html                  # Main CV website
├── CV_Franck_Ratier_2025.docx  # Source DOCX file
├── CV_Franck_Ratier_2025.pdf   # Auto-generated PDF
├── CV_Franck_Ratier_2025.md    # Markdown version (optional)
└── README.md                   # This file
```

## Technologies Used

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript** - PDF download functionality
- **GitHub Actions** - Automated PDF generation
- **Pandoc** - Document conversion
- **GitHub Pages** - Static site hosting

## Local Development

Simply open `index.html` in your browser. No build process required!

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Or use a simple HTTP server
python3 -m http.server 8000
# Visit http://localhost:8000
```

## License

This is a personal CV website. Feel free to fork and adapt for your own use.
