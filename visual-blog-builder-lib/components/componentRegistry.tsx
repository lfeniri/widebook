import React from "react";
import { BlogComponentType } from "../types/blogBuilderTypes";
import { TextComponent } from "./dynamic/TextComponent";
import { TitleComponent } from "./dynamic/TitleComponent";
import { TextComponentConfigModal } from "./dynamic/TextComponentConfigModal";
import { TitleComponentConfigModal } from "./dynamic/TitleComponentConfigModal";
import { ImageComponent } from "./dynamic/ImageComponent";
import { ImageComponentConfigModal } from "./dynamic/ImageComponentConfigModal";
import { ButtonComponent } from "./dynamic/ButtonComponent";
import { ButtonComponentConfigModal } from "./dynamic/ButtonComponentConfigModal";
import { SelectComponent } from "./dynamic/SelectComponent";
import { SelectComponentConfigModal } from "./dynamic/SelectComponentConfigModal";
import { BadgeComponent } from "./dynamic/BadgeComponent";
import { BadgeComponentConfigModal } from "./dynamic/BadgeComponentConfigModal";
import VideoComponentConfigModal from "./dynamic/VideoComponentConfigModal";
import AudioComponentConfigModal from "./dynamic/AudioComponentConfigModal";
import LinkComponentConfigModal from "./dynamic/LinkComponentConfigModal";
import InputComponentConfigModal from "./dynamic/InputComponentConfigModal";
import RadioComponentConfigModal from "./dynamic/RadioComponentConfigModal";
import DateComponentConfigModal from "./dynamic/DateComponentConfigModal";
import CardComponentConfigModal from "./dynamic/CardComponentConfigModal";
import SectionComponentConfigModal from "./dynamic/SectionComponentConfigModal";
import NavComponentConfigModal from "./dynamic/NavComponentConfigModal";
import FooterComponentConfigModal from "./dynamic/FooterComponentConfigModal";

export const componentRegistry: Record<BlogComponentType, {
  icon: React.ReactNode;
  label: string;
  description: string;
  Renderer: React.FC<any>;
  ConfigModal: React.FC<any>;
}> = {
  text: {
    icon: <span>T</span>,
    label: "Texte",
    description: "Bloc de texte riche.",
    Renderer: TextComponent,
    ConfigModal: TextComponentConfigModal,
  },
  title: {
    icon: <span className="font-bold">H1</span>,
    label: "Titre",
    description: "Titre principal.",
    Renderer: TitleComponent,
    ConfigModal: TitleComponentConfigModal,
  },
  subtitle: {
    icon: <span className="font-bold">H2</span>,
    label: "Sous-titre",
    description: "Sous-titre de section.",
    Renderer: () => <div>Sous-titre...</div>,
    ConfigModal: () => null,
  },
  image: {
    icon: <span>🖼️</span>,
    label: "Image",
    description: "Image illustrée.",
    Renderer: ImageComponent,
    ConfigModal: ImageComponentConfigModal,
  },
  video: { icon: <span>🎬</span>, label: "Vidéo", description: "Bloc vidéo.", Renderer: () => <div>Vidéo...</div>, ConfigModal: VideoComponentConfigModal },
  audio: { icon: <span>🔊</span>, label: "Audio", description: "Bloc audio.", Renderer: () => <div>Audio...</div>, ConfigModal: AudioComponentConfigModal },
  link: { icon: <span>🔗</span>, label: "Lien", description: "Lien externe ou interne.", Renderer: () => <div>Lien...</div>, ConfigModal: LinkComponentConfigModal },
  button: {
    icon: <span>🔘</span>,
    label: "Bouton",
    description: "Bouton personnalisable.",
    Renderer: ButtonComponent,
    ConfigModal: ButtonComponentConfigModal,
  },
  icon: { icon: <span>⭐</span>, label: "Icône", description: "Icône décorative.", Renderer: () => <div>Icône...</div>, ConfigModal: () => null },
  form: { icon: <span>📝</span>, label: "Formulaire", description: "Formulaire de saisie.", Renderer: () => <div>Formulaire...</div>, ConfigModal: () => null },
  checkbox: { icon: <span>☑️</span>, label: "Case à cocher", description: "Case à cocher.", Renderer: () => <div>Checkbox...</div>, ConfigModal: () => null },
  select: {
    icon: <span>⬇️</span>,
    label: "Liste déroulante",
    description: "Sélecteur de valeur.",
    Renderer: SelectComponent,
    ConfigModal: SelectComponentConfigModal,
  },
  badge: {
    icon: <span>🏷️</span>,
    label: "Badge",
    description: "Badge décoratif.",
    Renderer: BadgeComponent,
    ConfigModal: BadgeComponentConfigModal,
  },
  table: { icon: <span>📊</span>, label: "Tableau", description: "Tableau de données.", Renderer: () => <div>Tableau...</div>, ConfigModal: () => null },
  input: { icon: <span>🔤</span>, label: "Champ texte", description: "Champ de saisie.", Renderer: () => <div>Champ texte...</div>, ConfigModal: InputComponentConfigModal },
  radio: { icon: <span>🔘</span>, label: "Bouton radio", description: "Bouton radio.", Renderer: () => <div>Bouton radio...</div>, ConfigModal: RadioComponentConfigModal },
  date: { icon: <span>📅</span>, label: "Date", description: "Sélecteur de date.", Renderer: () => <div>Date...</div>, ConfigModal: DateComponentConfigModal },
  card: { icon: <span>💳</span>, label: "Carte", description: "Carte de contenu.", Renderer: () => <div>Carte...</div>, ConfigModal: CardComponentConfigModal },
  section: { icon: <span>📦</span>, label: "Section", description: "Section de page.", Renderer: () => <div>Section...</div>, ConfigModal: SectionComponentConfigModal },
  nav: { icon: <span>🧭</span>, label: "Navigation", description: "Menu de navigation.", Renderer: () => <div>Navigation...</div>, ConfigModal: NavComponentConfigModal },
  footer: { icon: <span>⬇️</span>, label: "Pied de page", description: "Footer du blog.", Renderer: () => <div>Pied de page...</div>, ConfigModal: FooterComponentConfigModal },
};
