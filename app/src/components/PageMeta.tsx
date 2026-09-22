/**
 * PageMeta — T28 / SEO
 * Sets document.title and the meta description tag for each route.
 * Uses useEffect so it works in a CSR (Vite/React Router) environment.
 */
import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description?: string;
}

const DEFAULT_SUFFIX = 'EduPlus Skills';
const DEFAULT_DESC =
  'EduPlus Skills — Empowering learners in Manipur and beyond with future-ready programs, psychometric guidance, and global career pathways.';

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = title ? `${title} | ${DEFAULT_SUFFIX}` : DEFAULT_SUFFIX;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description ?? DEFAULT_DESC;

    // OG title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.content = title ? `${title} | ${DEFAULT_SUFFIX}` : DEFAULT_SUFFIX;

    // OG description
    let ogDesc = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.content = description ?? DEFAULT_DESC;
  }, [title, description]);

  return null;
}
