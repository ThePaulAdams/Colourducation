// Game state management
let currentGame = null;
let mathScore = 0;
let wordScore = 0;

// Math Colors Game Data
const mathColors = {
    1: { color: '#FF6B6B', name: 'Red' },
    2: { color: '#4ECDC4', name: 'Teal' },
    3: { color: '#45B7D1', name: 'Blue' },
    4: { color: '#96CEB4', name: 'Green' },
    5: { color: '#FFEAA7', name: 'Yellow' },
    6: { color: '#DDA0DD', name: 'Purple' }
};

// SVG-based picture state
let selectedColor = null;
let paintedSections = new Set();

// Word Categories Game Data
const wordCategories = {
    animals: { 
        color: '#FF6B6B', 
        name: 'Animals', 
        words: ['cat', 'dog', 'snake', 'bird', 'fish', 'lion', 'tiger', 'elephant', 'monkey', 'bear', 'rabbit', 'mouse', 'horse', 'cow', 'pig', 'sheep', 'duck', 'chicken', 'frog', 'butterfly']
    },
    vehicles: { 
        color: '#4ECDC4', 
        name: 'Vehicles', 
        words: ['car', 'bike', 'truck', 'bus', 'train', 'plane', 'boat', 'ship', 'motorcycle', 'scooter', 'helicopter', 'rocket', 'taxi', 'van', 'ambulance', 'fire truck', 'police car', 'tractor', 'submarine', 'jet']
    },
    food: { 
        color: '#45B7D1', 
        name: 'Food', 
        words: ['apple', 'banana', 'pizza', 'cake', 'bread', 'milk', 'cheese', 'chicken', 'rice', 'pasta', 'soup', 'salad', 'cookie', 'ice cream', 'sandwich', 'hamburger', 'french fries', 'orange', 'grape', 'strawberry']
    },
    colors: { 
        color: '#96CEB4', 
        name: 'Colors', 
        words: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'black', 'white', 'brown', 'gray', 'silver', 'gold', 'turquoise', 'magenta', 'cyan', 'lime', 'maroon', 'navy', 'olive']
    }
};

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    showMainMenu();
}

function setupEventListeners() {
    // Game mode selection
    document.querySelectorAll('.game-mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const mode = this.dataset.mode;
            startGame(mode);
        });
    });

    // Fullscreen button
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

    // Toggle labels
    const toggleBtn = document.getElementById('toggle-labels');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const labels = document.getElementById('region-labels');
            if (!labels) return;
            const hidden = labels.style.display === 'none';
            labels.style.display = hidden ? '' : 'none';
            toggleBtn.textContent = `Numbers: ${hidden ? 'On' : 'Off'}`;
        });
    }
}

