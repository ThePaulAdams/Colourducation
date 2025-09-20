# Planetary Hex Game

A sophisticated planetary hex-based game featuring procedurally generated worlds with dynamic biomes, weather systems, and strategic gameplay elements.

## 🪐 Game Overview

Experience an immersive planetary strategy game built on a hexagonal grid system. Each planet is procedurally generated with realistic biomes, dynamic lighting, and atmospheric effects that create a living, breathing world of undisclosed strategic potential.

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Begin exploring procedurally generated worlds

### Running the Game

#### Local Development
For best results (model loading), run via a local server to avoid CORS issues:

**Option 1: Using the included Node.js server**
```bash
npm install
npm start
```
Then open `http://localhost:3000`

**Option 2: Using npx http-server**
```bash
npx http-server . -p 8000
```
Then open `http://localhost:8000/index.html`

#### Railway Deployment
This application is configured for Railway deployment with:
- `package.json` - Defines Node.js dependencies and start script
- `server.js` - Express server for serving static files
- Automatic port detection via `process.env.PORT`

Deploy to Railway:
1. Connect your repository to Railway
2. Railway will automatically detect the Node.js app and run `npm start`
3. Your game will be available at your Railway app URL

## 🎮 Core Features

### Procedural Planet Generation
- **Realistic Terrain**: Advanced algorithms generate continents, oceans, and mountains
- **Dynamic Biomes**: Temperature, elevation, and moisture create diverse ecosystems
- **Balanced Distribution**: Carefully tuned parameters ensure realistic biome variety

### Advanced Lighting System
- **Orbiting Light Source**: Dynamic day/night cycles with realistic shadow movement
- **Atmospheric Effects**: Enhanced visual depth with dynamic lighting transitions
- **Configurable Speed**: Adjustable light orbit speed for different gameplay paces

### Weather & Environmental Effects
- **Dynamic Clouds**: Procedurally generated cloud formations
- **Snow Particles**: Atmospheric snow effects across the planet
- **Water Ripples**: Animated ocean surfaces for enhanced realism
- **Store & Placement (Mock)**: Simple UI to place a stalls structure on tiles

### Debug & Analysis Tools
- **Biome Inspector**: Hover over tiles to examine biome calculation parameters
- **Temperature Mapping**: Realistic temperature ranges (-10°C to 40°C on land, 2°C to 28°C in oceans)
- **Parameter Visualization**: View elevation, moisture, latitude, and biome classifications

## 🛠️ Technical Architecture

### Technologies Used
- **Three.js**: Advanced 3D graphics rendering
- **Simplex Noise**: Sophisticated procedural generation algorithms
- **Vanilla JavaScript**: High-performance ES6+ implementation
- **WebGL**: Hardware-accelerated graphics for smooth performance

### Biome Generation System
The game features a sophisticated biome calculation system:
- **Temperature Gradients**: Latitude-based with elevation cooling effects
- **Moisture Patterns**: Complex precipitation modeling
- **Elevation Mapping**: Realistic topographical generation
- **Mountain Formation**: Precise high-altitude terrain distribution

### Performance Optimizations
- **Efficient Rendering**: Optimized particle systems and geometry
- **Responsive Controls**: Smooth camera movement and interaction
- **Scalable Effects**: Adjustable quality settings for different hardware

## 🌍 Planetary Systems

### Biome Types
- **Oceans**: Dynamic water surfaces with temperature variation
- **Forests**: Temperate and tropical vegetation zones
- **Deserts**: Arid regions with realistic distribution patterns
- **Grasslands**: Balanced ecosystem transition zones
- **Mountains**: Elevated terrain with altitude-based effects

### Environmental Parameters
- **Temperature Scaling**: Realistic climate modeling
- **Moisture Distribution**: Advanced precipitation patterns
- **Elevation Mapping**: Multi-layered topographical generation
- **Seasonal Variation**: Dynamic environmental changes

## 🎯 Strategic Elements

The hex-based grid system provides the foundation for deep strategic gameplay mechanics, with each tile offering unique tactical opportunities based on its biome, elevation, and environmental characteristics.

## 📱 Cross-Platform Compatibility

- **Desktop**: Windows, macOS, Linux
- **Mobile**: iOS Safari, Android Chrome (touch-optimized)
- **Tablet**: iPad, Android tablets
- **Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## 🔧 Development

### File Structure
- `index.html` - Main game application
- `hexasphere.js` - Hexagonal sphere geometry library
- `server.js` - Express server for production deployment
- `package.json` - Node.js dependencies and scripts
- `Models/` - Place GLB models here (e.g., `stalls.glb`)
- `README.md` - Project documentation
- `CLAUDE.md` - Development guidance

### Browser Support
Modern ES6+ features are used throughout:
- Modules and dynamic imports
- Advanced Canvas and WebGL APIs
- High-precision timing for smooth animations

## 🚀 Future Development

The modular architecture supports expansion into various strategic gameplay mechanics, resource management systems, and multiplayer capabilities while maintaining the core planetary simulation foundation.

## 📄 License

This project is open source and available under the MIT License.

---

**Explore infinite worlds with procedural planetary generation.** 🪐✨