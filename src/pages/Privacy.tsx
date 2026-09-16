import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { profile } from "@/lib/profile";
import Footer from "@/components/Footer";

const Block = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mt-10">
    <h2 className="text-base font-semibold">{title}</h2>
    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
      {children}
    </div>
  </section>
);

const Privacy = () => (
  <div className="min-h-screen">
    <Helmet>
      <title>Privacy & Cookie Policy — FD</title>
      <meta
        name="description"
        content="How this personal portfolio handles contact form data, spam protection and cookies. No analytics, no tracking, no advertising."
      />
      <link rel="canonical" href="https://fd-portfolio.site/privacy" />
      <meta property="og:title" content="Privacy & Cookie Policy — FD" />
      <meta property="og:url" content="https://fd-portfolio.site/privacy" />
    </Helmet>

    <main className="wrap py-16 sm:py-24">
      <Link to="/" className="link-underline inline-flex items-center gap-2 font-mono text-[12.5px]">
        <ArrowLeft className="h-3.5 w-3.5" /> Back
      </Link>

      <p className="eyebrow mt-10">Legal</p>
      <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Privacy &amp; Cookie Policy</h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
        This is a personal, non-commercial portfolio. It sells nothing, shows no ads and profiles
        nobody. The only personal data it can receive is what you choose to type into the contact
        form.
      </p>

      <div className="max-w-2xl">
        <Block title="Who is responsible">
          <p>
            This site is operated by an individual publishing under the name “FD”. For any privacy
            request, write to{" "}
            <a className="link-underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
        </Block>

        <Block title="What data is collected">
          <p>
            Only through the contact form: the name, email address and message you submit. Nothing
            else is requested, and no account, profile or newsletter list exists.
          </p>
          <p>
            Purpose: replying to your message. Legal basis: your consent, given when you tick the
            box and send the form. The message is kept only as long as needed for the conversation
            and then deleted.
          </p>
        </Block>

        <Block title="Spam protection and delivery">
          <p>
            The form is protected by hCaptcha, which processes technical data (including your IP
            address) to tell humans from bots, and the sender's email domain is checked against
            public DNS records to reject invented addresses. Messages are delivered by email through
            the hosting backend. These providers act as processors and receive no data for their own
            marketing.
          </p>
        </Block>

        <Block title="Cookies">
          <p>
            No analytics, advertising or profiling cookies are used, and there is no visitor
            tracking, so no cookie banner is required. The browser's local storage holds two purely
            technical values: your light/dark theme choice and a counter that limits how many
            messages can be sent per hour. Both stay on your device and are never sent anywhere.
            hCaptcha may set its own technical cookies when the challenge loads.
          </p>
        </Block>

        <Block title="Third-party services">
          <p>
            Fonts are loaded from Google Fonts, the spam challenge from hCaptcha, and the site is
            served through its hosting provider. Outbound links (GitHub, LinkedIn, Gumroad) lead to
            services with their own privacy policies.
          </p>
        </Block>

        <Block title="Your rights">
          <p>
            Under the GDPR you can ask for access, correction, deletion, restriction or portability
            of your data, and withdraw consent at any time. One email to the address above is
            enough; you also have the right to complain to your national data protection authority.
          </p>
        </Block>

        <Block title="Content and images">
          <p>
            Text, screenshots and project material on this site are original work. Descriptions of
            labs and projects reflect what was actually built and tested; nothing is presented as a
            commercial product, certification or guaranteed result.
          </p>
        </Block>

        <p className="mt-10 font-mono text-[12px] text-muted-foreground">
          Last updated: September 2026
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default Privacy;
