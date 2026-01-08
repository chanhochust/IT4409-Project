import type { Address } from 'src/shared/types/api/address/address.type';

interface AddressTypeBadgeProps {
  type: Address['type'];
}

export function AddressTypeBadge({ type }: AddressTypeBadgeProps) {
  const typeConfig: Record<Address['type'], { label: string; bgColor: string }> = {
    home: { label: 'Home', bgColor: 'bg-primary/10' },
    office: { label: 'Office', bgColor: 'bg-secondary/10' },
    other: { label: 'Other', bgColor: 'bg-muted/50' },
  };

  const config = typeConfig[type];

  return (
    <span className={`${config.bgColor} text-foreground rounded px-2 py-1 text-xs font-semibold`}>{config.label}</span>
  );
}
