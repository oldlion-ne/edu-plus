import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CustomShaderMaterial from 'three-custom-shader-material/vanilla';
import * as THREE from 'three';
import html2canvas from 'html2canvas';

const EXPERTS_TEXT = `Dr. Soram Bobby Singh // Principal Scientist, Green Hydrogen Research // Shri Romen Ningthoujam // Operational Lead, Goonj // Khumukcham Roshaan Singh // Executive Career Strategist // Smt. Nutan Nongthongbam // International Public Health Speaker // Ms. Geetarani Takhellambam // Head of Legal Operations, Powerica Ltd // Shri Rojit Keisham // Maritime Operations Professor // Dr. Ngangbam Shantikumar Meetei // Professor of Advanced Linguistics // Smt. Purnimashi Moirangthem // Assistant Director, Early Cognitive Research // `;

const vertexShader = `
  uniform float uTime;
  uniform float uNoiseStrength;
  uniform float uScrollY;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float time = uTime * 0.00028;

    float angle = uScrollY * 0.0002;
    mat3 rotationY = mat3(
      cos(angle), 0.0, sin(angle),
      0.0, 1.0, 0.0,
      -sin(angle), 0.0, cos(angle)
    );
    pos = rotationY * pos;

    float noise = snoise(vec3(pos.x * 0.8, pos.y * 0.8, time));
    noise += 1.0;
    pos.z += (noise * uNoiseStrength) * 0.05;

    csm_Position = pos;
    csm_PositionRaw = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uRGBShiftIntensity;
  uniform vec2 uMouse;
  varying vec2 vUv;

  vec4 sampleTexture(vec2 uv) {
    return texture2D(uTexture, uv);
  }

  void main() {
    vec2 uv = vUv;
    uv.x += (uMouse.x) * 0.001;
    uv.y += (uMouse.y - 0.5) * 0.001;

    float angle = uRGBShiftIntensity * 0.5;
    float si = sin(angle);
    float co = cos(angle);
    mat2 rotationMatrix = mat2(co, -si, si, co);

    vec2 center = vec2(0.5, 0.5);
    float dist = distance(uv, center);

    vec2 direction = normalize(uv - center);
    vec2 uvR = uv + direction * uRGBShiftIntensity * 0.02;
    vec2 uvB = uv - direction * uRGBShiftIntensity * 0.02;
    vec2 uvG = (uv - center) * rotationMatrix + center;

    float r = sampleTexture(uvR).r;
    float g = sampleTexture(uvG).g;
    float b = sampleTexture(uvB).b;
    float a = sampleTexture(uv).a;

    vec4 finalColor = mix(vec4(r, g, b, a), vec4(0.49, 0.976, 1.0, 1.0), 0.15);

    float vignette = 1.0 - smoothstep(0.4, 1.2, length(vUv - 0.5) * 1.5);
    finalColor *= vignette;

    csm_DiffuseColor = finalColor;
    csm_Emissive = vec3(r, 0.0, 0.0);
  }
`;

// Custom equirectangular UV mapping for cylinder
function applyEquirectangularUV(
  geometry: THREE.CylinderGeometry
): THREE.BufferGeometry {
  const positionAttribute = geometry.attributes.position;
  const vertexCount = positionAttribute.count;

  const newUvs = new Float32Array(vertexCount * 2);

  for (let i = 0; i < vertexCount; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    // Calculate cylindrical coordinates
    const theta = Math.atan2(z, x);
    const u = (theta / (2 * Math.PI)) + 0.5;
    // Map y from cylinder height to v coordinate
    const cylHeight = geometry.parameters.height;
    const v = (y + cylHeight / 2) / cylHeight;

    newUvs[i * 2] = u;
    newUvs[i * 2 + 1] = v;
  }

  geometry.setAttribute('uv', new THREE.BufferAttribute(newUvs, 2));
  return geometry;
}

function HolographicMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.CanvasTexture | null>(null);
  const scrollY = useRef(0);
  const mouseRef = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const captureText = async () => {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '2000px';
      container.style.background = 'transparent';
      document.body.appendChild(container);

      const p1 = document.createElement('p');
      p1.textContent = EXPERTS_TEXT;
      p1.style.whiteSpace = 'nowrap';
      p1.style.fontFamily = 'Outfit, sans-serif';
      p1.style.fontSize = '48px';
      p1.style.color = '#E6EDF3';
      p1.style.letterSpacing = '2px';
      container.appendChild(p1);

      const p2 = document.createElement('p');
      p2.textContent = EXPERTS_TEXT;
      p2.style.whiteSpace = 'nowrap';
      p2.style.fontFamily = 'Outfit, sans-serif';
      p2.style.fontSize = '48px';
      p2.style.color = '#E6EDF3';
      p2.style.letterSpacing = '2px';
      container.appendChild(p2);

      try {
        await document.fonts.ready;
        const canvas = await html2canvas(container, {
          backgroundColor: null,
          scale: 2,
          logging: false,
        });
        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.needsUpdate = true;
        setTexture(tex);
      } catch (e) {
        console.error('html2canvas failed:', e);
      } finally {
        document.body.removeChild(container);
      }
    };

    captureText();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (texture && meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat && mat.uniforms) {
        mat.uniforms.uTexture.value = texture;
      }
    }
  }, [texture]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime() * 1000;

    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed * 0.00008;
      
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat && mat.uniforms) {
        mat.uniforms.uTime.value = elapsed;
        mat.uniforms.uScrollY.value += (scrollY.current - mat.uniforms.uScrollY.value) * 0.1;
        mouseRef.current.lerp(targetMouse.current, 0.05);
        mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      }
    }
  });

  const cylinderGeo = useMemo(() => {
    return new THREE.CylinderGeometry(4, 4, 15, 64, 15, true);
  }, []);

  const material = useMemo(() => {
    const mat = new CustomShaderMaterial({
      baseMaterial: THREE.MeshStandardMaterial,
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScrollY: { value: 0 },
        uNoiseStrength: { value: 1.0 },
        uRGBShiftIntensity: { value: 1.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTexture: { value: null as THREE.CanvasTexture | null },
      },
      flatShading: true,
      transparent: true,
      side: THREE.DoubleSide,
      metalness: 0.8,
      roughness: 0.2,
    });
    return mat;
  }, []);

  // Apply equirectangular UV mapping
  const mappedGeo = useMemo(() => {
    const geo = applyEquirectangularUV(cylinderGeo);
    return geo;
  }, [cylinderGeo]);

  if (!texture) return null;

  return <mesh ref={meshRef} geometry={mappedGeo} material={material} />;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#7DF9FF" />
      <HolographicMesh />
    </>
  );
}

export default function HolographicTextRing() {
  return (
    <div className="w-full h-full relative">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 300], zoom: 15, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
