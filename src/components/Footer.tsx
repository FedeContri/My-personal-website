import { profile } from "@/lib/profile";

const Footer = () => (
  <footer className="border-t border-border py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-10">
    <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[11.5px] text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0"
        >
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0">
          Email
        </a>
        {profile.cvUrl && (
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center transition-colors hover:text-foreground sm:min-h-0"
          >
            CV
          </a>
        )}
      </div>
    </div>
  </footer>
);

export default Footer;
