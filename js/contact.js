const f=document.getElementById('cf'),m=document.getElementById('cmsg'),g=i=>document.getElementById(i);
f.onsubmit=e=>{e.preventDefault();const ok=['cn','ce','cm'].every(i=>g(i).value.trim())&&/\S+@\S+\.\S+/.test(g('ce').value);m.textContent=ok?'Thanks! We will reply within one working day.':'Please fill every field with a valid email.';m.style.color=ok?'#0a7a3d':'#c0261a';if(ok)f.reset()};
g('nf').onsubmit=e=>{e.preventDefault();g('nmsg').textContent='You are subscribed. Welcome aboard!';e.target.reset()};
