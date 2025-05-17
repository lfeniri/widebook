import React from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqJsonLdProps {
  faqs: FaqItem[];
}

/**
 * Composant pour générer le balisage structuré JSON-LD des FAQs
 * Ce balisage peut permettre d'obtenir des featured snippets dans les résultats de recherche Google
 */
const FaqJsonLd: React.FC<FaqJsonLdProps> = ({ faqs }) => {
  // Vérifier qu'il y a des FAQs à afficher
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Créer le format FAQPage pour le balisage structuré
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default FaqJsonLd;
