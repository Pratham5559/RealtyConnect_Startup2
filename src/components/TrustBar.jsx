import { ShieldCheck, Lock, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TrustBar = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-50 border-y border-gray-200 py-3">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-xs text-gray-600 overflow-x-auto space-x-6 whitespace-nowrap">
        <div className="flex items-center">
          <ShieldCheck className="w-4 h-4 text-[var(--color-green)] mr-1.5" />
          <span className="font-medium">{t('SEBI Regulated')} / SM-REIT</span>
        </div>
        <div className="flex items-center">
          <Lock className="w-4 h-4 text-[var(--color-navy)] mr-1.5" />
          <span className="font-medium">Funds in Escrow</span>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 text-[var(--color-blue)] mr-1.5" />
          <span className="font-medium">CBRE {t('Verified')}</span>
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
