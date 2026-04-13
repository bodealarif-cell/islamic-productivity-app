import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '../context/UserContext';
import { CURRENCIES, REGIONS, CURRENCY_FORMATTER } from '../utils/currencies';
import { Globe, DollarSign } from 'lucide-react';

const RegionCurrencySwitcher = () => {
  const { t } = useTranslation();
  const { currency, setCurrency, region, setRegion } = useUser();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Currency Selector */}
      <div className="flex items-center gap-2 flex-1">
        <DollarSign className="w-5 h-5 text-accent" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-textPrimary text-sm cursor-pointer hover:bg-secondary/70 transition-colors w-full"
        >
          {Object.entries(CURRENCIES).map(([code, info]) => (
            <option key={code} value={code}>
              {info.symbol} {code} - {info.name}
            </option>
          ))}
        </select>
        <div className="text-xs text-textSecondary px-2 py-1 bg-secondary/30 rounded">
          {CURRENCY_FORMATTER(9.99, currency)}
        </div>
      </div>

      {/* Region Selector */}
      <div className="flex items-center gap-2 flex-1">
        <Globe className="w-5 h-5 text-accent" />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="bg-secondary/50 border border-white/10 rounded-lg px-3 py-2 text-textPrimary text-sm cursor-pointer hover:bg-secondary/70 transition-colors w-full"
        >
          {Object.entries(REGIONS).map(([code, info]) => (
            <option key={code} value={code}>
              🌍 {info.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RegionCurrencySwitcher;
