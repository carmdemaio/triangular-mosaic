   "use strict";

    // --- Canvas & Context ---
    const canvas = document.getElementById('canvas');
    const ctx    = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- Config & State ---
    const colors      = ['red','green','blue'];  // fallback palette
    const MIN_AREA    = 50;                     // px² threshold
    let triangles     = [],
        frontier      = [],
        useCurves     = true,
        patterns      = [],
        currentPattern = 0;

    // --- Geometry Helpers ---
    function signedArea2(A,B,C){ return (B.x-A.x)*(C.y-A.y)-(B.y-A.y)*(C.x-A.x);}  
    function area(A,B,C){ return Math.abs(signedArea2(A,B,C))/2; }
    function randomPointInTriangle(A,B,C){
      let r1=Math.random(),r2=Math.random();
      if(r1+r2>1){r1=1-r1; r2=1-r2;}
      return { x: A.x + r1*(B.x-A.x) + r2*(C.x-A.x),
               y: A.y + r1*(B.y-A.y) + r2*(C.y-A.y) };
    }

    // --- Drawing Routines ---
    function getFillStyle(){
      if(patterns.length){
        const p = patterns[currentPattern];
        currentPattern = (currentPattern+1)%patterns.length;
        return p;
      }
      return colors[Math.floor(Math.random()*colors.length)];
    }
    function drawTriangle(tri){
      ctx.beginPath();
      ctx.moveTo(tri[0].x,tri[0].y);
      ctx.lineTo(tri[1].x,tri[1].y);
      ctx.lineTo(tri[2].x,tri[2].y);
      ctx.closePath();
      ctx.fillStyle = getFillStyle();
      ctx.fill();
    }

    function drawCurvyTriangle(tri){
      const [A,B,C]=tri;
      ctx.beginPath();
      function curve(P,Q){
        const mx=0.5*(P.x+Q.x), my=0.5*(P.y+Q.y);
        let dx=Q.y-P.y, dy=-(Q.x-P.x);
        const len=Math.hypot(dx,dy);
        if(len>0){dx/=len; dy/=len;}
        const off=20+Math.random()*30;
        const cx=mx+dx*off, cy=my+dy*off;
        ctx.quadraticCurveTo(cx,cy,Q.x,Q.y);
      }
      ctx.moveTo(A.x,A.y);
      curve(A,B);
      curve(B,C);
      curve(C,A);
      ctx.closePath();
      ctx.fillStyle=getFillStyle();
      ctx.fill();
    }

    // --- Mosaic Setup & Animation ---
    function initMosaic(){
      const v0={x:0,y:0}, v1={x:canvas.width,y:0},
            v2={x:canvas.width,y:canvas.height}, v3={x:0,y:canvas.height};
      triangles=[ [v0,v1,v2], [v0,v2,v3] ];
      triangles.forEach(t=> useCurves?drawCurvyTriangle(t):drawTriangle(t));
      frontier = triangles.filter(t=> area(...t)>MIN_AREA);
    }

    function animateStep(){
      if(!frontier.length) return;
      const tri = frontier.splice(Math.floor(Math.random()*frontier.length),1)[0];
      const p = randomPointInTriangle(...tri);
      [[tri[0],tri[1]],[tri[1],tri[2]],[tri[2],tri[0]]].forEach(([A,B])=>{
        const sub=[A,B,p]; triangles.push(sub);
        useCurves?drawCurvyTriangle(sub):drawTriangle(sub);
        if(area(...sub)>MIN_AREA) frontier.push(sub);
      });
      requestAnimationFrame(animateStep);
    }

    // --- Auto-Load Asset Patterns ---
    async function loadAssets(){
      patterns=[]; currentPattern=0;
      let consecutiveMisses=0;
      const maxMisses=5;
      for(let i=1; consecutiveMisses<maxMisses; i++){
        const path=`assets/img${i}.jpeg`;
        try{
          await new Promise(res=>{
            const img=new Image(); img.src=path;
            img.onload=()=>{ patterns.push(ctx.createPattern(img,'repeat')); res(); };
            img.onerror=()=>{ consecutiveMisses++; res(); };
          });
        }catch(e){ consecutiveMisses++; }
      }
      start();
    }

    function start(){
      initMosaic();
      requestAnimationFrame(animateStep);
      document.getElementById('toggleBtn').addEventListener('click',()=>{
        useCurves=!useCurves;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        triangles.forEach(t=> useCurves?drawCurvyTriangle(t):drawTriangle(t));
      });
    }

    window.onload = loadAssets;