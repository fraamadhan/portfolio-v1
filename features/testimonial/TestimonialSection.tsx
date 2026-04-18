"use client"

import { FormEvent, useState } from "react"
import { Plus } from "lucide-react"

import { useTranslation } from "@/hooks/useTranslation"
import { TestimonialItemProps } from "@/types"

import {
    getPaginationItems,
    TESTIMONIAL_CARD_ROTATIONS,
    TESTIMONIALS_PER_PAGE,
} from "./constants"
import TestimonialCard from "./components/TestimonialCard"
import TestimonialComposer from "./components/TestimonialComposer"
import TestimonialPagination from "./components/TestimonialPagination"
import {
    createEmptyTestimonialForm,
    createIdleSubmitState,
    TestimonialFormState,
    TestimonialPageData,
} from "./types"

const TestimonialSection = ({ initialData }: { initialData: TestimonialPageData }) => {
    const { t } = useTranslation()
    const translate = (path: string) => t(path) ?? ""
    const [testimonials, setTestimonials] = useState(initialData.testimonials)
    const [page, setPage] = useState(initialData.page)
    const [totalCount, setTotalCount] = useState(initialData.totalCount)
    const [totalPages, setTotalPages] = useState(initialData.totalPages)
    const [isComposerOpen, setIsComposerOpen] = useState(false)
    const [form, setForm] = useState<TestimonialFormState>(createEmptyTestimonialForm)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isPageLoading, setIsPageLoading] = useState(false)
    const [submitState, setSubmitState] = useState(createIdleSubmitState)

    const paginationItems = getPaginationItems(page, totalPages)
    const isSubmitDisabled =
        !form.author.trim() ||
        !form.role.trim() ||
        !form.institution.trim() ||
        !form.tag.trim() ||
        !form.quote.trim()

    const handleFieldChange = (field: keyof TestimonialFormState, value: string) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }))

        if (submitState.type !== "idle") {
            setSubmitState(createIdleSubmitState())
        }
    }

    const loadPage = async (
        targetPage: number,
        options?: {
            force?: boolean
            maxPages?: number
        }
    ) => {
        const safePage = Math.min(Math.max(1, targetPage), Math.max(1, options?.maxPages ?? totalPages))

        if ((!options?.force && safePage === page) || isPageLoading) {
            return
        }

        setIsPageLoading(true)

        try {
            const response = await fetch(
                `/api/testimonials?page=${safePage}&limit=${TESTIMONIALS_PER_PAGE}`,
                { method: "GET" }
            )

            const payload = (await response.json()) as Partial<TestimonialPageData> & { message?: string }

            if (!response.ok || !payload.testimonials || typeof payload.totalPages !== "number" || typeof payload.totalCount !== "number") {
                throw new Error(payload.message ?? "Failed to load testimonials.")
            }

            setTestimonials(payload.testimonials)
            setPage(payload.page ?? safePage)
            setTotalCount(payload.totalCount)
            setTotalPages(payload.totalPages)
        } catch (error) {
            console.error(error)
        } finally {
            setIsPageLoading(false)
        }
    }

    const handlePrev = () => {
        void loadPage(page - 1)
    }

    const handleNext = () => {
        void loadPage(page + 1)
    }

    const handlePageChange = (targetPage: number) => {
        void loadPage(targetPage)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const author = form.author.trim()
        const role = form.role.trim()
        const institution = form.institution.trim()
        const tag = form.tag.trim()
        const quote = form.quote.trim()

        if (!author || !role || !institution || !tag || !quote) {
            return
        }

        setIsSubmitting(true)
        setSubmitState(createIdleSubmitState())

        try {
            const response = await fetch("/api/testimonials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    author,
                    role,
                    institution,
                    tag,
                    quote,
                }),
            })

            const payload = (await response.json()) as {
                message?: string
                testimonial?: TestimonialItemProps
            }

            if (!response.ok || !payload.testimonial) {
                throw new Error(payload.message ?? "Failed to save testimonial.")
            }

            const nextTotalCount = totalCount + 1
            const nextTotalPages = Math.max(1, Math.ceil(nextTotalCount / TESTIMONIALS_PER_PAGE))

            setTotalCount(nextTotalCount)
            setTotalPages(nextTotalPages)

            if (page === 1) {
                setTestimonials((current) => [payload.testimonial as TestimonialItemProps, ...current].slice(0, TESTIMONIALS_PER_PAGE))
            } else {
                setTestimonials([payload.testimonial as TestimonialItemProps])
            }

            setPage(1)
            setForm(createEmptyTestimonialForm())
            setIsComposerOpen(false)
            setSubmitState({
                type: "success",
                message: translate("testimonial_section.composer.submit_success"),
            })

            if (page !== 1) {
                await loadPage(1, {
                    force: true,
                    maxPages: nextTotalPages,
                })
            }
        } catch (error) {
            console.error(error)
            setSubmitState({
                type: "error",
                message: translate("testimonial_section.composer.submit_error"),
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section
            id="testimonials"
            aria-labelledby="testimonials-heading"
            className="relative flex w-full justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(134,172,214,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(236,205,132,0.12),transparent_26%),linear-gradient(180deg,var(--color-neutral-700),var(--color-neutral-600))] px-4 py-20 sm:min-h-[calc(90svh-5rem)] sm:pt-20 md:px-6 md:pb-12"
        >
            <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute left-[-8%] top-24 h-56 w-56 rounded-full bg-primary-200/8 blur-3xl" />
                <div className="absolute bottom-16 right-[-6%] h-64 w-64 rounded-full bg-[#d5a650]/10 blur-3xl" />
            </div>

            <div className="relative flex w-full max-w-6xl flex-col items-center gap-10">
                <div className="max-w-3xl text-center">
                    <p className="font-sub-heading text-sm uppercase tracking-[0.4em] text-primary-100/70">
                        {translate("testimonial_section.eyebrow")}
                    </p>
                    <h2
                        id="testimonials-heading"
                        className="mt-3 font-sub-heading text-4xl tracking-wide text-gradient-skills font-bold sm:text-5xl"
                    >
                        {translate("navbar.testimonials")}
                    </h2>
                    <p className="max-w-3xl mt-2 rounded-2xl border border-white/12 bg-white/6 px-6 py-4 text-center text-sm leading-7 text-neutral-200 shadow-[0_18px_45px_rgba(4,10,18,0.22)] backdrop-blur-sm sm:text-base">
                        {translate("testimonial_section.description")}
                    </p>
                </div>

                <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,360px)] xl:items-start">
                    <TestimonialComposer
                        form={form}
                        isOpen={isComposerOpen}
                        isSubmitDisabled={isSubmitDisabled}
                        isSubmitting={isSubmitting}
                        statusMessage={submitState.message}
                        statusTone={submitState.type}
                        copy={{
                            eyebrow: translate("testimonial_section.composer.eyebrow"),
                            title: translate("testimonial_section.composer.title"),
                            openButton: translate("testimonial_section.composer.open_button"),
                            nameLabel: translate("testimonial_section.composer.name_label"),
                            namePlaceholder: translate("testimonial_section.composer.name_placeholder"),
                            roleLabel: translate("testimonial_section.composer.role_label"),
                            rolePlaceholder: translate("testimonial_section.composer.role_placeholder"),
                            institutionLabel: translate("testimonial_section.composer.institution_label"),
                            institutionPlaceholder: translate("testimonial_section.composer.institution_placeholder"),
                            tagLabel: translate("testimonial_section.composer.tag_label"),
                            tagDescription: translate("testimonial_section.composer.tag_description"),
                            tagPlaceholder: translate("testimonial_section.composer.tag_placeholder"),
                            quoteLabel: translate("testimonial_section.composer.quote_label"),
                            quotePlaceholder: translate("testimonial_section.composer.quote_placeholder"),
                            closeButton: translate("testimonial_section.composer.close_button"),
                            submitButton: translate("testimonial_section.composer.submit_button"),
                            submittingButton: translate("testimonial_section.composer.submitting_button"),
                            footerNote: translate("testimonial_section.composer.footer_note"),
                        }}
                        onOpen={() => setIsComposerOpen(true)}
                        onClose={() => setIsComposerOpen(false)}
                        onSubmit={handleSubmit}
                        onFieldChange={handleFieldChange}
                    />

                    <div className="order-2 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(50,66,87,0.92),rgba(29,38,50,0.96))] p-5 shadow-[0_28px_65px_rgba(4,10,18,0.28)] sm:p-7 xl:order-1">
                        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.35em] text-primary-100/65">
                                    {translate("testimonial_section.list_eyebrow")}
                                </p>
                                <h3 className="mt-2 font-sub-heading text-2xl tracking-wide text-neutral-100 sm:text-3xl">
                                    {translate("testimonial_section.list_title")}
                                </h3>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <div className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm text-neutral-200">
                                    {totalCount} {translate("testimonial_section.notes_archived")}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsComposerOpen((current) => !current)}
                                    className="inline-flex items-center gap-2 rounded-full border border-primary-100/35 bg-[linear-gradient(180deg,rgba(128,161,201,0.28),rgba(61,83,110,0.34))] px-4 py-2 text-sm font-medium text-neutral-100 transition hover:-translate-y-0.5 hover:border-primary-100/55"
                                >
                                    <Plus className="h-4 w-4" />
                                    {isComposerOpen
                                        ? translate("testimonial_section.toggle_close")
                                        : translate("testimonial_section.toggle_open")}
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    rotationClassName={TESTIMONIAL_CARD_ROTATIONS[index % TESTIMONIAL_CARD_ROTATIONS.length]}
                                />
                            ))}
                        </div>

                        <TestimonialPagination
                            page={page}
                            totalPages={totalPages}
                            items={paginationItems}
                            isLoading={isPageLoading}
                            copy={{
                                pageLabel: translate("testimonial_section.pagination.page"),
                                ofLabel: translate("testimonial_section.pagination.of"),
                                previousAriaLabel: translate("testimonial_section.pagination.previous_aria"),
                                nextAriaLabel: translate("testimonial_section.pagination.next_aria"),
                            }}
                            onPrev={handlePrev}
                            onNext={handleNext}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TestimonialSection
