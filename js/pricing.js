const bill=document.getElementById('bill');
bill.onclick=()=>{bill.classList.toggle('yr');const y=bill.classList.contains('yr');document.querySelectorAll('[data-m]').forEach(b=>{const to=+(y?b.dataset.y:b.dataset.m),from=+b.textContent,st=performance.now();(function f(n){const p=Math.min((n-st)/500,1);b.textContent=Math.round(from+(to-from)*p);p<1&&requestAnimationFrame(f)})(st)})};
