// Leet character mapping to normal characters
const LEET_MAP: { [key: string]: string } = {
  '0': 'o',
  '1': 'i',
  '2': 'z',
  '3': 'e',
  '4': 'a',
  '5': 's',
  '6': 'g',
  '7': 't',
  '8': 'b',
  '9': 'g',
  '@': 'a',
  '$': 's',
};

// Normalize leetspeak text to standard alphanumeric lowercase string
export function normalizeLeetSpeak(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map(char => LEET_MAP[char] || char)
    .join('');
}

// Prohibited URL patterns / domains / keywords in URLs
const SUSPICIOUS_URL_KEYWORDS = [
  'slot', 'gacor', 'togel', 'judol', 'judi', 'casino', 'poker', 'bet', 'maxwin', 'sbobet', 'depo', 'wd',
  'bokep', 'porn', 'xxx', 'sex', 'hentai', 'jav', 'colmek', 'semprot', 'dildo', 'redtube', 'pornhub', 'xnxx'
];

export function hasSuspiciousLinks(text: string): boolean {
  // Regex to detect standard URLs or markdown links
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-z]{2,}\/[^\s]*)/gi;
  const matches = text.match(urlRegex);
  if (!matches) return false;

  // If there's a link, check if it contains any suspicious words
  return matches.some(match => {
    const normalizedMatch = normalizeLeetSpeak(match);
    return SUSPICIOUS_URL_KEYWORDS.some(keyword => normalizedMatch.includes(keyword));
  });
}

// Bad words list by language/dialect
const BAD_WORDS = {
  indonesian: [
    'anjing', 'babi', 'bangsat', 'keparat', 'bajingan', 'kontol', 'memek', 'ngentot', 'pentil', 'perek',
    'lonte', 'jablay', 'goblok', 'tolol', 'bego', 'asu', 'peli', 'jembut', 'pepek', 'pantek'
  ],
  sundanese: [
    'sia', 'bagong', 'kehed', 'beungeut', 'kunyuk', 'jurig', 'cileupeung', 'modar', 'borok', 'galing', 'heuras'
  ],
  javanese: [
    'jancok', 'dancok', 'cok', 'matamu', 'raimu', 'jembut', 'gatel', 'modar', 'pekok', 'celeng', 'mbokne'
  ],
  batak: [
    'lolo', 'botul', 'naoto', 'babiat', 'begu', 'biang', 'holes', 'palak'
  ],
  eastern: [
    'puki', 'pukimai', 'sundala', 'cuki', 'cukimai', 'loda', 'gonggo', 'bodok'
  ]
};

const ALL_BAD_WORDS = Array.from(
  new Set([
    ...BAD_WORDS.indonesian,
    ...BAD_WORDS.sundanese,
    ...BAD_WORDS.javanese,
    ...BAD_WORDS.batak,
    ...BAD_WORDS.eastern
  ])
);

export function containsBadWords(text: string): boolean {
  // Normalize string (lowercase, convert leetspeak, remove symbols/punctuation)
  const normalized = normalizeLeetSpeak(text)
    .replace(/[^a-z0-9\s]/g, '') // keep only alphanumeric and spaces
    .replace(/\s+/g, ' ');

  const words = normalized.split(' ');

  // Check if any word in the text matches a bad word or contains a bad word as a substring
  return words.some(word => ALL_BAD_WORDS.includes(word)) || 
         ALL_BAD_WORDS.some(badWord => normalized.includes(badWord));
}

export function validateTestimonialInput(payload: {
  author: string;
  role: string;
  institution: string;
  tag: string;
  quote: string;
}): { isValid: boolean; error?: string } {
  const fields = [payload.author, payload.role, payload.institution, payload.tag, payload.quote];

  for (const field of fields) {
    if (hasSuspiciousLinks(field)) {
      return {
        isValid: false,
        error: "Restricted links or content related to gambling/pornography detected."
      };
    }
    if (containsBadWords(field)) {
      return {
        isValid: false,
        error: "Inappropriate language or bad words detected."
      };
    }
  }

  return { isValid: true };
}
