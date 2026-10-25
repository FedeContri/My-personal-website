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
        This is a personal portfolio. It shows no ads, runs no analytics and profiles nobody. It
        links to one guide sold on Gumroad; any purchase happens on Gumroad, under its terms.
      </p>

      <div className="max-w-2xl">
        <Block title="Who is responsible">
          <p>
            This site is run by an individual publishing under the name “FD”. For any privacy
            request, write to{" "}
            <a className="link-underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            ; identifying details of the data controller are provided on request.
          </p>
        </Block>

        <Block title="Visiting the site">
          <p>
            Like any website, the hosting and network provider (Cloudflare) receives technical data
            such as your IP address and browser details to deliver pages and block abuse. It may set
            a short-lived security cookie (<code>__cf_bm</code>) for bot protection. Fonts are served
            from this site itself, not from Google.
          </p>
        </Block>

        <Block title="Contact form">
          <p>
            If you use the form, the name, email address and message you submit are sent to a
            backend function hosted on Lovable Cloud and forwarded by email through Web3Forms. The
            domain of your email address is checked against public DNS records (Google Public DNS)
            to reject invented addresses. Nothing is stored in a database on this site.
          </p>
          <p>
            Purpose: replying to you. Legal basis: your consent, given when you tick the box and
            send the form. Messages are kept in the mailbox only as long as the conversation needs
            and then deleted. Retention by the providers follows their own policies.
          </p>
        </Block>

        <Block title="Spam check (hCaptcha)">
          <p>
            The form uses hCaptcha to tell people from bots. It is loaded only after you press
            “Load spam check”; until then your browser does not contact hCaptcha. Once loaded,
            hCaptcha processes technical data, including your IP address, and may set its own
            cookies. You can remove it again, or skip the form and email directly.
          </p>
        </Block>

        <Block title="Local storage">
          <p>
            After a successful send, the browser keeps a list of send times to show a friendly
            limit of a few messages per hour. It stays on your device and is not sent as part of
            the form.
          </p>
        </Block>

        <Block title="Outbound links">
          <p>
            Links to GitHub, LinkedIn and Gumroad open those services, which have their own privacy
            policies. Nothing from them is embedded on page load.
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
          Last updated: October 2026
        </p>
      </div>
    </main>

    <Footer />
  </div>
);

export default Privacy;
