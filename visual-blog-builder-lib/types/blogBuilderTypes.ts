// Types de base pour la grille, lignes, colonnes et composants dynamiques

export type BlogGrid = {
  rows: BlogRow[];
};

export type BlogRow = {
  id: string;
  columns: BlogColumn[];
};

export type BlogColumn = {
  id: string;
  components: BlogComponentInstance[];
  width?: number; // Pour le responsive
};

export type BlogComponentType =
  | "text"
  | "title"
  | "subtitle"
  | "image"
  | "video"
  | "audio"
  | "link"
  | "button"
  | "icon"
  | "form"
  | "checkbox"
  | "select"
  | "table"
  | "input"
  | "radio"
  | "date"
  | "badge"
  | "card"
  | "section"
  | "nav"
  | "footer";

export interface BlogComponentInstance {
  id: string;
  type: BlogComponentType;
  config: any; // Config spécifique au composant
}

// Types de configuration spécifiques à chaque composant dynamique

export interface TextConfig {
  text: string;
  ariaLabel?: string;
  style?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
    boxShadow?: string;
    border?: string;
    maxWidth?: string;
  };
}

export interface TitleConfig {
  text: string;
  ariaLabel?: string;
  style?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
    boxShadow?: string;
    border?: string;
    maxWidth?: string;
  };
}

export interface ImageConfig {
  src: string;
  alt?: string;
  ariaLabel?: string;
  style?: {
    width?: string;
    borderRadius?: string;
    objectFit?: string;
    boxShadow?: string;
    border?: string;
    margin?: string;
    padding?: string;
    maxWidth?: string;
  };
}

export interface ButtonConfig {
  label: string;
  url?: string;
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    fontWeight?: string;
    fontFamily?: string;
    padding?: string;
    margin?: string;
    boxShadow?: string;
    border?: string;
  };
}

export interface SelectConfig {
  label: string;
  options: string[];
  selected?: string;
  ariaLabel?: string;
  style?: {
    padding?: string;
    margin?: string;
    border?: string;
    boxShadow?: string;
  };
}

export interface BadgeConfig {
  text: string;
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    fontWeight?: string;
    fontFamily?: string;
    textAlign?: string;
    padding?: string;
    margin?: string;
    boxShadow?: string;
    border?: string;
    maxWidth?: string;
    fontSize?: string;
  };
}

// Types de config pour les autres composants (à compléter selon besoins)
export interface VideoConfig {
  src: string;
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  ariaLabel?: string;
  style?: {
    width?: string;
    borderRadius?: string;
    boxShadow?: string;
    border?: string;
    margin?: string;
    maxWidth?: string;
  };
}

export interface AudioConfig {
  src: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  ariaLabel?: string;
  style?: {
    margin?: string;
    padding?: string;
    border?: string;
    boxShadow?: string;
    backgroundColor?: string;
    color?: string;
  };
}

export interface LinkConfig {
  href: string;
  label: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  style?: {
    color?: string;
    fontWeight?: string;
    textDecoration?: string;
    padding?: string;
    margin?: string;
  };
}

export interface InputConfig {
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  ariaLabel?: string;
  style?: {
    padding?: string;
    margin?: string;
    border?: string;
    boxShadow?: string;
  };
}

export interface CheckboxConfig {
  label: string;
  checked?: boolean;
  ariaLabel?: string;
  style?: {
    margin?: string;
  };
}

export interface RadioConfig {
  label: string;
  options: string[];
  selected?: string;
  ariaLabel?: string;
  style?: {
    margin?: string;
  };
}

export interface DateConfig {
  label: string;
  value?: string;
  ariaLabel?: string;
  style?: {
    margin?: string;
    padding?: string;
    border?: string;
    boxShadow?: string;
    backgroundColor?: string;
    color?: string;
  };
}

export interface CardConfig {
  title: string;
  content: string;
  image?: string;
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    boxShadow?: string;
    border?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    maxWidth?: string;
  };
}

export interface SectionConfig {
  title?: string;
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    boxShadow?: string;
    border?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    maxWidth?: string;
  };
}

export interface NavConfig {
  links: { label: string; href: string }[];
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    boxShadow?: string;
    border?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    maxWidth?: string;
  };
}

export interface FooterConfig {
  text?: string;
  ariaLabel?: string;
  style?: {
    backgroundColor?: string;
    color?: string;
    boxShadow?: string;
    border?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    maxWidth?: string;
  };
}
