import { useState } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const YieldCalculator = ({ property }) => {
  const [investment, setInvestment] = useState(1000000);
  const { face_value_per_unit, net_yield, gross_yield } = property;
  
  const minInvestment = 1000000;
  const maxInvestment = 30000000;
  
  const units = investment / face_value_per_unit;
  const exactAnnualIncome = investment * (net_yield / 100);
  const quarterlyIncome = exactAnnualIncome / 4;
  
  let total5YearIncome = 0;
  let currentRent = exactAnnualIncome;
  for(let i=0; i<5; i++) {
    total5YearIncome += currentRent;
    currentRent *= 1.05;
  }
  
  const exitValue = investment * Math.pow(1.07, 5);
  const capitalGain = exitValue - investment;
  const total5YearReturn = total5YearIncome + capitalGain;

  const chartData = Array.from({length: 12}, (_, i) => ({
    name: `M${i+1}`,
    income: exactAnnualIncome / 12
  }));

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h3 className="font-bold text-lg text-[var(--color-navy)] mb-4">Calculate your returns</h3>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2 text-sm font-medium">
          <span className="text-gray-600">Investment Amount</span>
          <span className="text-[var(--color-navy)]">₹{investment.toLocaleString('en-IN')}</span>
        </div>
        <input 
          type="range" 
          min={minInvestment} 
          max={maxInvestment} 
          step={100000}
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-blue)]"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>₹10L</span>
          <span>₹3Cr</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Units Purchased</div>
          <div className="font-bold text-gray-900">{units}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Annual Rental Income</div>
          <div className="font-bold text-[var(--color-green)]">₹{Math.round(exactAnnualIncome).toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Quarterly Income</div>
          <div className="font-bold text-[var(--color-green)]">₹{Math.round(quarterlyIncome).toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-100">
          <div className="text-xs text-gray-500 mb-1">Total 5-Year Return</div>
          <div className="font-bold text-[var(--color-blue)]">₹{Math.round(total5YearReturn).toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Monthly income for ₹{investment.toLocaleString('en-IN')} invested at {net_yield}% net yield</h4>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#9ca3af'}} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="income" fill="var(--color-green)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Fee Waterfall</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Gross yield</span>
            <span>{gross_yield}%</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Less vacancy buffer</span>
            <span>-0.5%</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Less property tax + insurance</span>
            <span>-0.4%</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Less RealtyConnect fee</span>
            <span>-{(gross_yield - net_yield - 0.9).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between font-bold text-[var(--color-green)] pt-2 border-t border-gray-100 mt-2">
            <span>Net yield to investor</span>
            <span>{net_yield}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldCalculator;
