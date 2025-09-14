// hexasphere.js - A library for generating hexagonal spheres
import * as THREE from 'three';

export class Hexasphere {
    constructor(radius = 30, subdivisions = 15, tileWidth = 0.98) {
        this.radius = radius;
        this.subdivisions = subdivisions;
        this.tileWidth = tileWidth;
        this.tiles = [];
        this.generate();
    }

    generate() {
        // Create an icosahedron as the base
        const icosahedron = new THREE.IcosahedronGeometry(1, this.subdivisions);
        const positions = icosahedron.attributes.position.array;
        const indices = icosahedron.index ? icosahedron.index.array : null;

        // Create vertices from positions
        const vertices = [];
        for (let i = 0; i < positions.length; i += 3) {
            vertices.push(new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).normalize());
        }

        // Group vertices into faces and create tiles
        const faces = [];
        if (indices) {
            for (let i = 0; i < indices.length; i += 3) {
                faces.push([indices[i], indices[i + 1], indices[i + 2]]);
            }
        } else {
            for (let i = 0; i < vertices.length; i += 3) {
                faces.push([i, i + 1, i + 2]);
            }
        }

        // Create tiles from faces
        this.tiles = [];
        const processedVertices = new Set();
        const vertexToTiles = new Map();

        // First pass: create tiles for each face
        faces.forEach((face, faceIndex) => {
            const [a, b, c] = face;
            const vertA = vertices[a];
            const vertB = vertices[b];
            const vertC = vertices[c];

            // Calculate center
            const center = new THREE.Vector3()
                .addVectors(vertA, vertB)
                .add(vertC)
                .divideScalar(3)
                .normalize();

            // Create boundary (triangle for now, we'll convert to hex-like later)
            const boundary = [
                vertA.clone(),
                vertB.clone(),
                vertC.clone()
            ];

            const tile = {
                id: faceIndex,
                centerPoint: center,
                boundary: boundary,
                isPentagon: false, // We'll mark some as pentagons later
                neighbors: []
            };

            this.tiles.push(tile);

            // Track vertex-to-tile relationships
            [a, b, c].forEach(vertexIndex => {
                if (!vertexToTiles.has(vertexIndex)) {
                    vertexToTiles.set(vertexIndex, []);
                }
                vertexToTiles.get(vertexIndex).push(faceIndex);
            });
        });

        // Second pass: identify pentagons (vertices with 5 neighboring faces)
        const pentagonCenters = [];
        vertexToTiles.forEach((tileIndices, vertexIndex) => {
            if (tileIndices.length === 5) {
                pentagonCenters.push(vertices[vertexIndex]);
            }
        });

        // Mark tiles near pentagon vertices as pentagons
        this.tiles.forEach(tile => {
            pentagonCenters.forEach(pentCenter => {
                if (tile.centerPoint.distanceTo(pentCenter) < 0.3) {
                    tile.isPentagon = true;
                }
            });
        });

        // Third pass: create more hex-like boundaries
        this.tiles.forEach(tile => {
            if (tile.isPentagon) {
                // Create pentagon boundary
                tile.boundary = this.createPentagonBoundary(tile.centerPoint);
            } else {
                // Create hexagon boundary
                tile.boundary = this.createHexagonBoundary(tile.centerPoint);
            }
        });

        // Clean up geometry
        icosahedron.dispose();
    }

    createHexagonBoundary(center) {
        const boundary = [];
        const radius = 0.15; // Size of each hex tile
        
        // Create a local coordinate system
        const up = center.clone().normalize();
        const right = new THREE.Vector3(1, 0, 0).cross(up).normalize();
        if (right.length() < 0.1) {
            right.set(0, 1, 0).cross(up).normalize();
        }
        const forward = up.clone().cross(right).normalize();

        // Create 6 points around the center
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const point = center.clone()
                .add(right.clone().multiplyScalar(x))
                .add(forward.clone().multiplyScalar(y))
                .normalize();
            
            boundary.push(point);
        }
        
        return boundary;
    }

    createPentagonBoundary(center) {
        const boundary = [];
        const radius = 0.15;
        
        const up = center.clone().normalize();
        const right = new THREE.Vector3(1, 0, 0).cross(up).normalize();
        if (right.length() < 0.1) {
            right.set(0, 1, 0).cross(up).normalize();
        }
        const forward = up.clone().cross(right).normalize();

        // Create 5 points around the center
        for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            const point = center.clone()
                .add(right.clone().multiplyScalar(x))
                .add(forward.clone().multiplyScalar(y))
                .normalize();
            
            boundary.push(point);
        }
        
        return boundary;
    }
}
