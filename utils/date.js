import nextI18Next from "../i18n";

const lang = nextI18Next.i18n.language;

export const timeFormats = new Map();
timeFormats.set("w-HH-mm-24", {
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export const date = (format = "w-HH-mm-24") => {
  if (timeFormats.has(format)) {
    return new Date().toLocaleDateString(lang, timeFormats.get(format));
  }

  return new Date().toLocaleDateString(lang, timeFormats.get("w-HH-mm-24"));
};
