// ============================================================
// Collection Dummy Data
// ============================================================

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  status: "reading" | "completed" | "want-to-read";
  rating?: number; // out of 5
  year: number;
}

export interface Comic {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  genre: string;
  chapters: number;
  status: "reading" | "completed" | "on-hold";
  rating?: number;
}

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  genre: string;
  previewUrl?: string;
}

// ── Books ────────────────────────────────────────────────────
export const dummyBooks: Book[] = [
  {
    id: "b1",
    title: "Clean Code",
    author: "Robert C. Martin",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    genre: "Programming",
    status: "completed",
    rating: 5,
    year: 2008,
  },
  {
    id: "b2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
    genre: "Programming",
    status: "completed",
    rating: 5,
    year: 1999,
  },
  {
    id: "b3",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    genre: "Self-Improvement",
    status: "completed",
    rating: 4,
    year: 2018,
  },
  {
    id: "b4",
    title: "Zero to One",
    author: "Peter Thiel",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg",
    genre: "Business",
    status: "reading",
    rating: 4,
    year: 2014,
  },
  {
    id: "b5",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781491903100-L.jpg",
    genre: "Engineering",
    status: "reading",
    year: 2017,
  },
  {
    id: "b6",
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    genre: "Productivity",
    status: "want-to-read",
    year: 2016,
  },
];

// ── Manga ────────────────────────────────────────────────────
export const dummyManga: Comic[] = [
  {
    id: "mg1",
    title: "Chainsaw Man",
    author: "Tatsuki Fujimoto",
    coverUrl: "https://placehold.co/400x560/1c0505/f87171?text=Chainsaw+Man",
    genre: "Action / Horror",
    chapters: 97,
    status: "completed",
    rating: 5,
  },
  {
    id: "mg2",
    title: "Jujutsu Kaisen",
    author: "Gege Akutami",
    coverUrl: "https://placehold.co/400x560/05051c/818cf8?text=Jujutsu+Kaisen",
    genre: "Action / Supernatural",
    chapters: 265,
    status: "completed",
    rating: 5,
  },
  {
    id: "mg3",
    title: "Berserk",
    author: "Kentaro Miura",
    coverUrl: "https://placehold.co/400x560/1c0f00/fbbf24?text=Berserk",
    genre: "Dark Fantasy",
    chapters: 374,
    status: "reading",
    rating: 5,
  },
  {
    id: "mg4",
    title: "Vagabond",
    author: "Takehiko Inoue",
    coverUrl: "https://placehold.co/400x560/00050f/60a5fa?text=Vagabond",
    genre: "Historical / Action",
    chapters: 327,
    status: "on-hold",
    rating: 4,
  },
  {
    id: "mg5",
    title: "Blue Period",
    author: "Tsubasa Yamaguchi",
    coverUrl: "https://placehold.co/400x560/050010/e879f9?text=Blue+Period",
    genre: "Slice of Life / Art",
    chapters: 17,
    status: "reading",
    rating: 4,
  },
];

// ── Manwha ───────────────────────────────────────────────────
export const dummyManwha: Comic[] = [
  {
    id: "mw1",
    title: "Solo Leveling",
    author: "Chugong",
    coverUrl: "https://placehold.co/400x560/08011a/a78bfa?text=Solo+Leveling",
    genre: "Action / Fantasy",
    chapters: 179,
    status: "completed",
    rating: 5,
  },
  {
    id: "mw2",
    title: "Tower of God",
    author: "SIU",
    coverUrl: "https://placehold.co/400x560/00080f/38bdf8?text=Tower+of+God",
    genre: "Fantasy / Adventure",
    chapters: 600,
    status: "reading",
    rating: 5,
  },
  {
    id: "mw3",
    title: "The God of High School",
    author: "Yongje Park",
    coverUrl: "https://placehold.co/400x560/1a0500/fb923c?text=God+of+High+School",
    genre: "Action / Martial Arts",
    chapters: 570,
    status: "completed",
    rating: 4,
  },
  {
    id: "mw4",
    title: "Omniscient Reader's Viewpoint",
    author: "Sing Shong",
    coverUrl: "https://placehold.co/400x560/000f08/4ade80?text=ORV",
    genre: "Fantasy / Thriller",
    chapters: 180,
    status: "reading",
    rating: 5,
  },
  {
    id: "mw5",
    title: "Eleceed",
    author: "Jaehyun",
    coverUrl: "https://placehold.co/400x560/05001a/c084fc?text=Eleceed",
    genre: "Action / Superhero",
    chapters: 279,
    status: "reading",
    rating: 4,
  },
];

// ── Music (placeholder until Spotify API) ────────────────────
export const dummyTracks: MusicTrack[] = [
  {
    id: "t1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/4d/Queen_A_Night_At_The_Opera.png",
    genre: "Rock",
  },
  {
    id: "t2",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
    genre: "Grunge",
  },
  {
    id: "t3",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg",
    genre: "Rock",
  },
  {
    id: "t4",
    title: "Black",
    artist: "Pearl Jam",
    album: "Ten",
    coverUrl: "https://upload.wikimedia.org/wikipedia/en/5/5a/PearlJam-Ten.jpg",
    genre: "Grunge",
  },
];
