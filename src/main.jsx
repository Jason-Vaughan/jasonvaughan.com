import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import posthog from 'posthog-js'
import './index.css'
import App from './App.jsx'

const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
const posthogHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

if (typeof window !== 'undefined') {
  // Secret URL opt-out
  const params = new URLSearchParams(window.location.search);
  if (params.get('ignore_me') === 'true') {
    localStorage.setItem('admin_ignore_me', 'true');
    window.history.replaceState({}, document.title, window.location.pathname);
    alert("Tracking disabled. You are now invisible to PostHog on this browser.");
  } else if (params.get('ignore_me') === 'false') {
    localStorage.removeItem('admin_ignore_me');
    alert("Tracking re-enabled.");
  }
}

const isStealth = typeof window !== 'undefined' && localStorage.getItem('admin_ignore_me') === 'true';

if (posthogKey && typeof window !== 'undefined' && !isStealth) {
  posthog.init(posthogKey, {
    api_host: posthogHost,
    person_profiles: 'identified_only',
    persistence: 'memory', // Cookieless tracking to avoid cookie banners
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
