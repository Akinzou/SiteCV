import type { Accent } from '../content/profile'

/**
 * Tailwind purges anything it cannot see as a complete string, so the old
 * `text-${color}` / `bg-${color}/10` template literals scattered through the
 * components compiled to nothing — those elements rendered with no accent
 * colour at all. These maps keep the class names literal.
 */

export const accentText: Record<Accent, string> = {
  blue: 'text-cyber-blue',
  purple: 'text-cyber-purple',
  green: 'text-cyber-green',
  pink: 'text-cyber-pink',
  yellow: 'text-cyber-yellow',
}

export const accentBorder: Record<Accent, string> = {
  blue: 'border-cyber-blue/30',
  purple: 'border-cyber-purple/30',
  green: 'border-cyber-green/30',
  pink: 'border-cyber-pink/30',
  yellow: 'border-cyber-yellow/30',
}

export const accentBg: Record<Accent, string> = {
  blue: 'bg-cyber-blue/10',
  purple: 'bg-cyber-purple/10',
  green: 'bg-cyber-green/10',
  pink: 'bg-cyber-pink/10',
  yellow: 'bg-cyber-yellow/10',
}

export const accentRule: Record<Accent, string> = {
  blue: 'from-cyber-blue',
  purple: 'from-cyber-purple',
  green: 'from-cyber-green',
  pink: 'from-cyber-pink',
  yellow: 'from-cyber-yellow',
}
