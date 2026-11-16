"use client";

import { useEffect, useRef } from "react";

// The method as a loop: a 3D infinity ribbon (the brand mark) with four lights travelling
// around it, one per step — Learn, Practice, Feedback, Apply. `active` (0–3 or -1) makes
// that step's light swell, so hovering a step card lights it up in the scene.
const ORBS = [0xffb703, 0xfb8500, 0x8ecae6, 0xffffff];

export default function MethodScene({ active = -1 }) {
  const mount = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    import("three").then((THREE) => {
      const el = mount.current;
      if (disposed || !el) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.4, 9.5);

      // Figure-eight with depth, so the loop really passes over and under itself.
      class Loop extends THREE.Curve {
        getPoint(t, target = new THREE.Vector3()) {
          const a = t * Math.PI * 2;
          return target.set(3.2 * Math.cos(a), 2.1 * Math.sin(2 * a) * 0.5 * 1.25, 0.9 * Math.sin(a));
        }
      }
      const curve = new Loop();

      // Ribbon tube coloured gold → orange along x, like the logo.
      const tube = new THREE.TubeGeometry(curve, 420, 0.13, 20, true);
      const pos = tube.attributes.position;
      const colors = new Float32Array(pos.count * 3);
      const gold = new THREE.Color(0xffb703), orange = new THREE.Color(0xfb8500), c = new THREE.Color();
      for (let i = 0; i < pos.count; i++) {
        c.copy(gold).lerp(orange, THREE.MathUtils.clamp((pos.getX(i) + 3.4) / 6.8, 0, 1));
        colors.set([c.r, c.g, c.b], i * 3);
      }
      tube.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const ribbon = new THREE.Mesh(tube, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.35, metalness: 0.15, emissive: 0x3a2200, emissiveIntensity: 0.5 }));

      const group = new THREE.Group();
      group.add(ribbon);
      group.rotation.x = 0.22;
      scene.add(group);

      // Soft glow sprite shared by the four lights.
      const cv = document.createElement("canvas");
      cv.width = cv.height = 128;
      const g = cv.getContext("2d");
      const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.25, "rgba(255,255,255,.55)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 128, 128);
      const glowTex = new THREE.CanvasTexture(cv);

      const orbs = ORBS.map((color) => {
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), new THREE.MeshBasicMaterial({ color }));
        const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
        glow.scale.setScalar(1.4);
        core.add(glow);
        group.add(core);
        return { core, glow, scale: 1 };
      });

      // Star field behind.
      const starGeo = new THREE.BufferGeometry();
      const n = 420, sp = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) sp.set([(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18, -6 - Math.random() * 10], i * 3);
      starGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
      const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0x8ecae6, size: 0.05, transparent: true, opacity: 0.8 }));
      scene.add(stars);

      scene.add(new THREE.AmbientLight(0xffffff, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(3, 5, 6);
      scene.add(key);
      const rim = new THREE.PointLight(0x219ebc, 30, 20);
      rim.position.set(-4, -2, 3);
      scene.add(rim);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.position.z = w / h < 1 ? 13 : 9.5;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const mouse = { x: 0, y: 0 };
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        mouse.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        mouse.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(el);

      const speed = reduce ? 0.012 : 0.04;
      const clock = new THREE.Clock();
      let t = 0, raf = 0;
      const p = new THREE.Vector3();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05);
        if (!visible) return;
        t += dt * speed;
        orbs.forEach((o, i) => {
          curve.getPoint((t + i / 4) % 1, p);
          o.core.position.copy(p);
          const target = activeRef.current === i ? 1.9 : 1;
          o.scale += (target - o.scale) * 0.12;
          o.core.scale.setScalar(o.scale);
          o.glow.material.opacity = activeRef.current === -1 || activeRef.current === i ? 1 : 0.35;
        });
        group.rotation.y += ((mouse.x * 0.35 + Math.sin(t * 6) * 0.15) - group.rotation.y) * 0.05;
        group.rotation.x += ((0.22 + mouse.y * 0.18) - group.rotation.x) * 0.05;
        stars.rotation.z += dt * 0.01;
        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        io.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
        glowTex.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={mount} className="vb-method-scene" aria-hidden="true" />;
}
