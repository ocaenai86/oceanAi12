export const cleanHtml = (html) =>
  html.replace(/<!DOCTYPE[^>]*>|<\/?html[^>]*>|<\/?head[^>]*>|<\/?body[^>]*>|<meta[^>]*>|<title>[^<]*<\/title>/gi, '');
