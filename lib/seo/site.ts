export const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export function getSiteUrl() {

  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;

  
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

 
  return "http://localhost:3000";
}