import Image from 'next/image';

export default function AnchorLogo({ size = 32, className = '' }) {
  return (
    <Image
      src="/img/anchor-logo.png"
      alt="Anchor Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
