"use client";

import { FormEvent, useId } from "react";
import { Plus } from "lucide-react";

import { TestimonialFormState } from "../types";

type TestimonialComposerProps = {
  form: TestimonialFormState;
  isOpen: boolean;
  isSubmitDisabled: boolean;
  isSubmitting: boolean;
  statusMessage: string;
  statusTone: "idle" | "success" | "error";
  copy: {
    eyebrow: string;
    title: string;
    openButton: string;
    nameLabel: string;
    namePlaceholder: string;
    roleLabel: string;
    rolePlaceholder: string;
    institutionLabel: string;
    institutionPlaceholder: string;
    tagLabel: string;
    tagDescription: string;
    tagPlaceholder: string;
    quoteLabel: string;
    quotePlaceholder: string;
    closeButton: string;
    submitButton: string;
    submittingButton: string;
    footerNote: string;
  };
  onClose: () => void;
  onOpen: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: keyof TestimonialFormState, value: string) => void;
};

const TestimonialComposer = ({
  form,
  isOpen,
  isSubmitDisabled,
  isSubmitting,
  statusMessage,
  statusTone,
  copy,
  onClose,
  onOpen,
  onSubmit,
  onFieldChange,
}: TestimonialComposerProps) => {
  const authorId = useId();
  const roleId = useId();
  const institutionId = useId();
  const tagId = useId();
  const quoteId = useId();

  return (
    <aside className="order-1 relative mx-auto w-full max-w-sm xl:order-2 xl:sticky xl:top-28">
      <div className="pointer-events-none absolute -top-2 left-8 h-7 w-20 rotate-[-7deg] rounded-sm bg-white/30 shadow-[0_8px_18px_rgba(0,0,0,0.15)]" />
      <div className="pointer-events-none absolute -top-1 right-10 h-6 w-16 rotate-[9deg] rounded-sm bg-[#f8efd6]/35 shadow-[0_8px_18px_rgba(0,0,0,0.15)]" />

      <div className="relative overflow-hidden rounded-[28px] border-2 border-[#765321]/45 bg-[radial-gradient(circle_at_top_left,rgba(255,249,223,0.72),transparent_26%),radial-gradient(circle_at_80%_25%,rgba(99,52,12,0.12),transparent_20%),repeating-linear-gradient(180deg,rgba(92,60,17,0.06),rgba(92,60,17,0.06)_1px,transparent_1px,transparent_14px),linear-gradient(180deg,rgba(244,221,166,0.98),rgba(198,157,89,0.95))] p-6 text-[#3b2712] shadow-[0_26px_58px_rgba(24,16,5,0.32)] sm:p-7">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute inset-x-6 top-0 h-px bg-[#fff4d1]/50" />
          <div className="absolute inset-y-0 right-7 w-px bg-[#77531f]/10" />
        </div>

        <div className="relative">
          <p className="font-sub-heading text-xs uppercase tracking-[0.38em] text-[#6b4a18]/75">
            {copy.eyebrow}
          </p>
          <h3 className="mt-2 font-heading text-4xl uppercase leading-none tracking-wide text-[#432a11]">
            {copy.title}
          </h3>

          {!isOpen && (
            <button
              type="button"
              onClick={onOpen}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#6f4b18]/35 bg-[#fff2c7]/75 px-4 py-2 text-sm font-medium text-[#3b2712] shadow-[0_10px_18px_rgba(82,53,16,0.14)] transition hover:-translate-y-0.5 hover:bg-[#fff4cf]"
            >
              <Plus className="h-4 w-4" />
              {copy.openButton}
            </button>
          )}

          {isOpen && (
            <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
              {/* Honeypot field to catch spam bots */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.honeypot}
                  onChange={(event) => onFieldChange("honeypot", event.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor={authorId}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4a18]/80"
                >
                  {copy.nameLabel}
                </label>
                <input
                  id={authorId}
                  type="text"
                  value={form.author}
                  onChange={(event) => onFieldChange("author", event.target.value)}
                  placeholder={copy.namePlaceholder}
                  className="w-full rounded-[18px] border border-[#6f4b18]/25 bg-[#fff7dc]/85 px-4 py-3 text-sm text-[#2f1f0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-[#7e623d]/65 focus:border-[#6f4b18]/55 focus:bg-[#fff9e6]"
                  maxLength={48}
                />
              </div>

              <div>
                <label
                  htmlFor={roleId}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4a18]/80"
                >
                  {copy.roleLabel}
                </label>
                <input
                  id={roleId}
                  type="text"
                  value={form.role}
                  onChange={(event) => onFieldChange("role", event.target.value)}
                  placeholder={copy.rolePlaceholder}
                  className="w-full rounded-[18px] border border-[#6f4b18]/25 bg-[#fff7dc]/85 px-4 py-3 text-sm text-[#2f1f0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-[#7e623d]/65 focus:border-[#6f4b18]/55 focus:bg-[#fff9e6]"
                  maxLength={60}
                />
              </div>

              <div>
                <label
                  htmlFor={institutionId}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4a18]/80"
                >
                  {copy.institutionLabel}
                </label>
                <input
                  id={institutionId}
                  type="text"
                  value={form.institution}
                  onChange={(event) => onFieldChange("institution", event.target.value)}
                  placeholder={copy.institutionPlaceholder}
                  className="w-full rounded-[18px] border border-[#6f4b18]/25 bg-[#fff7dc]/85 px-4 py-3 text-sm text-[#2f1f0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-[#7e623d]/65 focus:border-[#6f4b18]/55 focus:bg-[#fff9e6]"
                  maxLength={80}
                />
              </div>

              <div>
                <label
                  htmlFor={tagId}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4a18]/80"
                >
                  {copy.tagLabel}
                </label>
                <p className="mb-2 text-xs leading-5 text-[#6b4a18]/70">
                  {copy.tagDescription}
                </p>
                <input
                  id={tagId}
                  type="text"
                  value={form.tag}
                  onChange={(event) => onFieldChange("tag", event.target.value)}
                  placeholder={copy.tagPlaceholder}
                  className="w-full rounded-[18px] border border-[#6f4b18]/25 bg-[#fff7dc]/85 px-4 py-3 text-sm text-[#2f1f0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-[#7e623d]/65 focus:border-[#6f4b18]/55 focus:bg-[#fff9e6]"
                  maxLength={28}
                />
              </div>

              <div>
                <label
                  htmlFor={quoteId}
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-[#6b4a18]/80"
                >
                  {copy.quoteLabel}
                </label>
                <textarea
                  id={quoteId}
                  value={form.quote}
                  onChange={(event) => onFieldChange("quote", event.target.value)}
                  placeholder={copy.quotePlaceholder}
                  rows={5}
                  className="w-full rounded-[20px] border border-dashed border-[#6f4b18]/35 bg-[#fff7dc]/88 px-4 py-3 text-sm leading-6 text-[#2f1f0d] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] outline-none transition placeholder:text-[#7e623d]/65 focus:border-[#6f4b18]/60 focus:bg-[#fff9e6]"
                  maxLength={240}
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="rounded-full border border-[#6f4b18]/30 px-4 py-2 text-sm text-[#5b3d14] transition hover:bg-[#fff0c0]/45"
                >
                  {copy.closeButton}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitDisabled || isSubmitting}
                  className="rounded-full border border-[#50340f]/25 bg-[#3b2712] px-5 py-2 text-sm font-medium text-[#f7e7b4] shadow-[0_12px_20px_rgba(62,40,12,0.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {isSubmitting ? copy.submittingButton : copy.submitButton}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 border-t border-[#7d5928]/20 pt-4 text-xs uppercase tracking-[0.28em] text-[#6b4a18]/65">
            {copy.footerNote}
          </div>

          {statusMessage && (
            <p
              className={`mt-3 text-sm leading-6 ${
                statusTone === "error"
                  ? "text-[#8a3218]"
                  : statusTone === "success"
                    ? "text-[#36551f]"
                    : "text-[#6b4a18]/75"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default TestimonialComposer;
