## ✨ Features

- 📱 Responsive design
- 🎨 Tailwind CSS for styling
- 🔒 Password-protected contact details with AES-256-GCM encryption
- 🖨️ Print-to-PDF functionality via browser
- 🤖 Auto-deployment to GitHub Pages with encrypted contact details
- 🚀 Hosted on GitHub Pages

## 🛠️ Setup Instructions

### 1. Configure GitHub Secrets

The contact details are encrypted and require two GitHub secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   **Secret 1: `CONTACT_DETAILS`**
   ```html
   <div class="text-gray-600 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
       <a href="mailto:your.email@example.com" class="hover:text-blue-600 transition-colors">your.email@example.com</a>
       <span class="hidden sm:inline">•</span>
       <span>+1 234 567 890</span>
   </div>
   ```

   **Secret 2: `ENCRYPTION_PASSWORD`**
   ```
   your-secure-password-here
   ```

### 2. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Choose **gh-pages** branch and **/ (root)** folder
5. Click **Save**

The site will be available at: `https://<username>.github.io/cv/` 🌐

**Important:** The workflow will automatically create the `gh-pages` branch on first push to `main`.

### 3. Setup Custom Domain (Subdomain) - Optional

1. In the DNS provider, add a CNAME record:
   - **Name**: `cv`
   - **Value**: `<username>.github.io`

2. In GitHub repository settings → Pages:
   - Enter the custom domain: `cv.yourdomain.com`
   - Click **Save**
   - Wait for DNS check to complete
   - Enable **Enforce HTTPS** 🔒

## 🧪 Local Testing

To test the encryption locally:

1. Copy the example files:
   ```bash
   cp contact-details.html.example contact-details.html
   cp contact-details.txt.example contact-details.txt
   ```

2. Edit `contact-details.html` with your actual contact details
3. Edit `contact-details.txt` with your password

4. Generate encrypted test file:
   ```bash
   npm run encrypt
   ```

5. Open `index-test.html` in your browser
6. Click "Click to view contact details" and enter your password

### Available Scripts

- `npm run encrypt` - Generate encrypted HTML for testing (`index-test.html`)
- `npm run encrypt:plain` - Generate unencrypted HTML (`index-unencrypted.html`)
- `npm run test` - Same as encrypt, with confirmation message

## 🔒 How It Works

### Encryption
- Contact details are encrypted using **AES-256-GCM** with **PBKDF2** key derivation (100,000 iterations)
- Encryption happens in the GitHub Actions workflow using secrets
- Only the encrypted version is deployed to GitHub Pages
- The password and contact details never appear in the repository

### Decryption
- Uses browser's native **Web Crypto API** (no external dependencies)
- Password prompt appears when user clicks the unlock button
- Wrong password shows an animated error popup with vibration (if supported)
- Decrypted content replaces the button seamlessly

### PDF Generation
- The "Download PDF" button opens the browser's native print dialog
- Print CSS removes the unlock button and formats for PDF
- `@page { margin: 0; }` removes headers/footers for clean PDF output
- Users can print with decrypted contact details (if unlocked) or without

## 📄 License

This is a personal CV website. Feel free to fork and adapt for your own use. 💼
