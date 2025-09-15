# Colourducation - Color Learning Game

A fun and educational Single Page Application (SPA) that teaches colors through interactive games. Perfect for children and adults who want to learn colors in an engaging way.

## 🎮 Game Features

### Math Colors - Paint by Numbers (SVG)
- **Concept**: Learn colors through simple math problems
- **How it works**: 
  - Each number represents a color (1–6 used in the SVG template)
  - The picture is a clean, scalable **SVG** (vector) artwork
  - Regions in the SVG contain math problems; select a color and paint the matching regions
  - Example: if 4 = Green, then 2+2, 1+3, 3+1 regions should be painted Green

### Word Categories
- **Concept**: Learn colors by categorizing words
- **How it works**:
  - Words are grouped into categories (Animals, Vehicles, Food, Colors)
  - Each category has its own color
  - Click on words to color them, or answer questions to categorize them
  - Examples: cat, dog, snake (Animals = Red), car, bike (Vehicles = Teal)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser for the main color learning games
3. Open `planet.html` in your web browser for the 3D planet visualization
4. Enjoy the games!

### Running the Game
Simply open `index.html` in any modern web browser for the main color learning games, or `planet.html` for the 3D planet visualization. Both will work immediately without any build process or server setup.

## 📱 Cross-Platform Compatibility

The game is designed to work seamlessly across:
- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: iPad, Android tablets
- **Browsers**: Chrome, Firefox, Safari, Edge

## 🎯 Game Modes

### 1. Math Colors
- SVG paint-by-numbers car picture with labeled regions
- Simple addition problems on each region
- Color legend showing number-to-color mappings
- Score tracking system and completion check
- Visual feedback and highlighting for correct color choices

### 1b. Color by Number (New Mode)
- Classic numbered coloring page using the same SVG
- Numbers can be toggled On/Off
- Uses the same palette and fill logic as Math Colors

### 2. Word Categories
- ### 3. Hex Planet (New)
  - Full-screen canvas rendering of a cute 3D-like planet
  - Rotatable globe with a projected hex grid
  - Place items (🌳 🏠 🚗 🚩) on individual hexes
  - Item counter, palette selection, and clear button

### 4. 3D Planet Visualization (Advanced)
  - Interactive 3D planet with procedurally generated biomes
  - Realistic terrain generation with continents, oceans, mountains, and ice caps
  - Dynamic weather effects including clouds, water ripples, and snow particles
  - **Orbiting Light Source**: Dynamic lighting that creates realistic day/night cycles and changing shadows
  - Customizable parameters for terrain generation, biome distribution, and atmospheric effects
  - Built with Three.js for smooth 3D rendering and interaction
  - **Debug Mode**: Toggle to see biome calculation values (temperature, elevation, moisture, etc.) when hovering over tiles

- 20 randomly selected words from 4 categories
- Interactive word grid
- Category-based color coding
- Multiple choice questions
- Score tracking system

## 🎨 Color Scheme

The game uses a vibrant, accessible color palette:
- **Red** (#FF6B6B): Animals
- **Teal** (#4ECDC4): Vehicles  
- **Blue** (#45B7D1): Food
- **Green** (#96CEB4): Colors
- **Yellow** (#FFEAA7): Math number 5
- **Purple** (#DDA0DD): Math number 6
- **Orange** (#FFB347): Math number 7
- **Pink** (#F8BBD9): Math number 8

## 🖥️ Fullscreen Mode

The game includes a fullscreen mode for an immersive experience:
- Click the "Fullscreen" button in the main menu
- Press Escape to exit fullscreen
- Optimized for both desktop and mobile fullscreen experiences

## 📱 Responsive Design

The game automatically adapts to different screen sizes:
- **Desktop** (>1024px): Full grid layout with side panels
- **Tablet** (768px-1024px): Stacked layout with optimized spacing
- **Mobile** (<768px): Single column layout with touch-optimized controls

## 🎮 Controls

### Desktop
- **Mouse**: Click to interact with buttons, cells, and options
- **Keyboard**: Escape key to exit fullscreen

### Mobile/Tablet
- **Touch**: Tap to interact with all game elements
- **Swipe**: Scroll through content areas
- **Pinch**: Zoom is disabled for consistent gameplay

## 🏆 Scoring System

- **Math Colors**: +10 points for each correct math answer
- **Word Categories**: +10 points for each correct category selection
- Scores are tracked separately for each game mode

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **SVG**: Vector-based paintable templates (crisp on all screens)
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Three.js**: 3D graphics library for planet visualization
- **Simplex Noise**: Procedural terrain generation
- **Responsive Design**: Mobile-first approach with media queries

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lightweight: No external dependencies
- Fast loading: Optimized assets and code
- Smooth animations: CSS transitions and transforms
- Touch optimized: Responsive touch interactions

### SVG Templates
- The car picture is an inline **SVG** with separate regions (`.paint-region`) labeled by math problems (`<text>`). You can replace or add templates by editing the SVG in `index.html` and ensuring regions have a `data-answer` attribute and unique `id` (`region-1`, `region-2`, ...).

## 🎓 Educational Value

This game helps learners:
- **Color Recognition**: Learn to identify and name colors
- **Math Skills**: Practice basic arithmetic operations
- **Categorization**: Develop logical thinking and classification skills
- **Vocabulary**: Expand word knowledge across different categories
- **Hand-Eye Coordination**: Improve motor skills through interactive gameplay

## 📝 Recent Updates

### Version 1.1 - Planet Visualization Improvements
- **Dramatically Reduced Ice Coverage**: Made temperature thresholds extremely restrictive to match desert tile rarity
  - High elevation ice threshold: 0.1 → 0.02 (80% more restrictive)
  - Cold region ice threshold: 0.12 → 0.03 (75% more restrictive)
  - Ice transition threshold: 0.7 → 0.9 (29% more restrictive)
- **Optimized Snow Effects**: Reduced snow particle density for better performance
  - Snow particle multiplier: 50x → 15x (70% reduction in particle count)
- **Enhanced Biome Balance**: Ice tiles now appear with similar rarity to desert tiles for more realistic planet generation
- **Debug Mode Added**: New toggle button to inspect biome calculation values
  - Hover over tiles to see temperature, elevation, moisture, latitude, and biome type
  - Temperature displayed in realistic Celsius range (-10°C to 40°C)
  - Ocean temperatures: 2°C to 28°C (more stable than land)
  - Land temperatures: -10°C to 40°C (full range for biome determination)
  - Helps understand how different parameters affect biome generation
  - Toggle on/off with the "Debug" button in the UI
- **Dynamic Lighting System**: Added orbiting light source for realistic day/night cycles
  - Light orbits around the planet creating changing shadows and lighting
  - Adjustable orbit speed via "Light Orbit Speed" slider (0-3x speed)
  - Creates realistic day/night transitions and dynamic shadow movement
  - Enhances the 3D visual experience with dynamic lighting effects

## 🚀 Future Enhancements

Potential features for future versions:
- Additional game modes (shapes, patterns, etc.)
- Difficulty levels (easy, medium, hard)
- Sound effects and background music
- Progress tracking and achievements
- Multiplayer support
- Custom color palettes
- Accessibility improvements (screen reader support)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Enjoy learning colors with Colourducation!** 🎨✨
