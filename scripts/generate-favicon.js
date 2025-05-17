// scripts/generate-favicon.js
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Configuration des tailles de favicon
const sizes = [16, 32, 48, 64, 128, 256];

async function generateFavicon() {
  try {
    console.log('Génération des favicons à partir du logo...');
    
    // Chemin du logo source
    const logoPath = path.join(__dirname, '../public/logo.svg');
    
    // Vérifier si le logo existe
    if (!fs.existsSync(logoPath)) {
      console.error('Le fichier logo.svg est introuvable dans le dossier public.');
      return;
    }
    
    // Dossier de sortie pour les favicons
    const outputDir = path.join(__dirname, '../public/favicons');
    
    // Créer le dossier s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Charger l'image source
    const image = await loadImage(logoPath);
    
    // Générer des favicons à différentes tailles
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Fond transparent et centrer le logo
      ctx.clearRect(0, 0, size, size);
      
      // Dessiner le logo en conservant ses proportions
      const scale = Math.min(size / image.width, size / image.height) * 0.8;
      const x = (size - image.width * scale) / 2;
      const y = (size - image.height * scale) / 2;
      
      ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
      
      // Enregistrer l'image
      const buffer = canvas.toBuffer('image/png');
      const outputPath = path.join(outputDir, `favicon-${size}x${size}.png`);
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`Favicon généré: ${outputPath}`);
    }
    
    // Utiliser la taille 32x32 comme favicon.ico par défaut
    const favicon32Buffer = fs.readFileSync(path.join(outputDir, 'favicon-32x32.png'));
    fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), favicon32Buffer);
    
    console.log('Génération des favicons terminée avec succès!');
  } catch (error) {
    console.error('Erreur lors de la génération des favicons:', error);
  }
}

// Exécuter la fonction
generateFavicon();
