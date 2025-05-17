// scripts/generate-webmanifest.js
const fs = require('fs');
const path = require('path');

function generateWebManifest() {
  try {
    console.log('Génération du fichier manifest.webmanifest...');
    
    // Configuration du manifeste
    const manifest = {
      "name": "Widebook",
      "short_name": "Widebook",
      "description": "Votre plateforme de blogs et de contenu",
      "start_url": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#3498db",
      "icons": [
        {
          "src": "/favicons/favicon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/favicons/favicon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any maskable"
        }
      ],
      "orientation": "portrait",
      "lang": "fr-FR",
      "categories": ["books", "education", "news"],
      "screenshots": [
        {
          "src": "/images/seo/screenshot-1.jpg",
          "sizes": "1280x720",
          "type": "image/jpeg"
        }
      ]
    };
    
    // Chemin de sortie du fichier
    const outputPath = path.join(__dirname, '../public/manifest.webmanifest');
    
    // Écrire le fichier manifest
    fs.writeFileSync(
      outputPath, 
      JSON.stringify(manifest, null, 2)
    );
    
    console.log(`Fichier manifest.webmanifest généré avec succès: ${outputPath}`);
  } catch (error) {
    console.error('Erreur lors de la génération du webmanifest:', error);
  }
}

// Exécuter la fonction
generateWebManifest();
