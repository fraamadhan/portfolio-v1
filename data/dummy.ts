import type { ExperienceItemProps, TestimonialItemProps } from "@/types";

export const currentWorkRole = [
  "Full Stack Developer",
  "Back End Developer",
  "Front End Developer",
  "DevOps Engineer"
];
export const backendItems = {
  titleKey: "skills_cards.backend.title",
  descriptionKey: "skills_cards.backend.description",
  items: [
    { id: 1, src: "/logo/skills/typescript.svg", name: "TypeScript" },
    { id: 2, src: "/logo/skills/javascript.svg", name: "JavaScript" },
    { id: 3, src: "/logo/skills/nodejs.svg", name: "Node.js" },
    { id: 4, src: "/logo/skills/nestjs.svg", name: "NestJS" },
    { id: 5, src: "/logo/skills/adonisjs.svg", name: "AdonisJS" },
    { id: 6, src: "/logo/skills/golang.svg", name: "Go" },
    { id: 7, src: "/logo/skills/python.svg", name: "Python" },
    { id: 8, src: "/logo/skills/flask.svg", name: "Flask" },
    { id: 9, src: "/logo/skills/php.svg", name: "PHP" },
    { id: 10, src: "/logo/skills/laravel.svg", name: "Laravel" },
    { id: 11, src: "/logo/skills/mysql.svg", name: "MySQL" },
    { id: 12, src: "/logo/skills/postgresql.svg", name: "PostgreSQL" },
    { id: 13, src: "/logo/skills/mongodb.svg", name: "MongoDB" },
  ],
};
export const frontendItems = {
  titleKey: "skills_cards.frontend.title",
  descriptionKey: "skills_cards.frontend.description",
  items: [
    { id: 1, src: "/logo/skills/typescript.svg", name: "TypeScript" },
    { id: 2, src: "/logo/skills/javascript.svg", name: "JavaScript" },
    { id: 3, src: "/logo/skills/react.svg", name: "React" },
    { id: 4, src: "/logo/skills/next.svg", name: "Next.js" },
    { id: 5, src: "/logo/skills/vue.svg", name: "Vue.js" },
    { id: 6, src: "/logo/skills/html.svg", name: "HTML" },
    { id: 7, src: "/logo/skills/css.svg", name: "CSS" },
  ],
};
export const devOpsItems = {
  titleKey: "skills_cards.devops.title",
  descriptionKey: "skills_cards.devops.description",
  items: [
    { id: 1, src: "/logo/skills/docker.svg", name: "Docker" },
    { id: 2, src: "/logo/skills/kubernetes.svg", name: "Kubernetes" },
    { id: 3, src: "/logo/skills/jenkins.svg", name: "Jenkins" },
    { id: 4, src: "/logo/skills/github-actions.svg", name: "GitHub Actions" },
    { id: 5, src: "/logo/skills/linux.svg", name: "Linux" },
    { id: 6, src: "/logo/skills/prometheus.svg", name: "Prometheus" },
    { id: 7, src: "/logo/skills/grafana.svg", name: "Grafana" },
    { id: 8, src: "/logo/skills/aws.svg", name: "AWS" },
  ],
};

