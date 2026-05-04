import { useState } from 'react';
import { X, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const InvestNowModal = ({ isOpen, onClose, property }) => {
  const [step, setStep] = useState(1);
  const [units, setUnits] = useState(10);
  
  if (!isOpen) return null;

  const minUnits = 10;
  const maxUnits = 300;
  const faceValue = property.face_value_per_unit || 100000;
  const totalInvestment = units * faceValue;
  const entryFee = totalInvestment * 0.02; // 2%
  const totalPayable = totalInvestment + entryFee;
  const ownershipShare = ((units / (property.total_units || 1000)) * 100).toFixed(2);

  const resetAndClose = () => {
    setStep(1);
    setUnits(10);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-[var(--color-navy)] text-white px-5 py-4 flex justify-between items-center">
          <h2 className="font-bold font-serif text-lg">RealtyConnect Prototype</h2>
          <button onClick={resetAndClose} className="text-blue-200 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Alert */}
        <div className="bg-amber-50 border-b border-amber-100 p-4 flex gap-3 text-amber-800 text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="font-bold mb-1 text-amber-900">Prototype Disclaimer</p>
            <p>This is a college prototype. No real money is collected. The minimum investment under SEBI SM-REIT Regulations 2024 is <strong>₹10,00,000 (₹10 lakh)</strong> per investor. This simulation shows how the flow would work.</p>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Step 1: Select Units</h3>
              <p className="text-sm text-gray-600 mb-6">{property.name}</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Units (Min 10)</label>
                <input 
                  type="range" 
                  min={minUnits} 
                  max={maxUnits} 
                  step={1}
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-blue)]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10 units</span>
                  <span>300 units</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Selected Units</span>
                  <span className="font-bold text-lg">{units}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-600">Investment Amount</span>
                  <span className="font-bold text-[var(--color-navy)]">₹{totalInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200 mt-2">
                  <span>Your share of scheme</span>
                  <span>{ownershipShare}%</span>
                </div>
              </div>
              
              <button 
                onClick={() => setStep(2)}
                className="w-full bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Continue to Review
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Step 2: Review Order</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 text-sm divide-y divide-gray-100">
                <div className="py-2 flex justify-between">
                  <span className="text-gray-600">Units</span>
                  <span className="font-medium">{units}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-600">Price per unit</span>
                  <span className="font-medium">₹{faceValue.toLocaleString('en-IN')}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-600">Investment Value</span>
                  <span className="font-medium">₹{totalInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-gray-600">Entry Fee (2%)</span>
                  <span className="font-medium">₹{entryFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="py-3 mt-1 flex justify-between font-bold text-lg border-t border-gray-200">
                  <span className="text-gray-900">Total Payable</span>
                  <span className="text-[var(--color-blue)]">₹{totalPayable.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 text-blue-800 p-3 rounded text-xs mb-6 flex items-start gap-2 border border-blue-100">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Funds go directly to SEBI-registered escrow: <strong>HDFC Trusteeship Services Ltd</strong></span>
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Step 3: Simulated Payment</h3>
              <p className="text-sm text-gray-600 mb-6">In the real platform, you would pay via UPI/NEFT/RTGS. Funds go directly to escrow — not to RealtyConnect.</p>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center mb-6">
                <div className="text-sm text-gray-500 mb-2">Amount to pay</div>
                <div className="text-2xl font-bold text-[var(--color-navy)] mb-4">₹{totalPayable.toLocaleString('en-IN')}</div>
                <button 
                  onClick={() => {
                    setTimeout(() => setStep(4), 800);
                  }}
                  className="bg-[var(--color-green)] hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95"
                >
                  [Simulate Investment]
                </button>
              </div>
              
              <button onClick={resetAndClose} className="w-full text-center text-sm text-gray-500 hover:text-gray-800">
                Cancel
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-[var(--color-green)]" />
              </div>
              <h3 className="font-bold text-2xl text-gray-900 mb-2">Simulated!</h3>
              <p className="text-gray-600 mb-8">In reality, units would appear in your demat account within 24 hours of payment confirmation.</p>
              
              <Link 
                to="/waitlist"
                onClick={resetAndClose}
                className="block w-full bg-[var(--color-navy)] hover:bg-[#152e55] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Join Real Waitlist
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestNowModal;
