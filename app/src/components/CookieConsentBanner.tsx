import { useEffect, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY as string;

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const DEVICE_ID_KEY = 'eduplus_device_id';

function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

export default function CookieConsentBanner() {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    setDeviceId(getOrCreateDeviceId());
  }, []);

  const handleConsent = async (consentGiven: boolean) => {
    if (!deviceId) return;
    try {
      const { error } = await supabase
        .from('cookie_consents')
        .insert([{ device_id: deviceId, consent_given: consentGiven }]);
      
      if (error) {
        console.error('Error saving cookie consent:', error);
      } else {
        console.log(`Cookie consent (${consentGiven ? 'accepted' : 'declined'}) saved for device ${deviceId}`);
      }
    } catch (error) {
      console.error('Error in handleConsent:', error);
    }
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Only Necessary"
      enableDeclineButton
      onAccept={() => handleConsent(true)}
      onDecline={() => handleConsent(false)}
      cookieName="eduplus_cookie_consent"
      disableStyles={true}
      containerClasses="fixed bottom-0 left-0 w-full flex flex-col sm:flex-row items-center justify-between p-6 bg-background border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-[99999] gap-6"
      contentClasses="flex-1 max-w-4xl"
      buttonWrapperClasses="flex items-center gap-3 shrink-0 flex-wrap"
      buttonClasses="bg-foreground text-background text-sm font-medium px-6 py-2.5 rounded-none hover:bg-primary hover:text-foreground transition-colors duration-200"
      declineButtonClasses="bg-transparent text-muted-foreground border border-border text-sm font-medium px-6 py-2.5 rounded-none hover:text-foreground hover:border-foreground transition-colors duration-200"
      expires={150}
    >
      <div className="flex flex-col gap-2">
        <h4 className="font-heading font-medium text-lg text-foreground m-0">Your Privacy Matters</h4>
        <p className="m-0 text-muted-foreground text-[13px] leading-relaxed">
          We use strictly necessary cookies to make our platform work. We'd also like to set optional analytics and marketing cookies to help us improve it and deliver tailored experiences.
          By clicking <strong>"Accept All"</strong>, you consent to our use of all cookies. You can choose to allow only essential cookies by clicking <strong>"Only Necessary"</strong>.
        </p>
      </div>
    </CookieConsent>
  );
}
