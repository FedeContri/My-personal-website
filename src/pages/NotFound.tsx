import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Helmet>
        <title>404 — Page not found | FD</title>
        <meta name="description" content="The page you are looking for does not exist. Return to FD's portfolio homepage." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`https://fd-portfolio.site${location.pathname}`} />
        <meta property="og:title" content="404 — Page not found | FD" />
        <meta property="og:description" content="The page you are looking for does not exist on fd-portfolio.site." />
        <meta property="og:url" content={`https://fd-portfolio.site${location.pathname}`} />
      </Helmet>
      <div className="text-center">
        <p className="font-mono text-sm text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-[15px] text-muted-foreground">This route does not exist on fd-portfolio.site.</p>
        <a href="/" className="link-underline mt-6 inline-block font-mono text-[12.5px]">
          Return to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