export const experiences: ExperienceItemProps[] = [
  {
    id: "telkom-test-house-backend",
    role: "Backend Developer",
    category: "Internship",
    company: "PT Telkom Indonesia",
    location: "Bandung, Indonesia",
    startDate: "2025-11-01",
    endDate: "2026-05-01",
    keypoints: [
      "Built backend APIs for analytics and Service Level Guarantee (SLG) features on the Telkom Test House platform.",
      "Maintained and enhanced existing services to improve stability, response consistency, and day-to-day reliability.",
      "Delivered re-verification endpoints for sample verification workflows to support operational follow-up cases.",
      "Implemented additional payment re-verification subflows to complete the end-to-end verification process.",
    ],
    techStack: [
      { name: "TypeScript", src: "/logo/skills/typescript.svg" },
      { name: "GitLab", src: "/logo/skills/gitlab.svg" },
      { name: "AdonisJS", src: "/logo/skills/adonisjs.svg" },
      { name: "MySQL", src: "/logo/skills/mysql.svg" },
      { name: "Redis", src: "/logo/skills/redis.svg" },
      { name: "Docker", src: "/logo/skills/docker.svg" },
    ],
    isCurrent: true,
  },
  {
    id: "telkom-padi-backend",
    role: "Backend Developer",
    category: "Internship",
    company: "PT Telkom Indonesia",
    location: "Bandung, Indonesia",
    startDate: "2024-10-01",
    endDate: "2025-01-01",
    keypoints: [
      "Maintained APIs and core backend services for the PaDi UMKM platform across ongoing product updates.",
      "Improved search-result performance while adding prohibited-keyword detection backed by Redis caching.",
      "Created scheduled jobs for daily endpoint calls and service automation through Rancher-managed workloads.",
      "Added 12 unit tests for the service recommendation module to strengthen regression coverage.",
    ],
    techStack: [
      { name: "TypeScript", src: "/logo/skills/typescript.svg" },
      { name: "NestJS", src: "/logo/skills/nestjs.svg" },
      { name: "GitLab", src: "/logo/skills/gitlab.svg" },
      { name: "MongoDB", src: "/logo/skills/mongodb.svg" },
      { name: "Redis", src: "/logo/skills/redis.svg" },
      { name: "Docker", src: "/logo/skills/docker.svg" },
      { name: "Rancher", src: "/logo/skills/rancher.svg" },
    ],
    isCurrent: false,
  },
  {
    id: "telkom-padi-qa",
    role: "QA Engineer",
    category: "Internship",
    company: "PT Telkom Indonesia",
    location: "Bandung, Indonesia",
    startDate: "2024-08-01",
    endDate: "2024-10-01",
    keypoints: [
      "Executed end-to-end testing for PaDi UMKM features before release to help maintain production readiness.",
      "Documented test evidence and review findings for stakeholder reporting and follow-up validation.",
      "Prepared structured test cases in Google Sheets to cover business flows, negative scenarios, and edge cases.",
      "Ran daily exploratory and regression testing to surface defects early and keep feature quality stable.",
    ],
    techStack: [
      { name: "Postman", src: "/logo/skills/postman.svg" },
      { name: "Google Sheets", src: "/logo/skills/google-sheets.svg" },
      { name: "Jira", src: "/logo/skills/jira.svg" },
    ],
    isCurrent: false,
  },
  {
    id: "unpad-backend-freelance",
    role: "Backend Developer",
    category: "Freelance",
    company: "Padjadjaran University",
    location: "Jatinangor, Indonesia",
    startDate: "2024-02-01",
    endDate: "2024-06-01",
    keypoints: [
      "Built an internal admin dashboard with Filament to streamline day-to-day content and data management.",
      "Implemented queue-based certificate generation in Laravel so hundreds of documents could be processed reliably.",
      "Designed the application data model and relational database structure for maintainable feature delivery.",
      "Delivered backend flows that reduced manual operational work for certificate issuance and admin review.",
    ],
    techStack: [
      { name: "Laravel", src: "/logo/skills/laravel.svg" },
      { name: "PHP", src: "/logo/skills/php.svg" },
      { name: "MySQL", src: "/logo/skills/mysql.svg" },
      { name: "Filament", src: "/logo/skills/filament.svg" },
    ],
    isCurrent: false,
  },
];

