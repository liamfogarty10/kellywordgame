class CrosswordGame {
    constructor() {
        this.grid = null;
        this.words = [];
        this.selectedCell = null;
        this.selectedWord = null;
        this.direction = 'across';
        this.gridSize = 15;
        
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

    loadPuzzle() {
        // Irish nursing-focused crossword data
        this.words = [
            {
                id: 1,
                word: 'NBM',
                row: 2,
                col: 3,
                direction: 'across',
                clue: 'Abbreviation for Nil by Mouth',
                number: 1
            },
            {
                id: 2,
                word: 'HEPARIN',
                row: 4,
                col: 1,
                direction: 'across',
                clue: 'Common anticoagulant medication',
                number: 3
            },
            {
                id: 3,
                word: 'CONSCIOUSNESS',
                row: 1,
                col: 4,
                direction: 'down',
                clue: 'Glasgow Coma Scale assesses this',
                number: 2
            },
            {
                id: 4,
                word: 'SOAP',
                row: 6,
                col: 6,
                direction: 'down',
                clue: 'Hand hygiene acronym (Simple-Ordinary-Antimicrobial-Protective)',
                number: 4
            },
            {
                id: 5,
                word: 'TPR',
                row: 7,
                col: 2,
                direction: 'across',
                clue: 'Temperature, Pulse, Respiration abbreviation',
                number: 5
            },
            {
                id: 6,
                word: 'MRSA',
                row: 9,
                col: 4,
                direction: 'across',
                clue: 'Methicillin-resistant Staphylococcus aureus',
                number: 6
            },
            {
                id: 7,
                word: 'INSULIN',
                row: 3,
                col: 8,
                direction: 'down',
                clue: 'Hormone for blood sugar control',
                number: 7
            },
            {
                id: 8,
                word: 'WARD',
                row: 11,
                col: 5,
                direction: 'across',
                clue: 'Hospital unit where patients stay',
                number: 8
            },
            {
                id: 9,
                word: 'CPAP',
                row: 5,
                col: 11,
                direction: 'down',
                clue: 'Continuous Positive Airway Pressure',
                number: 9
            },
            {
                id: 10,
                word: 'PAIN',
                row: 12,
                col: 1,
                direction: 'across',
                clue: 'Fifth vital sign in nursing assessment',
                number: 10
            },
            {
                id: 11,
                word: 'IVIG',
                row: 0,
                col: 9,
                direction: 'down',
                clue: 'Intravenous immunoglobulin treatment',
                number: 11
            },
            {
                id: 12,
                word: 'DRAIN',
                row: 6,
                col: 0,
                direction: 'down',
                clue: 'Tube to remove fluid from surgical site',
                number: 12
            }
        ];

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
        this.clearGrid();
        this.selectedCell = null;
        this.selectedWord = null;
        document.querySelectorAll('.cell').forEach(c => {
            c.classList.remove('selected', 'word-selected');
        });
        document.querySelectorAll('.clue').forEach(c => {
            c.classList.remove('selected');
        });
        this.showFeedback('New game started! Good luck with your nursing knowledge! 🍀', 'success');
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