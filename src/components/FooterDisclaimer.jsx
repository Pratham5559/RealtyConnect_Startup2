import { useTranslation } from 'react-i18next';

const FooterDisclaimer = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-100 text-gray-500 text-[10px] text-center py-4 px-4 mt-auto border-t border-gray-200 pb-20 md:pb-4">
      <p>RealtyConnect v0.1 Prototype | {t('Minimum Investment')} (SEBI SM-REIT 2024)</p>
      <p className="mt-1">Simulated data only | Not for real investment</p>
    </div>
  );
};

export default FooterDisclaimer;
