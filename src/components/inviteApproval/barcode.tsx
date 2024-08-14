import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string; // Define the type of the value prop
  options?: JsBarcode.Options; // Optionally define the type for options
}

const Barcode: React.FC<BarcodeProps> = ({ value, options = {} }) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, value, options);
    }
  }, [value, options]);

  return <svg ref={barcodeRef} />;
};

export default Barcode;
