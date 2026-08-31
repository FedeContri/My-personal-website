import { profile } from "@/lib/profile";

const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="wrap flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-mono text-[11.5px] text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </p>
      <div className="flex flex-wrap gap-6 font-mono text-[11.5px] text-muted-foreground">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-foreground"
        >
          LinkedIn
        </a>
        <a href={`mailto:${profile.email}`} className="transition-colors hover:text-foreground">
          Email
        </a>
        {profile.cvUrl && (
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            CV
          </a>
        )}
      </div>
    </div>
  </footer>
);

export default Footer;
