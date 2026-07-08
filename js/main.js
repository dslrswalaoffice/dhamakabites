// Site logic — menu rendering, hero slideshow, nav, theme, config wiring.
// No need to edit this for content changes (use config.js / menu.js).

/* ============================================================
     SITE CONFIG — edit these and everything updates.
     Leave a link blank ("") to hide that button automatically.
     ============================================================ */


  // ---- Menu data (real items & prices) ----


  const fmt = n => "£" + n;
  const list = document.getElementById("menuList");
  function render(cat){
    list.innerHTML = MENU[cat].map(it=>{
      const badge = it[3] ? `<span class="nm-badge">${it[3]}</span>` : "";
      return `<div class="mitem"><div class="ml"><div class="name">${it[0]}${badge}</div><div class="meta">${it[1]}</div></div><div class="dots"></div><div class="pr">${fmt(it[2])}</div></div>`;
    }).join("");
  }
  render("chaat");
  document.getElementById("tabs").addEventListener("click",e=>{
    const b=e.target.closest(".tab"); if(!b) return;
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("on"));
    b.classList.add("on"); render(b.dataset.cat);
  });

  // ---- Apply CONFIG ----
  (function(){
    // order app buttons
    document.querySelectorAll("#appLinks [data-link]").forEach(a=>{
      const k=a.dataset.link;
      if(k==="phone"){ a.href = "tel:" + CONFIG.phone.replace(/\s+/g,""); return; }
      if(CONFIG[k]){ a.href=CONFIG[k]; a.target="_blank"; a.rel="noopener"; }
      else a.remove();
    });
    // contact
    document.getElementById("cAddress").textContent = CONFIG.address;
    document.getElementById("cHours").textContent = CONFIG.hours;
    const ph=document.getElementById("cPhone"); ph.textContent=CONFIG.phone; ph.href="tel:"+CONFIG.phone.replace(/\s+/g,"");
    const bk=document.getElementById("cBooking");
    if(CONFIG.googleBooking){ bk.href=CONFIG.googleBooking; bk.target="_blank"; bk.rel="noopener"; }
    else { bk.href="tel:"+CONFIG.phone.replace(/\s+/g,""); bk.textContent="Call to reserve"; }
    // socials
    const socials=[]; const foot=[];
    if(CONFIG.instagram){ socials.push(`<a href="${CONFIG.instagram}" target="_blank" rel="noopener" style="color:var(--maroon);font-weight:600">Instagram</a>`); foot.push(`<a href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram</a>`); }
    if(CONFIG.tiktok){ socials.push(`<a href="${CONFIG.tiktok}" target="_blank" rel="noopener" style="color:var(--maroon);font-weight:600">TikTok</a>`); foot.push(`<a href="${CONFIG.tiktok}" target="_blank" rel="noopener">TikTok</a>`); }
    if(CONFIG.whatsapp){ foot.push(`<a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>`); }
    document.getElementById("cSocial").innerHTML = socials.length ? socials.join(" · ") : "Instagram · TikTok";
    document.getElementById("footSocial").innerHTML = foot.join("");
    // map
    if(CONFIG.mapEmbed){
      document.getElementById("cMap").innerHTML = `<iframe src="${CONFIG.mapEmbed}" title="Map showing Dhamaka Bites, Tooting, London" width="100%" height="280" style="border:0;border-radius:16px" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
      document.getElementById("cMap").style.padding="0";
    }
    var rb=document.getElementById("ratingBadge");
    if(rb){
      if(CONFIG.rating){
        // Show the review count as a rounded "100+" bucket so it stays accurate as reviews grow (119 -> "100+", 250 -> "200+").
        var rc=parseInt(String(CONFIG.reviewCount).replace(/\D/g,''),10)||0;
        var rcLabel=(CONFIG.showExactReviews===false && rc>=100) ? (Math.floor(rc/100)*100)+'+' : (rc||'');
        rb.innerHTML='<b>\u2605 '+CONFIG.rating+'</b> on Google \u00b7 '+rcLabel+' reviews';
        if(CONFIG.googleListing) rb.href=CONFIG.googleListing; }
      else rb.remove();
    }
    document.getElementById("yr").textContent = new Date().getFullYear();
  })();

  // ---- hero background slideshow ----
  (function(){
    var bg=document.getElementById("heroBg"); if(!bg) return;
    var src = (CONFIG.heroSlides && CONFIG.heroSlides.length)
      ? CONFIG.heroSlides.map(function(u){ return "background-image:url('"+u+"')"; })
      : ["background:linear-gradient(135deg,#7E1A1A,#B5811A)",
         "background:linear-gradient(135deg,#176573,#1C7C8C)",
         "background:linear-gradient(135deg,#9A3B1E,#E89B0C)"];
    src.forEach(function(s,idx){ var d=document.createElement("div"); d.className="hero-slide"+(idx===0?" on":""); d.style.cssText+=";"+s; bg.appendChild(d); });
    var els=bg.querySelectorAll(".hero-slide"); var i=0;
    if(els.length>1) setInterval(function(){ els[i].classList.remove("on"); i=(i+1)%els.length; els[i].classList.add("on"); }, 5000);
  })();

  // ---- nav + theme ----
  const nl=document.getElementById("navlinks");
  document.getElementById("burger").addEventListener("click",()=>nl.classList.toggle("open"));
  nl.addEventListener("click",e=>{ if(e.target.tagName==="A") nl.classList.remove("open"); });
  document.getElementById("themeToggle").addEventListener("click",()=>{
    const next=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";
    document.documentElement.setAttribute("data-theme",next);
  });

  // ---- reveal ----
  const io=new IntersectionObserver(es=>{ es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} }); },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
