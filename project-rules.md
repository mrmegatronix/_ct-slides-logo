# Coasters Tavern Digital Signage - Project Rules & Documentation

## Project Overview

This is a digital signage system for Coasters Tavern, built as a standalone HTML application with React. It displays promotional slides for daily specials and events in a continuous loop on TV screens throughout the venue.

## Technology Stack

- **Frontend Framework**: React 18 / 19 (via CDN/ESM)
- **Styling**: Tailwind CSS (via CDN)
- **Build Tool**: Vite (for development) or Standalone HTML
- **Data Storage**: localStorage (v2 versioned)
- **Fonts**: Playfair Display, Inter, Roboto
- **Icons**: Lucide React / Custom inline SVGs

## Architecture

### Core Components

1. **App** - Main application container managing state and slide progression.
2. **Slide** - Standard promotional slide with title, description, price, and images. Optimized for TV viewing with 25% margins.
3. **ImageOnlySlide** - Standalone image display (no text overlay).
4. **AdminPanel** - Slide management interface.

### Data Structure

```typescript
interface SlideData {
  id: string;
  day?: string;
  title: string;
  description: string;
  price?: string;
  imageUrl: string;
  highlightColor?: string;
  type: 'promo' | 'image-only';
  backgroundImageUrl?: string;
  descriptionImageUrl?: string;
}
```

### Storage

- **Key**: `restaurant_slides_v2` (Bumped to v2 to force sync and fix rotation issues)
- **Format**: JSON array of SlideData objects
- **Location**: Browser localStorage
- **Fallback**: INITIAL_SLIDES constant in code

## Features

### Slide System

1. **Auto-rotation**: Slides advance every 30 seconds.
2. **Progress bar**: Visual indicator at bottom of screen.
3. **TV-Optimized Layout**:
   - **25% Margin Buffer**: All content is centered in the middle 50% of the screen (width and height) to prevent "safe area" issues and improve aesthetics on large TV displays.
   - **Large Typography**: Font sizes are scaled up significantly (Titles up to 10rem+, Descriptions 4rem+) for legibility at 1080p.
4. **Slide types**:
   - **Promo slides**: Daily specials with title, description, price.
   - **Image-only slides**: Full-screen images without text.

### Visual Effects

1. **Price glow**: Dynamic glow effect matching each slide's highlight color.
2. **Subtle zoom**: Background images slowly zoom during display.
3. **Animations**: Fade-in, slide-down, and pop-in effects.
4. **Responsive layout**: Adapts to different screen sizes, with TV-focused centering.

### Image System

Three image folder types:
- **back-images/**: Custom background images for slides.
- **front-images/**: Images displayed alongside description text.
- **feature-images/**: Standalone images for image-only slides.

### Navigation Controls

Hover-activated controls:
- **Slide Controls** (Top-Left): Previous, Play/Pause, Next.
- **Admin Settings** (Top-Right): Admin cog.

## Version History

- **v1.0** (Initial): Basic slide rotation system.
- **v1.1** (2026-01-25): Added image upload support, navigation controls, dynamic price glow, image-only slides.
- **v1.2** (2026-01-26): TV Optimization (25% margins, large fonts), Storage v2, removed weather.

---

**Last Updated**: 2026-01-26
**Maintained By**: Development Team
