'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = ref.current.clientWidth;
    let height = ref.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ref.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1.2, 32);
    const material = new THREE.MeshStandardMaterial({
      color: '#cccccc',
      metalness: 0.85,
      roughness: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light1 = new THREE.PointLight('#ffffff', 2, 10);
    light1.position.set(3, 3, 3);
    scene.add(light1);
    const light2 = new THREE.PointLight('#888888', 1.5, 10);
    light2.position.set(-3, -2, -3);
    scene.add(light2);

    let mouseX = 0, mouseY = 0;
    function onMouse(e: MouseEvent) {
      mouseX = (e.clientX / width) * 2 - 1;
      mouseY = (e.clientY / height) * 2 - 1;
    }
    if (!prefersReduced) window.addEventListener('mousemove', onMouse);

    function handleResize() {
      width = ref.current?.clientWidth || window.innerWidth;
      height = ref.current?.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener('resize', handleResize);

    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.004 + mouseY * 0.002;
      mesh.rotation.y += 0.006 + mouseX * 0.002;
      renderer.render(scene, camera);
    }
    const visHandler = () => {
      running = !document.hidden;
      if (running) animate();
    };
    document.addEventListener('visibilitychange', visHandler);
    animate();

    return () => {
      running = false;
      document.removeEventListener('visibilitychange', visHandler);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouse);
      renderer.dispose();
      ref.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="bubble-canvas" aria-hidden="true" />;
}