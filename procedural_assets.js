// procedural_assets.js

// ... (keep existing functions for stalls, boats, etc.)

function createProceduralStalls() {
    const group = new THREE.Group();
    const counterGeo = new THREE.BoxGeometry(0.8, 0.4, 0.4);
    const counterMat = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const counter = new THREE.Mesh(counterGeo, counterMat);
    counter.position.y = 0.2;
    counter.castShadow = true;
    counter.receiveShadow = true;
    group.add(counter);

    const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
    const poleMat = new THREE.MeshPhongMaterial({ color: 0x5c3a21 });
    [[-0.35, 0.5, 0.15], [0.35, 0.5, 0.15], [-0.35, 0.5, -0.15], [0.35, 0.5, -0.15]].forEach(pos => {
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(...pos);
        group.add(pole);
    });

    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ff0000'; ctx.fillRect(0,0,128,128);
    ctx.fillStyle = '#ffffff';
    for(let i=0; i<128; i+=32) ctx.fillRect(i,0,16,128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    
    const roof = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.6), new THREE.MeshPhongMaterial({ map: texture }));
    roof.position.y = 1.0;
    group.add(roof);

    group.scale.set(0.3, 0.3, 0.3);
    return group;
}

function createProceduralSailboat() {
    const group = new THREE.Group();
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.8), new THREE.MeshPhongMaterial({ color: 0x8B4513 }));
    group.add(hull);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8), new THREE.MeshPhongMaterial({ color: 0x8B4513 }));
    mast.position.y = 0.4;
    group.add(mast);
    const sailShape = new THREE.Shape();
    sailShape.moveTo(0,0); sailShape.lineTo(0.4,0.2); sailShape.lineTo(0,0.7); sailShape.lineTo(0,0);
    const sail = new THREE.Mesh(new THREE.ShapeGeometry(sailShape), new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
    sail.position.set(0, 0.1, 0); sail.rotation.y = Math.PI / 2;
    group.add(sail);
    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

function createProceduralFishingBoat() {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.9), new THREE.MeshPhongMaterial({ color: 0x224488 })));
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.3), new THREE.MeshPhongMaterial({ color: 0xdddddd }));
    cabin.position.set(0, 0.175, -0.2);
    group.add(cabin);
    group.scale.set(0.4, 0.4, 0.4);
    return group;
}

function createProceduralPort() {
    const group = new THREE.Group();
    group.add(new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.1, 1.0), new THREE.MeshPhongMaterial({ color: 0x777777 })));
    const craneGroup = new THREE.Group();
    craneGroup.add(new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 0.15), new THREE.MeshPhongMaterial({ color: 0xffcc00 })));
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.05), new THREE.MeshPhongMaterial({ color: 0xffcc00 }));
    arm.position.set(0.2, 0.5, 0); arm.rotation.z = -0.1;
    craneGroup.add(arm);
    craneGroup.position.set(-0.3, 0.25, -0.3); // Fixed height
    group.add(craneGroup);
    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

function createProceduralCastle() {
    const group = new THREE.Group();
    const mat = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const roofMat = new THREE.MeshPhongMaterial({ color: 0x3333cc });
    
    const keep = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.6, 0.4), mat);
    keep.position.y = 0.3;
    group.add(keep);
    
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.4, 4), roofMat);
    roof.position.y = 0.8; roof.rotation.y = Math.PI/4;
    group.add(roof);
    
    [[-0.3, 0.3], [0.3, 0.3], [-0.3, -0.3], [0.3, -0.3]].forEach(([x, z]) => {
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.5, 8), mat);
        t.position.set(x, 0.25, z);
        group.add(t);
        const tr = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.2, 8), roofMat);
        tr.position.set(x, 0.6, z);
        group.add(tr);
    });
    
    group.scale.set(0.6, 0.6, 0.6);
    return group;
}

