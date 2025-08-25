class CrosswordGame {
    constructor() {
        this.grid = null;
        this.words = [];
        this.selectedCell = null;
        this.selectedWord = null;
        this.direction = 'across';
        this.gridSize = 15;
        this.currentPuzzleIndex = 0;
        this.puzzleSets = this.createPuzzleSets();
        
        this.init();
        this.loadPuzzle();
        this.attachEventListeners();
    }

    init() {
        this.createGrid();
    }

    createGrid() {
        const gridElement = document.getElementById('crossword-grid');
        gridElement.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
        gridElement.innerHTML = '';

        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell blocked';
                cell.dataset.row = row;
                cell.dataset.col = col;
                gridElement.appendChild(cell);
            }
        }
    }

    createPuzzleSets() {
        return [
            // Puzzle Set 1: Irish General Nursing Terms
            [
                { id: 1, word: 'NPO', row: 2, col: 3, direction: 'across', clue: 'Nothing Per Os - Irish hospitals use this abbreviation', number: 1 },
                { id: 2, word: 'HSE', row: 4, col: 1, direction: 'across', clue: 'Health Service Executive - Irish health system', number: 3 },
                { id: 3, word: 'CONSCIOUSNESS', row: 1, col: 4, direction: 'down', clue: 'Glasgow Coma Scale used in Irish A&E units', number: 2 },
                { id: 4, word: 'NMBI', row: 6, col: 6, direction: 'down', clue: 'Nursing and Midwifery Board of Ireland', number: 4 },
                { id: 5, word: 'TPR', row: 7, col: 2, direction: 'across', clue: 'Temperature, Pulse, Respiration - basic Irish observations', number: 5 },
                { id: 6, word: 'MRSA', row: 9, col: 4, direction: 'across', clue: 'Major infection control concern in Irish hospitals', number: 6 },
                { id: 7, word: 'INSULIN', row: 3, col: 8, direction: 'down', clue: 'Diabetes medication commonly used in Ireland', number: 7 },
                { id: 8, word: 'WARD', row: 11, col: 5, direction: 'across', clue: 'Hospital unit in Irish public hospitals', number: 8 },
                { id: 9, word: 'ANAIL', row: 5, col: 11, direction: 'down', clue: 'Irish word for breath/breathing', number: 9 },
                { id: 10, word: 'PAIN', row: 12, col: 1, direction: 'across', clue: 'Fifth vital sign in Irish nursing practice', number: 10 },
                { id: 11, word: 'ALTO', row: 0, col: 9, direction: 'down', clue: 'Irish medical card means free treatment', number: 11 },
                { id: 12, word: 'DRAIN', row: 6, col: 0, direction: 'down', clue: 'Post-surgical tube used in Irish hospitals', number: 12 }
            ],
            
            // Puzzle Set 2: Irish Medications & Treatments  
            [
                { id: 1, word: 'WARFARIN', row: 2, col: 2, direction: 'across', clue: 'Anticoagulant on Irish formulary', number: 1 },
                { id: 2, word: 'PARACETAMOL', row: 5, col: 1, direction: 'across', clue: 'Most common painkiller in Irish hospitals', number: 3 },
                { id: 3, word: 'OXYGEN', row: 1, col: 4, direction: 'down', clue: 'Essential therapy in Irish respiratory wards', number: 2 },
                { id: 4, word: 'DIGOXIN', row: 8, col: 3, direction: 'across', clue: 'Heart medication monitored in Irish labs', number: 5 },
                { id: 5, word: 'SALINE', row: 3, col: 7, direction: 'down', clue: 'Normal sodium chloride 0.9% used in Ireland', number: 4 },
                { id: 6, word: 'FRUSEMIDE', row: 10, col: 1, direction: 'across', clue: 'Diuretic medication (Irish/UK spelling)', number: 6 },
                { id: 7, word: 'ASPIRIN', row: 0, col: 9, direction: 'down', clue: 'Antiplatelet therapy 75mg in Irish practice', number: 7 },
                { id: 8, word: 'STATIN', row: 12, col: 5, direction: 'across', clue: 'Cholesterol drug widely prescribed in Ireland', number: 8 },
                { id: 9, word: 'CODEINE', row: 6, col: 11, direction: 'down', clue: 'Controlled opioid in Irish pharmacy', number: 9 },
                { id: 10, word: 'PREDNISOLONE', row: 7, col: 8, direction: 'down', clue: 'Steroid commonly used in Irish hospitals', number: 10 },
                { id: 11, word: 'BETA', row: 4, col: 12, direction: 'down', clue: 'Type of blocker for hypertension in Ireland', number: 11 },
                { id: 12, word: 'GTN', row: 11, col: 10, direction: 'across', clue: 'Glyceryl trinitrate for angina in Ireland', number: 12 }
            ],
            
            // Puzzle Set 3: Irish Assessment & Monitoring
            [
                { id: 1, word: 'SATS', row: 2, col: 3, direction: 'across', clue: 'Oxygen saturation monitored in Irish wards', number: 1 },
                { id: 2, word: 'AVPU', row: 4, col: 1, direction: 'across', clue: 'Consciousness scale used in Irish A&E', number: 3 },
                { id: 3, word: 'GLASGOW', row: 1, col: 4, direction: 'down', clue: 'Coma scale standard in Irish neurology', number: 2 },
                { id: 4, word: 'ISBAR', row: 6, col: 6, direction: 'down', clue: 'Irish communication tool for handovers', number: 4 },
                { id: 5, word: 'NEWS', row: 7, col: 2, direction: 'across', clue: 'Early Warning Score used in Ireland', number: 5 },
                { id: 6, word: 'TEMP', row: 9, col: 4, direction: 'across', clue: 'Body temperature - essential Irish vital sign', number: 6 },
                { id: 7, word: 'PULSE', row: 3, col: 8, direction: 'down', clue: 'Heart rate checked every 4 hours in Ireland', number: 7 },
                { id: 8, word: 'BP', row: 11, col: 5, direction: 'across', clue: 'Blood pressure monitored in Irish practice', number: 8 },
                { id: 9, word: 'RR', row: 5, col: 11, direction: 'down', clue: 'Respiratory rate - Irish nursing abbreviation', number: 9 },
                { id: 10, word: 'BMI', row: 12, col: 1, direction: 'across', clue: 'Body Mass Index calculated in Irish clinics', number: 10 },
                { id: 11, word: 'URINE', row: 0, col: 9, direction: 'down', clue: 'Output monitored in Irish hospitals', number: 11 },
                { id: 12, word: 'CAPILLARY', row: 6, col: 0, direction: 'down', clue: 'Refill assessed in Irish circulation checks', number: 12 }
            ],
            
            // Puzzle Set 4: Irish Procedures & Equipment
            [
                { id: 1, word: 'CANNULA', row: 2, col: 2, direction: 'across', clue: 'IV access device used in Irish hospitals', number: 1 },
                { id: 2, word: 'CATHETER', row: 5, col: 1, direction: 'across', clue: 'Urinary tube inserted in Irish wards', number: 3 },
                { id: 3, word: 'SYRINGE', row: 1, col: 4, direction: 'down', clue: 'Injection device in Irish nursing practice', number: 2 },
                { id: 4, word: 'NEBULISER', row: 8, col: 3, direction: 'across', clue: 'Respiratory equipment in Irish hospitals', number: 5 },
                { id: 5, word: 'STOMA', row: 3, col: 7, direction: 'down', clue: 'Surgically created opening - Irish care', number: 4 },
                { id: 6, word: 'TRACH', row: 10, col: 1, direction: 'across', clue: 'Tracheostomy tube used in Irish ICUs', number: 6 },
                { id: 7, word: 'NASOGASTRIC', row: 0, col: 9, direction: 'down', clue: 'NG tube feeding method in Irish practice', number: 7 },
                { id: 8, word: 'DRESSING', row: 12, col: 5, direction: 'across', clue: 'Wound care material in Irish hospitals', number: 8 },
                { id: 9, word: 'SUTURE', row: 6, col: 11, direction: 'down', clue: 'Surgical stitches used in Irish theatres', number: 9 },
                { id: 10, word: 'MONITOR', row: 7, col: 8, direction: 'down', clue: 'Patient observation equipment in Ireland', number: 10 },
                { id: 11, word: 'PUMP', row: 4, col: 12, direction: 'down', clue: 'Infusion device standard in Irish wards', number: 11 },
                { id: 12, word: 'ECG', row: 11, col: 10, direction: 'across', clue: 'Heart trace recording in Irish cardiology', number: 12 }
            ],
            
            // Puzzle Set 5: Irish Healthcare Conditions 
            [
                { id: 1, word: 'STROKE', row: 2, col: 3, direction: 'across', clue: 'Major cause of disability in Ireland', number: 1 },
                { id: 2, word: 'SEPSIS', row: 4, col: 1, direction: 'across', clue: 'Life-threatening infection in Irish ICUs', number: 3 },
                { id: 3, word: 'PNEUMONIA', row: 1, col: 4, direction: 'down', clue: 'Common respiratory infection in Ireland', number: 2 },
                { id: 4, word: 'COPD', row: 6, col: 6, direction: 'down', clue: 'Chronic lung disease common in Ireland', number: 4 },
                { id: 5, word: 'DVT', row: 7, col: 2, direction: 'across', clue: 'Blood clot risk in Irish hospitals', number: 5 },
                { id: 6, word: 'UTI', row: 9, col: 4, direction: 'across', clue: 'Common infection in Irish elderly care', number: 6 },
                { id: 7, word: 'DIABETES', row: 3, col: 8, direction: 'down', clue: 'Growing epidemic in Irish population', number: 7 },
                { id: 8, word: 'FALLS', row: 11, col: 5, direction: 'across', clue: 'Major risk assessment in Irish nursing', number: 8 },
                { id: 9, word: 'PRESSURE', row: 5, col: 11, direction: 'down', clue: 'Sore prevention priority in Ireland', number: 9 },
                { id: 10, word: 'EMBOLISM', row: 12, col: 1, direction: 'across', clue: 'Emergency treated in Irish A&E', number: 10 },
                { id: 11, word: 'ANGINA', row: 0, col: 9, direction: 'down', clue: 'Chest pain managed in Irish cardiology', number: 11 },
                { id: 12, word: 'DEMENTIA', row: 6, col: 0, direction: 'down', clue: 'Growing concern in Irish healthcare', number: 12 }
            ]
        ];
    }

    loadPuzzle() {
        this.words = this.puzzleSets[this.currentPuzzleIndex];
        this.placeWords();
        this.renderGrid();
        this.renderClues();
    }

    placeWords() {
        // Clear grid first
        this.grid = Array(this.gridSize).fill().map(() => Array(this.gridSize).fill(null));

        this.words.forEach(wordData => {
            const { word, row, col, direction } = wordData;
            
            for (let i = 0; i < word.length; i++) {
                const r = direction === 'across' ? row : row + i;
                const c = direction === 'across' ? col + i : col;
                
                if (r < this.gridSize && c < this.gridSize) {
                    if (!this.grid[r][c]) {
                        this.grid[r][c] = {
                            letter: word[i],
                            words: []
                        };
                    }
                    this.grid[r][c].words.push(wordData.id);
                    
                    // Add number to starting cell
                    if (i === 0) {
                        this.grid[r][c].number = wordData.number;
                    }
                }
            }
        });
    }

    renderGrid() {
        const gridElement = document.getElementById('crossword-grid');
        const cells = gridElement.children;

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const cellIndex = row * this.gridSize + col;
                const cell = cells[cellIndex];
                const cellData = this.grid[row][col];

                cell.innerHTML = '';
                
                if (cellData) {
                    cell.className = 'cell';
                    
                    // Add number if present
                    if (cellData.number) {
                        const numberDiv = document.createElement('div');
                        numberDiv.className = 'number';
                        numberDiv.textContent = cellData.number;
                        cell.appendChild(numberDiv);
                    }
                    
                    // Add input field
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 1;
                    input.dataset.answer = cellData.letter;
                    cell.appendChild(input);
                } else {
                    cell.className = 'cell blocked';
                }
            }
        }
    }

    renderClues() {
        const acrossClues = document.getElementById('across-clues');
        const downClues = document.getElementById('down-clues');
        
        acrossClues.innerHTML = '';
        downClues.innerHTML = '';

        this.words.forEach(word => {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue';
            clueElement.dataset.wordId = word.id;
            clueElement.innerHTML = `<span class="number">${word.number}.</span>${word.clue}`;
            
            if (word.direction === 'across') {
                acrossClues.appendChild(clueElement);
            } else {
                downClues.appendChild(clueElement);
            }
        });
    }

    attachEventListeners() {
        const grid = document.getElementById('crossword-grid');
        
        // Cell click events
        grid.addEventListener('click', (e) => {
            if (e.target.tagName === 'INPUT') {
                this.selectCell(e.target.parentElement);
            }
        });

        // Input events
        grid.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT') {
                this.handleInput(e);
            }
        });

        // Keyboard navigation
        grid.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') {
                this.handleKeyDown(e);
            }
        });

        // Clue click events
        document.getElementById('across-clues').addEventListener('click', (e) => {
            if (e.target.closest('.clue')) {
                this.selectClue(e.target.closest('.clue'));
            }
        });

        document.getElementById('down-clues').addEventListener('click', (e) => {
            if (e.target.closest('.clue')) {
                this.selectClue(e.target.closest('.clue'));
            }
        });

        // Button events
        document.getElementById('check-answers').addEventListener('click', () => {
            this.checkAnswers();
        });

        document.getElementById('reveal-word').addEventListener('click', () => {
            this.revealSelectedWord();
        });

        document.getElementById('clear-grid').addEventListener('click', () => {
            this.clearGrid();
        });

        document.getElementById('new-game').addEventListener('click', () => {
            this.newGame();
        });
    }

    selectCell(cell) {
        // Remove previous selections
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('selected', 'word-selected');
        });
        document.querySelectorAll('.clue').forEach(c => {
            c.classList.remove('selected');
        });

        this.selectedCell = cell;
        cell.classList.add('selected');

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const cellData = this.grid[row][col];

        if (cellData && cellData.words.length > 0) {
            // Find word based on direction preference
            let wordId = cellData.words[0];
            
            // Check if we have a word in the preferred direction
            cellData.words.forEach(id => {
                const word = this.words.find(w => w.id === id);
                if (word.direction === this.direction) {
                    wordId = id;
                }
            });

            this.selectWordById(wordId);
        }
    }

    selectClue(clueElement) {
        const wordId = parseInt(clueElement.dataset.wordId);
        this.selectWordById(wordId);
        
        // Focus on first cell of the word
        const word = this.words.find(w => w.id === wordId);
        if (word) {
            const firstCellIndex = word.row * this.gridSize + word.col;
            const firstCell = document.getElementById('crossword-grid').children[firstCellIndex];
            const input = firstCell.querySelector('input');
            if (input) {
                input.focus();
            }
        }
    }

    selectWordById(wordId) {
        this.selectedWord = this.words.find(w => w.id === wordId);
        if (!this.selectedWord) return;

        this.direction = this.selectedWord.direction;

        // Highlight word cells
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('word-selected');
        });

        for (let i = 0; i < this.selectedWord.word.length; i++) {
            const row = this.selectedWord.direction === 'across' ? 
                this.selectedWord.row : this.selectedWord.row + i;
            const col = this.selectedWord.direction === 'across' ? 
                this.selectedWord.col + i : this.selectedWord.col;
            
            const cellIndex = row * this.gridSize + col;
            const cell = document.getElementById('crossword-grid').children[cellIndex];
            if (cell) {
                cell.classList.add('word-selected');
            }
        }

        // Highlight clue
        document.querySelectorAll('.clue').forEach(c => {
            c.classList.remove('selected');
        });
        const clueElement = document.querySelector(`[data-word-id="${wordId}"]`);
        if (clueElement) {
            clueElement.classList.add('selected');
        }
    }

    handleInput(e) {
        const input = e.target;
        const value = input.value.toUpperCase();
        
        if (value.match(/[A-Z]/)) {
            input.value = value;
            this.moveToNextCell(input.parentElement);
        } else {
            input.value = '';
        }
    }

    handleKeyDown(e) {
        const cell = e.target.parentElement;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        switch (e.key) {
            case 'Backspace':
                if (!e.target.value) {
                    this.moveToPreviousCell(cell);
                }
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.moveInDirection(row, col, 0, 1);
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.moveInDirection(row, col, 0, -1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveInDirection(row, col, 1, 0);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.moveInDirection(row, col, -1, 0);
                break;
        }
    }

    moveToNextCell(currentCell) {
        if (!this.selectedWord) return;

        const row = parseInt(currentCell.dataset.row);
        const col = parseInt(currentCell.dataset.col);
        
        const nextRow = this.selectedWord.direction === 'across' ? row : row + 1;
        const nextCol = this.selectedWord.direction === 'across' ? col + 1 : col;
        
        this.focusCell(nextRow, nextCol);
    }

    moveToPreviousCell(currentCell) {
        if (!this.selectedWord) return;

        const row = parseInt(currentCell.dataset.row);
        const col = parseInt(currentCell.dataset.col);
        
        const prevRow = this.selectedWord.direction === 'across' ? row : row - 1;
        const prevCol = this.selectedWord.direction === 'across' ? col - 1 : col;
        
        this.focusCell(prevRow, prevCol);
    }

    moveInDirection(row, col, deltaRow, deltaCol) {
        const newRow = row + deltaRow;
        const newCol = col + deltaCol;
        this.focusCell(newRow, newCol);
    }

    focusCell(row, col) {
        if (row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) return;
        if (!this.grid[row][col]) return;

        const cellIndex = row * this.gridSize + col;
        const cell = document.getElementById('crossword-grid').children[cellIndex];
        const input = cell.querySelector('input');
        
        if (input) {
            this.selectCell(cell);
            input.focus();
        }
    }

    checkAnswers() {
        let correct = 0;
        let total = 0;
        let feedback = '';

        document.querySelectorAll('.cell input').forEach(input => {
            const answer = input.dataset.answer;
            const value = input.value.toUpperCase();
            const cell = input.parentElement;
            
            cell.classList.remove('correct', 'incorrect');
            
            if (answer) {
                total++;
                if (value === answer) {
                    correct++;
                    cell.classList.add('correct');
                } else if (value) {
                    cell.classList.add('incorrect');
                }
            }
        });

        const percentage = Math.round((correct / total) * 100);
        
        if (correct === total) {
            feedback = `🎉 Congratulations! Perfect score! You know your nursing! 🩺`;
            this.showFeedback(feedback, 'success');
        } else {
            feedback = `${correct}/${total} correct (${percentage}%). Keep studying! 📚`;
            this.showFeedback(feedback, 'info');
        }

        // Mark completed clues
        this.updateCompletedClues();
    }

    updateCompletedClues() {
        this.words.forEach(word => {
            let isComplete = true;
            
            for (let i = 0; i < word.word.length; i++) {
                const row = word.direction === 'across' ? word.row : word.row + i;
                const col = word.direction === 'across' ? word.col + i : word.col;
                const cellIndex = row * this.gridSize + col;
                const cell = document.getElementById('crossword-grid').children[cellIndex];
                const input = cell.querySelector('input');
                
                if (!input || input.value.toUpperCase() !== word.word[i]) {
                    isComplete = false;
                    break;
                }
            }
            
            const clueElement = document.querySelector(`[data-word-id="${word.id}"]`);
            if (clueElement) {
                if (isComplete) {
                    clueElement.classList.add('completed');
                } else {
                    clueElement.classList.remove('completed');
                }
            }
        });
    }

    revealSelectedWord() {
        if (!this.selectedWord) {
            this.showFeedback('Please select a word first by clicking on a clue or cell.', 'error');
            return;
        }

        for (let i = 0; i < this.selectedWord.word.length; i++) {
            const row = this.selectedWord.direction === 'across' ? 
                this.selectedWord.row : this.selectedWord.row + i;
            const col = this.selectedWord.direction === 'across' ? 
                this.selectedWord.col + i : this.selectedWord.col;
            
            const cellIndex = row * this.gridSize + col;
            const cell = document.getElementById('crossword-grid').children[cellIndex];
            const input = cell.querySelector('input');
            
            if (input) {
                input.value = this.selectedWord.word[i];
                cell.classList.add('correct');
            }
        }

        this.showFeedback(`Revealed: ${this.selectedWord.word} 💡`, 'info');
        this.updateCompletedClues();
    }

    clearGrid() {
        document.querySelectorAll('.cell input').forEach(input => {
            input.value = '';
            input.parentElement.classList.remove('correct', 'incorrect');
        });
        
        document.querySelectorAll('.clue').forEach(clue => {
            clue.classList.remove('completed');
        });

        this.showFeedback('Grid cleared! Ready for a fresh start. 🧹', 'info');
    }

    newGame() {
        // Select a random puzzle set
        this.currentPuzzleIndex = Math.floor(Math.random() * this.puzzleSets.length);
        
        // Clear the current game state
        this.clearGrid();
        this.selectedCell = null;
        this.selectedWord = null;
        
        // Remove all visual selections
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('selected', 'word-selected');
        });
        document.querySelectorAll('.clue').forEach(c => {
            c.classList.remove('selected');
        });
        
        // Load the new puzzle
        this.loadPuzzle();
        
        const puzzleNames = [
            'Irish General Nursing Terms',
            'Irish Medications & Treatments', 
            'Irish Assessment & Monitoring',
            'Irish Procedures & Equipment',
            'Irish Healthcare Conditions'
        ];
        
        this.showFeedback(`New puzzle loaded: ${puzzleNames[this.currentPuzzleIndex]}! 🍀`, 'success');
    }

    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.textContent = message;
        feedback.className = `feedback ${type}`;
        
        setTimeout(() => {
            feedback.textContent = '';
            feedback.className = 'feedback';
        }, 5000);
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CrosswordGame();
});