function showMainMenu() {
    hideAllScreens();
    document.getElementById('main-menu').classList.add('active');
    currentGame = null;
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function startGame(mode) {
    hideAllScreens();
    currentGame = mode;
    
    if (mode === 'math-colors') {
        document.getElementById('math-colors-game').classList.add('active');
        initializeMathColorsGame();
        setPaintTitle('Math Colors - Paint by Numbers');
        setLabelContent('math');
    } else if (mode === 'word-categories') {
        document.getElementById('word-categories-game').classList.add('active');
        initializeWordCategoriesGame();
    } else if (mode === 'color-by-number') {
        document.getElementById('math-colors-game').classList.add('active');
        initializeMathColorsGame();
        setPaintTitle('Color by Number');
        setLabelContent('number');
    } else if (mode === 'hex-planet') {
        document.getElementById('hex-planet-game').classList.add('active');
        initializeHexPlanet();
    }
}

function setPaintTitle(text) {
    const el = document.getElementById('paint-title');
    if (el) el.textContent = text;
}

function setLabelContent(mode) {
    // mode: 'math' or 'number'
    const labelTexts = document.querySelectorAll('#region-labels text');
    const regions = document.querySelectorAll('.paint-region');
    if (labelTexts.length !== regions.length) return;
    regions.forEach((region, idx) => {
        const answer = parseInt(region.dataset.answer);
        if (mode === 'number') {
            labelTexts[idx].textContent = String(answer);
        } else {
            // generate a simple addition that equals answer (bounded 1..6)
            const a = Math.max(1, Math.min(answer - 1, 5));
            const b = answer - a;
            labelTexts[idx].textContent = `${a}+${b}`;
        }
    });
}

// Math Colors Game Functions
function initializeMathColorsGame() {
    mathScore = 0;
    selectedColor = null;
    paintedSections.clear();
    updateMathScore();
    wireSvgPicture();
    createMathLegend();
    createColorPicker();
}

function wireSvgPicture() {
    // Attach click handlers to SVG paint regions
    document.querySelectorAll('.paint-region').forEach(region => {
        // Reset any previous fills
        region.style.fill = '#f9f9f9';
        region.classList.remove('painted', 'correct');
        const id = region.id.replace('region-','');
        region.dataset.sectionId = id;
        region.addEventListener('click', handleSvgRegionClick);
    });
    paintedSections.clear();
}

function createMathLegend() {
    const legend = document.getElementById('math-legend');
    legend.innerHTML = '';
    
    Object.entries(mathColors).forEach(([number, colorData]) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="color-box" style="background-color: ${colorData.color}"></div>
            <span class="legend-text">${number} = ${colorData.name}</span>
        `;
        legend.appendChild(legendItem);
    });
}

function createColorPicker() {
    const picker = document.getElementById('color-picker');
    picker.innerHTML = '';
    
    Object.entries(mathColors).forEach(([number, colorData]) => {
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.style.backgroundColor = colorData.color;
        colorOption.dataset.color = number;
        colorOption.title = `${number} = ${colorData.name}`;
        colorOption.addEventListener('click', function() {
            selectColor(parseInt(this.dataset.color));
        });
        picker.appendChild(colorOption);
    });
}

function selectColor(colorNumber) {
    selectedColor = colorNumber;
    
    // Update visual selection
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    document.querySelector(`[data-color="${colorNumber}"]`).classList.add('selected');
    
    // Highlight SVG regions that can be painted with this color
    document.querySelectorAll('.paint-region').forEach(section => {
        const answer = parseInt(section.dataset.answer);
        if (answer === colorNumber && !paintedSections.has(parseInt(section.dataset.sectionId))) {
            section.classList.add('correct');
        } else {
            section.classList.remove('correct');
        }
    });
}

function handleSvgRegionClick(event) {
    if (!selectedColor) {
        alert('Please select a color first!');
        return;
    }
    
    const section = event.target;
    const sectionId = parseInt(section.dataset.sectionId);
    const answer = parseInt(section.dataset.answer);
    
    if (paintedSections.has(sectionId)) {
        // Already painted, remove paint
        section.style.fill = '#f9f9f9';
        section.classList.remove('painted');
        paintedSections.delete(sectionId);
        mathScore = Math.max(0, mathScore - 5);
    } else if (answer === selectedColor) {
        // Correct color, paint the section
        const colorData = mathColors[selectedColor];
        section.style.fill = colorData.color;
        section.classList.add('painted');
        section.classList.remove('correct');
        paintedSections.add(sectionId);
        mathScore += 10;
        
        // Add bounce animation
        // For SVG, mimic bounce by briefly scaling using CSS transform via attribute
        section.style.transformOrigin = 'center';
        section.style.transform = 'scale(1.05)';
        setTimeout(() => { section.style.transform = ''; }, 200);
    } else {
        // Wrong color, show feedback
        section.style.fill = '#ff6b6b';
        setTimeout(() => {
            section.style.fill = '#f9f9f9';
        }, 500);
        mathScore = Math.max(0, mathScore - 2);
    }
    
    updateMathScore();
    
    // Check if all sections are painted
    const totalRegions = document.querySelectorAll('.paint-region').length;
    if (paintedSections.size === totalRegions) {
        setTimeout(() => {
            alert('Congratulations! You completed the car picture! 🎉');
        }, 500);
    }
}

function updateMathScore() {
    document.getElementById('math-score').textContent = mathScore;
}

// Word Categories Game Functions
function initializeWordCategoriesGame() {
    wordScore = 0;
    updateWordScore();
    createWordLegend();
    generateWordProblem();
    createWordGrid();
}

function createWordLegend() {
    const legend = document.getElementById('word-legend');
    legend.innerHTML = '';
    
    Object.entries(wordCategories).forEach(([category, data]) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="color-box" style="background-color: ${data.color}"></div>
            <span class="legend-text">${data.name}</span>
        `;
        legend.appendChild(legendItem);
    });
}

function createWordGrid() {
    const container = document.getElementById('word-container');
    container.innerHTML = '';
    
    // Get all words from all categories
    const allWords = [];
    Object.values(wordCategories).forEach(category => {
        allWords.push(...category.words);
    });
    
    // Shuffle and select 20 words
    const shuffledWords = allWords.sort(() => Math.random() - 0.5).slice(0, 20);
    
    shuffledWords.forEach(word => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.textContent = word;
        wordItem.dataset.word = word;
        wordItem.addEventListener('click', function() {
            handleWordClick(this);
        });
        container.appendChild(wordItem);
    });
}

