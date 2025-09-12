(function() {
  const sessionId = localStorage.getItem("crm_session_id") || crypto.randomUUID();
  localStorage.setItem("crm_session_id", sessionId);

  function sendEvent(eventType, extra = {}) {
    fetch("http://localhost:3000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: "123",
        sessionId: sessionId,
        eventType: eventType,
        url: window.location.href,
        userAgent: navigator.userAgent,
        ...extra
      })
    }).catch(err => console.error("Tracking error:", err));
  }

  // Sidvisning
  sendEvent("page_view");

  // Klickexempel (på alla länkar)
  document.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      sendEvent("click", { link: e.target.href });
    }
  });
})();
