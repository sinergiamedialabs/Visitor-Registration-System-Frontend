import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
  value: string; 
  options?: JsBarcode.Options;
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
