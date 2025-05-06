# Launch Script for Solumind Blog Platform

# Ensure migrations are applied
Write-Host "Applying database migrations..." -ForegroundColor Green
npx prisma migrate resolve --applied 20250506000000_add_js_to_blog_content

# Build the application
Write-Host "Building the application..." -ForegroundColor Green
npm run build

# Start the server
Write-Host "Starting the server..." -ForegroundColor Green
npm start
