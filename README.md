## ✨ Features

- 📱 Responsive design
- 🎨 Tailwind CSS for styling
- 📥 Floating PDF download button
- 🤖 Auto-generated PDF from HTML source (GitHub Actions automation)
- 🚀 Hosted on GitHub Pages

## 🛠️ Setup Instructions

### 1️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

The site will be available at: `https://<username>.github.io/cv/` 🌐

### 2️⃣ Setup Custom Domain (Subdomain)

1. In the DNS provider, add a CNAME record:
   - **Name**: `cv`
   - **Value**: `<username>.github.io`

2. In GitHub repository settings → Pages:
   - Enter the custom domain: `cv.yourdomain.com`
   - Click **Save**
   - Wait for DNS check to complete
   - Enable **Enforce HTTPS** (recommended) 🔒

## 📄 License

This is a personal CV website. Feel free to fork and adapt for your own use. 💼
