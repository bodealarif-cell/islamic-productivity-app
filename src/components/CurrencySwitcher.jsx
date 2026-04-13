import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { CURRENCIES, CURRENCY_FORMATTER } from '../utils/currencies';
import { DollarSign } from 'lucide-react';

const CurrencySwitcher = () => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useUser();

  return (
    <div className="flex items-center gap-3">
      <DollarSign className="w-5 h-5 text-accent flex-shrink-0" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-textPrimary text-sm cursor-pointer hover:bg-secondary/70 transition-colors flex-1"
      >
        {Object.entries(CURRENCIES).map(([code, info]) => (
          <option key={code} value={code}>
            {info.symbol} {code} - {info.name}
          </option>
        ))}
      </select>
      <div className="text-xs text-textSecondary px-2 py-1 bg-secondary/30 rounded whitespace-nowrap">
        {CURRENCY_FORMATTER(9.99, currency)}/month
      </div>
    </div>
  );
};

export default CurrencySwitcher;
