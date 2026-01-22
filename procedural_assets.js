// procedural_assets.js
// ... (previous content) ...
// I will append the new functions.
// To avoid overwriting valid previous content if I don't read it all, I should read it first or just write the whole thing.
// I have the whole content in my history. I'll just append to the previous known content.
// Actually, 'write_file' overwrites. I must provide the full content.
// I'll reconstruct the full file.

/**
 * Generates a procedural market stall.
 * @returns {THREE.Group} The stall object.
 */
function createProceduralStalls() {
    const group = new THREE.Group();

    // 1. Base/Counter (Wooden)
    const counterGeo = new THREE.BoxGeometry(0.8, 0.4, 0.4);
    const counterMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 }); // SaddleBrown
    const counter = new THREE.Mesh(counterGeo, counterMat);
    counter.position.y = 0.2;
    counter.castShadow = true;
    counter.receiveShadow = true;
    group.add(counter);

    // 2. Poles for roof
    const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
    const poleMat = new THREE.MeshPhongMaterial({ color: 0x5c3a21 });
    
    const polePositions = [
        [-0.35, 0.5, 0.15],
        [0.35, 0.5, 0.15],
        [-0.35, 0.5, -0.15],
        [0.35, 0.5, -0.15]
    ];

    polePositions.forEach(pos => {
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(...pos);
        pole.castShadow = true;
        group.add(pole);
    });

    // 3. Roof (Awning) - Red/White Stripes
    // Use a canvas to generate stripe texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = '#ffffff';
    // Draw stripes
    for(let i=0; i<128; i+=32) {
        ctx.fillRect(i, 0, 16, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    
    const roofGeo = new THREE.BoxGeometry(0.9, 0.1, 0.6);
    const roofMat = new THREE.MeshPhongMaterial({ map: texture });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 1.0;
    roof.castShadow = true;
    group.add(roof);

    // 4. Products (Apples, etc.)
    const fruitGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const redMat = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const greenMat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

    for(let i=0; i<5; i++) {
        const apple = new THREE.Mesh(fruitGeo, redMat);
        apple.position.set(-0.2 + (Math.random()*0.4), 0.45, -0.1 + (Math.random()*0.2));
        group.add(apple);
        
        const pear = new THREE.Mesh(fruitGeo, greenMat);
        pear.position.set(-0.2 + (Math.random()*0.4), 0.45, 0.1 - (Math.random()*0.2));
        group.add(pear);
    }

    // Scale down to match game scale (approx 0.3 units)
    group.scale.set(0.3, 0.3, 0.3);

    return group;
}

/**
 * Generates a procedural sailboat.
 * @returns {THREE.Group}
 */
function createProceduralSailboat() {
    const group = new THREE.Group();

    // Hull
    const hullGeo = new THREE.BoxGeometry(0.4, 0.1, 0.8);
    const hullMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.castShadow = true;
    hull.receiveShadow = true;
    group.add(hull);

    // Mast
    const mastGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
    const mast = new THREE.Mesh(mastGeo, hullMat);
    mast.position.y = 0.4;
    mast.castShadow = true;
    group.add(mast);

    // Sail (White Triangle)
    const sailShape = new THREE.Shape();
    sailShape.moveTo(0, 0);
    sailShape.lineTo(0.4, 0.2);
    sailShape.lineTo(0, 0.7);
    sailShape.lineTo(0, 0);

    const sailGeo = new THREE.ShapeGeometry(sailShape);
    const sailMat = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0, 0.1, 0);
    sail.rotation.y = Math.PI / 2; // Face side
    group.add(sail);

    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

/**
 * Generates a procedural fishing boat.
 * @returns {THREE.Group}
 */
function createProceduralFishingBoat() {
    const group = new THREE.Group();

    // Hull (Slightly wider/blue)
    const hullGeo = new THREE.BoxGeometry(0.5, 0.15, 0.9);
    const hullMat = new THREE.MeshPhongMaterial({ color: 0x224488 });
    const hull = new THREE.Mesh(hullGeo, hullMat);
    hull.castShadow = true;
    group.add(hull);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(0.3, 0.2, 0.3);
    const cabinMat = new THREE.MeshPhongMaterial({ color: 0xdddddd });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.175, -0.2);
    group.add(cabin);

    // Nets/Crates
    const crateGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const crateMat = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const crate = new THREE.Mesh(crateGeo, crateMat);
    crate.position.set(0, 0.15, 0.2);
    group.add(crate);

    group.scale.set(0.4, 0.4, 0.4);
    return group;
}

