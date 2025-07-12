# BackgroundPaths Component

## Overview
The `BackgroundPaths` component is an animated background component that creates a stunning visual effect with floating SVG paths and animated text. It's perfect for hero sections, landing pages, or any area where you want to add dynamic visual interest.

## Features
- **Animated SVG Paths**: Multiple floating paths with continuous animation
- **Letter-by-Letter Text Animation**: Title text animates character by character
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode Support**: Automatically adapts to light/dark themes
- **Interactive Button**: Includes an animated call-to-action button
- **Framer Motion**: Smooth animations powered by Framer Motion
- **Continuous Background**: Wrapper component for full-page background effects

## Installation
The component requires the following dependencies (already installed in this project):
- `framer-motion` - For animations
- `@radix-ui/react-slot` - For button functionality
- `class-variance-authority` - For component variants

## Usage

### Continuous Background (Recommended for full pages)
```tsx
import { BackgroundPathsWrapper } from '@/components/ui/background-paths';

function MyPage() {
  return (
    <BackgroundPathsWrapper>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Features />
        <Footer />
      </div>
    </BackgroundPathsWrapper>
  );
}
```

### Standalone Component
```tsx
import { BackgroundPaths } from '@/components/ui/background-paths';

function MyComponent() {
  return <BackgroundPaths title="Your Title Here" />;
}
```

### Custom Title
```tsx
<BackgroundPaths title="Welcome to Our Platform" />
```

### Default Title
```tsx
<BackgroundPaths /> // Uses "Background Paths" as default
```

## Components

### BackgroundPathsWrapper
- **Purpose**: Creates a continuous background effect across the entire page
- **Usage**: Wrap your entire page content with this component
- **Features**: 
  - Fixed positioned background that stays visible while scrolling
  - Proper z-index layering to keep content above background
  - Maintains background visibility throughout the page

### BackgroundPaths
- **Purpose**: Standalone component with title animation and button
- **Usage**: Use for specific sections or hero areas
- **Features**:
  - Animated title with letter-by-letter effects
  - Interactive call-to-action button
  - Self-contained with its own layout

## Props

### BackgroundPathsWrapper
| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | The content to render above the background |

### BackgroundPaths
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Background Paths"` | The title text to display and animate |

## Component Structure

### FloatingPaths
- Internal component that renders the animated SVG paths
- Creates 36 paths with different positions and animations
- Each path has a unique animation duration and opacity

### BackgroundPathsWrapper
- Wrapper component for continuous background effects
- Uses fixed positioning for persistent background
- Proper z-index management for content layering

### BackgroundPaths
- Main component that orchestrates the entire animation
- Splits the title into words and letters for individual animation
- Includes a call-to-action button with hover effects

## Animation Details

### Text Animation
- Letters animate from bottom to top with spring physics
- Staggered animation based on word and letter position
- Gradient text effect with dark mode support

### Path Animation
- Continuous path drawing animation
- Random duration variations for organic feel
- Opacity and path offset animations

### Button Animation
- Hover effects with translation and shadow changes
- Arrow movement on hover
- Backdrop blur and glass morphism effects

## Styling
The component uses Tailwind CSS classes and supports:
- Responsive typography (text-5xl to text-8xl)
- Dark mode with `dark:` prefixes
- Glass morphism effects
- Gradient backgrounds
- Backdrop blur effects
- Fixed positioning for continuous backgrounds

## Demo Pages
- **Main Page**: Visit `/` to see the continuous background effect
- **Demo Page**: Visit `/background-demo` to see both wrapper and standalone versions

## Best Practices

### For Full Pages
Use `BackgroundPathsWrapper` to wrap your entire page content:
```tsx
<BackgroundPathsWrapper>
  <div className="min-h-screen">
    {/* All your page content */}
  </div>
</BackgroundPathsWrapper>
```

### For Specific Sections
Use `BackgroundPaths` for individual sections:
```tsx
<section>
  <BackgroundPaths title="Section Title" />
</section>
```

### Content Styling
When using the wrapper, ensure your content has proper contrast:
- Use semi-transparent backgrounds for content cards
- Add backdrop blur effects for better readability
- Consider using glass morphism effects

## Customization
You can customize the component by:
1. Modifying the SVG path generation in `FloatingPaths`
2. Adjusting animation timings and easing
3. Changing colors and gradients
4. Modifying the button text and behavior
5. Adding additional interactive elements
6. Customizing the wrapper's background opacity or positioning

## Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Requires JavaScript for animations
- Framer Motion animations are hardware-accelerated for performance
- Fixed positioning works across all modern browsers 