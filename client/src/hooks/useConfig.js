// All VITE_ prefixed vars from .env are available here.
// Vite bakes them in at build time — no runtime .env reading.
// To change any value: edit .env, rebuild. One place, always consistent.

const config = {
  businessName:   import.meta.env.VITE_BUSINESS_NAME   || 'Elite Learning Programme',
  businessTagline:import.meta.env.VITE_BUSINESS_TAGLINE || 'Where Sharp Minds Are Built.',
  companyName:    import.meta.env.VITE_COMPANY_NAME    || 'Satoshi Media',
  officeAddress:  import.meta.env.VITE_OFFICE_ADDRESS  || 'Plot 8 The Providence Street, Lekki Phase 1, Lagos',
  servingAreas:   import.meta.env.VITE_SERVING_AREAS   || 'Victoria Island, Ikoyi & Lekki Phase 1',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '2348000000000',
  fbPixelId:      import.meta.env.VITE_FB_PIXEL_ID     || '',
};

// Derived helpers
config.whatsappUrl   = `https://wa.me/${config.whatsappNumber}`;
config.whatsappShort = config.whatsappNumber.replace(/^234/, '0');

export const useConfig = () => config;
export default config;