function generateWordProblem() {
    // Select a random word from any category
    const allWords = [];
    Object.values(wordCategories).forEach(category => {
        allWords.push(...category.words);
    });
    
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    document.getElementById('current-word-text').textContent = randomWord;
    
    // Find the correct category
    let correctCategory = null;
    Object.entries(wordCategories).forEach(([category, data]) => {
        if (data.words.includes(randomWord)) {
            correctCategory = category;
        }
    });
    
    createCategoryOptions(correctCategory);
}

function createCategoryOptions(correctCategory) {
    const optionsContainer = document.getElementById('category-options');
    optionsContainer.innerHTML = '';
    
    const categories = Object.keys(wordCategories);
    const options = [correctCategory];
    
    while (options.length < 4) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        if (!options.includes(randomCategory)) {
            options.push(randomCategory);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    options.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = wordCategories[category].name;
        btn.dataset.category = category;
        btn.addEventListener('click', function() {
            handleCategoryAnswer(this.dataset.category, correctCategory);
        });
        optionsContainer.appendChild(btn);
    });
}

function handleCategoryAnswer(selectedCategory, correctCategory) {
    const buttons = document.querySelectorAll('#category-options .option-btn');
    
    buttons.forEach(btn => {
        if (btn.dataset.category === correctCategory) {
            btn.classList.add('correct');
        } else if (btn.dataset.category === selectedCategory && selectedCategory !== correctCategory) {
            btn.classList.add('wrong');
        }
        btn.disabled = true;
    });
    
    if (selectedCategory === correctCategory) {
        wordScore += 10;
        updateWordScore();
        
        // Color the word in the grid
        const currentWord = document.getElementById('current-word-text').textContent;
        const wordItems = document.querySelectorAll('.word-item');
        wordItems.forEach(item => {
            if (item.dataset.word === currentWord) {
                const colorData = wordCategories[correctCategory];
                item.style.backgroundColor = colorData.color;
                item.style.color = 'white';
                item.classList.add('categorized');
            }
        });
        
        setTimeout(() => {
            generateWordProblem();
        }, 2000);
    } else {
        setTimeout(() => {
            generateWordProblem();
        }, 2000);
    }
}

function handleWordClick(wordElement) {
    const word = wordElement.dataset.word;
    
    // Find which category this word belongs to
    let wordCategory = null;
    Object.entries(wordCategories).forEach(([category, data]) => {
        if (data.words.includes(word)) {
            wordCategory = category;
        }
    });
    
    if (wordCategory) {
        const colorData = wordCategories[wordCategory];
        wordElement.style.backgroundColor = colorData.color;
        wordElement.style.color = 'white';
        wordElement.classList.add('categorized');
        wordElement.style.pointerEvents = 'none';
    }
}

function updateWordScore() {
    document.getElementById('word-score').textContent = wordScore;
}

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Handle fullscreen changes
document.addEventListener('fullscreenchange', function() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (document.fullscreenElement) {
        fullscreenBtn.textContent = '🖥️ Exit Fullscreen';
    } else {
        fullscreenBtn.textContent = '🖥️ Fullscreen';
    }
});

// Handle escape key to exit fullscreen
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
    }
});

