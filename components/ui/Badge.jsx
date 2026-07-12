import { memo } from 'react';

function Badge({ children, color = 'teal', className = '' }) {
  const colorClasses = {
    teal: 'text-anchor-teal border-anchor-teal/30 bg-anchor-teal/5',
    amber: 'text-anchor-amber border-anchor-amber/30 bg-anchor-amber/5',
    gray: 'text-anchor-text-muted border-anchor-border bg-anchor-surface-light',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
}

const MemoBadge = memo(Badge);
export default MemoBadge;
