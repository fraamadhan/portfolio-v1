# Portfolio CMS Specification
**Tech Stack:** Payload CMS + Next.js + Supabase  
**Goal:** Build a modern, simple, and slightly fantasy-themed CMS for a personal portfolio.

---

## 1. Design & UX Requirements

- Clean, simple, and easy-to-use admin interface
- Modern UX with minimal friction
- Subtle fantasy theme inspired by:
  - Lord of the Rings
  - Narnia
- Visual ideas:
  - Soft glowing accents
  - Elegant serif typography
  - Nature elements (mist, grass, particles)

> ⚠️ Prioritize usability over aesthetics

---

## 2. Tech Stack & Integration

- **CMS:** Payload CMS
- **Frontend:** Next.js (already deployed)
- **Database & Storage:** Supabase

### Requirements:
- Use Supabase as the primary database
- Store media (SVG, WEBP, images) in Supabase Storage
- Use `.env` for Supabase credentials

---

## 3. Database Schema (Supabase)

### Required Tables:
- users
- skills
- skill_categories
- experiences
- projects
- books
- manhwas
- mangas
- music
- hobbies

---

## 4. Authentication & Security (RLS)

- Enable Row Level Security (RLS)
- Only authenticated users can perform CRUD
- Ignore `testimonials` table

### Example Policy:
```sql
auth.uid() = user_id
```

---

## 5. Users Table

### Fields:
- name
- description (About Me)
- current_role
- location
- employment_status (e.g. full-time, freelance, open to work)

### Social Media Fields:
- linkedin
- instagram
- email
- github
- facebook
- twitter

### Behavior:
- Show SVG icon only if value exists
- Hide if empty

### Note:
- Use ENUM or string for `employment_status`
- No need for separate table

---

## 6. Skills & Categories

### skill_categories:
- id
- name

### skills:
- name
- level (optional: numeric or text)
- category_id (FK)
- icon (SVG/WEBP)
- description (optional)

> ✅ Use categories for scalability (multi-user ready)

---

## 7. Experiences Table

### Fields:
- title
- company
- location
- start_date
- end_date
- is_current (boolean)
- description
- technologies (relation to skills)
- logo (SVG/WEBP)
- type (internship, full-time, freelance)

---

## 8. Projects Table

### Fields:
- title
- description
- thumbnail
- images (gallery)
- tech_stack (relation to skills)
- repo_url
- live_url
- featured (boolean)
- status (ongoing/completed)
- created_at

---

## 9. Content Tables (Books, Manga, etc.)

### Shared Fields:
- title
- cover_image
- rating
- status (completed/reading/etc.)
- notes (optional)
- genre (optional)
- author (if applicable)

### Tables:
- books
- mangas
- manhwas
- music
- hobbies

---

## 10. Media Handling

- Use Supabase Storage bucket:
  portfolio-assets
  standarize the folder name like :
  - skills
  - experiences
  - projects
  - books
  - mangas
  - manhwas
  - music
  - hobbies

### Supported formats:
- SVG
- WEBP
- Images

### Flow:
- Upload via Payload
- Store URL in database

---

## 11. Multi-User Preparation

Even if single user now:

- Add `user_id` to all tables
- Enables future multi-user support

---

## 12. Payload CMS Collections

Create collections for:

- Users
- Skills
- SkillCategories
- Experiences
- Projects
- Books
- Mangas
- Manhwas
- Music
- Hobbies

### Notes:
- Use clear labels
- Group logically in admin panel
- Optional preview support for Next.js

---

## 13. Fantasy UX Enhancements

- Empty states:
  "The scroll is empty..."
- Loading states:
  - Soft shimmer or magical glow
- Section headers:
  - Fantasy-style dividers
- Optional micro-interactions

---

## 14. Deliverables

- Payload CMS configuration
- Supabase SQL migration files
- RLS policies
- Media upload handler
- Next.js integration layer
- SVG icons for social media

---

## 15. SEO Requirements

- all data should be seo friendly
- add meta tag for each page
- add open graph tags for each page


## Optional Next Steps

- Generate SQL migrations
- Generate Seeder for existing data dummy in frontend
- Create Payload collection configs (TypeScript)
- Setup API/data fetching layer
- Design component structure (Next.js)
