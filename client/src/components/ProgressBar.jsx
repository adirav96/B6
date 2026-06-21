export default function ProgressBar({ label, percent, color = 'bg-primary', rightLabel }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-600">{rightLabel || `${percent}%`}</span>
      </div>
      <div className="bg-gray-200 rounded-full h-2.5">
        <div className={`${color} rounded-full h-2.5 transition-all duration-500`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
//reusable UI