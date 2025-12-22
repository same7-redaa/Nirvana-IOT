
export type Language = 'en' | 'ar';

export interface SolutionCategory {
  title: string;
  items: string[];
}

export interface TranslationStrings {
  navHome: string;
  navServices: string;
  navProducts: string;
  navContact: string;
  heroHeadline: string;
  heroSubheadline: string;
  ctaConsultation: string;
  ctaContact: string;
  quickLinks: string;

  // Solution Categories
  catSmartHome: SolutionCategory;
  catSmartOffice: SolutionCategory;
  catSmartFactory: SolutionCategory;
  catSecurity: SolutionCategory;
  catNetworks: SolutionCategory;
  catBms: SolutionCategory;
  catAccounting: SolutionCategory;

  serviceBmsDesc: string;
  serviceAccDesc: string;
  serviceAccSpecialty: string;

  workflowTitle: string;
  workflowSteps: string[];
  footerCopyright: string;
  contactTitle: string;
  contactName: string;
  contactEmail: string;
  contactMessage: string;
  contactSubmit: string;
  directCall: string;
  emailAddress: string;
  privacyPolicy: string;
  terms: string;

  // About Section
  aboutTitle: string;
  aboutDesc: string;
  aboutMissionTitle: string;
  aboutMissionDesc: string;
  aboutVisionTitle: string;
  aboutVisionDesc: string;
}
