"use client";

import { useEffect } from "react";

export default function GlobalError() {
  useEffect(() => {
    async function wakeServicesUp() {
      const serviceUrls = [
        "https://rento-admin-analytics.onrender.com",
        "https://rento-api-gateway.onrender.com",
        "https://rento-listing-history.onrender.com",
        "https://rento-notification.onrender.com",
        "https://rento-payment.onrender.com",
        "https://rento-property.onrender.com",
        "https://rento-reporting.onrender.com",
        "https://rento-reservation.onrender.com",
        "https://rento-supporting.onrender.com",
        "https://rento-verification.onrender.com",
      ] as const;

      async function makeRequest(url: string) {
        await fetch(url);
        console.log(`Request to ${url} completed successfully.`);
      }

      await Promise.all(serviceUrls.map(makeRequest));
    }

    wakeServicesUp()
      .then(() => console.log("All services woken up successfully."))
      .catch((error) => console.error("Error waking up services:", error));
  }, []);

  return (
    // global-error must include html and body tags
    <html>
      <body className="max-w-md mx-auto py-8 px-4">
        <h2>Backend service may not be available!</h2>
        <p>
          Rento application using Render free tier to host backend services.
          Please be patient and wait for 2-3 minutes and comeback later.
        </p>
      </body>
    </html>
  );
}
