# Coasters Tavern Digital Signage - Project Rules & Documentation

## Project Overview

This is a digital signage system for Coasters Tavern, built as a standalone HTML application with React (via CDN). It displays promotional slides for daily specials, events, and weather information in a continuous loop on TV screens throughout the venue.

## Technology Stack

- **Frontend Framework**: React 18 (loaded via CDN)
- **Styling**: Tailwind CSS (via CDN)
- **Build Tool**: None (standalone HTML file)
- **Data Storage**: localStorage (browser-based persistence)
- **Fonts**: Google Fonts (Playfair Display, Inter, Roboto)
- **Icons**: Custom inline SVG components

## Architecture

### Core Components

1. **App** - Main application container managing state and slide progression
2. **Slide** - Standard promotional slide with title, description, price, and images
3. **ImageOnlySlide** - Standalone image display (no text overlay)
4. **WeatherView** - Weather information display
5. **AdminPanel** - Slide management interface

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
  type: 'promo' | 'weather' | 'image-only';
  backgroundImageUrl?: string;
  descriptionImageUrl?: string;
}
```

### Storage

- **Key**: `restaurant_slides_v1`
- **Format**: JSON array of SlideData objects
- **Location**: Browser localStorage
- **Fallback**: INITIAL_SLIDES constant in code

## Features

### Slide System

1. **Auto-rotation**: Slides advance every 30 seconds
2. **Progress bar**: Visual indicator at bottom of screen
3. **Slide types**:
   - **Promo slides**: Daily specials with title, description, price
   - **Weather slides**: Live weather display
   - **Image-only slides**: Full-screen images without text

### Visual Effects

1. **Price glow**: Dynamic glow effect matching each slide's highlight color
2. **Subtle zoom**: Background images slowly zoom during display
3. **Animations**: Fade-in, slide-down, and pop-in effects
4. **Responsive layout**: Adapts to different screen sizes

### Image System

Three image folder types:
- **back-images/**: Custom background images for slides
- **front-images/**: Images displayed alongside description text
- **feature-images/**: Standalone images for image-only slides

### Navigation Controls

Hover-activated controls in top-right corner:
- **Previous**: Skip to previous slide
- **Next**: Skip to next slide
- **Pause/Resume**: Pause/resume auto-rotation
- **Admin**: Open slide editor

### Admin Slide Editor

Accessible via settings cog icon (hover to reveal):
- Add/edit/delete slides
- Configure slide properties:
  - Day, title, description, price
  - Main image path
  - Highlight color
  - Background image (custom)
  - Description image (inline with text)
- Changes saved to localStorage
- Grid view of all slides

## File Structure

```
project-root/
├── index.html              # Main application file
├── types.ts                # TypeScript type definitions
├── styles.css              # Additional styles (if needed)
├── images/                 # Default slide images
│   ├── steak-night.jpg
│   ├── burger-night.jpg
│   └── ...
├── back-images/            # Custom background images
│   └── .gitkeep
├── front-images/           # Description box images
│   └── .gitkeep
├── feature-images/         # Standalone image slides
│   └── .gitkeep
└── project-rules.md        # This file
```

## Implementation History

### Initial Creation
- Created standalone HTML application with React and Tailwind CSS
- Implemented slide rotation system with 30-second intervals
- Added localStorage persistence
- Created admin panel for slide management

### Enhancement Phase 1 (2026-01-25)
**User Request**: Multiple enhancements including:
1. Make price glow the same color as highlight color
2. Add slide controls (prev, next, resume, pause) on hover
3. Rename admin mode to "Admin Slide Editor"
4. Add background image upload option
5. Add description image upload option
6. Create standalone image-only slides
7. Create folder structure for image uploads
8. Create project documentation

**Implementation**:
- Updated `pulse-glow` animation to use `currentColor` for dynamic glow
- Added navigation controls (SkipBack, Play/Pause, SkipForward) next to Settings
- Renamed admin panel header from "Tavern Overview" to "Admin Slide Editor"
- Added `backgroundImageUrl` and `descriptionImageUrl` fields to SlideData interface
- Created three new folders: `back-images/`, `front-images/`, `feature-images/`
- Updated Slide component to:
  - Use custom background image if provided
  - Display description image alongside text with responsive layout
  - Prevent overlap/clipping with proper sizing constraints
- Created `ImageOnlySlide` component for full-screen image display
- Added `'image-only'` type to SlideData type union
- Updated slide rendering logic to handle all three slide types

## Agent Rules for Project Recreation

### Setup Instructions

1. **Create base HTML file** with React and Tailwind CSS CDN links
2. **Add Google Fonts**: Playfair Display, Inter, Roboto
3. **Create inline SVG icon components** for UI controls
4. **Implement localStorage persistence** with fallback to default slides
5. **Create folder structure**: images/, back-images/, front-images/, feature-images/

### Coding Standards

1. **Use React hooks**: useState, useEffect, useCallback, useMemo
2. **Inline styles for dynamic values**: Use style prop for colors, animations
3. **Tailwind for static styles**: Use className for layout and static styling
4. **Error handling**: Add onError handlers to all img tags
5. **Responsive design**: Use md: breakpoints for mobile/desktop layouts

### Key Implementation Details

1. **Slide rotation**:
   - 30-second duration (SLIDE_DURATION_MS constant)
   - Progress bar updates every 100ms
   - Auto-advance when progress reaches 100%

2. **Admin panel**:
   - Full-screen overlay (z-50)
   - Grid layout for slide cards
   - Inline editing with immediate state updates
   - Save button only enabled when changes detected

3. **Image handling**:
   - Always provide fallback for missing images
   - Use object-cover for backgrounds
   - Use object-contain for feature images
   - Responsive sizing with max-width/max-height constraints

4. **Color system**:
   - Each slide has customizable highlightColor
   - Used for: day badge, divider line, price glow
   - Defaults to amber (#f59e0b) if not specified

### Important Notes

1. **Browser-only file access limitation**: 
   - Cannot automatically scan feature-images folder from browser
   - Image-only slides must be manually added via admin panel
   - Alternative: Implement backend service to scan folders and generate slides

2. **localStorage limits**:
   - Browser localStorage typically limited to 5-10MB
   - Consider this when storing many slides or large data

3. **Image paths**:
   - All paths are relative to index.html location
   - Use forward slashes even on Windows
   - Example: `back-images/custom-bg.jpg`

4. **Backward compatibility**:
   - New optional fields won't break existing slides
   - Old slides in localStorage will work with new code
   - Default values provided for all optional fields

## Future Enhancement Possibilities

1. **Backend integration**: 
   - Auto-scan feature-images folder
   - File upload interface
   - Cloud storage integration

2. **Advanced features**:
   - Video slide support
   - Live weather API integration
   - Social media feed integration
   - Remote management interface

3. **Analytics**:
   - Track slide view counts
   - Measure engagement time
   - A/B testing for promotions

## Maintenance Guidelines

### Adding New Slides

1. Open admin panel (hover top-right, click settings cog)
2. Click "Add Slide" button
3. Fill in slide details
4. Upload images to appropriate folders
5. Enter image paths in admin panel
6. Click "Save Changes"

### Updating Existing Slides

1. Open admin panel
2. Find slide in grid view
3. Edit fields directly
4. Click "Save Changes"

### Managing Images

1. **Background images**: Place in `back-images/` folder
2. **Description images**: Place in `front-images/` folder
3. **Feature images**: Place in `feature-images/` folder
4. Reference with relative paths in admin panel

### Backup and Restore

**Export slides**:
1. Open browser console (F12)
2. Run: `copy(localStorage.getItem('restaurant_slides_v1'))`
3. Paste into text file and save

**Import slides**:
1. Open browser console (F12)
2. Run: `localStorage.setItem('restaurant_slides_v1', '[paste JSON here]')`
3. Refresh page

## Troubleshooting

### Slides not displaying
- Check browser console for errors
- Verify image paths are correct
- Ensure localStorage is not full
- Try clearing browser cache

### Images not loading
- Verify file exists in correct folder
- Check file path spelling and case
- Ensure file format is supported (jpg, png, gif, webp)
- Check browser network tab for 404 errors

### Changes not saving
- Ensure "Save Changes" button was clicked
- Check browser localStorage is enabled
- Verify no browser extensions blocking storage
- Try different browser

### Performance issues
- Reduce number of slides
- Optimize image file sizes
- Clear browser cache
- Close other browser tabs

## Version History

- **v1.0** (Initial): Basic slide rotation system
- **v1.1** (2026-01-25): Added image upload support, navigation controls, dynamic price glow, image-only slides

---

**Last Updated**: 2026-01-25
**Maintained By**: Development Team
**Contact**: [Your contact information]
