// Logo.jsx — Optimized SVG asset loader for Funddoo
import logoAsset from '../assets/logo.jpeg'; // Path to the downloaded SVG file

/**
 * A flexible wrapper for the Funddoo logo asset.
 *
 * @param {string} className - Optional Tailwind or CSS class for sizing.
 * @param {string} alt - Alternate text for accessibility (defaults to "Funddoo").
 */
export default function Logo({ className = 'h-10 w-auto', alt = 'Funddoo' }) {
  return (
    <img
      src={logoAsset}
      alt={alt}
      className={className}
      // Since it's a fixed-color vector asset, it retains visibility
      // by default on most common backgrounds. For specific themes,
      // control visibility using standard utility classes on the container.
    />
  );
}