'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
// @ts-ignore
import { IFCLoader } from 'web-ifc-three/IFCLoader';
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function BIM() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const loaderRef = useRef<IFCLoader | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currentModelRef = useRef<THREE.Object3D | null>(null); // guarda o modelo atual

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 8, 8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    const loader = new IFCLoader();
    loader.ifcManager.setWasmPath('/wasm/');
    loaderRef.current = loader;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !loaderRef.current || !sceneRef.current || !cameraRef.current) return;

    setFileName(file.name);
    setErrorMessage(null); // limpa mensagens antigas
    const url = URL.createObjectURL(file);

    // Remove modelo anterior
    if (currentModelRef.current) {
      sceneRef.current.remove(currentModelRef.current);
      currentModelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      currentModelRef.current = null;
    }

    try {
      loaderRef.current.load(
        url,
        (model: THREE.Object3D) => {
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.x -= center.x;
          model.position.y -= center.y;
          model.position.z -= center.z;

          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = cameraRef.current!.fov * (Math.PI / 180);
          const distance = maxDim / (2 * Math.tan(fov / 2));
          cameraRef.current!.position.set(distance, distance, distance);
          cameraRef.current!.lookAt(0, 0, 0);

          sceneRef.current!.add(model);
          currentModelRef.current = model;
        },
        undefined,
        (err) => {
          console.error(err);
          setErrorMessage('Não foi possível carregar este arquivo.');
        }
      );
    } catch (err) {
      console.error(err);
      setErrorMessage('Erro inesperado ao carregar o arquivo.');
    }
  };

  return (
    <div className="flex flex-col items-center h-full p-4">
      <h1 className="text-3xl font-extrabold mb-4 tracking-wide">Visualizador BIM</h1>

      <label className="cursor-pointer bg-blue-500 hover:bg-indigo-600 transition-colors px-6 py-3 rounded-lg text-white font-semibold shadow-md">
        Selecionar arquivo BIM
        <input type="file" accept=".ifc,.bim" onChange={handleFile} className="hidden" />
      </label>

      {fileName && <p className="mt-2 text-white italic">Arquivo selecionado: {fileName}</p>}
      {errorMessage && <p className="mt-1 text-red-400 italic">{errorMessage}</p>}

      <div
        ref={containerRef}
        className="w-full mt-6 flex-1 rounded-xl border border-gray-700 shadow-xl overflow-hidden
                   h-[70vh] md:h-[80vh] lg:h-[90vh] bg-gray-800"
      />
    </div>
  );
}
