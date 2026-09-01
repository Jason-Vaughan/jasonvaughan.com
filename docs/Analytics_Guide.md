# PostHog Analytics Setup Guide

This project is configured to use [PostHog](https://posthog.com) for secure, private analytics tracking.

## Configuration

To activate tracking, you need to create a project in PostHog and supply your unique Project API Key to the application via environment variables.

1. Create a `.env.local` file in the root of the project (if you are running it locally).
2. Add the following lines:

```bash
VITE_POSTHOG_KEY=phc_YOUR_PROJECT_API_KEY_HERE
VITE_POSTHOG_HOST=https://us.i.posthog.com # Or https://eu.i.posthog.com if using the EU cloud
```

If deploying to GitHub Pages via an automated build pipeline (e.g. GitHub Actions), ensure these environment variables are injected into your build environment. If you do not provide a `VITE_POSTHOG_KEY`, PostHog initialization is completely skipped and no tracking scripts will load.

## Accessing Your Private Dashboard

Jason specifically requested a **"detailed statistic report only available for me to look at somewhere"**. 

PostHog fulfills this perfectly:
1. **Private by Default:** The data collected by PostHog is not public. It is securely stored in your PostHog account.
2. **Accessing the Dashboard:** Log into your account at [app.posthog.com](https://app.posthog.com). 
3. **What You Can See:** You can build custom dashboards, view real-time pageviews, analyze session recordings, and track specific events (like resume downloads or persona selections).

The portfolio itself does not expose any of this tracking data to the public; it merely sends telemetry to your secure dashboard.
