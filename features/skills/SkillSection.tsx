"use client"

import { useState, useEffect } from "react"
import { backendItems, devOpsItems, frontendItems } from "@/data/dummy"
import { useTranslation } from "@/hooks/useTranslation"
import { useLanguage } from "@/context/LanguageContext"

interface Tool {
  _id: string;
  name: string;
  iconUrl: string;
}

interface Skill {
  _id: string;
  title: {
    en?: string;
    id?: string;
  };
  description: {
    en?: string;
    id?: string;
  };
  category: {
    _id: string;
    title: {
      en?: string;
      id?: string;
    };
  };
  tools: Tool[];
}

interface SkillSectionProps {
  initialSkills?: Skill[];
  skillsSlogan?: {
    en?: string;
    id?: string;
  };
}

const SkillSection = ({ initialSkills, skillsSlogan }: SkillSectionProps) => {
  const { t } = useTranslation()
  const { lang } = useLanguage()
  const [hoveredTool, setHoveredTool] = useState<(Tool & { categoryName: string }) | null>(null)
  const [hoveredModalTool, setHoveredModalTool] = useState<Tool | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Map local translation helpers
  const resolveLocale = (field: any) => {
    if (!field) return ""
    return field[lang] || field.id || field.en || ""
  }

  // Set description text based on active language, checking sanity's skillsSlogan first
  const skillsSloganText = skillsSlogan ? (skillsSlogan[lang as keyof typeof skillsSlogan] || skillsSlogan.id || skillsSlogan.en) : null
  const isIndonesian = lang === "id"
  const descriptionText = skillsSloganText || (isIndonesian
    ? "Kumpulan teknologi yang saya gunakan untuk membangun aplikasi yang saya produksi"
    : (t("skills_section.description") || "A collection of tools and technologies I use to build scalable and production-ready applications"))

  // Map dummy items into the same structured format to use as standard fallback
  const dummySkills: Skill[] = [
    {
      _id: "backend",
      title: { en: "Backend Development", id: "Pengembangan Backend" },
      description: { en: "Building reliable APIs, database architectures, and systems.", id: "Membangun API's yang diandalkan, menetapkan arsitektur sistem, dan merancang arsitektur yang skalabel." },
      category: {
        _id: "cat-backend",
        title: { en: "Backend Development", id: "Pengembangan Backend" }
      },
      tools: backendItems.items.map((item: any) => ({
        _id: `tool-be-${item.id}`,
        name: item.name,
        iconUrl: item.src
      }))
    },
    {
      _id: "frontend",
      title: { en: "Frontend Development", id: "Pengembangan Frontend" },
      description: { en: "Building responsive, modern, and accessible user interfaces.", id: "Membangun antarmuka yang responsif, memastikan aksesibilitas, dan memungkinkan pengalaman yang luar biasa bagi pengguna." },
      category: {
        _id: "cat-frontend",
        title: { en: "Frontend Development", id: "Pengembangan Frontend" }
      },
      tools: frontendItems.items.map((item: any) => ({
        _id: `tool-fe-${item.id}`,
        name: item.name,
        iconUrl: item.src
      }))
    },
    {
      _id: "devops",
      title: { en: "DevOps & Infrastructure", id: "DevOps & Infrastruktur" },
      description: { en: "Deploying applications, automating pipelines, and managing cloud systems.", id: "Menyebarkan deployment, mengotomatiskan pipeline CI/CD, dan mengelola infrastruktur cloud, dan merawat seluruh produksi." },
      category: {
        _id: "cat-devops",
        title: { en: "DevOps & Infrastructure", id: "DevOps & Infrastruktur" }
      },
      tools: devOpsItems.items.map((item: any) => ({
        _id: `tool-do-${item.id}`,
        name: item.name,
        iconUrl: item.src
      }))
    }
  ]

  const skills = initialSkills && initialSkills.length > 0 ? initialSkills : dummySkills

  // Extract and deduplicate unique tools for the main consolidated view
  const seen = new Set<string>()
  const uniqueTools: (Tool & { categoryName: string })[] = []

  skills.forEach((skill) => {
    const categoryName = resolveLocale(skill.category?.title)
    if (skill.tools) {
      skill.tools.forEach((tool) => {
        if (tool && !seen.has(tool.name)) {
          seen.add(tool.name)
          uniqueTools.push({
            ...tool,
            categoryName
          })
        }
      })
    }
  })

  // Prevent scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isModalOpen])

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="w-full bg-transparent text-slate-800 dark:text-slate-100 flex flex-col items-center justify-start py-20 px-4 md:px-6 md:pb-12 relative overflow-hidden"
    >
      {/* Stylesheet injection for fonts and marquee animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        
        .animate-marquee-scroll {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        .modal-scroll-container::-webkit-scrollbar {
          width: 5px;
          height: 0px;
        }
        .modal-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.25);
          border-radius: 9999px;
        }
        .modal-scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: rgba(156, 163, 175, 0.4);
        }
        .modal-scroll-container {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.25) transparent;
        }
      `}} />

      {/* Main Title Section styled exactly like "Perjalanan Karir" */}
      <h2
        id="skills-heading"
        className="font-sub-heading text-4xl text-center tracking-wide text-gradient-skills font-bold w-fit mb-4"
      >
        {t("skills_section.expertise_tech_stack")}
      </h2>

      {/* Description paragraph styled exactly like experience description */}
      <p className="max-w-3xl text-center text-sm leading-7 text-slate-600 dark:text-neutral-200 sm:text-base mb-14 font-sans">
        {descriptionText}
      </p>

      {/* Desktop view: Consolidated grid of original brand colored icons (Hidden on Mobile) */}
      <div className="hidden md:flex flex-wrap justify-center items-center gap-6 max-w-4xl px-4 py-4 mb-4">
        {uniqueTools.map((tool) => {
          const isHovered = hoveredTool?._id === tool._id
          return (
            <div
              key={tool._id}
              className="relative flex flex-col items-center cursor-pointer transition-all duration-300 p-1"
              onMouseEnter={() => setHoveredTool(tool)}
              onMouseLeave={() => setHoveredTool(null)}
            >
              {/* Glassmorphic Animated Hover Tooltip directly above the logo */}
              <div
                className={`absolute bottom-16 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none z-20 whitespace-nowrap ${
                  isHovered
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-2 scale-95"
                }`}
              >
                <div className="flex flex-col items-center justify-center bg-slate-900/90 dark:bg-slate-950/95 px-3 py-1.5 rounded-lg border border-slate-700/50 dark:border-slate-800 shadow-xl backdrop-blur-sm">
                  <span className="text-[11px] font-sans font-bold text-white tracking-wide">
                    {tool.name}
                  </span>
                  <span className="text-[9px] font-sans font-normal text-slate-400 mt-0.5">
                    {tool.categoryName}
                  </span>
                </div>
                {/* Tooltip Arrow */}
                <div className="w-1.5 h-1.5 bg-slate-900/90 dark:bg-slate-950/95 border-r border-b border-slate-700/50 dark:border-slate-800 rotate-45 -mt-[3.5px] mx-auto" />
              </div>

              {/* Brighter glassmorphic tile in dark mode (white/[0.15]) and soft gray in light mode */}
              <div
                className="h-12 w-12 flex items-center justify-center bg-white/80 dark:bg-white/[0.15] border border-slate-200 dark:border-white/[0.18] hover:border-slate-400 dark:hover:border-slate-300 rounded-xl transition-all duration-300 transform hover:scale-115 p-2 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.08)] dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]"
              >
                <img
                  src={tool.iconUrl}
                  alt={tool.name}
                  className="h-8 w-8 object-contain transition-all duration-300"
                  style={{
                    filter: isHovered ? "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.25))" : "none"
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile view: Infinite sliding marquee of icons (Hidden on Desktop) */}
      <div className="w-full overflow-hidden relative md:hidden py-3">
        {/* Soft edge blur transitions adapting to light/dark themes */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-[#263544] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-[#263544] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-scroll py-2">
          {Array(3).fill(uniqueTools).flat().map((tool, idx) => (
            <div
              key={`marquee-${tool._id}-${idx}`}
              className="h-10 w-10 flex items-center justify-center flex-shrink-0 bg-white/80 dark:bg-white/[0.15] border border-slate-200 dark:border-white/[0.18] rounded-lg p-2 shadow-sm"
            >
              <img
                src={tool.iconUrl}
                alt={tool.name}
                className="h-6 w-6 object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* View Detail Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-8 px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-500 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 text-xs tracking-wide font-sans font-medium bg-white/80 dark:bg-white/6 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 shadow-sm cursor-pointer"
      >
        {lang === "id" ? "Lihat Detail" : "View Details"}
      </button>

      {/* Figma-Style Detail Modal (Properly layered, compact, and integrated with active dark/light themes) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Translucent Backdrop (keeps page and navbar visible in background context) */}
          <div
            className="fixed inset-0 bg-slate-900/25 dark:bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Compact Modal Card (Max height 80vh, scrollable, themed matching page backgrounds) */}
          <div className="relative w-full max-w-4xl max-h-[80vh] bg-white/95 dark:bg-[#1a2530] border border-slate-200 dark:border-[#2d3a49] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 flex flex-col overflow-hidden animate-fade-in">
            {/* Top edge glow strip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />

            {/* High-Contrast Top-Right Close Circle Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-300 shadow-sm cursor-pointer z-30"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrollable Modal Content Container */}
            <div className="modal-scroll-container overflow-y-auto pr-8 flex-1">
              {/* Header */}
              <div className="text-center mb-8 pt-4">
                <h3 className="font-sub-heading text-2xl sm:text-3xl text-slate-800 dark:text-slate-100 tracking-wide font-bold mb-2 px-10 sm:px-0">
                  {t("skills_section.expertise_tech_stack")}
                </h3>
                <p className="max-w-md mx-auto text-center text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed">
                  {descriptionText}
                </p>
              </div>

              {/* Figma-style stacked category rows (tighter spacing) */}
              <div className="flex flex-col">
                {skills.map((skill, index) => {
                  const numberStr = String(index + 1).padStart(2, "0")
                  const titleStr = resolveLocale(skill.title)
                  const descStr = resolveLocale(skill.description)

                  return (
                    <div
                      key={skill._id}
                      className="grid grid-cols-1 md:grid-cols-[1.3fr_3fr] gap-4 py-6 border-b border-slate-200/80 dark:border-slate-800/80 last:border-b-0 items-start"
                    >
                      {/* Left Column: Number, Title, Description */}
                      <div className="flex flex-col text-left font-sans">
                        <span className="text-[10px] tracking-widest text-slate-400 dark:text-slate-600 font-medium mb-0.5 block">
                          {numberStr}
                        </span>
                        <h4 className="font-sub-heading text-lg sm:text-xl text-slate-800 dark:text-slate-200 mb-1 font-bold">
                          {titleStr}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-sm">
                          {descStr}
                        </p>
                      </div>

                      {/* Right Column: Row of Icons */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        {skill.tools?.map((tool) => {
                          const isToolHovered = hoveredModalTool?._id === tool._id
                          return (
                            <div
                              key={tool._id}
                              className="relative group flex flex-col items-center cursor-pointer p-0.5"
                              onMouseEnter={() => setHoveredModalTool(tool)}
                              onMouseLeave={() => setHoveredModalTool(null)}
                            >
                              <div
                                className="h-10 w-10 flex items-center justify-center bg-white/80 dark:bg-white/[0.12] border border-slate-200 dark:border-white/[0.15] hover:border-slate-400 dark:hover:border-slate-300 rounded-lg transition-all duration-300 transform group-hover:scale-110 p-1.5 shadow-sm hover:shadow-[0_0_10px_rgba(255,255,255,0.06)] dark:hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                              >
                                <img
                                  src={tool.iconUrl}
                                  alt={tool.name}
                                  className="h-7 w-7 object-contain transition-all duration-300"
                                  style={{
                                    filter: isToolHovered ? "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.25))" : "none"
                                  }}
                                />
                              </div>

                              {/* Hover tooltip for name */}
                              <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 whitespace-nowrap">
                                <span className="text-[9px] font-sans tracking-wider text-slate-200 dark:text-slate-300 font-medium bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 shadow-lg">
                                  {tool.name}
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SkillSection;
