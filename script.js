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
            // Puzzle Set 1: General Nursing Terms
            [
                { id: 1, word: 'NBM', row: 2, col: 3, direction: 'across', clue: 'Abbreviation for Nil by Mouth', number: 1 },
                { id: 2, word: 'HEPARIN', row: 4, col: 1, direction: 'across', clue: 'Common anticoagulant medication', number: 3 },
                { id: 3, word: 'CONSCIOUSNESS', row: 1, col: 4, direction: 'down', clue: 'Glasgow Coma Scale assesses this', number: 2 },
                { id: 4, word: 'SOAP', row: 6, col: 6, direction: 'down', clue: 'Hand hygiene acronym', number: 4 },
                { id: 5, word: 'TPR', row: 7, col: 2, direction: 'across', clue: 'Temperature, Pulse, Respiration abbreviation', number: 5 },
                { id: 6, word: 'MRSA', row: 9, col: 4, direction: 'across', clue: 'Methicillin-resistant Staphylococcus aureus', number: 6 },
                { id: 7, word: 'INSULIN', row: 3, col: 8, direction: 'down', clue: 'Hormone for blood sugar control', number: 7 },
                { id: 8, word: 'WARD', row: 11, col: 5, direction: 'across', clue: 'Hospital unit where patients stay', number: 8 },
                { id: 9, word: 'CPAP', row: 5, col: 11, direction: 'down', clue: 'Continuous Positive Airway Pressure', number: 9 },
                { id: 10, word: 'PAIN', row: 12, col: 1, direction: 'across', clue: 'Fifth vital sign in nursing assessment', number: 10 },
                { id: 11, word: 'IVIG', row: 0, col: 9, direction: 'down', clue: 'Intravenous immunoglobulin treatment', number: 11 },
                { id: 12, word: 'DRAIN', row: 6, col: 0, direction: 'down', clue: 'Tube to remove fluid from surgical site', number: 12 }
            ],
            
            // Puzzle Set 2: Medications & Treatments
            [
                { id: 1, word: 'WARFARIN', row: 2, col: 2, direction: 'across', clue: 'Oral anticoagulant medication', number: 1 },
                { id: 2, word: 'MORPHINE', row: 5, col: 1, direction: 'across', clue: 'Strong opioid pain reliever', number: 3 },
                { id: 3, word: 'OXYGEN', row: 1, col: 4, direction: 'down', clue: 'Essential gas for patient breathing support', number: 2 },
                { id: 4, word: 'DIGOXIN', row: 8, col: 3, direction: 'across', clue: 'Heart medication for atrial fibrillation', number: 5 },
                { id: 5, word: 'SALINE', row: 3, col: 7, direction: 'down', clue: 'Normal sodium chloride solution 0.9%', number: 4 },
                { id: 6, word: 'LASIX', row: 10, col: 1, direction: 'across', clue: 'Furosemide diuretic medication', number: 6 },
                { id: 7, word: 'ASPIRIN', row: 0, col: 9, direction: 'down', clue: 'Antiplatelet medication 75mg daily', number: 7 },
                { id: 8, word: 'STATIN', row: 12, col: 5, direction: 'across', clue: 'Cholesterol-lowering medication class', number: 8 },
                { id: 9, word: 'CODEINE', row: 6, col: 11, direction: 'down', clue: 'Mild opioid for moderate pain', number: 9 },
                { id: 10, word: 'STEROID', row: 7, col: 8, direction: 'down', clue: 'Anti-inflammatory medication type', number: 10 },
                { id: 11, word: 'BETA', row: 4, col: 12, direction: 'down', clue: 'Type of blocker for heart conditions', number: 11 },
                { id: 12, word: 'GTN', row: 11, col: 10, direction: 'across', clue: 'Glyceryl trinitrate for chest pain', number: 12 }
            ],
            
            // Puzzle Set 3: Assessment & Monitoring
            [
                { id: 1, word: 'SATS', row: 2, col: 3, direction: 'across', clue: 'Oxygen saturation measurement', number: 1 },
                { id: 2, word: 'AVPU', row: 4, col: 1, direction: 'across', clue: 'Alert Voice Pain Unresponsive scale', number: 3 },
                { id: 3, word: 'GLASGOW', row: 1, col: 4, direction: 'down', clue: 'Coma scale used in head injuries', number: 2 },
                { id: 4, word: 'PEWS', row: 6, col: 6, direction: 'down', clue: 'Paediatric Early Warning Score', number: 4 },
                { id: 5, word: 'NEWS', row: 7, col: 2, direction: 'across', clue: 'National Early Warning Score', number: 5 },
                { id: 6, word: 'TEMP', row: 9, col: 4, direction: 'across', clue: 'Body temperature measurement', number: 6 },
                { id: 7, word: 'PULSE', row: 3, col: 8, direction: 'down', clue: 'Heart rate measurement per minute', number: 7 },
                { id: 8, word: 'BP', row: 11, col: 5, direction: 'across', clue: 'Blood pressure abbreviation', number: 8 },
                { id: 9, word: 'RR', row: 5, col: 11, direction: 'down', clue: 'Respiratory rate abbreviation', number: 9 },
                { id: 10, word: 'BMI', row: 12, col: 1, direction: 'across', clue: 'Body Mass Index calculation', number: 10 },
                { id: 11, word: 'URINE', row: 0, col: 9, direction: 'down', clue: 'Output measured in catheter bags', number: 11 },
                { id: 12, word: 'CAPILLARY', row: 6, col: 0, direction: 'down', clue: 'Refill time test for circulation', number: 12 }
            ],
            
            // Puzzle Set 4: Procedures & Equipment
            [
                { id: 1, word: 'CANNULA', row: 2, col: 2, direction: 'across', clue: 'Intravenous access device', number: 1 },
                { id: 2, word: 'CATHETER', row: 5, col: 1, direction: 'across', clue: 'Urinary drainage tube', number: 3 },
                { id: 3, word: 'SYRINGE', row: 1, col: 4, direction: 'down', clue: 'Device for injecting medications', number: 2 },
                { id: 4, word: 'NEBULISER', row: 8, col: 3, direction: 'across', clue: 'Device for inhaled medications', number: 5 },
                { id: 5, word: 'STOMA', row: 3, col: 7, direction: 'down', clue: 'Surgically created opening', number: 4 },
                { id: 6, word: 'TRACH', row: 10, col: 1, direction: 'across', clue: 'Tracheostomy tube abbreviation', number: 6 },
                { id: 7, word: 'NASOGASTRIC', row: 0, col: 9, direction: 'down', clue: 'NG tube goes through nose to stomach', number: 7 },
                { id: 8, word: 'DRESSING', row: 12, col: 5, direction: 'across', clue: 'Wound covering material', number: 8 },
                { id: 9, word: 'SUTURE', row: 6, col: 11, direction: 'down', clue: 'Surgical stitches for wound closure', number: 9 },
                { id: 10, word: 'MONITOR', row: 7, col: 8, direction: 'down', clue: 'Equipment for continuous observation', number: 10 },
                { id: 11, word: 'PUMP', row: 4, col: 12, direction: 'down', clue: 'Infusion device for IV fluids', number: 11 },
                { id: 12, word: 'ECG', row: 11, col: 10, direction: 'across', clue: 'Electrocardiogram heart trace', number: 12 }
            ],
            
            // Puzzle Set 5: Conditions & Emergencies
            [
                { id: 1, word: 'STROKE', row: 2, col: 3, direction: 'across', clue: 'Cerebrovascular accident', number: 1 },
                { id: 2, word: 'SEPSIS', row: 4, col: 1, direction: 'across', clue: 'Life-threatening infection response', number: 3 },
                { id: 3, word: 'PNEUMONIA', row: 1, col: 4, direction: 'down', clue: 'Lung infection requiring antibiotics', number: 2 },
                { id: 4, word: 'COPD', row: 6, col: 6, direction: 'down', clue: 'Chronic Obstructive Pulmonary Disease', number: 4 },
                { id: 5, word: 'DVT', row: 7, col: 2, direction: 'across', clue: 'Deep Vein Thrombosis blood clot', number: 5 },
                { id: 6, word: 'UTI', row: 9, col: 4, direction: 'across', clue: 'Urinary Tract Infection', number: 6 },
                { id: 7, word: 'DIABETES', row: 3, col: 8, direction: 'down', clue: 'Blood sugar management condition', number: 7 },
                { id: 8, word: 'FALLS', row: 11, col: 5, direction: 'across', clue: 'Risk assessment for patient safety', number: 8 },
                { id: 9, word: 'PRESSURE', row: 5, col: 11, direction: 'down', clue: 'Sore prevention with repositioning', number: 9 },
                { id: 10, word: 'EMBOLISM', row: 12, col: 1, direction: 'across', clue: 'Pulmonary blockage emergency', number: 10 },
                { id: 11, word: 'ANGINA', row: 0, col: 9, direction: 'down', clue: 'Chest pain from heart muscle ischemia', number: 11 },
                { id: 12, word: 'DEMENTIA', row: 6, col: 0, direction: 'down', clue: 'Progressive cognitive impairment', number: 12 }
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
            'General Nursing Terms',
            'Medications & Treatments', 
            'Assessment & Monitoring',
            'Procedures & Equipment',
            'Conditions & Emergencies'
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