// Touch and mobile optimizations
document.addEventListener('touchstart', function(event) {
    // Prevent double-tap zoom on mobile
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

// Prevent context menu on long press
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

// Add some visual feedback for touch devices
document.addEventListener('touchstart', function(event) {
    if (event.target.classList.contains('canvas-cell') || 
        event.target.classList.contains('word-item') ||
        event.target.classList.contains('option-btn') ||
        event.target.classList.contains('palette-item')) {
        event.target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(event) {
    if (event.target.classList.contains('canvas-cell') || 
        event.target.classList.contains('word-item') ||
        event.target.classList.contains('option-btn') ||
        event.target.classList.contains('palette-item')) {
        setTimeout(() => {
            event.target.style.transform = '';
        }, 150);
    }
});

// Hex Planet implementation
let hexCanvas, hexCtx, hexState;

function initializeHexPlanet() {
    hexCanvas = document.getElementById('hex-canvas');
    hexCtx = hexCanvas ? hexCanvas.getContext('2d') : null;
    // Create state BEFORE first resize/render to avoid undefined access
    hexState = createHexPlanetState();
    resizeHexCanvas();
    window.addEventListener('resize', resizeHexCanvas);
    bindHexUI();
    renderHexPlanet();

    // Interactions
    hexCanvas.onmousedown = onHexPointerDown;
    hexCanvas.onmousemove = onHexPointerMove;
    window.onmouseup = onHexPointerUp;
    hexCanvas.ontouchstart = e => pointerFromTouch(e, onHexPointerDown);
    hexCanvas.ontouchmove = e => pointerFromTouch(e, onHexPointerMove);
    window.ontouchend = e => { hexState.dragging = false; };
}

function resizeHexCanvas() {
    if (!hexCanvas || !hexCtx) return;
    const rect = hexCanvas.getBoundingClientRect();
    hexCanvas.width = rect.width * devicePixelRatio;
    hexCanvas.height = rect.height * devicePixelRatio;
    if (hexCtx) hexCtx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    renderHexPlanet();
}

function createHexPlanetState() {
    return {
        radius: 240,
        rotY: 0,
        rotX: 0.3,
        dragging: false,
        lastX: 0,
        lastY: 0,
        hexSize: 28,
        gridRings: 6,
        items: new Map(), // key: axial q,r -> item type
        selectedItem: 'tree'
    };
}

function bindHexUI() {
    document.querySelectorAll('.palette-item').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.item === hexState.selectedItem);
        btn.onclick = () => {
            if (btn.id === 'hex-clear') { hexState.items.clear(); updateHexItemCount(); renderHexPlanet(); return; }
            hexState.selectedItem = btn.dataset.item;
            document.querySelectorAll('.palette-item').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        };
    });
}

function pointerFromTouch(e, handler) {
    if (!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    handler({ clientX: t.clientX, clientY: t.clientY, buttons: 1, preventDefault: () => e.preventDefault() });
}

function onHexPointerDown(e) {
    e.preventDefault();
    hexState.dragging = true;
    hexState.lastX = e.clientX;
    hexState.lastY = e.clientY;
}

function onHexPointerMove(e) {
    if (!hexState.dragging) return;
    const dx = (e.clientX - hexState.lastX) * 0.01;
    const dy = (e.clientY - hexState.lastY) * 0.01;
    hexState.rotY += dx;
    hexState.rotX = Math.max(-1.2, Math.min(1.2, hexState.rotX + dy));
    hexState.lastX = e.clientX;
    hexState.lastY = e.clientY;
    renderHexPlanet();
}

function onHexPointerUp(e) {
    if (!hexState) return;
    if (!hexState.dragging) return;
    hexState.dragging = false;
    // Treat as click if small movement
    const dx = Math.abs(e.clientX - hexState.lastX);
    const dy = Math.abs(e.clientY - hexState.lastY);
    if (dx < 3 && dy < 3) {
        placeItemAtPointer(e.clientX, e.clientY);
    }
}

function screenToCanvas(x, y) {
    const rect = hexCanvas.getBoundingClientRect();
    return { x: (x - rect.left), y: (y - rect.top) };
}

// Build a hex grid projected onto a sphere using simple spherical mapping
function renderHexPlanet() {
    if (!hexCtx || !hexCanvas || !hexState) return;
    const ctx = hexCtx;
    const w = hexCanvas.width / devicePixelRatio;
    const h = hexCanvas.height / devicePixelRatio;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const R = Math.min(cx, cy) - 20;
    const rings = hexState.gridRings;
    const size = (R / (rings + 1));

    // background
    const grd = ctx.createRadialGradient(cx - R*0.2, cy - R*0.2, R*0.2, cx, cy, R*1.1);
    grd.addColorStop(0, '#b3e5fc');
    grd.addColorStop(1, '#81d4fa');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);

    // planet shading
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    const planetGrad = ctx.createRadialGradient(cx - R*0.4, cy - R*0.6, R*0.2, cx, cy, R);
    planetGrad.addColorStop(0, '#e0f7fa');
    planetGrad.addColorStop(1, '#80cbc4');
    ctx.fillStyle = planetGrad;
    ctx.fill();

    // compute visible hex centers by sampling spherical coords
    const hexes = [];
    for (let q = -rings; q <= rings; q++) {
        const r1 = Math.max(-rings, -q - rings);
        const r2 = Math.min(rings, -q + rings);
        for (let r = r1; r <= r2; r++) {
            const axial = { q, r };
            const pt = axialToSphere(axial, rings);
            // rotate around X and Y
            let { x, y, z } = pt;
            // rotX
            let y1 = y*Math.cos(hexState.rotX) - z*Math.sin(hexState.rotX);
            let z1 = y*Math.sin(hexState.rotX) + z*Math.cos(hexState.rotX);
            y = y1; z = z1;
            // rotY
            let x2 = x*Math.cos(hexState.rotY) + z*Math.sin(hexState.rotY);
            let z2 = -x*Math.sin(hexState.rotY) + z*Math.cos(hexState.rotY);
            x = x2; z = z2;
            if (z < 0) continue; // back side
            const sx = cx + x * R;
            const sy = cy + y * R;
            hexes.push({ axial, sx, sy, depth: z });
        }
    }

    // draw hexes sorted by depth for nicer overlap
    hexes.sort((a,b) => a.depth - b.depth);
    for (const hcell of hexes) {
        drawHex(ctx, hcell.sx, hcell.sy, size*0.5, '#a7ffeb');
        const key = axialKey(hcell.axial);
        if (hexState.items.has(key)) {
            drawItem(ctx, hcell.sx, hcell.sy, hexState.items.get(key));
        }
    }
}

function axialToSphere({q,r}, rings) {
    // map axial hex grid into spherical coordinates (rough heuristic)
    const x = (Math.sqrt(3) * (q + r/2)) / (rings + 0.5);
    const y = (3/2 * r) / (rings + 0.5);
    // convert to unit sphere using a squashing map
    const lat = y * 0.9; // -1..1 -> -0.9..0.9
    const lon = x * Math.PI/2;
    const clat = Math.max(-1, Math.min(1, lat));
    const sy = clat;
    const cy = Math.sqrt(1 - sy*sy);
    return { x: cy*Math.sin(lon), y: sy, z: cy*Math.cos(lon) };
}

function drawHex(ctx, x, y, size, fill) {
    ctx.beginPath();
    for (let i=0;i<6;i++) {
        const a = Math.PI/6 + i*Math.PI/3;
        const px = x + size*Math.cos(a);
        const py = y + size*Math.sin(a);
        if (i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = '#00695c';
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.stroke();
}

function drawItem(ctx, x, y, type) {
    ctx.font = '24px system-ui, emoji';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const emoji = type === 'tree' ? '🌳' : type === 'house' ? '🏠' : type === 'car' ? '🚗' : '🚩';
    ctx.fillText(emoji, x, y+1);
}

function axialKey(ax) { return `${ax.q},${ax.r}`; }

function placeItemAtPointer(clientX, clientY) {
    const { x, y } = screenToCanvas(clientX, clientY);
    const hit = pickHex(x, y);
    if (!hit) return;
    const key = axialKey(hit.axial);
    if (hexState.items.get(key) === hexState.selectedItem) {
        hexState.items.delete(key);
    } else {
        hexState.items.set(key, hexState.selectedItem);
    }
    updateHexItemCount();
    renderHexPlanet();
}

function pickHex(px, py) {
    // brute-force: test all projected hex centers and choose nearest center
    const w = hexCanvas.width / devicePixelRatio;
    const h = hexCanvas.height / devicePixelRatio;
    const cx = w / 2, cy = h / 2;
    const R = Math.min(cx, cy) - 20;
    const rings = hexState.gridRings;
    const size = (R / (rings + 1))*0.5;
    let best = null, bestD = 1e9;
    for (let q = -rings; q <= rings; q++) {
        const r1 = Math.max(-rings, -q - rings);
        const r2 = Math.min(rings, -q + rings);
        for (let r = r1; r <= r2; r++) {
            const axial = { q, r };
            let { x, y, z } = axialToSphere(axial, rings);
            // rotate
            let y1 = y*Math.cos(hexState.rotX) - z*Math.sin(hexState.rotX);
            let z1 = y*Math.sin(hexState.rotX) + z*Math.cos(hexState.rotX);
            y = y1; z = z1;
            let x2 = x*Math.cos(hexState.rotY) + z*Math.sin(hexState.rotY);
            let z2 = -x*Math.sin(hexState.rotY) + z*Math.cos(hexState.rotY);
            x = x2; z = z2;
            if (z < 0) continue;
            const sx = cx + x * R;
            const sy = cy + y * R;
            const d = Math.hypot(px - sx, py - sy);
            if (d < bestD && d < size*1.1) { bestD = d; best = { axial, sx, sy }; }
        }
    }
    return best;
}

function updateHexItemCount() {
    const el = document.getElementById('hex-item-count');
    if (el) el.textContent = String(hexState.items.size);
}
