(function () {
  var box = document.querySelector(".services-physics-box");
  if (!box) {
    return;
  }

  var capsules = box.querySelectorAll(".services-capsule");
  if (!capsules || capsules.length == 0) {
    return;
  }

  if (!window.Matter) {
    return;
  }

  var Engine = Matter.Engine;
  
  var Body = Matter.Body;
  var Mouse = Matter.Mouse;
  var MouseConstraint = Matter.MouseConstraint;

  var engine = Engine.create();
  engine.gravity.x = 0;
  engine.gravity.y = 0;

  window.physicsBodies = [];
  var bodies = window.physicsBodies;

  var walls = [];
  var rafId = null;

  functioBoxSize() {
    var rect = box.getBoundingClientRect();
    return { w: rect.width, h: rect.height };
  }

  function clearWalls() {
    var i;th; i++) {
      World.remove(engine.world, walls[i]);
    }
    walls = [];
  }

  function createWalls() {
    clearWalls();
ze = getBoxSize();
    var w = size.w;
    var h = size.h;

    var thickness = 120;

    var topWall = Bodies.rectangle(w / 2, -thickness / 2, w + thickness * 2, thickness, { isStatic: true });
    var bottomWall = Bodies.rectangle(w / 2, h + thickness / 2, w + thickness * 2, thickness, { isStatic: true });
    var leftWall = Bodies.rectangle(-tkness / 2, h / 2, thickness, h + thickness * 2, { isStatic: true });
    var rightWall = Bodies.rectangle(w + thickness / 2, h / 2, thickness, h + thickness * 2, { isStatic: true });

    walls.push(topWall, bottomWall, leftWall, rightWall);
    World.add(engine.world, walls);
  }

  function randomtween(min, max) {
    return min + Math.random() * (max - min);
  }

  function createCapsuleBodies() {
    var size = getBoxSize();
    var w = size.w;
    var h = size.h;

    var i;
    for (i = 0; i < capsules.length; i++) {
      var el = capsules[i];

      var bw = el.offsetWidth;
      var bh = el.offsetHeight;

      var minX = Mat.max(bw / 2 + 20, 40);
      var maxX = Math.max(minX + 1, w - bw / 2 - 20);

      var minY = Math.max(bh / 2 + 20, 40);
      var maxY = Math.max(minY + 1, h - bh / 2 - 20);

      var x = randomBetween(minX, maxX);
      var y = randomBetween(minY, maxY);

      var body = Bodies.rectangle(x, y, bw, bh, {
        restitution: 0.85,
        friction: 0.08,
        frictionAir: 0.06,
        chamfer: { radius: 999 }
      });

      Body.setPostion(body, { x: x, y: y });

      Body.setVelocity(body, {
        x: randomBetween(-2, 2),
        y: randomBetween(-2, 2)
      });

      Body.setAngularVelocity(body, randomBetween(-0.02, 0.02));

      bodies.push(body);
      World.add(engine.world, body);
    }

    // Hard clamp after all bodies exist
    for (i = 0; i < bodies.length; i++) {
      var b = bodies[i];

      if (b.position.x < 0 || b.position.x > w || b.position.y < 0 || b.position.y > h) {
        Body.setPosition(b, {
          x: randomBetween(80, w - 80),
          y: randomBetween(80, h - 80)
        });
        Body.setVelocity(b, { x: 0, y: 0 });
        Body.setAngularVelocity(b, 0);
      }
    }
  }

  var mouseRef = null;

  function updateMouseOffset() {
    if (!mouseRef) {
      return;
    }

    var rect = box.getBoundingClientRect();

    Matter.Mouse.setOffset(mouseRef, {
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY
    });

    Matter.Mouse.setScale(mouseRef, { x: 1, y: 1 });
  }

  function addDragging() {
    var mouse = Mouse.create(box);
    mouseRef = mouse;

    updateMouseOffset();

    var mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.18,
        damping: 0.10,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);

    box.addEventListener("mousedown", function () {
      box.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", function () {
      box.style.cursor = "default";
    });

    window.addEventListener("scroll", updateMouseOffset, { passive: true });
  }

  function syncDomToPhysics() {
    var i;
    for (i = 0; i < bodies.length; i++) {
      var body = bodies[i];
      var el = capsules[i];

      var bw = el.offsetWidth;
      var bh = el.offsetHeight;

      el.style.left = (body.position.x - bw / 2) + "px";
      el.style.top = (body.position.y - bh / 2) + "px";
    }
  }

  function tick() {
    Engine.update(engine, 1000 / 60);
    syncDomToPhysics();
    rafId = requestAnimationFrame(tick);
  }

  function init() {
    var size = getBoxSize();
    if (size.w < 50 || size.h < 50) {
      requestAnimationFrame(init);
      return;
    }

    var i;
    for (i = 0; i < capsules.length; i++) {
      capsules[i].style.left = "0px";
      capsules[i].style.top = "0px";
    }

    bodies.length = 0;
    World.clear(engine.world, false);

    createWalls();
    createCapsuleBodies();
    addDragging();

    if (rafId === null) {
      tick();
    }
  }

  init();

  window.addEventListener("resize", function () {
    createWalls();
    updateMouseOffset();
  });
})();
