/**
 * Client-Side tracking helper for Otrish-Iran Web Analytics
 */

let sessionId = typeof window !== "undefined" ? localStorage.getItem("otrish_analytics_session_id") : null;
if (typeof window !== "undefined" && !sessionId) {
  sessionId = "sess_" + Math.random().toString(36).substring(2, 15);
  localStorage.setItem("otrish_analytics_session_id", sessionId);
}

export const trackEvent = async (
  eventName: string,
  category: "navigation" | "interaction" | "auth" | "testing" | "action",
  details?: Record<string, any>
) => {
  try {
    if (typeof window === "undefined") return;

    // Build context
    const windowInfo = {
      url: window.location.href,
      path: window.location.pathname,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      language: window.navigator.language,
      referrer: document.referrer || "direct"
    };

    const payload = {
      event_name: eventName,
      category,
      session_id: sessionId || "untracked",
      details: {
        ...windowInfo,
        ...details
      }
    };

    // Fire & Forget securely
    fetch("/api/analytics/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).catch((err) => console.warn("Analytics ping error:", err));
  } catch (error) {
    console.warn("Could not track event:", error);
  }
};

/**
 * Helper to get or reset session ID
 */
export const getSessionId = (): string => {
  return sessionId || "unknown";
};
