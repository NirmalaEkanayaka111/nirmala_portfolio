import { useEffect, useRef, useState } from "react";

/** Procedural Three.js robot whose head tracks the cursor with damping. Pauses off-screen. */
export function Robot({ className = "", scale = 1 }: { className?: string; scale?: number }) {
  const mount = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      if (disposed) return;

      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: true, powerPreference: coarse ? "low-power" : "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0.4, 9 / scale);

      const shell = new THREE.MeshStandardMaterial({ color: 0x0a192f, metalness: 0.85, roughness: 0.28 });
      const plate = new THREE.MeshStandardMaterial({ color: 0xe9e1d8, metalness: 0.3, roughness: 0.35 });
      const glow = new THREE.MeshBasicMaterial({ color: 0x22d3ee });
      const visorMat = new THREE.MeshStandardMaterial({ color: 0x050302, metalness: 1, roughness: 0.08 });

      const robot = new THREE.Group();
      scene.add(robot);

      // Body
      const body = new THREE.Mesh(new RoundedBoxGeometry(2.1, 2.2, 1.4, 6, 0.45), shell);
      body.position.y = -1.9;
      robot.add(body);
      const chest = new THREE.Mesh(new RoundedBoxGeometry(1.5, 1.1, 0.2, 4, 0.08), plate);
      chest.position.set(0, -1.7, 0.66);
      robot.add(chest);
      const core = new THREE.Mesh(new THREE.CircleGeometry(0.18, 32), glow);
      core.position.set(0, -1.7, 0.77);
      robot.add(core);
      // Neck
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.35, 0.5, 24), shell);
      neck.position.y = -0.6;
      robot.add(neck);

      // Head group (pivot)
      const head = new THREE.Group();
      head.position.y = -0.35;
      robot.add(head);
      const skull = new THREE.Mesh(new RoundedBoxGeometry(2.2, 1.7, 1.8, 8, 0.6), plate);
      skull.position.y = 0.85;
      head.add(skull);
      const visor = new THREE.Mesh(new RoundedBoxGeometry(1.8, 0.8, 0.3, 6, 0.25), visorMat);
      visor.position.set(0, 0.85, 0.82);
      head.add(visor);
      const eyeGeo = new THREE.CapsuleGeometry(0.09, 0.18, 6, 12);
      const eyeL = new THREE.Mesh(eyeGeo, glow);
      eyeL.rotation.z = Math.PI / 2;
      eyeL.position.set(-0.4, 0.85, 0.99);
      const eyeR = eyeL.clone();
      eyeR.position.x = 0.4;
      head.add(eyeL, eyeR);
      for (const s of [-1, 1]) {
        const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 32), shell);
        ear.rotation.z = Math.PI / 2;
        ear.position.set(s * 1.15, 0.85, 0);
        head.add(ear);
      }
      const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8), shell);
      antenna.position.set(0, 1.95, 0);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), glow);
      tip.position.set(0, 2.28, 0);
      head.add(antenna, tip);

      robot.position.y = 0.6;

      scene.add(new THREE.AmbientLight(0xffffff, 0.25));
      const key = new THREE.DirectionalLight(0xdbeafe, 1.5);
      key.position.set(3, 4, 5);
      scene.add(key);
      const rim = new THREE.PointLight(0x2563eb, 45, 20);
      rim.position.set(-3, 1, -2);
      scene.add(rim);
      const rim2 = new THREE.PointLight(0x22d3ee, 22, 20);
      rim2.position.set(3, -1, -2);
      scene.add(rim2);

      const target = { x: 0, y: 0 };
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const onMove = (e: PointerEvent) => {
        if (reduce) return;
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / Math.max(h, 1);
        // Pull the camera back on narrow/portrait containers so the robot is never cropped
        camera.position.z = (9 / scale) / Math.min(1, Math.pow(camera.aspect, 0.8));
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      let visible = false, raf = 0, firstFrame = false;
      const clock = new THREE.Clock();
      const tick = () => {
        const t = clock.getElapsedTime();
        if (coarse) { target.x = Math.sin(t * 0.5) * 0.5; target.y = Math.sin(t * 0.37) * 0.25; }
        head.rotation.y += (target.x * 0.7 - head.rotation.y) * 0.06;
        head.rotation.x += (target.y * 0.35 - head.rotation.x) * 0.06;
        robot.rotation.y += (target.x * 0.2 - robot.rotation.y) * 0.03;
        robot.position.y = 0.6 + Math.sin(t * 1.2) * 0.06;
        const blink = Math.sin(t * 2.3) > 0.985 ? 0.15 : 1;
        eyeL.scale.y = eyeR.scale.y = blink;
        renderer.render(scene, camera);
        if (!firstFrame) { firstFrame = true; setReady(true); }
        if (visible) raf = requestAnimationFrame(tick);
      };
      const io = new IntersectionObserver(([entry]) => {
        if (!entry?.isIntersecting) cancelAnimationFrame(raf);
        const was = visible;
        visible = !!entry?.isIntersecting;
        if (visible && !was) raf = requestAnimationFrame(tick);
      });
      io.observe(el);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onMove);
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [scale]);

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div ref={mount} className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 animate-pulse rounded-full bg-primary/30 shadow-glow" />
        </div>
      )}
    </div>
  );
}