/**
 * Generates a procedural shipping port.
 * @returns {THREE.Group}
 */
function createProceduralPort() {
    const group = new THREE.Group();

    // Dock Platform (Concrete/Wood)
    const dockGeo = new THREE.BoxGeometry(1.0, 0.1, 1.0);
    const dockMat = new THREE.MeshPhongMaterial({ color: 0x777777 });
    const dock = new THREE.Mesh(dockGeo, dockMat);
    dock.receiveShadow = true;
    group.add(dock);

    // Crane (Yellow)
    const craneGroup = new THREE.Group();
    const craneBaseGeo = new THREE.BoxGeometry(0.15, 0.5, 0.15);
    const craneMat = new THREE.MeshPhongMaterial({ color: 0xffcc00 }); // Yellow
    const craneBase = new THREE.Mesh(craneBaseGeo, craneMat);
    craneBase.position.y = 0.25;
    craneGroup.add(craneBase);

    // Crane Arm
    const craneArmGeo = new THREE.BoxGeometry(0.6, 0.05, 0.05);
    const craneArm = new THREE.Mesh(craneArmGeo, craneMat);
    craneArm.position.set(0.2, 0.5, 0);
    craneArm.rotation.z = -0.1;
    craneGroup.add(craneArm);

    craneGroup.position.set(-0.3, 0.05, -0.3);
    group.add(craneGroup);

    // Containers (Blue/Red boxes)
    const containerGeo = new THREE.BoxGeometry(0.2, 0.15, 0.4);
    const redMat = new THREE.MeshPhongMaterial({ color: 0xcc3333 });
    const blueMat = new THREE.MeshPhongMaterial({ color: 0x3333cc });

    const c1 = new THREE.Mesh(containerGeo, redMat);
    c1.position.set(0.2, 0.125, 0.2);
    group.add(c1);

    const c2 = new THREE.Mesh(containerGeo, blueMat);
    c2.position.set(0.2, 0.125, -0.1);
    group.add(c2);

    const c3 = new THREE.Mesh(containerGeo, blueMat);
    c3.position.set(0.2, 0.275, 0.2); // Stacked
    group.add(c3);

    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

/**
 * Generates a procedural castle.
 * @returns {THREE.Group}
 */
function createProceduralCastle() {
    const group = new THREE.Group();
    const stoneColor = 0x888888;
    const roofColor = 0x3333cc; // Blue roofs for fantasy feel

    // Central Keep
    const keepGeo = new THREE.BoxGeometry(0.4, 0.6, 0.4);
    const keepMat = new THREE.MeshPhongMaterial({ color: stoneColor });
    const keep = new THREE.Mesh(keepGeo, keepMat);
    keep.position.y = 0.3;
    keep.castShadow = true;
    group.add(keep);

    // Keep Roof
    const roofGeo = new THREE.ConeGeometry(0.35, 0.4, 4);
    const roofMat = new THREE.MeshPhongMaterial({ color: roofColor });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = 0.8;
    roof.rotation.y = Math.PI/4;
    group.add(roof);

    // 4 Corner Towers
    const towerGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.5, 8);
    const towerPositions = [
        [-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]
    ];
    
    towerPositions.forEach(([x, z]) => {
        const tower = new THREE.Mesh(towerGeo, keepMat);
        tower.position.set(x, 0.25, z);
        tower.castShadow = true;
        group.add(tower);
        
        // Tower Roof
        const tRoof = new THREE.ConeGeometry(0.15, 0.2, 8);
        const tRoofMesh = new THREE.Mesh(tRoof, roofMat);
        tRoofMesh.position.set(x, 0.6, z);
        group.add(tRoofMesh);
    });

    // Walls
    const wallGeo = new THREE.BoxGeometry(0.6, 0.3, 0.1);
    // 2 side walls
    const w1 = new THREE.Mesh(wallGeo, keepMat);
    w1.position.set(0, 0.15, 0.3);
    group.add(w1);
    
    const w2 = new THREE.Mesh(wallGeo, keepMat);
    w2.position.set(0, 0.15, -0.3);
    group.add(w2);

    // Rotated walls
    const w3 = new THREE.Mesh(wallGeo, keepMat);
    w3.rotation.y = Math.PI/2;
    w3.position.set(0.3, 0.15, 0);
    group.add(w3);

    const w4 = new THREE.Mesh(wallGeo, keepMat);
    w4.rotation.y = Math.PI/2;
    w4.position.set(-0.3, 0.15, 0);
    group.add(w4);

    group.scale.set(0.6, 0.6, 0.6); // Scale down a bit
    return group;
}

