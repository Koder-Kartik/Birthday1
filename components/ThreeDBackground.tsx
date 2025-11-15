import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

// FIX: Removed conflicting global 'THREE' declaration. The import from the 'three' package is sufficient.

export const ThreeDBackground: React.FC<{ triggerFinale: boolean }> = ({ triggerFinale }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add stars for a romantic, dreamy atmosphere
    const starVertices: number[] = [];
    for (let i = 0; i < 5000; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        starVertices.push(x, y, z);
    }
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Create Heart Shape
    const shape = new THREE.Shape();
    const x = -2.5, y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 5.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
      steps: 2,
      depth: 1,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 0.5,
      bevelOffset: 0,
      bevelSegments: 5
    };

    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    
    // Create multiple materials for color variation
    const heartColors = [0xe0218a, 0xff0055, 0xdd2277, 0xfc46aa];
    const materials = heartColors.map(color => new THREE.MeshStandardMaterial({
      color: color,
      metalness: 0.5,
      roughness: 0.6
    }));

    const hearts: THREE.Mesh[] = [];
    for (let i = 0; i < 25; i++) {
      const material = materials[Math.floor(Math.random() * materials.length)];
      const heart = new THREE.Mesh(geometry, material);
      heart.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      );
      heart.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = Math.random() * 0.03 + 0.02;
      heart.scale.set(scale, scale, scale);
      scene.add(heart);
      hearts.push(heart);
    }
    heartsRef.current = hearts;

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate stars
      stars.rotation.y += 0.0002;

      hearts.forEach((heart, i) => {
        heart.rotation.y += 0.005;
        heart.position.y += Math.sin(elapsedTime + i) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (triggerFinale) {
      heartsRef.current.forEach(heart => {
        gsap.to(heart.position, {
          y: heart.position.y + 15,
          x: heart.position.x + (Math.random() - 0.5) * 10,
          duration: 5,
          ease: 'power2.inOut',
        });
        gsap.to(heart.rotation, {
          y: heart.rotation.y + Math.PI * 2,
          x: heart.rotation.x + Math.PI,
          duration: 5,
          ease: 'power2.inOut',
        });
        // We can't animate material opacity directly if it's not transparent, so we'll just move them off screen.
      });
    }
  }, [triggerFinale]);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};
