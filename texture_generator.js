// texture_generator.js

class TextureGenerator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    // Generate a seamless noise texture
    generateNoiseTexture(width, height, scale = 1.0) {
        this.canvas.width = width;
        this.canvas.height = height;
        
        const imgData = this.ctx.createImageData(width, height);
        const data = imgData.data;
        
        // Simple noise function (replace with improved Simplex if available globally)
        // Here we use a simple value noise for speed in generation
        for (let i = 0; i < data.length; i += 4) {
            const val = Math.floor(Math.random() * 255);
            data[i] = val;     // R
            data[i+1] = val;   // G
            data[i+2] = val;   // B
            data[i+3] = 255;   // A
        }
        
        this.ctx.putImageData(imgData, 0, 0);
        
        // Create texture
        const texture = new THREE.CanvasTexture(this.canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.LinearFilter;
        texture.minFilter = THREE.LinearMipMapLinearFilter; // Better quality
        
        return texture;
    }

    // Generate a high-quality normal map from noise
    generateNormalMap(width, height) {
        // ... (implementation if needed later)
    }
}

window.textureGen = new TextureGenerator();
