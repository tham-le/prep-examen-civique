import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isKnownPage, pageFor, SITE_URL } from '../seo/routes';

const setContent = (selector: string, value: string) => {
  document.querySelector(selector)?.setAttribute('content', value);
};

// Keeps the title and meta tags in step with the page after in-app navigation.
// The first load already has them, from the file the build wrote for this route.
export const usePageMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = pageFor(pathname);
    const url = `${SITE_URL}${pathname}`;

    document.title = page.title;
    setContent('meta[name="description"]', page.description);
    setContent('meta[name="robots"]', page.indexed ? 'index, follow' : 'noindex, follow');
    setContent('meta[property="og:title"]', page.title);
    setContent('meta[property="og:description"]', page.description);
    setContent('meta[property="og:url"]', url);
    setContent('meta[name="twitter:title"]', page.title);
    setContent('meta[name="twitter:description"]', page.description);
    // An unknown address has no canonical page
    if (isKnownPage(pathname)) document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
  }, [pathname]);
};
