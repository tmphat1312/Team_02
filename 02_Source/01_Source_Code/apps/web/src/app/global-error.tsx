"use client";

export default function GlobalError() {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Backend service may not be available!</h2>
        <p>
          Rento application using Render free tier to host backend services.
          Please be patient and wait for 2-3 minutes and comeback later.
        </p>
      </body>
    </html>
  );
}
