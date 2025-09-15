# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a sophisticated planetary hex-based strategy game featuring procedurally generated worlds with dynamic biomes, weather systems, and advanced 3D rendering. The game is built with vanilla JavaScript and Three.js, focusing on realistic planetary simulation and strategic gameplay potential.

## File Structure

- `index.html` - Main game application and entry point
- `hexasphere.js` - Hexagonal sphere geometry library for planetary grid generation
- `README.md` - Project documentation
- `CLAUDE.md` - Development guidance

## Running the Application

This is a static web application with no build process or dependencies:

```bash
# Simply open in a web browser
open index.html
```

No npm, build commands, or local server required. The game runs directly from the file system using modern browser APIs.

## Architecture Overview

### Core Technologies
- **Three.js**: 3D graphics rendering and scene management
- **WebGL**: Hardware-accelerated graphics
- **Simplex Noise**: Procedural terrain generation algorithms
- **ES6+ JavaScript**: Modern language features throughout

### Planetary Generation System
The game uses a sophisticated multi-layered approach:

1. **Hexagonal Grid**: Based on geodesic icosahedron subdivision
2. **Noise Generation**: Simplex noise for elevation, temperature, and moisture
3. **Biome Classification**: Complex algorithms determine terrain types
4. **Dynamic Systems**: Weather, lighting, and atmospheric effects

### Key Systems

#### Biome Generation (`index.html`)
- Temperature calculation based on latitude and elevation
- Moisture patterns using multiple noise layers
- Biome classification with realistic distribution
- Ice formation with precise thresholds

#### Lighting System
- Orbiting light source for day/night cycles
- Dynamic shadow casting and material lighting
- Configurable orbit speed and intensity

#### Weather Effects
- Procedural cloud generation and movement
- Snow particle systems in polar regions
- Animated water surfaces with ripple effects

#### Debug Tools
- Real-time biome parameter inspection
- Temperature mapping with realistic ranges
- Elevation and moisture visualization

### Performance Considerations
- Optimized particle systems for weather effects
- Efficient geometry instancing for hex tiles
- Responsive camera controls with smooth interpolation
- Scalable quality settings for different hardware

## Development Guidelines

### Adding New Features
The modular architecture supports expansion into:
- Resource management systems
- Strategic gameplay mechanics
- Multiplayer capabilities
- Advanced AI systems

### Biome System Modification
When modifying biome parameters:
- Temperature ranges: -10°C to 40°C (land), 2°C to 28°C (ocean)
- Ice thresholds are carefully balanced for realistic distribution
- Elevation affects temperature cooling (-6.5°C per 1000m equivalent)

### Visual Effects
- Weather effects use instanced geometry for performance
- Lighting calculations happen in shaders where possible
- Animation systems use requestAnimationFrame for smooth timing

### Strategic Game Elements
The hex-based foundation provides tactical depth through:
- Terrain-based movement and visibility
- Biome-specific resource potential
- Environmental hazards and advantages
- Climate-based strategic considerations

## Browser Compatibility
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- WebGL and ES6+ support required
- Touch-optimized for mobile devices
- Hardware acceleration recommended for optimal performance

## Code Organization
The main application in `index.html` is structured as:
- Setup and initialization functions
- Planetary generation algorithms
- Rendering and animation loops
- UI and interaction handlers
- Debug and analysis tools