export const projects = [
  {
    id: 1,
    imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
    title: "Addo Salon Booking Platform",
    category: "Web App",
    description:
      "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
    tools: [
      {
        name: "TypeScript",
        logo: "/logo/skills/typescript.svg",
      },
      {
        name: "NestJS",
        logo: "/logo/skills/nestjs.svg",
      },
      {
        name: "Next.js",
        logo: "/logo/skills/next.svg",
      },
      {
        name: "MongoDB",
        logo: "/logo/skills/mongodb.svg",
      },
      {
        name: "Mongoose",
        logo: "/logo/skills/mongoose.svg",
      },
      {
        name: "Supabase",
        logo: "/logo/skills/supabase.svg",
      },
      {
        name: "Railway",
        logo: "/logo/skills/railway.svg",
      },
      {
        name: "Midtrans",
        logo: "/logo/skills/midtrans.svg",
      },
    ],
  },
  // {
  //   id: 2,
  //   imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
  //   title: "Addo Salon Booking Platform",
  //   category: "Web App",
  //   description:
  //     "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
  //   tools: [
  //     {
  //       name: "TypeScript",
  //       logo: "/logo/skills/typescript.svg",
  //     },
  //     {
  //       name: "NestJS",
  //       logo: "/logo/skills/nestjs.svg",
  //     },
  //     {
  //       name: "Next.js",
  //       logo: "/logo/skills/next.svg",
  //     },
  //     {
  //       name: "MongoDB",
  //       logo: "/logo/skills/mongodb.svg",
  //     },
  //     {
  //       name: "Mongoose",
  //       logo: "",
  //     },
  //     {
  //       name: "Supabase",
  //       logo: "",
  //     },
  //     {
  //       name: "Railway",
  //       logo: "",
  //     },
  //     {
  //       name: "Midtrans",
  //       logo: "",
  //     },
  //   ],
  // },
  // {
  //   id: 3,
  //   imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
  //   title: "Addo Salon Booking Platform",
  //   category: "Web App",
  //   description:
  //     "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
  //   tools: [
  //     {
  //       name: "TypeScript",
  //       logo: "/logo/skills/typescript.svg",
  //     },
  //     {
  //       name: "NestJS",
  //       logo: "/logo/skills/nestjs.svg",
  //     },
  //     {
  //       name: "Next.js",
  //       logo: "/logo/skills/next.svg",
  //     },
  //     {
  //       name: "MongoDB",
  //       logo: "/logo/skills/mongodb.svg",
  //     },
  //     {
  //       name: "Mongoose",
  //       logo: "",
  //     },
  //     {
  //       name: "Supabase",
  //       logo: "",
  //     },
  //     {
  //       name: "Railway",
  //       logo: "",
  //     },
  //     {
  //       name: "Midtrans",
  //       logo: "",
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
  //   title: "Addo Salon Booking Platform",
  //   category: "Web App",
  //   description:
  //     "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
  //   tools: [
  //     {
  //       name: "TypeScript",
  //       logo: "/logo/skills/typescript.svg",
  //     },
  //     {
  //       name: "NestJS",
  //       logo: "/logo/skills/nestjs.svg",
  //     },
  //     {
  //       name: "Next.js",
  //       logo: "/logo/skills/next.svg",
  //     },
  //     {
  //       name: "MongoDB",
  //       logo: "/logo/skills/mongodb.svg",
  //     },
  //     {
  //       name: "Mongoose",
  //       logo: "",
  //     },
  //     {
  //       name: "Supabase",
  //       logo: "",
  //     },
  //     {
  //       name: "Railway",
  //       logo: "",
  //     },
  //     {
  //       name: "Midtrans",
  //       logo: "",
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
  //   title: "Addo Salon Booking Platform",
  //   category: "Web App",
  //   description:
  //     "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
  //   tools: [
  //     {
  //       name: "TypeScript",
  //       logo: "/logo/skills/typescript.svg",
  //     },
  //     {
  //       name: "NestJS",
  //       logo: "/logo/skills/nestjs.svg",
  //     },
  //     {
  //       name: "Next.js",
  //       logo: "/logo/skills/next.svg",
  //     },
  //     {
  //       name: "MongoDB",
  //       logo: "/logo/skills/mongodb.svg",
  //     },
  //     {
  //       name: "Mongoose",
  //       logo: "",
  //     },
  //     {
  //       name: "Supabase",
  //       logo: "",
  //     },
  //     {
  //       name: "Railway",
  //       logo: "",
  //     },
  //     {
  //       name: "Midtrans",
  //       logo: "",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   imageSrc: "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/banner/service_page.png",
  //   title: "Addo Salon Booking Platform",
  //   category: "Web App",
  //   description:
  //     "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
  //   tools: [
  //     {
  //       name: "TypeScript",
  //       logo: "/logo/skills/typescript.svg",
  //     },
  //     {
  //       name: "NestJS",
  //       logo: "/logo/skills/nestjs.svg",
  //     },
  //     {
  //       name: "Next.js",
  //       logo: "/logo/skills/next.svg",
  //     },
  //     {
  //       name: "MongoDB",
  //       logo: "/logo/skills/mongodb.svg",
  //     },
  //     {
  //       name: "Mongoose",
  //       logo: "",
  //     },
  //     {
  //       name: "Supabase",
  //       logo: "",
  //     },
  //     {
  //       name: "Railway",
  //       logo: "",
  //     },
  //     {
  //       name: "Midtrans",
  //       logo: "",
  //     },
  //   ],
  // },
];

