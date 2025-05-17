const fs = require('fs');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

async function generateOgImage() {
  console.log('Generating default OpenGraph image...');
  
  // Configuration
  const width = 1200;
  const height = 630;
  const outputPath = path.join(__dirname, '../public/og-image.jpg');
  
  try {
    // Créer un canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    
    // Dessiner un fond dégradé
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#8e44ad');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    
    // Charger le logo si disponible
    try {
      const logoPath = path.join(__dirname, '../public/logo.svg');
      if (fs.existsSync(logoPath)) {
        const logo = await loadImage(logoPath);
        const logoWidth = 200;
        const logoHeight = 200;
        context.drawImage(logo, width/2 - logoWidth/2, height/2 - logoHeight/2 - 60, logoWidth, logoHeight);
      }
    } catch (logoError) {
      console.warn('Warning: Could not load logo:', logoError.message);
    }
    
    // Ajouter le texte
    context.fillStyle = '#ffffff';
    context.font = 'bold 60px Arial';
    context.textAlign = 'center';
    context.fillText('Widebook', width/2, height/2 + 60);
    
    context.fillStyle = 'rgba(255, 255, 255, 0.8)';
    context.font = '32px Arial';
    context.fillText('Votre plateforme de blogs et de contenu', width/2, height/2 + 120);
    
    // Enregistrer l'image
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`OpenGraph image generated successfully at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating OpenGraph image:', error);
  }
}

generateOgImage();
