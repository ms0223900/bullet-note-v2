/**
 * Google Analytics (gtag) script component
 * Handles Google Analytics initialization and script loading
 */

import { GTAG_CONFIG } from '@/constants/gtag';
import Script from 'next/script';

interface GTagScriptProps {
  measurementId?: string;
}

export function GTagScript({ measurementId = GTAG_CONFIG.MEASUREMENT_ID }: GTagScriptProps) {
  return (
    <>
      {/* Google tag (gtag.js) */}
      <Script
        src={`${GTAG_CONFIG.SCRIPT_URL}?id=${measurementId}`}
        strategy="afterInteractive"
        id="gtag-init"
      />

      {/* GTag initialization script */}
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `,
        }}
      />
    </>
  );
}
