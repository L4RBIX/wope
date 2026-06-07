export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ResearchCard {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

export interface CompanyLogo {
  name: string;
  svgContent?: string;
}

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}
