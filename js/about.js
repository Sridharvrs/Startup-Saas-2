document.querySelectorAll('.ti').forEach(t=>new IntersectionObserver(([e])=>{if(e.isIntersecting)t.style.boxShadow='6px 6px 0 #6d4aff'},{threshold:.6}).observe(t));
