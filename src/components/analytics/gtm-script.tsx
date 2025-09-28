/**
 * Google Tag Manager script component
 * Handles GTM initialization and script loading
 */

import { GTM_CONFIG } from '@/constants/gtm';
import Script from 'next/script';

interface GTMScriptProps {
  gtmId?: string;
}

export function GTMScript({ gtmId = GTM_CONFIG.ID }: GTMScriptProps) {
  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        src={`${GTM_CONFIG.SCRIPT_URL}?id=${gtmId}`}
        strategy="afterInteractive"
        id="gtm-script"
      />

      {/* GTM Initialization Script */}
      <Script
        id="gtm-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtmId}');
          `,
        }}
      />
    </>
  );
}