export const project = [
  {
    id: 1,
    title: "Addo Salon Booking Platform",
    category: "Web Application",
    role: "Full Stack Developer",
    description:
      "A comprehensive web application built to digitalize Addo Salon's daily operations. I developed an automated reservation system, integrated a secure payment gateway for seamless online transactions, and built a custom analytics dashboard to track core business metrics.",
    project_url: ["https://github.com/fraamadhan/backend-addo-salon", "https://github.com/fraamadhan/frontend-addo-salon", "https://github.com/fraamadhan/cms-addo-salon"],
    key_highlights: [
      "Engineered robust RESTful APIs using TypeScript and NestJS.",
      "Architected the underlying MongoDB database schema for efficient data storage.",
      "Integrated the Midtrans payment gateway to handle secure, automated financial transactions.",
      "Developed responsive, mobile-first frontend features using NextJS and Tailwind CSS.",
      "Ensured full mobile responsiveness and cross-device compatibility for an optimal user experience.",
    ],
    images: [
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/service%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/service%20detail%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/cart%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/payment%20success.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/detail%20transaction%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/confirm%20payment%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/dashboard%20page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/add_employee_page.png",
      "https://kgvzbxnpitajdvbjxahp.supabase.co/storage/v1/object/public/portfolio/image/project/item/user%20list%20page.png",
    ],
    tools: [
      {
        name: "TypeScript",
        logo: "/logo/skills/typescript.svg",
      },
      {
        name: "NestJS",
        logo: "/logo/skills/nestjs.svg",
      },
      {
        name: "Next.js",
        logo: "/logo/skills/next.svg",
      },
      {
        name: "MongoDB",
        logo: "/logo/skills/mongodb.svg",
      },
      {
        name: "Mongoose",
        logo: "/logo/skills/mongoose.svg",
      },
      {
        name: "Supabase",
        logo: "/logo/skills/supabase.svg",
      },
      {
        name: "Railway",
        logo: "/logo/skills/railway.svg",
      },
      {
        name: "Midtrans",
        logo: "/logo/skills/midtrans.svg",
      },
    ],
  },
];

export const testimonials: TestimonialItemProps[] = [
  {
    id: "1",
    author: "Nadia Pratama",
    role: "Product Designer",
    institution: "Studio Product Team",
    quote: "Fakhri turns messy product ideas into interfaces that feel sharp, useful, and production-ready fast.",
    tag: "Design sync",
  },
  {
    id: "2",
    author: "Rizky Mahendra",
    role: "Frontend Engineer",
    institution: "Frontend Guild",
    quote: "He cares about the tiny interaction details, but he never loses the bigger product goal in the process.",
    tag: "UI polish",
  },
  {
    id: "3",
    author: "Aulia Rahman",
    role: "Engineering Manager",
    institution: "Product Engineering",
    quote: "Reliable under pressure, clear in discussion, and unusually good at turning vague asks into clean delivery.",
    tag: "Execution",
  },
  {
    id: "4",
    author: "Salsa Putri",
    role: "QA Engineer",
    institution: "Quality Assurance Team",
    quote: "The handoff quality is excellent. Edge cases are usually already considered before testing even starts.",
    tag: "Craft",
  },
  {
    id: "5",
    author: "Dimas Nugroho",
    role: "Backend Engineer",
    institution: "Platform Team",
    quote: "Working with him feels easy because the frontend decisions stay aligned with system realities and API constraints.",
    tag: "Team flow",
  },
  {
    id: "6",
    author: "Kevin Alvaro",
    role: "Founder",
    institution: "Startup Office",
    quote: "He adds taste to the product without slowing momentum. That balance is harder to find than people think.",
    tag: "Product sense",
  },
  {
    id: "7",
    author: "Intan Lestari",
    role: "Scrum Master",
    institution: "Delivery Team",
    quote: "He communicates blockers early, manages scope well, and still keeps the end result feeling premium.",
    tag: "Ownership",
  },
  {
    id: "8",
    author: "Farel Aditya",
    role: "Mobile Engineer",
    institution: "Mobile Team",
    quote: "Cross-functional discussions with Fakhri are always grounded. He listens first, then proposes practical solutions.",
    tag: "Collaboration",
  },
];
