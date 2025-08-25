# 🩺 Kellys Nursing Crossword

## 🎮 Play the Game

**[▶️ Play Now on GitHub Pages](https://liamfogarty10.github.io/kellywordgame/)**

## About

An interactive crossword game focused on Irish general nursing practice. Test your knowledge of medical terminology, abbreviations, and clinical concepts commonly used in Irish healthcare settings.

## Features

- **Interactive 15×15 crossword grid** with smooth animations
- **12 nursing-specific clues** including:
  - Medical abbreviations (NBM, TPR, MRSA, CPAP, IVIG)
  - Common medications (Heparin, Insulin)
  - Clinical assessments (Glasgow Coma Scale, Pain assessment)
  - Infection control practices (SOAP hand hygiene)
  - Hospital terminology (Ward, Drain)

## Game Controls

- 🖱️ **Click** on cells or clues to select words
- ⌨️ **Type** letters to fill in answers
- ✅ **Check Answers** to verify your solutions
- 💡 **Reveal Word** to get hints on selected words
- 🧹 **Clear Grid** to start over
- 🔄 **New Game** for a fresh challenge
- ⬅️➡️⬆️⬇️ **Arrow keys** for navigation

## How to Play

1. Click on a clue or cell to select a word
2. Type your answer - only letters are accepted
3. Navigate using arrow keys or mouse clicks
4. Check your progress with "Check Answers"
5. Use "Reveal Word" if you're stuck on a specific term

## Technology

- Pure HTML5, CSS3, and JavaScript
- Responsive design for mobile and desktop
- No external dependencies
- Hosted on GitHub Pages

---

Perfect for nursing students, healthcare professionals, and anyone interested in Irish medical terminology! 🍀

*Study well and good luck with your nursing knowledge!*

---

## 🛠️ Developer Instructions

### Adding New Words & Puzzle Sets

To add new crossword puzzles, edit the `script.js` file:

1. **Add New Puzzle Set:**
   ```javascript
   // In the createPuzzleSets() method, add a new array:
   [
       { id: 1, word: 'WORD', row: 2, col: 3, direction: 'across', clue: 'Your clue here', number: 1 },
       // ... add 12 words total per set
   ]
   ```

2. **Word Object Format:**
   - `id`: Unique number (1-12 per set)
   - `word`: Answer in UPPERCASE
   - `row`: Grid row (0-14)
   - `col`: Grid column (0-14)  
   - `direction`: 'across' or 'down'
   - `clue`: Descriptive clue text
   - `number`: Clue number for display

3. **Update Puzzle Names:**
   ```javascript
   // In the newGame() method, add your new puzzle name:
   const puzzleNames = [
       'Irish General Nursing Terms',
       // ... existing names
       'Your New Puzzle Name'  // Add here
   ];
   ```

### Irish Nursing Guidelines

**✅ Use Irish/UK terminology:**
- PARACETAMOL (not Acetaminophen)
- ADRENALINE (not Epinephrine) 
- FRUSEMIDE (not Furosemide)
- THEATRE (not Operating Room)
- TROLLEY (not Gurney)
- A&E (not ER)
- MILLILITRE (not Milliliter)

**✅ Include Irish healthcare references:**
- HSE (Health Service Executive)
- NMBI (Nursing and Midwifery Board of Ireland)
- HIQA (Health Information and Quality Authority)
- Irish hospitals, wards, practices

### Git Commands for Updates

```bash
# Check status
git status

# Add changes
git add .

# Commit with message
git commit -m "Add new puzzle set: [description]

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to GitHub
git push origin main
```

### GitHub Pages Deployment

GitHub Pages automatically deploys from the `main` branch. Changes appear live within 2-5 minutes at:
**https://liamfogarty10.github.io/kellywordgame/**

### Testing Changes

```bash
# Test locally with Python server
python3 -m http.server 8080

# Check JavaScript syntax
node -c script.js
```

### Current Game Statistics
- **10 Puzzle Sets** with 120 total Irish nursing terms
- **Responsive design** for mobile and desktop  
- **Pure HTML/CSS/JavaScript** - no external dependencies