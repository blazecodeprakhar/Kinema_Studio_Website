import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { Box, Sun, Moon, Sunset, RotateCw, Layers } from 'lucide-react';

export const ThreeDModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [lightingMode, setLightingMode] = useState<'day' | 'sunset' | 'night'>('day'); // Default: Daylight Mode
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<'facade' | 'top' | 'balcony'>('facade');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);

  const isDragging = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const initThreeScene = useCallback(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;
    if (width === 0 || height === 0) return;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0e1726); // Bright architectural daylight backdrop

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 500);
    camera.position.set(18, 14, 22);
    camera.lookAt(0, 3, 0);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    // 4. LIGHTS (Daylight preset by default)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xfffaee, 2.8);
    dirLight.position.set(18, 32, 18);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 512;
    dirLight.shadow.mapSize.height = 512;
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    // Accent interior lighting
    const interiorLight1 = new THREE.PointLight(0xff6600, 2.5, 12);
    interiorLight1.position.set(-1, 3, 1);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0x00bbff, 2, 10);
    interiorLight2.position.set(4, 1.5, 4);
    scene.add(interiorLight2);

    // 5. ARCHITECTURAL MODEL BUILD (Real Colors & Materials)
    const buildingGroup = new THREE.Group();
    groupRef.current = buildingGroup;
    scene.add(buildingGroup);

    materialsRef.current = [];

    const createArchMat = (color: number, roughness = 0.3, metalness = 0.1, opacity = 1.0) => {
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        transparent: opacity < 1.0,
        opacity,
        wireframe: isWireframe
      });
      materialsRef.current.push(mat);
      return mat;
    };

    // Realistic Architectural Materials
    const concreteMat = createArchMat(0x2a2b36, 0.6, 0.1);
    const whitePlasterMat = createArchMat(0xe0e2eb, 0.4, 0.05);
    const glassMat = createArchMat(0x5599cc, 0.05, 0.95, 0.55);
    const teakWoodMat = createArchMat(0xc68642, 0.5, 0.0);
    const brandAccentMat = createArchMat(0xe50914, 0.2, 0.4);
    const poolWaterMat = createArchMat(0x00d4ff, 0.1, 0.8, 0.8);
    const foliageGreenMat = createArchMat(0x2e7d32, 0.8, 0.0);

    // Podium Base
    const baseGeo = new THREE.BoxGeometry(24, 0.6, 20);
    const baseMesh = new THREE.Mesh(baseGeo, concreteMat);
    baseMesh.position.y = -0.3;
    baseMesh.receiveShadow = true;
    buildingGroup.add(baseMesh);

    // Swimming Pool Cutout
    const poolGeo = new THREE.BoxGeometry(10, 0.1, 5);
    const poolMesh = new THREE.Mesh(poolGeo, poolWaterMat);
    poolMesh.position.set(5, 0.05, 5);
    buildingGroup.add(poolMesh);

    // Ground Floor Structure
    const groundGeo = new THREE.BoxGeometry(12, 3, 10);
    const groundMesh = new THREE.Mesh(groundGeo, whitePlasterMat);
    groundMesh.position.set(-2, 1.5, 0);
    groundMesh.castShadow = true;
    groundMesh.receiveShadow = true;
    buildingGroup.add(groundMesh);

    // Ground Floor Glass Front
    const glassFrontGeo = new THREE.BoxGeometry(11.8, 2.6, 0.1);
    const glassFrontMesh = new THREE.Mesh(glassFrontGeo, glassMat);
    glassFrontMesh.position.set(-2, 1.5, 5.05);
    buildingGroup.add(glassFrontMesh);

    // Floating First Floor Cantilever
    const upperGeo = new THREE.BoxGeometry(14, 3.2, 9);
    const upperMesh = new THREE.Mesh(upperGeo, concreteMat);
    upperMesh.position.set(-1, 4.6, -0.5);
    upperMesh.castShadow = true;
    upperMesh.receiveShadow = true;
    buildingGroup.add(upperMesh);

    // Wooden Louver Screen
    for (let i = -5; i <= 5; i += 0.8) {
      const louverGeo = new THREE.BoxGeometry(0.12, 3.2, 0.25);
      const louverMesh = new THREE.Mesh(louverGeo, teakWoodMat);
      louverMesh.position.set(-1 + i, 4.6, 4.1);
      buildingGroup.add(louverMesh);
    }

    // Penthouse Roof Beam
    const roofBeamGeo = new THREE.BoxGeometry(15, 0.4, 0.4);
    const roofBeamMesh = new THREE.Mesh(roofBeamGeo, brandAccentMat);
    roofBeamMesh.position.set(-1, 6.3, 4.1);
    buildingGroup.add(roofBeamMesh);

    // Penthouse Terrace Suite
    const penthouseGeo = new THREE.BoxGeometry(8, 2.4, 6);
    const penthouseMesh = new THREE.Mesh(penthouseGeo, glassMat);
    penthouseMesh.position.set(-3, 7.4, -1);
    buildingGroup.add(penthouseMesh);

    // Rooftop Garden Foliage
    for (let i = 0; i < 6; i++) {
      const plantGeo = new THREE.DodecahedronGeometry(0.5 + Math.random() * 0.3);
      const plantMesh = new THREE.Mesh(plantGeo, foliageGreenMat);
      plantMesh.position.set(-6 + i * 1.5, 6.5, 2);
      buildingGroup.add(plantMesh);
    }

    // Pillars
    const pillarGeo = new THREE.CylinderGeometry(0.25, 0.25, 3, 16);
    const p1 = new THREE.Mesh(pillarGeo, brandAccentMat);
    p1.position.set(4.5, 1.5, 4);
    buildingGroup.add(p1);

    const p2 = new THREE.Mesh(pillarGeo, brandAccentMat);
    p2.position.set(4.5, 1.5, -4);
    buildingGroup.add(p2);

    // Edge outlines
    buildingGroup.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const edges = new THREE.EdgesGeometry(child.geometry);
        const lineMat = new THREE.LineBasicMaterial({ color: 0xe50914, opacity: 0.25, transparent: true });
        const line = new THREE.LineSegments(edges, lineMat);
        child.add(line);
      }
    });

    // Animation Loop
    let animationFrameId: number;
    let lastTime = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (time - lastTime < 16) return;
      lastTime = time;

      if (autoRotate && groupRef.current && !isDragging.current) {
        groupRef.current.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };
    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, [isWireframe, autoRotate]);

  useEffect(() => {
    const cleanup = initThreeScene();
    return () => {
      if (cleanup) cleanup();
    };
  }, [initThreeScene]);

  useEffect(() => {
    materialsRef.current.forEach((mat) => {
      mat.wireframe = isWireframe;
    });
  }, [isWireframe]);

  // Lighting Mode state switch
  useEffect(() => {
    if (!dirLightRef.current || !ambientLightRef.current || !sceneRef.current) return;

    if (lightingMode === 'day') {
      sceneRef.current.background = new THREE.Color(0x0e1726);
      ambientLightRef.current.color.setHex(0xffffff);
      ambientLightRef.current.intensity = 0.85;
      dirLightRef.current.color.setHex(0xfffaee);
      dirLightRef.current.position.set(18, 32, 18);
      dirLightRef.current.intensity = 2.8;
    } else if (lightingMode === 'sunset') {
      sceneRef.current.background = new THREE.Color(0x0c0c0f);
      ambientLightRef.current.color.setHex(0xffaa77);
      ambientLightRef.current.intensity = 0.5;
      dirLightRef.current.color.setHex(0xff5533);
      dirLightRef.current.position.set(25, 12, 10);
      dirLightRef.current.intensity = 3.0;
    } else if (lightingMode === 'night') {
      sceneRef.current.background = new THREE.Color(0x050508);
      ambientLightRef.current.color.setHex(0x223355);
      ambientLightRef.current.intensity = 0.3;
      dirLightRef.current.color.setHex(0x4466aa);
      dirLightRef.current.position.set(-10, 20, -10);
      dirLightRef.current.intensity = 1.2;
    }
  }, [lightingMode]);

  useEffect(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (cameraPreset === 'facade') {
      cam.position.set(18, 14, 22);
    } else if (cameraPreset === 'top') {
      cam.position.set(0, 28, 2);
    } else if (cameraPreset === 'balcony') {
      cam.position.set(10, 6, 12);
    }
    cam.lookAt(0, 3, 0);
  }, [cameraPreset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !groupRef.current) return;

    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    groupRef.current.rotation.y += deltaX * 0.008;
    groupRef.current.rotation.x += deltaY * 0.004;

    groupRef.current.rotation.x = Math.max(-0.5, Math.min(0.8, groupRef.current.rotation.x));

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative w-full h-[420px] md:h-[540px] bg-canvas border border-line rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
      <div
        ref={mountRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-line flex items-center gap-2 pointer-events-none shadow-lg">
        <Box className="w-4 h-4 text-brand animate-pulse" />
        <div>
          <span className="text-white text-xs font-bold font-display block leading-none">Interactive 3D Architectural Model</span>
          <span className="text-[9px] text-text-muted">Drag to orbit 360° • Toggle Wireframe & Lighting</span>
        </div>
      </div>

      {/* Control Bar Overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-3 rounded-xl border border-line flex flex-wrap items-center justify-between gap-3 shadow-xl pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            className={`px-3 py-1.5 text-[10px] font-bold font-display uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              isWireframe
                ? 'bg-brand text-white border-brand shadow-md shadow-brand/20'
                : 'bg-canvas text-text-muted border-line hover:text-white hover:bg-raised'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {isWireframe ? 'Wireframe Mode' : 'Solid Shaded'}
          </button>

          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-3 py-1.5 text-[10px] font-bold font-display uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              autoRotate
                ? 'bg-brand/20 text-brand border-brand/40'
                : 'bg-canvas text-text-muted border-line hover:text-white'
            }`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
            Auto-Orbit
          </button>
        </div>

        {/* Daylight Sun is selected by default (Red highlighted) */}
        <div className="flex items-center gap-1.5 bg-canvas/80 p-1 rounded-xl border border-line">
          <button
            onClick={() => setLightingMode('day')}
            className={`p-2 rounded-lg text-[10px] transition-all cursor-pointer ${
              lightingMode === 'day' ? 'bg-brand text-white shadow-md shadow-brand/30' : 'text-text-muted hover:text-white'
            }`}
            title="Daylight Sun Mode"
          >
            <Sun className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLightingMode('sunset')}
            className={`p-2 rounded-lg text-[10px] transition-all cursor-pointer ${
              lightingMode === 'sunset' ? 'bg-brand text-white shadow-md shadow-brand/30' : 'text-text-muted hover:text-white'
            }`}
            title="Golden Sunset"
          >
            <Sunset className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLightingMode('night')}
            className={`p-2 rounded-lg text-[10px] transition-all cursor-pointer ${
              lightingMode === 'night' ? 'bg-brand text-white shadow-md shadow-brand/30' : 'text-text-muted hover:text-white'
            }`}
            title="Cyber Night"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1">
          {(['facade', 'top', 'balcony'] as const).map((cam) => (
            <button
              key={cam}
              onClick={() => setCameraPreset(cam)}
              className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold rounded transition-colors cursor-pointer ${
                cameraPreset === cam ? 'bg-raised text-brand border border-brand/30' : 'text-text-muted hover:text-white'
              }`}
            >
              {cam}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