function createProceduralAdventurer() {
    const group = new THREE.Group();
    const skin = new THREE.MeshPhongMaterial({ color: 0xffccaa });
    const blue = new THREE.MeshPhongMaterial({ color: 0x3399cc });
    
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.12), skin);
    head.position.y = 0.5;
    group.add(head);
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, 0.1), blue);
    body.position.y = 0.35;
    group.add(body);
    
    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

// === FIX: LARGER AND SIMPLER LUMBER CAMP ===
function createProceduralLumberCamp() {
    const group = new THREE.Group();
    
    // Base platform to ensure visibility
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.7, 0.1, 6),
        new THREE.MeshPhongMaterial({ color: 0x5c3a21 })
    );
    base.position.y = 0.05;
    group.add(base);

    // Log pile (Larger)
    const logGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    const logMat = new THREE.MeshPhongMaterial({ color: 0x8b5a2b });
    const logGroup = new THREE.Group();
    
    for(let i=0; i<3; i++) {
        const log = new THREE.Mesh(logGeo, logMat);
        log.rotation.z = Math.PI/2;
        log.rotation.x = (Math.random() - 0.5) * 0.2;
        log.position.set(0, 0.08 + i*0.06, (i%2)*0.15 - 0.07);
        logGroup.add(log);
    }
    logGroup.position.set(-0.2, 0.1, 0.2);
    group.add(logGroup);

    // Hut (Larger)
    const hut = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.4, 0.5), 
        new THREE.MeshPhongMaterial({ color: 0x654321 })
    );
    hut.position.set(0.2, 0.2, -0.1);
    group.add(hut);
    
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.4, 0.3, 4),
        new THREE.MeshPhongMaterial({ color: 0x3d2b1f })
    );
    roof.position.set(0.2, 0.55, -0.1);
    roof.rotation.y = Math.PI/4;
    group.add(roof);

    // Stump with Axe
    const stump = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.15, 0.2, 8),
        logMat
    );
    stump.position.set(-0.3, 0.1, -0.3);
    group.add(stump);
    
    const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.4),
        new THREE.MeshPhongMaterial({color: 0x888888})
    );
    handle.position.set(-0.3, 0.35, -0.3);
    handle.rotation.z = 0.4;
    handle.rotation.x = 0.2;
    group.add(handle);

    // Increase scale slightly
    group.scale.set(0.6, 0.6, 0.6);
    return group;
}

// === FIX: LARGER FARM ===
function createProceduralFarm() {
    const group = new THREE.Group();
    
    // Field Base
    const field = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.1, 1.0),
        new THREE.MeshPhongMaterial({ color: 0x553311 })
    );
    field.position.y = 0.05;
    group.add(field);

    // Barn
    const barn = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.5),
        new THREE.MeshPhongMaterial({ color: 0xcc3333 })
    );
    barn.position.set(-0.2, 0.25, -0.2);
    group.add(barn);
    
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 0.3, 4),
        new THREE.MeshPhongMaterial({color: 0x555555})
    );
    roof.position.set(-0.2, 0.6, -0.2);
    roof.rotation.y = Math.PI/4;
    group.add(roof);

    // Wheat
    const cropGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.3, 4);
    const cropMat = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    
    for(let x=-0.3; x<=0.3; x+=0.2) {
        for(let z=0.1; z<=0.4; z+=0.15) {
            const crop = new THREE.Mesh(cropGeo, cropMat);
            crop.position.set(x, 0.2, z);
            group.add(crop);
        }
    }

    group.scale.set(0.5, 0.5, 0.5);
    return group;
}

window.createProceduralStalls = createProceduralStalls;
window.createProceduralSailboat = createProceduralSailboat;
window.createProceduralFishingBoat = createProceduralFishingBoat;
window.createProceduralPort = createProceduralPort;
window.createProceduralCastle = createProceduralCastle;
window.createProceduralAdventurer = createProceduralAdventurer;
window.createProceduralLumberCamp = createProceduralLumberCamp;
window.createProceduralFarm = createProceduralFarm;