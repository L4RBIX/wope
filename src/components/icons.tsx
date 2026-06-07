import { cn } from "@/lib/utils";

export interface IconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}

export function WopeLogoIcon({ className, width = 32, height = 32, style }: IconProps) {
  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="rgba(139,92,246,0.15)" />
      <path
        d="M8 16 C8 11.6 11.6 8 16 8 C20.4 8 24 11.6 24 16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M10 19 L13 14 L16 19 L19 14 L22 19"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function WopeWordmarkIcon({ className }: IconProps) {
  return (
    <svg
      width="80"
      height="24"
      viewBox="0 0 80 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <text
        x="0"
        y="19"
        fontFamily="var(--font-rebond), system-ui"
        fontWeight="700"
        fontSize="20"
        fill="white"
        letterSpacing="-0.5"
      >
        wope
      </text>
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={cn("inline-block", className)}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M9 4v10M4 9h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M4 9h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M6 1l1.2 3.8L11 6l-3.8 1.2L6 11l-1.2-3.8L1 6l3.8-1.2L6 1z" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 13v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TwitterIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 4l16 16M4 20L20 4"
        stroke="none"
      />
      <path
        d="M3 3h4l4 5.5L15 3h4l-6.5 7.5L20 21h-4l-4.5-6L7 21H3l7-8.5L3 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LocationPinIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Company logos as text-based SVGs
export function QNBLogo({ className }: IconProps) {
  return (
    <svg width="80" height="32" viewBox="0 0 80 32" className={cn("opacity-60", className)}>
      <text x="0" y="24" fontFamily="system-ui" fontWeight="700" fontSize="20" fill="white">QNB</text>
    </svg>
  );
}

export function BMWLogo({ className }: IconProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={cn("opacity-60", className)}>
      <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" />
      <circle cx="24" cy="24" r="14" stroke="white" strokeWidth="1" />
      <path d="M24 10 L24 24 L10 24" fill="white" opacity="0.9" />
      <path d="M24 24 L24 38 L38 24" fill="white" opacity="0.9" />
      <path d="M24 10 L10 24" fill="none" stroke="white" strokeWidth="0.5" />
    </svg>
  );
}

export function DeliveryHeroLogo({ className }: IconProps) {
  return (
    <svg width="140" height="28" viewBox="0 0 140 28" className={cn("opacity-60", className)}>
      <text x="0" y="21" fontFamily="system-ui" fontWeight="700" fontSize="16" fill="white" letterSpacing="0.5">Delivery Hero</text>
    </svg>
  );
}

export function MediaMarktLogo({ className }: IconProps) {
  return (
    <svg width="120" height="28" viewBox="0 0 120 28" className={cn("opacity-60", className)}>
      <text x="0" y="21" fontFamily="system-ui" fontWeight="700" fontSize="15" fill="white">Media</text>
      <text x="56" y="21" fontFamily="system-ui" fontWeight="700" fontSize="15" fill="white">Markt</text>
      <circle cx="53" cy="11" r="4" fill="white" opacity="0.8" />
    </svg>
  );
}

export function BayerLogo({ className }: IconProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={cn("opacity-60", className)}>
      <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" />
      <text x="12" y="28" fontFamily="system-ui" fontWeight="700" fontSize="12" fill="white">Bayer</text>
    </svg>
  );
}

export function AmazonLogo({ className }: IconProps) {
  return (
    <svg width="100" height="30" viewBox="0 0 100 30" className={cn("opacity-60", className)}>
      <text x="0" y="22" fontFamily="system-ui" fontWeight="400" fontSize="20" fill="white" letterSpacing="-0.5">amazon</text>
      <path d="M5 26 Q30 32 60 26" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M58 22 L64 26 L58 30" fill="#FF9900" />
    </svg>
  );
}
