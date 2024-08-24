
interface paymentsHydra {
    houseId: string,
    ordinaryPayment: string,
    waterPayment: string,
    sanctionPayment: string,
    sanctionDescription: string,
    total: string,
    paymentMonth: string,
    year: string,
    token?: string
};

const data: paymentsHydra[] = [
    {
        houseId: "1",
        ordinaryPayment: "$165.00",
        waterPayment: "$150.00",
        sanctionPayment: "$0.00",
        sanctionDescription: "",
        total: "$315.00 ",
        paymentMonth: "Agosto",
        year: "2024"
    }
];

export const paymentsHydraAugust = data;
