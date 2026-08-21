export interface SlideData {
  id: string;
  day?: string;
  title: string;
  description: string;
  price?: string;
  imageUrl: string; // Using picsum for placeholders if actual images missing
  highlightColor?: string;
  type: 'promo' | 'image-only';
  backgroundImageUrl?: string; // Custom background image from back-images folder
  descriptionImageUrl?: string; // Image to show in description box from front-images folder
  disabled?: boolean;
}

export const SLIDE_DURATION_MS = 30000; // 30 seconds
