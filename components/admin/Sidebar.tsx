import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import {
  User, Briefcase, FolderGit, Heart, Mail, LogOut, Wrench, Award, MessageSquare, Layers, BookOpen, Sparkles, AlertCircle
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  setShowForm: (show: boolean) => void
  setEditingItem: (item: any) => void
  inboxCount: number | null
  session: any
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  setShowForm,
  setEditingItem,
  inboxCount,
  session
}: SidebarProps) {
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profile & Work', icon: User },
    { id: 'categories', label: 'Skill Categories', icon: Layers },
    { id: 'tools-skills', label: 'Tools & Skills', icon: Wrench },
    { id: 'projects', label: 'Projects', icon: FolderGit },
    { id: 'experiences', label: 'Experiences', icon: Briefcase },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'hobbies', label: 'Hobbies & reviews', icon: Heart },
    { id: 'inbox', label: 'Inbox', icon: Mail, badge: inboxCount }
  ]

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Sign Out Confirmation</h3>
            </div>
            <p className="text-sm text-slate-400">Are you sure you want to sign out from the CMS Portal?</p>
            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowSignOutConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/cms/gateway' })}
                className="px-4 py-2 text-sm font-semibold text-white rounded-xl bg-rose-500 hover:bg-rose-600 transition cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-3 bg-slate-950/65 border border-slate-800/80 p-4 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center border border-teal-500/25 text-teal-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Admin Portal</h2>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block">CMS for Portfolio</span>
          </div>
        </div>

        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setShowForm(false)
                  setEditingItem(null)
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </div>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-slate-950 text-teal-400' : 'bg-rose-500/15 text-rose-450 border border-rose-500/10'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-800/80 pt-6 space-y-4">
          {session?.user && (
            <div className="flex items-center gap-3 px-2">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name || 'User'} className="w-9 h-9 rounded-xl object-cover border border-slate-850" />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-850 flex items-center justify-center text-xs font-bold text-slate-400 uppercase">
                  {session.user.name?.charAt(0) || 'U'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-300 truncate">{session.user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{session.user.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