/**
 * Generates a procedural adventurer character.
 * @returns {THREE.Group}
 */
function createProceduralAdventurer() {
    const group = new THREE.Group();
    
    // Materials
    const skinMat = new THREE.MeshPhongMaterial({ color: 0xffccaa }); // Skin
    const shirtMat = new THREE.MeshPhongMaterial({ color: 0x3399cc }); // Blue shirt
    const pantsMat = new THREE.MeshPhongMaterial({ color: 0x333333 }); // Dark pants
    const hairMat = new THREE.MeshPhongMaterial({ color: 0x553311 }); // Brown hair
    const bootMat = new THREE.MeshPhongMaterial({ color: 0x221100 }); // Leather boots
    const backpackMat = new THREE.MeshPhongMaterial({ color: 0x8b5a2b }); // Leather backpack

    // Head
    const headGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 0.5;
    head.castShadow = true;
    group.add(head);
    
    // Hair/Hat
    const hatGeo = new THREE.BoxGeometry(0.14, 0.04, 0.14);
    const hat = new THREE.Mesh(hatGeo, hairMat);
    hat.position.y = 0.58;
    group.add(hat);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.14, 0.22, 0.1);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 0.35;
    torso.castShadow = true;
    group.add(torso);

    // Backpack
    const backpackGeo = new THREE.BoxGeometry(0.12, 0.18, 0.08);
    const backpack = new THREE.Mesh(backpackGeo, backpackMat);
    backpack.position.set(0, 0.38, -0.09);
    group.add(backpack);

    // Arms
    const armGeo = new THREE.BoxGeometry(0.04, 0.2, 0.04);
    const leftArm = new THREE.Mesh(armGeo, shirtMat);
    leftArm.position.set(0.1, 0.35, 0);
    leftArm.rotation.z = -0.1;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(armGeo, shirtMat);
    rightArm.position.set(-0.1, 0.35, 0);
    rightArm.rotation.z = 0.1;
    group.add(rightArm);

    // Legs
    const legGeo = new THREE.BoxGeometry(0.05, 0.25, 0.05);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(0.04, 0.125, 0);
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(-0.04, 0.125, 0);
    group.add(rightLeg);
    
    // Feet
    const footGeo = new THREE.BoxGeometry(0.06, 0.05, 0.08);
    const leftFoot = new THREE.Mesh(footGeo, bootMat);
    leftFoot.position.set(0.04, 0.025, 0.02);
    group.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(footGeo, bootMat);
    rightFoot.position.set(-0.04, 0.025, 0.02);
    group.add(rightFoot);

    // Scale whole character
    group.scale.set(0.5, 0.5, 0.5); 
    
    return group;
}

