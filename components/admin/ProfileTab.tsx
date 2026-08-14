import React from 'react'
import { Plus, Trash2, Upload, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import RichTextEditor from './RichTextEditor'
import { getFileUrl } from './utils'

interface ProfileTabProps {
  userData: any
  setUserData: React.Dispatch<React.SetStateAction<any>>
  activeLanguageForm: 'en' | 'id'
  setActiveLanguageForm: (lang: 'en' | 'id') => void
  uploading: string | null
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    options: { isUser?: boolean; fieldName: string; index?: number; subFieldName?: string }
  ) => Promise<void>
  setPreviewModalContent: (val: string) => void
}

export default function ProfileTab({
  userData,
  setUserData,
  activeLanguageForm,
  setActiveLanguageForm,
  uploading,
  handleFileUpload,
  setPreviewModalContent
}: ProfileTabProps) {
  const [justUploaded, setJustUploaded] = React.useState(false)
  const [photoUploaded, setPhotoUploaded] = React.useState(false)
  const prevResumeRef = React.useRef(userData.resume?.asset?._ref)
  const prevPhotoRef = React.useRef(userData.profileImage?.asset?._ref)

  React.useEffect(() => {
    if (userData.resume?.asset?._ref && userData.resume.asset._ref !== prevResumeRef.current) {
      setJustUploaded(true)
      prevResumeRef.current = userData.resume.asset._ref
    }
  }, [userData.resume])

  React.useEffect(() => {
    if (userData.profileImage?.asset?._ref && userData.profileImage.asset._ref !== prevPhotoRef.current) {
      setPhotoUploaded(true)
      prevPhotoRef.current = userData.profileImage.asset._ref
    }
  }, [userData.profileImage])

  return (
    <div className="space-y-8">
      {/* Language Toggle Bar */}
      <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveLanguageForm('en')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${activeLanguageForm === 'en' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setActiveLanguageForm('id')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition cursor-pointer ${activeLanguageForm === 'id' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
          >
            Bahasa Indonesia (ID)
          </button>
        </div>
        <span className="text-xs text-slate-500">Toggle to switch language inputs across Bio, Description, and CTA sections.</span>
      </div>

      <div className="flex flex-col gap-6 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60">
        {/* Profile Photo Uploader */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-950/40 rounded-xl border border-slate-800/40">
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-900 border-2 border-slate-800 flex items-center justify-center">
            {getFileUrl(userData.profileImage) ? (
              <img
                src={getFileUrl(userData.profileImage)}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-xs text-slate-500 font-semibold uppercase text-center p-2 font-inter">
                No Photo
              </div>
            )}
          </div>
          
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-200">Profile Photo</h4>
            <p className="text-xs text-slate-500">Upload a square image. JPG, PNG or WebP. Max 2MB.</p>
            
            <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-bold text-slate-300 rounded-lg cursor-pointer transition">
              {uploading === 'profileImage' ? (
                <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin" />
              ) : (
                <Upload className="w-3.5 h-3.5 text-teal-400" />
              )}
              <span>{uploading === 'profileImage' ? 'Uploading Photo...' : 'Upload New Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, { isUser: true, fieldName: 'profileImage' })}
                className="hidden"
              />
            </label>

            {photoUploaded && (
              <div className="text-xs text-teal-400 flex items-center gap-1.5 font-semibold mt-1">
                <CheckCircle className="w-4 h-4" /> Photo Uploaded successfully
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
          <input
            type="text"
            value={userData.name || ''}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slug (Unique Link)</label>
            {userData.slug?.current && (
              <a
                href={`${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/${userData.slug.current}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-350 font-bold transition duration-200 group cursor-pointer"
              >
                <span>Visit Live Portfolio</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
          <input
            type="text"
            value={userData.slug?.current || ''}
            onChange={(e) =>
              setUserData({
                ...userData,
                slug: { _type: 'slug', current: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') }
              })
            }
            placeholder="e.g. timun-wahyu"
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:border-teal-500 focus:outline-none"
          />
        </div>

        {/* Professional Past Roles */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Past Roles</label>
            <button
              type="button"
              onClick={() =>
                setUserData((prev: any) => ({
                  ...prev,
                  pastRoles: [...(prev.pastRoles || []), '']
                }))
              }
              className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 hover:bg-teal-500/20 border border-teal-500/20 text-teal-400 font-bold rounded-lg cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
            {(!userData.pastRoles || userData.pastRoles.length === 0) && (
              <p className="text-xs text-slate-500 italic text-center py-2">No past roles added yet.</p>
            )}
            {userData.pastRoles?.map((role: string, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    const arr = [...userData.pastRoles]
                    arr[idx] = e.target.value
                    setUserData({ ...userData, pastRoles: arr })
                  }}
                  placeholder="e.g. Lead Backend Engineer at Google"
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:border-teal-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const arr = userData.pastRoles.filter((_: any, i: number) => i !== idx)
                    setUserData({ ...userData, pastRoles: arr })
                  }}
                  className="p-2 text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Upload */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">File Attachment (CV / Resume)</h3>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-850 hover:bg-slate-855/80 border border-slate-800 cursor-pointer text-sm font-semibold transition">
            {uploading === 'resume' ? (
              <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 text-teal-400" />
            )}
            <span>{uploading === 'resume' ? 'Uploading CV...' : 'Upload PDF Resume'}</span>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileUpload(e, { isUser: true, fieldName: 'resume' })}
              className="hidden"
            />
          </label>
          {getFileUrl(userData.resume) && (
            <div className="flex items-center gap-4">
              {justUploaded && (
                <span className="text-xs text-teal-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle className="w-4 h-4" /> CV / Resume Uploaded successfully
                </span>
              )}
              <a
                href={getFileUrl(userData.resume)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 hover:bg-teal-500/20 text-teal-400 text-xs font-bold transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Active PDF</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Social Medias */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">Social Medias</h3>
          <button
            type="button"
            onClick={() =>
              setUserData((prev: any) => ({
                ...prev,
                socialMedias: [...(prev.socialMedias || []), { platform: 'linkedin', url: '' }]
              }))
            }
            className="flex items-center gap-1.5 px-3 py-1 text-xs bg-teal-500/15 hover:bg-teal-500/20 border border-teal-500/20 text-teal-400 font-bold rounded-lg cursor-pointer transition"
          >
            <Plus className="w-3.5 h-3.5" /> Add Social Media
          </button>
        </div>

        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-4">
          {(!userData.socialMedias || userData.socialMedias.length === 0) && (
            <p className="text-xs text-slate-500 italic text-center py-2">No social media links added yet.</p>
          )}
          {userData.socialMedias?.map((social: any, idx: number) => (
            <div key={idx} className="space-y-3 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl relative">
              <button
                type="button"
                onClick={() => {
                  const arr = userData.socialMedias.filter((_: any, i: number) => i !== idx)
                  setUserData({ ...userData, socialMedias: arr })
                }}
                className="absolute top-3 right-3 p-1.5 text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg transition cursor-pointer"
                title="Remove Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Platform</label>
                  <select
                    value={social.platform || 'linkedin'}
                    onChange={(e) => {
                      const arr = [...userData.socialMedias]
                      arr[idx] = { ...arr[idx], platform: e.target.value }
                      if (e.target.value !== 'custom') {
                        delete arr[idx].customIcon
                        delete arr[idx].customName
                      }
                      setUserData({ ...userData, socialMedias: arr })
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:border-teal-500 focus:outline-none cursor-pointer"
                  >
                    <option value="linkedin">LinkedIn</option>
                    <option value="github">GitHub</option>
                    <option value="instagram">Instagram</option>
                    <option value="email">Email</option>
                    <option value="facebook">Facebook</option>
                    <option value="tiktok">TikTok</option>
                    <option value="custom">Other (Custom)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">URL or Username</label>
                  <input
                    type="text"
                    value={social.url || ''}
                    onChange={(e) => {
                      const arr = [...userData.socialMedias]
                      arr[idx] = { ...arr[idx], url: e.target.value }
                      setUserData({ ...userData, socialMedias: arr })
                    }}
                    placeholder={social.platform === 'email' ? 'e.g. email@example.com' : 'e.g. https://linkedin.com/in/...'}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              {social.platform === 'custom' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Custom Platform Name</label>
                  <input
                    type="text"
                    value={social.customName || ''}
                    onChange={(e) => {
                      const arr = [...userData.socialMedias]
                      arr[idx] = { ...arr[idx], customName: e.target.value }
                      setUserData({ ...userData, socialMedias: arr })
                    }}
                    placeholder="e.g. YouTube, Twitter, Threads"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:border-teal-500 focus:outline-none"
                  />
                </div>
              )}

              {social.platform === 'custom' && (
                <div className="pt-2 border-t border-slate-850 flex items-center gap-4 flex-wrap">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 cursor-pointer text-xs font-semibold transition">
                    {uploading === `socialMedias-customIcon-${idx}` ? (
                      <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-teal-400" />
                    )}
                    <span>{uploading === `socialMedias-customIcon-${idx}` ? 'Uploading Icon...' : 'Upload Custom Icon (SVG/WebP)'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, {
                        isUser: true,
                        fieldName: 'socialMedias',
                        index: idx,
                        subFieldName: 'customIcon'
                      })}
                      className="hidden"
                    />
                  </label>
                  {getFileUrl(social.customIcon) && (
                    <div className="flex items-center gap-3">
                      <img
                        src={getFileUrl(social.customIcon)}
                        alt="Custom Icon Preview"
                        className="w-8 h-8 object-contain rounded bg-white p-1 border border-slate-800"
                      />
                      <span className="text-xs text-teal-400 flex items-center gap-1.5 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Uploaded successfully
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Professional Status */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">Professional Status</h3>
        <div className="grid grid-cols-2 gap-4 bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60">
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Current Role</label>
            <input
              type="text"
              value={userData.professionalStatus?.role || ''}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  professionalStatus: { ...userData.professionalStatus, role: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Location (City, Country)</label>
            <input
              type="text"
              value={userData.professionalStatus?.location || ''}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  professionalStatus: { ...userData.professionalStatus, location: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-400">Status text (e.g. Open to work)</label>
            <input
              type="text"
              value={userData.professionalStatus?.status || ''}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  professionalStatus: { ...userData.professionalStatus, status: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-teal-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs text-slate-400 block mb-1">Availability</label>
            <div className="flex items-center gap-3 h-11 bg-slate-950 border border-slate-800 px-4 rounded-xl">
              <input
                type="checkbox"
                id="availActive"
                checked={userData.professionalStatus?.isActive ?? false}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    professionalStatus: { ...userData.professionalStatus, isActive: e.target.checked }
                  })
                }
                className="w-4 h-4 rounded border-slate-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-slate-950"
              />
              <label htmlFor="availActive" className="text-xs text-slate-300 font-semibold cursor-pointer">
                Show professional status block in layout
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Slogans & Taglines */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">Slogans & Taglines</h3>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-4">
          {activeLanguageForm === 'en' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Landing Page Hero Slogan (EN)</label>
                <input
                  type="text"
                  value={userData.landingSlogan?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      landingSlogan: { ...userData.landingSlogan, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Skills Section Headline (EN)</label>
                <input
                  type="text"
                  value={userData.skillsSlogan?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      skillsSlogan: { ...userData.skillsSlogan, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Experience Section Headline (EN)</label>
                <input
                  type="text"
                  value={userData.experienceSlogan?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      experienceSlogan: { ...userData.experienceSlogan, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Projects Section Headline (EN)</label>
                <input
                  type="text"
                  value={userData.projectsSlogan?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      projectsSlogan: { ...userData.projectsSlogan, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Landing Page Hero Slogan (ID)</label>
                <input
                  type="text"
                  value={userData.landingSlogan?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      landingSlogan: { ...userData.landingSlogan, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Skills Section Headline (ID)</label>
                <input
                  type="text"
                  value={userData.skillsSlogan?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      skillsSlogan: { ...userData.skillsSlogan, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Experience Section Headline (ID)</label>
                <input
                  type="text"
                  value={userData.experienceSlogan?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      experienceSlogan: { ...userData.experienceSlogan, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Projects Section Headline (ID)</label>
                <input
                  type="text"
                  value={userData.projectsSlogan?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      projectsSlogan: { ...userData.projectsSlogan, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bios & Rich Text Descriptions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">Biography & Deep Stories</h3>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-6">
          {activeLanguageForm === 'en' ? (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Short Bio / Tagline (EN)</label>
              <textarea
                rows={2}
                value={userData.shortDescription?.en || ''}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    shortDescription: { ...userData.shortDescription, en: e.target.value, _type: 'localeString' }
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>
          ) : (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Short Bio / Tagline (ID)</label>
              <textarea
                rows={2}
                value={userData.shortDescription?.id || ''}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    shortDescription: { ...userData.shortDescription, id: e.target.value, _type: 'localeString' }
                  })
                }
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-teal-500 resize-none"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Full Description (Bio Details / About page)
            </label>
            {activeLanguageForm === 'en' ? (
              <RichTextEditor
                value={userData.fullDescription?.en || ''}
                onChange={(val) =>
                  setUserData({
                    ...userData,
                    fullDescription: { ...userData.fullDescription, en: val, _type: 'localeBlock' }
                  })
                }
                activeTab="profile"
                editingItem={{ name: 'profile-story' }}
                setPreviewModalContent={setPreviewModalContent}
              />
            ) : (
              <RichTextEditor
                value={userData.fullDescription?.id || ''}
                onChange={(val) =>
                  setUserData({
                    ...userData,
                    fullDescription: { ...userData.fullDescription, id: val, _type: 'localeBlock' }
                  })
                }
                activeTab="profile"
                editingItem={{ name: 'profile-story' }}
                setPreviewModalContent={setPreviewModalContent}
              />
            )}
          </div>
        </div>
      </div>

      {/* Open Collaboration CTA Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-teal-400/80 tracking-wide uppercase">Open Collaboration Invitation</h3>
        <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/60 space-y-4">
          {activeLanguageForm === 'en' ? (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Collaboration Heading (EN)</label>
                <input
                  type="text"
                  value={userData.collaborationTitle?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      collaborationTitle: { ...userData.collaborationTitle, en: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Collaboration Description (EN)</label>
                <textarea
                  rows={2}
                  value={userData.collaborationDescription?.en || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      collaborationDescription: {
                        ...userData.collaborationDescription,
                        en: e.target.value,
                        _type: 'localeString'
                      }
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Collaboration Heading (ID)</label>
                <input
                  type="text"
                  value={userData.collaborationTitle?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      collaborationTitle: { ...userData.collaborationTitle, id: e.target.value, _type: 'localeString' }
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Collaboration Description (ID)</label>
                <textarea
                  rows={2}
                  value={userData.collaborationDescription?.id || ''}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      collaborationDescription: {
                        ...userData.collaborationDescription,
                        id: e.target.value,
                        _type: 'localeString'
                      }
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
