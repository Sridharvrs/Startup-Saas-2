const words=['calm focus.','happy teams.','real growth.','less chaos.'],t=document.getElementById('type');let w=0,c=0,del=false;
(function tick(){const s=words[w];t.textContent=s.slice(0,c);if(!del&&c===s.length){del=true;return setTimeout(tick,1500)}if(del&&c===0){del=false;w=(w+1)%words.length}c+=del?-1:1;setTimeout(tick,del?45:95)})();