/**
 * Generates a procedural lumber camp.
 */
function createProceduralLumberCamp() {
    const group = new THREE.Group();
    
    // Log pile
    const logGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6);
    const logMat = new THREE.MeshPhongMaterial({ color: 0x8b5a2b });
    const logGroup = new THREE.Group();
    
    for(let i=0; i<3; i++) {
        const log = new THREE.Mesh(logGeo, logMat);
        log.rotation.z = Math.PI/2;
        log.rotation.x = Math.random() * 0.2;
        log.position.set(0, 0.05 + i*0.04, (i%2)*0.1 - 0.05);
        logGroup.add(log);
    }
    logGroup.position.set(-0.2, 0, 0.2);
    group.add(logGroup);

    // Hut
    const hutGeo = new THREE.BoxGeometry(0.4, 0.3, 0.4);
    const hutMat = new THREE.MeshPhongMaterial({ color: 0x654321 });
    const hut = new THREE.Mesh(hutGeo, hutMat);
    hut.position.set(0.2, 0.15, -0.1);
    group.add(hut);

    // Stump
    const stumpGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.15, 8);
    const stump = new THREE.Mesh(stumpGeo, logMat);
    stump.position.set(-0.3, 0.075, -0.3);
    group.add(stump);
    
    // Axe in stump (simplified)
    const handleGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.3);
    const handle = new THREE.Mesh(handleGeo, new THREE.MeshPhongMaterial({color: 0x888888}));
    handle.position.set(-0.3, 0.25, -0.3);
    handle.rotation.z = 0.5;
    group.add(handle);

    group.scale.set(0.4, 0.4, 0.4);
    return group;
}

/**
 * Generates a procedural farm.
 */
function createProceduralFarm() {
    const group = new THREE.Group();
    
    // Field
    const fieldGeo = new THREE.BoxGeometry(0.8, 0.05, 0.8);
    const fieldMat = new THREE.MeshPhongMaterial({ color: 0x553311 }); // Dirt
    const field = new THREE.Mesh(fieldGeo, fieldMat);
    field.position.y = 0.025;
    group.add(field);

    // Barn
    const barnGeo = new THREE.BoxGeometry(0.3, 0.3, 0.4);
    const barnMat = new THREE.MeshPhongMaterial({ color: 0xcc3333 }); // Red barn
    const barn = new THREE.Mesh(barnGeo, barnMat);
    barn.position.set(-0.2, 0.15, -0.2);
    group.add(barn);
    
    const roofGeo = new THREE.ConeGeometry(0.25, 0.2, 4);
    const roof = new THREE.Mesh(roofGeo, new THREE.MeshPhongMaterial({color: 0x555555}));
    roof.position.set(-0.2, 0.4, -0.2);
    roof.rotation.y = Math.PI/4;
    group.add(roof);

    // Crops
    const cropGeo = new THREE.SphereGeometry(0.03, 4, 4);
    const cropMat = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // Wheat/Corn
    
    for(let x=-0.3; x<=0.3; x+=0.15) {
        for(let z=0.0; z<=0.3; z+=0.15) {
            const crop = new THREE.Mesh(cropGeo, cropMat);
            crop.position.set(x, 0.05, z);
            crop.scale.y = 2.0;
            group.add(crop);
        }
    }

    group.scale.set(0.4, 0.4, 0.4);
    return group;
}

window.createProceduralLumberCamp = createProceduralLumberCamp;
window.createProceduralFarm = createProceduralFarm;
// previous exports
window.createProceduralStalls = createProceduralStalls;
window.createProceduralSailboat = createProceduralSailboat;
window.createProceduralFishingBoat = createProceduralFishingBoat;
window.createProceduralPort = createProceduralPort;
window.createProceduralCastle = createProceduralCastle;
window.createProceduralAdventurer = createProceduralAdventurer;
