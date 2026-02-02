
interface paymentsHydra {
    type?: string,
    color?: string,
    
    comprobation?: string,
    house?: string,
    
    ordinaryPayment: string,
    waterPayment: string,
   
    sanctionDescription?: string,
    total: string,
    
    
    token?: string,
    
    waterPaymentDelay?:string,
    ordinaryPaymentDelay?:string,
    sanctionPaymentDelay?:string,
    sanctionPaymentDelayDescription?:string,

    houseId: string,
    paymentMonth: string,
    year: string,
    caKey?:string,
    condo?:string,
    sanctionPayment?: string,
    pendingPayment?: string,
    metersConsumed?: string,
    periodOfWaterUse?: string,
    comments?:string,
    amount?: string,
  };

const data: paymentsHydra[] = 
[
    {
      "houseId": "2",
      "ordinaryPayment": "165",
      "waterPayment": "102",
      "pendingPayment":"",
      "sanctionPayment":"300",
      "paymentMonth": "Junio",
      "periodOfWaterUse": "Abril",
      "metersConsumed": "13",
      "comments": "Sin comentarios",
      "total": "267",
      "condo": "Hydra",
      "caKey": "colonoshydraac",
      "year": "2025",
    }
  ]
;

export const recibosHydra = data;
