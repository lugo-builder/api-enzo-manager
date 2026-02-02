
interface paymentsHydra {
    type: string,
    color?: string,
    amount: string,
    comprobation: string,
    house: string,
    houseId: string,
    ordinaryPayment: string,
    waterPayment: string,
    sanctionPayment?: string,
    pendingPayment?: string,
    sanctionDescription: string,
    total: string,
    paymentMonth: string,
    year: string,
    token?: string,
    comments?:string,
    waterPaymentDelay?:string,
    ordinaryPaymentDelay?:string,
    sanctionPaymentDelay?:string,
    sanctionPaymentDelayDescription?:string,
    caKey?:string,
    condo?:string,
  };

const data: paymentsHydra[] = 
[
    {
      "type": "redemption",
      "condo": "1",
      "caKey": "colonoshydraac",
      "houseId": "2",
      "amount": "267",
      "waterPayment": "102",
      "ordinaryPayment": "165",
      //"sanctionPayment": "0",
      //"pendingPayment": "200",
      "sanctionDescription": "",
      "waterPaymentDelay": "0",
      "ordinaryPaymentDelay": "0",
      "sanctionPaymentDelay": "0",
      "sanctionPaymentDelayDescription": "",
      "total": "267",
      "comprobation": "0",
      "house": "1",
      "paymentMonth": "Septiembre",
      "year": "2024",
      "comments": "Amortización del excedente de pago en Agosto 2024"
    }
  ]
;

export const recibosHydra = data;
