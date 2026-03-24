import { Button } from "@/components/ui/button";
import InfoItem from "@/components/ui/InfoItem";
import { currentWorkRoleFormatted } from "@/lib";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans px-6">
      <main className="flex w-full max-w-3xl flex-col items-center gap-12 sm:px-8">

        <section className="flex flex-col gap-4 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Turning Ideas Into Production Systems
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Fakhri Fajar Ramadhan
          </h1>

          <p className="text-lg sm:text-2xl font-medium text-foreground">
            {currentWorkRoleFormatted()}
          </p>

          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed md:text-lg">
            I specialize in building user-centered web and mobile applications,
            occasionally designing when needed, and handling DevOps to ensure
            smooth delivery.
          </p>
        </section>

        <section className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm sm:text-lg text-muted-foreground">
            Current Professional Status
          </p>

          <div className="flex flex-col gap-4 md:flex-row">
            <InfoItem label="Current Role" value="Back-End Developer" />
            <InfoItem label="Based In" value="Indonesia" />
            <InfoItem label="Status" value="Internship" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row gap-4">
          <Button className="px-6 h-10 text-sm sm:text-base bg-gradient-to-r from-[#4B657F] to-[#678EBC]">
            View Projects
          </Button>

          <Button
            variant="outline"
            className="px-6 h-10 text-sm sm:text-base hover:text-background"
          >
            Contact Me
          </Button>
        </section>

      </main>
    </div>
  );
}