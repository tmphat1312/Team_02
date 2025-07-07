import { useEffect } from 'react';

export function ErrorBoundary() {
  useEffect(() => {
    async function wakeServicesUp() {
      const serviceUrls = [
        'https://rento-services-api-gateway.onrender.com',
        'https://rento-services-notification.onrender.com',
        'https://rento-services-payment.onrender.com',
        'https://rento-services-property.onrender.com',
        'https://rento-services-reporting.onrender.com',
        'https://rento-services-reservation.onrender.com',
      ] as const;

      async function makeRequest(url: string) {
        await fetch(url);
        console.log(`Request to ${url} completed successfully.`);
      }

      await Promise.all(serviceUrls.map(makeRequest));
    }

    wakeServicesUp()
      .then(() => console.log('All services woken up successfully.'))
      .catch((error) => console.error('Error waking up services:', error));
  }, []);

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h2>Backend service may not be available!</h2>
      <p>
        Rento application using Render free tier to host backend services.
        Please be patient and wait for 2-3 minutes and comeback later.
      </p>
      <a href="/" className="underline">
        Go to Home (Please wait before clicking)
      </a>
    </div>
  );
}
