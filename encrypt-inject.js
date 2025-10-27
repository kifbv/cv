#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/**
 * Encrypts contact details and injects them into index.html
 *
 * Usage:
 *   node encrypt-inject.js [input.html] [output.html] [--no-encrypt]
 *
 *   --no-encrypt: Inject unencrypted contact details (for PDF generation)
 *
 *   Environment variables (for GitHub Actions):
 *     CONTACT_DETAILS - HTML snippet with contact details
 *     ENCRYPTION_PASSWORD - Password for encryption
 *
 *   Local files (for testing):
 *     contact-details.html - HTML snippet with contact details
 *     contact-details.txt - Password
 */

const PLACEHOLDER = '<!-- CONTACT_DETAILS_PLACEHOLDER -->';

async function encrypt(text, password) {
    // Generate random salt and IV
    const salt = crypto.randomBytes(16);
    const iv = crypto.randomBytes(12);

    // Derive key from password using PBKDF2
    const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');

    // Encrypt with AES-256-GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
    let encrypted = cipher.update(text, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Get auth tag
    const authTag = cipher.getAuthTag();

    // Combine encrypted data and auth tag
    const combined = Buffer.concat([encrypted, authTag]);

    return {
        encrypted: combined.toString('base64'),
        salt: salt.toString('base64'),
        iv: iv.toString('base64')
    };
}

function getContactDetails() {
    // Try environment variable first (for GitHub Actions)
    if (process.env.CONTACT_DETAILS) {
        return process.env.CONTACT_DETAILS;
    }

    // Try local file (for testing)
    const localFile = path.join(__dirname, 'contact-details.html');
    if (fs.existsSync(localFile)) {
        return fs.readFileSync(localFile, 'utf8').trim();
    }

    throw new Error('Contact details not found. Set CONTACT_DETAILS env var or create contact-details.html');
}

function getPassword() {
    // Try environment variable first (for GitHub Actions)
    if (process.env.ENCRYPTION_PASSWORD) {
        return process.env.ENCRYPTION_PASSWORD;
    }

    // Try local file (for testing)
    const localFile = path.join(__dirname, 'contact-details.txt');
    if (fs.existsSync(localFile)) {
        return fs.readFileSync(localFile, 'utf8').trim();
    }

    throw new Error('Password not found. Set ENCRYPTION_PASSWORD env var or create contact-details.txt');
}

async function main() {
    try {
        // Parse arguments
        const args = process.argv.slice(2);
        const noEncrypt = args.includes('--no-encrypt');
        const fileArgs = args.filter(arg => !arg.startsWith('--'));

        const inputFile = fileArgs[0] || path.join(__dirname, 'index.html');
        const outputFile = fileArgs[1] || inputFile;

        console.log('Reading input file:', inputFile);
        let html = fs.readFileSync(inputFile, 'utf8');

        // Check if placeholder exists
        if (!html.includes(PLACEHOLDER)) {
            console.error('Error: Placeholder not found in HTML file');
            console.error(`Looking for: ${PLACEHOLDER}`);
            process.exit(1);
        }

        // Get contact details
        const contactDetails = getContactDetails();

        let replacement;

        if (noEncrypt) {
            // No encryption - inject plain contact details (for PDF generation)
            console.log('Injecting unencrypted contact details...');
            replacement = contactDetails;
        } else {
            // Encrypt contact details (for web deployment)
            const password = getPassword();
            console.log('Encrypting contact details...');
            const { encrypted, salt, iv } = await encrypt(contactDetails, password);

            // Create unlock button with encrypted data
            replacement = `<button
                    id="unlockContactBtn"
                    class="text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors font-medium"
                    data-encrypted="${encrypted}"
                    data-salt="${salt}"
                    data-iv="${iv}"
                >
                    Click to view contact details
                </button>`;
        }

        // Replace placeholder
        html = html.replace(PLACEHOLDER, replacement);

        // Write output
        fs.writeFileSync(outputFile, html, 'utf8');
        console.log('Successfully injected contact details to:', outputFile);

    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main();
