export const timeFormats = new Map<string, Intl.DateTimeFormatOptions>()
  .set('w-HH-mm-24', { weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });


export const date = (locale: string = 'en-US', format?: string) => {
  if (timeFormats.has(format)) {
    return new Date().toLocaleDateString(locale, timeFormats.get(format))  
  }

  return new Date().toLocaleDateString(locale, timeFormats.get('w-HH-mm-24'))
}
