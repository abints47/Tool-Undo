import type { Metadata } from "next";
import { SITE, SITE_ROUTES, absoluteUrl, type SiteRoute } from "./site";

/**
 * Builds full route-level metadata (title inherits the "%s | ToolUndo"
 * template from the root layout) from a SiteRoute definition.
 */
export function routeMetadata(route: SiteRoute): Metadata {
  return {
    title: route.title,
    description: route.description,
    ...(route.keywords ? { keywords: [...route.keywords] } : {}),
    alternates: {
      canonical: route.path === "/" ? "/" : route.path,
    },
    openGraph: {
      title: route.title,
      description: route.description,
      url: absoluteUrl(route.path),
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
      images: [
        {
          url: absoluteUrl(route.path === "/" ? "/opengraph-image" : `${route.path}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: route.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: route.description,
      images: [absoluteUrl(route.path === "/" ? "/opengraph-image" : `${route.path}/opengraph-image`)],
    },
  };
}

export function metadataForPath(path: string): Metadata {
  const route = SITE_ROUTES.find((r) => r.path === path);
  if (!route) throw new Error(`No SiteRoute defined for path "${path}"`);
  return routeMetadata(route);
}
