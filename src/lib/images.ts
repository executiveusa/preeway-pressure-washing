import manifestData from '../../public/images/image-manifest.json';

export type ImageSection =
  | 'hero'
  | 'pain'
  | 'services'
  | 'social-purpose'
  | 'artist-partnership'
  | 'sponsor'
  | 'quote-flow'
  | 'gallery';

export type ImagePriority = 'critical' | 'high' | 'medium' | 'low';
export type ImageLoading = 'eager' | 'lazy';
export type SupportedLang = 'en' | 'es';

export interface ImageEntry {
  id: string;
  filename: string;
  path: string;
  section: ImageSection;
  placement: string;
  route: string;
  priority: ImagePriority;
  loading: ImageLoading;
  aspectRatio: string;
  width: number;
  height: number;
  alt: Record<SupportedLang, string>;
  title: Record<SupportedLang, string>;
  caption: Record<SupportedLang, string>;
  location: {
    city: string;
    neighborhood?: string;
    county: string;
    state: string;
    street?: string;
    landmark?: string;
    surface?: string;
  };
  seoTags: string[];
  content: {
    depicts: string[];
    mood: string;
  };
}

export interface ImageManifest {
  version: string;
  tenant: string;
  updated: string;
  images: ImageEntry[];
}

const manifest = manifestData as ImageManifest;

/** All images in the manifest */
export function getAllImages(): ImageEntry[] {
  return manifest.images;
}

/** Find a single image by its id */
export function getImageById(id: string): ImageEntry | undefined {
  return manifest.images.find((img) => img.id === id);
}

/** All images for a given section */
export function getImagesBySection(section: ImageSection): ImageEntry[] {
  return manifest.images.filter((img) => img.section === section);
}

/** The hero image (first critical-priority image in the hero section) */
export function getHeroImage(): ImageEntry {
  const hero =
    manifest.images.find(
      (img) => img.section === 'hero' && img.priority === 'critical'
    ) ?? manifest.images[0];
  if (!hero) throw new Error('[images] No hero image found in manifest');
  return hero;
}

/** First image for a given section (most common use-case) */
export function getPrimaryImageForSection(section: ImageSection): ImageEntry | undefined {
  return getImagesBySection(section)[0];
}

/** Alt text for an image in the requested language, falling back to 'en' */
export function getAlt(img: ImageEntry, lang: SupportedLang = 'en'): string {
  return img.alt[lang] ?? img.alt.en;
}

/** Title text for an image */
export function getTitle(img: ImageEntry, lang: SupportedLang = 'en'): string {
  return img.title[lang] ?? img.title.en;
}

/** Caption text for an image */
export function getCaption(img: ImageEntry, lang: SupportedLang = 'en'): string {
  return img.caption[lang] ?? img.caption.en;
}

/**
 * Validate that every required image exists in the manifest.
 * Call during build-time checks or health endpoints.
 */
export function validateManifest(): { valid: boolean; missing: string[] } {
  const required: ImageSection[] = [
    'hero',
    'pain',
    'services',
    'social-purpose',
    'artist-partnership',
    'sponsor',
    'quote-flow',
    'gallery',
  ];

  const missing = required.filter(
    (section) => !manifest.images.some((img) => img.section === section)
  );

  return { valid: missing.length === 0, missing };
}

/** Manifest metadata */
export const manifestMeta = {
  version: manifest.version,
  tenant: manifest.tenant,
  updated: manifest.updated,
  totalImages: manifest.images.length,
} as const;
