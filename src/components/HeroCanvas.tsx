import { useEffect, useRef } from "react";

/**
 * Ambient hero background, a slowly drifting constellation of nodes that link
 * up when they come near each other. It's the brand mark (a node network) made
 * alive: people wandering, connecting, forming a community.
 *
 * Engineering notes:
 * - three.js is loaded via dynamic import so it stays out of the main bundle,
 *   and the import itself is deferred to browser idle time so its ~190KB
 *   gzipped download never competes with first paint or the hero's own CTAs
 *   becoming interactive.
 * - Skipped entirely under prefers-reduced-motion; particle count drops on
 *   small screens; DPR is capped at 2; the loop pauses when the hero scrolls
 *   offscreen or the tab is hidden.
 * - Everything is disposed on unmount (StrictMode double-mount safe).
 */
// Safari has no requestIdleCallback, fall back to a short timeout so the
// import still yields to the initial render there instead of firing eagerly.
const onIdle: (cb: () => void) => number =
  typeof requestIdleCallback === "function"
    ? requestIdleCallback
    : (cb) => window.setTimeout(cb, 200);
const cancelIdle: (handle: number) => void =
  typeof cancelIdleCallback === "function" ? cancelIdleCallback : window.clearTimeout;

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const isMobile = window.innerWidth < 768;
      // Density scales with canvas area so small heroes (e.g. the booking
      // page) stay airy instead of crowding the same node count into less
      // space. ~1 node per 11k px², clamped to a sane range.
      const area = mount.clientWidth * mount.clientHeight;
      const COUNT = Math.max(18, Math.min(isMobile ? 42 : 90, Math.round(area / 11000)));
      const LINK_DIST = isMobile ? 130 : 170; // px in world units (1 unit = 1px at z=0)
      // Small heroes (booking page) get fainter lines so text always wins.
      const LINE_OPACITY = area < 500_000 ? 0.09 : 0.14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.inset = "0";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      // Orthographic camera in CSS-pixel space keeps the math simple.
      let W = mount.clientWidth;
      let H = mount.clientHeight;
      const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 1, 1000);
      camera.position.z = 10;

      // Brand palette: terracotta + sage, kept faint so text stays readable.
      const terracotta = new THREE.Color("hsl(14, 58%, 50%)");
      const sage = new THREE.Color("hsl(145, 24%, 40%)");

      // Node state
      const pos = new Float32Array(COUNT * 3);
      const vel = new Float32Array(COUNT * 2);
      const nodeColors = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {
        pos[i * 3] = (Math.random() - 0.5) * W;
        pos[i * 3 + 1] = (Math.random() - 0.5) * H;
        pos[i * 3 + 2] = 0;
        const speed = 8 + Math.random() * 14; // px/s, a slow, calm drift
        const dir = Math.random() * Math.PI * 2;
        vel[i * 2] = Math.cos(dir) * speed;
        vel[i * 2 + 1] = Math.sin(dir) * speed;
        const c = Math.random() < 0.55 ? terracotta : sage;
        nodeColors[i * 3] = c.r;
        nodeColors[i * 3 + 1] = c.g;
        nodeColors[i * 3 + 2] = c.b;
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
      const nodeMat = new THREE.PointsMaterial({
        size: isMobile ? 3 : 3.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: false,
        depthWrite: false,
      });
      const points = new THREE.Points(nodeGeo, nodeMat);
      scene.add(points);

      // Line segments between nearby nodes, rebuilt each frame (small N, cheap).
      const maxLinks = COUNT * 6;
      const linePos = new Float32Array(maxLinks * 6);
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: terracotta,
        transparent: true,
        opacity: LINE_OPACITY,
        depthWrite: false,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lines);

      // Pointer parallax, the whole constellation leans gently toward the cursor.
      let targetX = 0;
      let targetY = 0;
      const onPointer = (e: PointerEvent) => {
        const r = mount.getBoundingClientRect();
        targetX = ((e.clientX - r.left) / r.width - 0.5) * 24;
        targetY = -((e.clientY - r.top) / r.height - 0.5) * 24;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // Pause when offscreen or tab hidden.
      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      io.observe(mount);

      const onResize = () => {
        W = mount.clientWidth;
        H = mount.clientHeight;
        camera.left = -W / 2;
        camera.right = W / 2;
        camera.top = H / 2;
        camera.bottom = -H / 2;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
      };
      window.addEventListener("resize", onResize);

      let raf = 0;
      let last = performance.now();
      const animate = (now: number) => {
        raf = requestAnimationFrame(animate);
        if (!visible || document.hidden) {
          last = now;
          return;
        }
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;

        // Drift + soft wrap at the edges.
        for (let i = 0; i < COUNT; i++) {
          let x = pos[i * 3] + vel[i * 2] * dt;
          let y = pos[i * 3 + 1] + vel[i * 2 + 1] * dt;
          const mx = W / 2 + 20;
          const my = H / 2 + 20;
          if (x > mx) x = -mx;
          if (x < -mx) x = mx;
          if (y > my) y = -my;
          if (y < -my) y = my;
          pos[i * 3] = x;
          pos[i * 3 + 1] = y;
        }
        nodeGeo.attributes.position.needsUpdate = true;

        // Rebuild links.
        let li = 0;
        for (let i = 0; i < COUNT && li < maxLinks; i++) {
          for (let j = i + 1; j < COUNT && li < maxLinks; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            if (dx * dx + dy * dy < LINK_DIST * LINK_DIST) {
              linePos[li * 6] = pos[i * 3];
              linePos[li * 6 + 1] = pos[i * 3 + 1];
              linePos[li * 6 + 2] = 0;
              linePos[li * 6 + 3] = pos[j * 3];
              linePos[li * 6 + 4] = pos[j * 3 + 1];
              linePos[li * 6 + 5] = 0;
              li++;
            }
          }
        }
        lineGeo.setDrawRange(0, li * 2);
        lineGeo.attributes.position.needsUpdate = true;

        // Ease the parallax lean.
        points.position.x += (targetX - points.position.x) * 0.04;
        points.position.y += (targetY - points.position.y) * 0.04;
        lines.position.copy(points.position);

        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(animate);

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        io.disconnect();
        nodeGeo.dispose();
        lineGeo.dispose();
        nodeMat.dispose();
        lineMat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    const idleHandle = onIdle(run);

    return () => {
      disposed = true;
      cancelIdle(idleHandle);
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
}
