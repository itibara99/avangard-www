import React, { useState, useRef, useEffect } from 'react';
import { RotateCw, ZoomIn, ZoomOut, Move } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({ 
  modelPath, 
  title = "3D Модель", 
  description = "Используйте мышь для вращения и масштабирования модели" 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isAutoRotatingRef = useRef(true);
  const isDraggingRef = useRef(false);
  const mouseState = useRef({
    isDown: false,
    lastX: 0,
    lastY: 0
  });
  const touchState = useRef({
    isTouching: false,
    lastX: 0,
    lastY: 0,
    initialDistance: 0,
    isPinching: false
  });
  const rotationState = useRef({ x: 0, y: 0 });
  const autoRotateTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Native wheel event handler for better control
  const handleNativeWheel = (e: WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!cameraRef.current) return;
    
    const delta = e.deltaY > 0 ? 0.5 : -0.5;
    cameraRef.current.position.z = Math.max(
      1,
      Math.min(8, cameraRef.current.position.z + delta)
    );
  };

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x3a3a3a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Additional directional light from the opposite side
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffd700, 0.8);
    pointLight.position.set(-5, 8, 8);
    scene.add(pointLight);

    // Additional point light for better illumination
    const pointLight2 = new THREE.PointLight(0xffffff, 0.4);
    pointLight2.position.set(8, -5, 5);
    scene.add(pointLight2);

    // Hemisphere light for natural lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.4);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    // Additional lighting for better coverage
    // Front light
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.7);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    // Back light
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    // Left side light
    const leftLight = new THREE.PointLight(0xffffff, 0.6);
    leftLight.position.set(-10, 0, 0);
    scene.add(leftLight);

    // Right side light
    const rightLight = new THREE.PointLight(0xffffff, 0.6);
    rightLight.position.set(10, 0, 0);
    scene.add(rightLight);

    // Top light
    const topLight = new THREE.PointLight(0xffffff, 0.5);
    topLight.position.set(0, 15, 0);
    scene.add(topLight);

    // Bottom light for subtle fill
    const bottomLight = new THREE.PointLight(0xffffff, 0.3);
    bottomLight.position.set(0, -10, 0);
    scene.add(bottomLight);

    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0xffd700, 0.4);
    rimLight.position.set(-8, 8, -8);
    scene.add(rimLight);

    // Fill light to reduce harsh shadows
    const fillLight = new THREE.PointLight(0xffffff, 0.3);
    fillLight.position.set(3, -3, 8);
    scene.add(fillLight);

    // Load GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        
        // Center and scale the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        // Scale model to fit in view
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
        model.scale.setScalar(scale);
        
        // Center the model
        model.position.sub(center.multiplyScalar(scale));
        
        // Enable shadows
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(model);
        modelRef.current = model;
        setIsLoading(false);
        
        // Initialize rotation state
        rotationState.current = { x: 0, y: 0 };
      },
      (error) => {
        if (error.type === "error") {
          console.error('Error loading model:', error);
          setError('Ошибка загрузки 3D модели');
          setIsLoading(false);
        }
      }
    );

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        if (isAutoRotatingRef.current && !mouseState.current.isDown) {
          rotationState.current.y += 0.003;
        }
        
        // Apply current rotation state to model
        modelRef.current.rotation.x = rotationState.current.x;
        modelRef.current.rotation.y = rotationState.current.y;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Mouse event handlers
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      
      mouseState.current.isDown = true;
      mouseState.current.lastX = e.clientX;
      mouseState.current.lastY = e.clientY;
      
      isDraggingRef.current = true;
      isAutoRotatingRef.current = false;
      
      // Очищаем таймер автовращения
      if (autoRotateTimeout.current) {
        clearTimeout(autoRotateTimeout.current);
        autoRotateTimeout.current = null;
      }
      
      e.preventDefault();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseState.current.isDown || !modelRef.current) return;
      
      const deltaX = e.clientX - mouseState.current.lastX;
      const deltaY = e.clientY - mouseState.current.lastY;
      
      // Update rotation state
      rotationState.current.y += deltaX * 0.005;
      rotationState.current.x -= deltaY * 0.005;
      
      // Limit vertical rotation
      rotationState.current.x = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, rotationState.current.x)
      );
      
      mouseState.current.lastX = e.clientX;
      mouseState.current.lastY = e.clientY;
      
      e.preventDefault();
    };

    const handleMouseUp = (e: MouseEvent) => {
      mouseState.current.isDown = false;
      isDraggingRef.current = false;

      // Возобновляем автовращение через 4 секунды
      autoRotateTimeout.current = setTimeout(() => {
        isAutoRotatingRef.current = true;
      }, 4000);

      e.preventDefault();
    };

    // Touch event handlers
    const getTouchDistance = (touch1: Touch, touch2: Touch): number => {
      const dx = touch1.clientX - touch2.clientX;
      const dy = touch1.clientY - touch2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches.length === 1) {
        // Single touch - rotation
        touchState.current.isTouching = true;
        touchState.current.isPinching = false;
        touchState.current.lastX = e.touches[0].clientX;
        touchState.current.lastY = e.touches[0].clientY;

        isDraggingRef.current = true;
        isAutoRotatingRef.current = false;

        // Очищаем таймер автовращения
        if (autoRotateTimeout.current) {
          clearTimeout(autoRotateTimeout.current);
          autoRotateTimeout.current = null;
        }
      } else if (e.touches.length === 2) {
        // Two fingers - pinch to zoom
        touchState.current.isPinching = true;
        touchState.current.initialDistance = getTouchDistance(e.touches[0], e.touches[1]);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!modelRef.current) return;

      if (e.touches.length === 1 && touchState.current.isTouching && !touchState.current.isPinching) {
        // Single touch - rotation
        const deltaX = e.touches[0].clientX - touchState.current.lastX;
        const deltaY = e.touches[0].clientY - touchState.current.lastY;

        // Update rotation state
        rotationState.current.y += deltaX * 0.005;
        rotationState.current.x -= deltaY * 0.005;

        // Limit vertical rotation
        rotationState.current.x = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, rotationState.current.x)
        );

        touchState.current.lastX = e.touches[0].clientX;
        touchState.current.lastY = e.touches[0].clientY;
      } else if (e.touches.length === 2 && touchState.current.isPinching) {
        // Two fingers - pinch to zoom
        const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
        const delta = (touchState.current.initialDistance - currentDistance) * 0.01;

        if (cameraRef.current) {
          cameraRef.current.position.z = Math.max(
            1,
            Math.min(8, cameraRef.current.position.z + delta)
          );
        }

        touchState.current.initialDistance = currentDistance;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.touches.length === 0) {
        touchState.current.isTouching = false;
        touchState.current.isPinching = false;
        isDraggingRef.current = false;

        // Возобновляем автовращение через 4 секунды
        autoRotateTimeout.current = setTimeout(() => {
          isAutoRotatingRef.current = true;
        }, 4000);
      } else if (e.touches.length === 1) {
        // Transition from pinch to single touch
        touchState.current.isPinching = false;
        touchState.current.isTouching = true;
        touchState.current.lastX = e.touches[0].clientX;
        touchState.current.lastY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);

    // Add mouse event listeners to the container
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseup', handleMouseUp);
      container.addEventListener('mouseleave', handleMouseUp);
      container.addEventListener('wheel', handleNativeWheel, { passive: false });

      // Add touch event listeners
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
      container.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    }

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (autoRotateTimeout.current) {
        clearTimeout(autoRotateTimeout.current);
      }
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseup', handleMouseUp);
        container.removeEventListener('mouseleave', handleMouseUp);
        container.removeEventListener('wheel', handleNativeWheel);

        // Remove touch event listeners
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchEnd);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelPath]);

  const handleZoomIn = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(cameraRef.current.position.z - 0.5, 1);
  };

  const handleZoomOut = () => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.min(cameraRef.current.position.z + 0.5, 10);
  };

  const resetView = () => {
    if (!cameraRef.current || !modelRef.current) return;
    
    // Очищаем таймер автовращения
    if (autoRotateTimeout.current) {
      clearTimeout(autoRotateTimeout.current);
      autoRotateTimeout.current = null;
    }
    
    cameraRef.current.position.set(0, 0, 3);
    modelRef.current.rotation.set(0, 0, 0);
    rotationState.current = { x: 0, y: 0 };
    isAutoRotatingRef.current = true;
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#3A3A3A] rounded-lg overflow-hidden h-96 cursor-grab active:cursor-grabbing border border-gray-700"
      style={{
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
        touchAction: 'none'
      }}
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Загрузка 3D модели...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-gray-400 text-sm">Проверьте наличие файла модели</p>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <button
          onClick={handleZoomIn}
          className="bg-[#1A1A1A] hover:bg-gray-600 text-white p-2 rounded transition-colors"
          title="Увеличить"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-[#1A1A1A] hover:bg-gray-600 text-white p-2 rounded transition-colors"
          title="Уменьшить"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={resetView}
          className="bg-[#1A1A1A] hover:bg-gray-600 text-white p-2 rounded transition-colors"
          title="Сбросить вид"
        >
          <RotateCw size={20} />
        </button>
      </div>

      {/* Instructions */}
      {!isLoading && !error && (
        <div className="absolute bottom-4 left-4 right-4 text-center z-10">
          <div className="bg-[#3A3A3A]/80 backdrop-blur-sm rounded-lg p-3">
            <p className="text-gray-300 text-sm">
              <Move className="inline w-4 h-4 mr-1" />
              {isMobile
                ? "Используйте касания для вращения. Два пальца для масштабирования"
                : description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              3D модель товара
            </p>
          </div>
        </div>
      )}

      {/* Rotation indicator */}
      {isDraggingRef.current && (
        <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded text-sm font-medium z-10">
          Вращение...
        </div>
      )}
    </div>
  );
};

export default ModelViewer;