# 🩺 Irish Nursing Crossword Game

## GitHub Repository
- **Repository URL:** https://github.com/liamfogarty10/kellywordgame
- **GitHub Token:** [Token configured locally for deployment]

## Game Features
✅ Interactive crossword grid with Irish nursing content
✅ 12 nursing-related words and clues including:
- Medical abbreviations (NBM, TPR, MRSA, CPAP, IVIG)
- Common medications (Heparin, Insulin)
- Clinical assessments (Glasgow Coma Scale, Pain as 5th vital sign)
- Infection control (SOAP, MRSA)
- Hospital terminology (Ward, Drain)

## Deployment to GitHub Pages

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit: Irish nursing crossword game"
git branch -M main
git remote add origin https://github.com/liamfogarty10/kellywordgame.git
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Save settings

### Step 3: Access Your Game
Your game will be available at: https://liamfogarty10.github.io/kellywordgame/

## Game Instructions
- Click on cells or clues to select words
- Type letters to fill the crossword
- Use "Check Answers" to verify your solutions
- Use "Reveal Selected Word" for hints
- "Clear Grid" to start over
- Navigation with arrow keys supported

## Files Structure
- `index.html` - Main game interface
- `styles.css` - Responsive styling and animations
- `script.js` - Game logic and crossword functionality
- `github.md` - This documentation file
