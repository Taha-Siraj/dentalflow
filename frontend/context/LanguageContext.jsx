"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext(null);

const TRANSLATIONS = {
  en: {
    networkBanner: "SmileCare Dental Clinics • 10+ Multi-Branch Network Across Canada",
    emergencyLine: "Emergency Line: 1-800-DENTAL-CA",
    bookAppointment: "Book Online Appointment",
    findBranch: "Find Nearest Branch",
    heroTitlePrefix: "Exceptional Dental Care for",
    heroTitleSuffix: "Canadian Families",
    heroSubtitle: "Centralized patient records, top-rated board-certified specialists, and direct electronic insurance billing across Toronto, Vancouver, Calgary, Ottawa, and Mississauga.",
    directBilling: "Direct Insurance Billing",
    sameDayEmergency: "Same-Day Emergency Slots",
    sharedEmr: "100% Shared EMR Records",
    portalLogin: "Portal Login",
    dashboard: "Dashboard",
    selectLanguage: "Language",
  },
  fr: {
    networkBanner: "Cliniques Dentaires SmileCare • Réseau de 10+ Succursales au Canada",
    emergencyLine: "Ligne d'urgence: 1-800-DENTAL-CA",
    bookAppointment: "Réserver un Rendez-vous En Ligne",
    findBranch: "Trouver la Succursale la Plus Proche",
    heroTitlePrefix: "Soins Dentaires d'Exception pour les",
    heroTitleSuffix: "Familles Canadiennes",
    heroSubtitle: "Dossiers patients centralisés, spécialistes certifiés de premier ordre et facturation directe aux assurances à Toronto, Vancouver, Calgary, Ottawa et Mississauga.",
    directBilling: "Facturation Directe aux Assurances",
    sameDayEmergency: "Plages d'Urgence le Jour Même",
    sharedEmr: "Dossiers DME 100% Partagés",
    portalLogin: "Connexion Portail",
    dashboard: "Tableau de Bord",
    selectLanguage: "Langue",
  },
  es: {
    networkBanner: "Clínicas Dentales SmileCare • Red de 10+ Sucursales en Canadá",
    emergencyLine: "Línea de Emergencia: 1-800-DENTAL-CA",
    bookAppointment: "Reservar Cita en Línea",
    findBranch: "Buscar Sucursal Más Cercana",
    heroTitlePrefix: "Atención Dental Excepcional para",
    heroTitleSuffix: "Familias Canadienses",
    heroSubtitle: "Expedientes centralizados, especialistas certificados y facturación directa con seguros en Toronto, Vancouver, Calgary, Ottawa y Mississauga.",
    directBilling: "Facturación Directa a Seguros",
    sameDayEmergency: "Citas de Emergencia el Mismo Día",
    sharedEmr: "Registros Médicos 100% Compartidos",
    portalLogin: "Iniciar Sesión",
    dashboard: "Panel de Control",
    selectLanguage: "Idioma",
  },
};

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("dentalflow_lang");
    if (savedLocale && TRANSLATIONS[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const changeLanguage = (newLang) => {
    if (TRANSLATIONS[newLang]) {
      setLocale(newLang);
      localStorage.setItem("dentalflow_lang", newLang);
    }
  };

  const t = (key) => {
    return TRANSLATIONS[locale]?.[key] || TRANSLATIONS["en"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
