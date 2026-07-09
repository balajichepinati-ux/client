'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030815, 0.045);

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 18;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x071a35, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x1565ff, 2.5);
    dirLight.position.set(10, 15, 10);
    scene.add(dirLight);

    const pointLightCyan = new THREE.PointLight(0x00e5ff, 3, 30);
    pointLightCyan.position.set(-8, 5, 5);
    scene.add(pointLightCyan);

    const pointLightViolet = new THREE.PointLight(0x8b5cf6, 3, 30);
    pointLightViolet.position.set(8, -5, 5);
    scene.add(pointLightViolet);

    // --- Container Group ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- Particle System (Starfield/Tech dust) ---
    const starCount = 200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 45;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0x00e5ff,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    mainGroup.add(starField);

    // --- Network Nodes & Connections ---
    const nodeCount = 35;
    const nodes: {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
    }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 26,
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 12
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015
        ),
      });
    }

    // Node spheres geometry
    const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x2979ff });
    const instancedNodes = new THREE.InstancedMesh(nodeGeo, nodeMat, nodeCount);
    mainGroup.add(instancedNodes);

    // Line segments connecting nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x1565ff,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 2 * 3); // 2 points per line, 3 coords per point
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    mainGroup.add(networkLines);

    // --- Premium Floating IT Elements ---
    const floatingGroup = new THREE.Group();
    floatingGroup.position.set(5, 0, 0); // Positioned to the right of the Hero text
    mainGroup.add(floatingGroup);

    // Materials
    const glassMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.15,
      metalness: 0.8,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x071a35,
      roughness: 0.35,
      metalness: 0.85,
    });

    const activeLEDMaterial = new THREE.MeshBasicMaterial({ color: 0x00c853 });
    const alertLEDMaterial = new THREE.MeshBasicMaterial({ color: 0xff9800 });
    const cctvLEDMaterial = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    // 1. Cloud Model Group
    const cloud = new THREE.Group();
    const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(1.2, 16, 16), glassMaterial);
    const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), glassMaterial);
    sphere2.position.set(-1.2, -0.3, 0.2);
    const sphere3 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), glassMaterial);
    sphere3.position.set(1.2, -0.3, -0.2);
    const sphere4 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), glassMaterial);
    sphere4.position.set(-0.6, 0.7, -0.3);
    const sphere5 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 16), glassMaterial);
    sphere5.position.set(0.6, 0.7, 0.3);
    cloud.add(sphere1, sphere2, sphere3, sphere4, sphere5);
    cloud.position.set(-2, 3, -1);
    floatingGroup.add(cloud);

    // 2. Server Stack Group
    const server = new THREE.Group();
    const serverBlinkingLEDs: THREE.Mesh[] = [];
    for (let j = 0; j < 3; j++) {
      // Server chassis
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 1.8), darkMetalMaterial);
      chassis.position.y = -j * 0.6;
      server.add(chassis);

      // Glass front panel
      const face = new THREE.Mesh(new THREE.BoxGeometry(2.36, 0.4, 0.05), glassMaterial);
      face.position.set(0, -j * 0.6, 0.9);
      server.add(face);

      // Blinking LEDs
      for (let k = 0; k < 4; k++) {
        const led = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 8),
          Math.random() > 0.35 ? activeLEDMaterial : alertLEDMaterial
        );
        led.position.set(-0.9 + k * 0.25, -j * 0.6, 0.93);
        server.add(led);
        serverBlinkingLEDs.push(led);
      }
    }
    server.position.set(2.5, 1.5, 1);
    floatingGroup.add(server);

    // 3. Shield Group (Security)
    const shield = new THREE.Group();
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.2);
    shieldShape.quadraticCurveTo(0.8, 1.1, 1.0, 0.4);
    shieldShape.quadraticCurveTo(1.0, -0.6, 0, -1.3);
    shieldShape.quadraticCurveTo(-1.0, -0.6, -1.0, 0.4);
    shieldShape.quadraticCurveTo(-0.8, 1.1, 0, 1.2);

    const extrudeSettings = { depth: 0.18, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();
    const shieldMesh = new THREE.Mesh(shieldGeo, glassMaterial);
    shield.add(shieldMesh);

    // Hologram ring around shield
    const ringGeo = new THREE.RingGeometry(1.6, 1.7, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const hologramRing = new THREE.Mesh(ringGeo, ringMat);
    hologramRing.rotation.x = Math.PI / 2;
    shield.add(hologramRing);
    shield.position.set(-1.8, -2.5, 0.5);
    floatingGroup.add(shield);

    // 4. CCTV Camera Group
    const cctv = new THREE.Group();
    // Camera body
    const bodyCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 1.0, 16), darkMetalMaterial);
    bodyCylinder.rotation.x = Math.PI / 3;
    cctv.add(bodyCylinder);
    // Camera lens ring
    const lensRing = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.15, 16), glassMaterial);
    lensRing.position.set(0, -0.45, 0.25);
    lensRing.rotation.x = Math.PI / 3;
    cctv.add(lensRing);
    // Red LED
    const cameraLED = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), cctvLEDMaterial);
    cameraLED.position.set(0, -0.5, 0.35);
    cctv.add(cameraLED);
    // Mounting arm
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8), darkMetalMaterial);
    arm.position.set(0, 0.3, -0.2);
    cctv.add(arm);

    cctv.position.set(3, -2, -0.5);
    cctv.rotation.y = -Math.PI / 4;
    floatingGroup.add(cctv);

    // 5. Network Switch / Router
    const router = new THREE.Group();
    const routerChassis = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.3, 1.4), darkMetalMaterial);
    router.add(routerChassis);
    const routerFace = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.26, 0.05), glassMaterial);
    routerFace.position.set(0, 0, 0.7);
    router.add(routerFace);
    // Antennas
    for (let xOffset of [-0.8, 0.8]) {
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8), darkMetalMaterial);
      antenna.position.set(xOffset, 0.5, -0.6);
      antenna.rotation.x = 0.2;
      router.add(antenna);
    }
    // Blue blinking ports
    const routerLEDs: THREE.Mesh[] = [];
    for (let k = 0; k < 6; k++) {
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
      led.position.set(-0.6 + k * 0.24, 0, 0.72);
      router.add(led);
      routerLEDs.push(led);
    }
    router.position.set(0.5, 0, 2);
    floatingGroup.add(router);

    // --- Interactive Mouse Event ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener('mousemove', onMouseMove);

    // --- Responsive Resize ---
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // --- Animation Loop ---
    let frame = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      frame = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Update network node positions
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];
        node.position.add(node.velocity);

        // Wrap around bounds
        if (Math.abs(node.position.x) > 15) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > 10) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > 8) node.velocity.z *= -1;

        // Set InstancedMesh matrix
        const dummy = new THREE.Object3D();
        dummy.position.copy(node.position);
        dummy.updateMatrix();
        instancedNodes.setMatrixAt(i, dummy.matrix);
      }
      instancedNodes.instanceMatrix.needsUpdate = true;

      // Recalculate node connections
      let lineIndex = 0;
      const posAttr = networkLines.geometry.attributes.position as THREE.BufferAttribute;
      const positionsArray = posAttr.array as Float32Array;

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < 4.2 && lineIndex < maxConnections) {
            const index = lineIndex * 6;
            positionsArray[index] = nodes[i].position.x;
            positionsArray[index + 1] = nodes[i].position.y;
            positionsArray[index + 2] = nodes[i].position.z;

            positionsArray[index + 3] = nodes[j].position.x;
            positionsArray[index + 4] = nodes[j].position.y;
            positionsArray[index + 5] = nodes[j].position.z;

            lineIndex++;
          }
        }
      }

      // Fill remaining line buffers with zero/inactive coords to prevent rendering weird lines
      for (let i = lineIndex; i < maxConnections; i++) {
        const index = i * 6;
        positionsArray[index] = 0;
        positionsArray[index + 1] = 0;
        positionsArray[index + 2] = 0;
        positionsArray[index + 3] = 0;
        positionsArray[index + 4] = 0;
        positionsArray[index + 5] = 0;
      }
      posAttr.needsUpdate = true;

      // Floating items rotations and animations
      cloud.rotation.y = elapsedTime * 0.08;
      cloud.position.y = 2.5 + Math.sin(elapsedTime * 0.9) * 0.25;

      server.rotation.x = Math.sin(elapsedTime * 0.6) * 0.06;
      server.rotation.y = elapsedTime * 0.12;
      server.position.y = 1.2 + Math.cos(elapsedTime * 0.7) * 0.25;

      // Randomly toggle server LEDs visibility
      serverBlinkingLEDs.forEach((led) => {
        if (Math.random() > 0.98) {
          led.visible = !led.visible;
        }
      });

      shield.rotation.y = -elapsedTime * 0.15;
      shield.position.y = -2.2 + Math.sin(elapsedTime * 0.5) * 0.2;
      hologramRing.rotation.z = elapsedTime * 0.4;

      cctv.rotation.y = -Math.PI / 4 + Math.sin(elapsedTime * 0.4) * 0.3;
      cctv.position.y = -2.0 + Math.cos(elapsedTime * 0.6) * 0.15;
      if (Math.random() > 0.98) {
        cameraLED.visible = !cameraLED.visible;
      }

      router.rotation.y = -elapsedTime * 0.1;
      router.position.y = Math.sin(elapsedTime * 0.8) * 0.15;
      routerLEDs.forEach((led) => {
        if (Math.random() > 0.95) {
          led.visible = !led.visible;
        }
      });

      // Lerp mouse target for parallax
      targetX += (mouseX - targetX) * 0.08;
      targetY += (mouseY - targetY) * 0.08;

      mainGroup.rotation.y = targetX * 0.25;
      mainGroup.rotation.x = -targetY * 0.15;

      // Slow overall rotate
      starField.rotation.y = elapsedTime * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);

      // Dispose resources
      starGeometry.dispose();
      starMaterial.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      glassMaterial.dispose();
      darkMetalMaterial.dispose();
      activeLEDMaterial.dispose();
      alertLEDMaterial.dispose();
      cctvLEDMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      shieldGeo.dispose();
      routerChassis.geometry.dispose();
      routerFace.geometry.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none block z-0"
    />
  );
}
