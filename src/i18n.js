import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Invest Now": "Invest Now",
      "My Portfolio": "My Portfolio",
      "Properties": "Properties",
      "Building Health": "Building Health",
      "Net Yield": "Net Yield",
      "Total Invested": "Total Invested",
      "Quarterly Income": "Quarterly Income",
      "Secondary Market": "Secondary Market",
      "Minimum Investment": "Minimum Investment ₹10,00,000",
      "Verified": "Verified",
      "SEBI Regulated": "SEBI Regulated",
      "Admin": "Admin",
      "Superadmin": "Superadmin",
      "Logout": "Logout",
      "Notifications": "Notifications",
      "View all alerts": "View all alerts",
      "No new notifications": "No new notifications",
      "Language": "Language",
      "Dashboard": "Dashboard",
      "Open admin workspace": "Open admin workspace",
      "Open superadmin workspace": "Open superadmin workspace",
      "AI Building Alert": "AI Building Alert",
      "Action taken by property manager": "Action taken by property manager",
      "Your commercial real estate portfolio": "Your commercial real estate portfolio",
      "Open Properties": "Open Properties",
      "Recent Income": "Recent Income",
      "Full History": "Full History",
      "View All": "View All",
      "Welcome back": "Welcome back",
      "Alerts synced": "Alerts synced",
      "Rental payout scheduled": "Rental payout scheduled",
      "Your next distribution is queued for 15 April 2025.": "Your next distribution is queued for 15 April 2025.",
      "KYC review complete": "KYC review complete",
      "Your investor profile is verified and ready for new allocations.": "Your investor profile is verified and ready for new allocations.",
      "Building efficiency notice": "Building efficiency notice",
      "Pune IT Park HVAC service is scheduled. No impact on rental income.": "Pune IT Park HVAC service is scheduled. No impact on rental income.",
      "2m ago": "2m ago",
      "1h ago": "1h ago",
      "Today": "Today"
    }
  },
  hi: {
    translation: {
      "Invest Now": "अभी निवेश करें",
      "My Portfolio": "मेरा पोर्टफोलियो",
      "Properties": "संपत्तियां",
      "Building Health": "बिल्डिंग स्वास्थ्य",
      "Net Yield": "शुद्ध प्रतिफल",
      "Total Invested": "कुल निवेश",
      "Quarterly Income": "त्रैमासिक आय",
      "Secondary Market": "द्वितीयक बाजार",
      "Minimum Investment": "न्यूनतम निवेश ₹10,00,000",
      "Verified": "सत्यापित",
      "SEBI Regulated": "सेबी विनियमित",
      "Admin": "एडमिन",
      "Superadmin": "सुपरएडमिन",
      "Logout": "लॉगआउट",
      "Notifications": "सूचनाएं",
      "View all alerts": "सभी अलर्ट देखें",
      "No new notifications": "कोई नई सूचना नहीं",
      "Language": "भाषा",
      "Dashboard": "डैशबोर्ड",
      "Open admin workspace": "एडमिन कार्यक्षेत्र खोलें",
      "Open superadmin workspace": "सुपरएडमिन कार्यक्षेत्र खोलें",
      "AI Building Alert": "एआई बिल्डिंग अलर्ट",
      "Action taken by property manager": "प्रॉपर्टी मैनेजर द्वारा कार्रवाई की गई",
      "Your commercial real estate portfolio": "आपका कमर्शियल रियल एस्टेट पोर्टफोलियो",
      "Open Properties": "खुली संपत्तियां",
      "Recent Income": "हाल की आय",
      "Full History": "पूरा इतिहास",
      "View All": "सभी देखें",
      "Welcome back": "वापसी पर स्वागत है",
      "Alerts synced": "अलर्ट सिंक हो गए",
      "Rental payout scheduled": "किराया भुगतान निर्धारित",
      "Your next distribution is queued for 15 April 2025.": "आपका अगला वितरण 15 अप्रैल 2025 के लिए निर्धारित है।",
      "KYC review complete": "केवाईसी समीक्षा पूरी",
      "Your investor profile is verified and ready for new allocations.": "आपकी निवेशक प्रोफाइल सत्यापित है और नए आवंटन के लिए तैयार है।",
      "Building efficiency notice": "बिल्डिंग दक्षता सूचना",
      "Pune IT Park HVAC service is scheduled. No impact on rental income.": "पुणे आईटी पार्क की एचवीएसी सर्विस निर्धारित है। किराया आय पर कोई प्रभाव नहीं होगा।",
      "2m ago": "2 मिनट पहले",
      "1h ago": "1 घंटे पहले",
      "Today": "आज"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
