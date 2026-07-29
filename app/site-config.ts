// Values shared across multiple routes belong here so navigation and contact
// details cannot silently drift between the home and interior pages.
export const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Actions", "/actions"],
  ["News", "/news"],
  ["Contact", "/contact"],
] as const;

export const siteLinks = {
  email: "animos.guardian@gmail.com",
  instagram: "https://www.instagram.com/animos59.2?igsh=MXFzZnc0ZTZmbzQ4Mg==",
};
