(function() {
  'use strict';
  
  // Get webhook URL from script parameter
  function getWebhookUrl() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes('popup.js')) {
        const url = new URL(src);
        return url.searchParams.get('webhook');
      }
    }
    return null;
  }
  
  const WEBHOOK_URL = getWebhookUrl();
  
  if (!WEBHOOK_URL) {
    console.error('Exit Popup: No webhook URL provided. Add ?webhook=YOUR_ZAPIER_URL to the script tag.');
    return;
  }
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    .exit-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      z-index: 999999;
      align-items: center;
      justify-content: center;
      animation: exitFadeIn 0.3s ease;
    }
    
    @keyframes exitFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .exit-container {
      background: #fff;
      border-radius: 12px;
      max-width: 520px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      animation: exitSlideUp 0.4s ease;
    }
    
    @keyframes exitSlideUp {
      from { 
        transform: translateY(40px);
        opacity: 0;
      }
      to { 
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    .exit-close {
      position: absolute;
      top: 16px;
      right: 16px;
      background: transparent;
      border: none;
      font-size: 32px;
      color: #aaa;
      cursor: pointer;
      line-height: 1;
      padding: 0;
      width: 32px;
      height: 32px;
      transition: all 0.2s;
      z-index: 10;
    }
    
    .exit-close:hover {
      color: #333;
      transform: rotate(90deg);
    }
    
    .exit-content {
      padding: 40px 32px 32px;
    }
    
    .exit-title {
      margin: 0 0 8px 0;
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
      text-align: center;
      letter-spacing: -0.5px;
    }
    
    .exit-subtitle {
      margin: 0 0 20px 0;
      font-size: 16px;
      color: #666;
      text-align: center;
      line-height: 1.5;
    }
    
    .exit-desc {
      margin: 0 0 24px 0;
      font-size: 15px;
      color: #444;
      text-align: center;
      line-height: 1.5;
    }
    
    .exit-guides {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 28px;
    }
    
    .guide-box {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px 16px;
      background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
      border-radius: 8px;
      border: 1px solid #e9ecef;
      transition: all 0.2s;
    }
    
    .guide-box:hover {
      transform: translateX(4px);
      border-color: #dee2e6;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    
    .guide-icon {
      font-size: 24px;
      flex-shrink: 0;
      line-height: 1;
    }
    
    .guide-box strong {
      display: block;
      font-size: 15px;
      color: #1a1a1a;
      margin-bottom: 4px;
      font-weight: 600;
    }
    
    .guide-box p {
      margin: 0;
      font-size: 13px;
      color: #666;
      line-height: 1.4;
    }
    
    .exit-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .exit-input {
      width: 100%;
      padding: 14px 16px;
      font-size: 15px;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      outline: none;
      transition: all 0.2s;
      box-sizing: border-box;
      font-family: inherit;
    }
    
    .exit-input:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(74,144,226,0.1);
    }
    
    .exit-btn {
      width: 100%;
      padding: 15px 24px;
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      font-family: inherit;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .exit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25);
    }
    
    .exit-btn:active {
      transform: translateY(0);
    }
    
    .exit-btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .exit-disclaimer {
      margin: 6px 0 0 0;
      font-size: 13px;
      color: #999;
      text-align: center;
      line-height: 1.4;
    }
    
    .exit-success {
      display: none;
      text-align: center;
      padding: 20px;
      animation: exitFadeIn 0.3s ease;
    }
    
    .exit-success h3 {
      margin: 0 0 8px 0;
      font-size: 24px;
      color: #22c55e;
      font-weight: 700;
    }
    
    .exit-success p {
      margin: 0;
      font-size: 16px;
      color: #666;
    }
    
    @media (max-width: 600px) {
      .exit-container {
        width: 95%;
        max-height: 95vh;
      }
      
      .exit-content {
        padding: 32px 24px 24px;
      }
      
      .exit-title {
        font-size: 24px;
      }
      
      .exit-subtitle {
        font-size: 15px;
      }
      
      .guide-box {
        padding: 12px 14px;
      }
      
      .guide-icon {
        font-size: 22px;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Inject HTML
  const html = `
    <div id="exitPopup" class="exit-overlay">
      <div class="exit-container">
        <button class="exit-close" id="exitCloseBtn">&times;</button>
        
        <div class="exit-content">
          <h2 class="exit-title">Before You Go...</h2>
          <p class="exit-subtitle">Get our complete Squamish buyer's toolkit (100% free)</p>
          
          <p class="exit-desc">We've helped hundreds of buyers make confident decisions. Here's everything you need:</p>
          
          <div class="exit-guides">
            <div class="guide-box">
              <span class="guide-icon">📍</span>
              <div>
                <strong>Neighbourhood Guide</strong>
                <p>Every area compared — prices, lifestyle, amenities</p>
              </div>
            </div>
            
            <div class="guide-box">
              <span class="guide-icon">🏫</span>
              <div>
                <strong>School Catchment Guide</strong>
                <p>Rankings, boundaries, home availability</p>
              </div>
            </div>
            
            <div class="guide-box">
              <span class="guide-icon">🏗️</span>
              <div>
                <strong>New Development Guide</strong>
                <p>Pre-sales, incentives, what's coming</p>
              </div>
            </div>
          </div>
          
<form id="exitForm" class="exit-form">
            <input type="text" id="exitFirstName" placeholder="First name" required class="exit-input">
            <input type="text" id="exitLastName" placeholder="Last name" required class="exit-input">
            <input type="email" id="exitEmail" placeholder="Email address" required class="exit-input">
            <button type="submit" id="exitBtn" class="exit-btn">Send Me All 3 Guides</button>
            <p class="exit-disclaimer">No spam. Unsubscribe anytime.</p>
          </form>
          
          <div id="exitSuccess" class="exit-success">
            <h3>✓ Success!</h3>
            <p>Check your inbox — guides on the way!</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Wait for DOM to be ready
  function init() {
    document.body.insertAdjacentHTML('beforeend', html);
    
    let exitShown = false;
    
    function hasConverted() {
      return localStorage.getItem('lofty_converted') === 'true' || 
             sessionStorage.getItem('exit_shown') === 'true';
    }
    
    function showExitPopup() {
      if (exitShown || hasConverted()) return;
      exitShown = true;
      sessionStorage.setItem('exit_shown', 'true');
      const popup = document.getElementById('exitPopup');
      if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    }
    
    function closeExitPopup() {
      const popup = document.getElementById('exitPopup');
      if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = '';
      }
    }
    
    function detectExit(e) {
      if (e.clientY < 50 && !exitShown) {
        setTimeout(showExitPopup, 100);
      }
    }
    
    // Event listeners
    document.addEventListener('mouseleave', detectExit);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeExitPopup();
    });
    
    const closeBtn = document.getElementById('exitCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', closeExitPopup);
    }
    
    const popup = document.getElementById('exitPopup');
    if (popup) {
      popup.addEventListener('click', function(e) {
        if (e.target === this) closeExitPopup();
      });
    }
    
    const form = document.getElementById('exitForm');
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
       const btn = document.getElementById('exitBtn');
       const firstName = document.getElementById('exitFirstName').value;
       const lastName = document.getElementById('exitLastName').value;
       const email = document.getElementById('exitEmail').value;
        
        btn.disabled = true;
        btn.textContent = 'Sending...';
        
        try {
          const res = await fetch(WEBHOOK_URL, {
            method: 'POST',
           body: JSON.stringify({
  firstName: firstName,
  lastName: lastName,
  email: email,
  source: 'Exit Intent Popup - Multi-Guide Bundle',
              timestamp: new Date().toISOString(),
              tags: ['Exit Intent Lead', 'Multi-Guide Bundle', 'Website Lead']
            })
          });
          
          if (res.ok) {
            form.style.display = 'none';
            document.getElementById('exitSuccess').style.display = 'block';
            localStorage.setItem('lofty_converted', 'true');
            setTimeout(closeExitPopup, 3000);
          } else {
            btn.disabled = false;
            btn.textContent = 'Send Me All 3 Guides';
            alert('Error. Please try again.');
          }
        } catch (err) {
          btn.disabled = false;
          btn.textContent = 'Send Me All 3 Guides';
          alert('Error. Please try again.');
        }
      });
    }
    
    // Mobile fallback - show after 2 minutes
    if (window.innerWidth < 768) {
      setTimeout(function() {
        if (!hasConverted()) showExitPopup();
      }, 120000);
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
