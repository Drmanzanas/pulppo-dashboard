import React from 'react';

type PriceTagProps = {
  price: number;
  currency: string;
};

const PriceTag: React.FC<PriceTagProps> = ({ price, currency }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);

  return (
    <div className="inline-block bg-blue-100 text-blue-800 font-semibold px-3 py-1 rounded-md">
      {formattedPrice}
    </div>
  );
};

export default PriceTag;