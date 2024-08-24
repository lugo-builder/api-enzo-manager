import { TDocumentDefinitions, Content, StyleDictionary } from 'pdfmake/interfaces';

const president = 'Carlos Alahín Camacho';
const logo: Content = {
  //image: 'src/assets/hydra_logo.jpg',
  //image: 'src/assets/hydra_logo_2.jpg',
  image: 'src/assets/hydra_logo_4.jpg',
  width: 100,
  margin:[25,10]
};


const styles: StyleDictionary = 
{
    h1:{
        fontSize: 22,
        bold: true,
        margin:[0,5]
    },
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 16,
      bold: true
    },
    address: {
      fontSize: 12,
      margin: [0, 10, 0, 10]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    },
    tableBody: {
      fontSize: 12,
      color: 'black'
    }
  };
export const paymentHydraReport = (data): TDocumentDefinitions => {
  let sanctionTitle = '', sanctionDescription = '';  
  if(data.sanctionPayment !=='$0.00'){
    sanctionTitle = 'Motivo de la sanción:';
    sanctionDescription = data.sanctionDescription;
  }
    return {
        header:{
            text: `Comprobante de pago`,
            alignment: 'right',
            margin:[10,10]
        },
        footer: 
          {
            text: `TOKEN DE SEGURIDAD\n${data.token}`,
              alignment: 'center',
              margin:[ 3, 5, 3, 20 ]
          }
        ,
        content: [
          logo,
          // Datos de la asociación civil columna 1
          {
            text: 'COLONOS HYDRA A.C.',
            style: 'subheader',
            alignment: 'left',
            color: '#000000'
          },
          {
                    text: 'CHY231114M48\nCalle Invierno #48\nFraccionamiento Real Solare\nC.P. 76246\nEl Marqués, Querétaro',
                    style: 'address',
                    alignment: 'left',
                    color: '#000000'
          },
          { 
            text: 'hydra.realsolare@gmail.com', 
            link: 'hydra.realsolare@gmail.com',
            fontSize: 12,
            color: 'blue'
          },
          {
            qr: `Colonos Hydra AC\nPresidente Mesa Directiva:${president}\nHydra ${data.houseId}\nPago interno\nFecha: ${data.paymentDate}\nToken: ${data.token}`,
            fit: 50,
            alignment: 'right'
          },
          {
            text: `Hydra ${data.houseId}`,
            style: 'header',
            alignment: 'center',
            color: '#000000'
          },
          {
            text: 'Condominio Hydra',
            style: 'subheader',
            alignment: 'center',
            color: '#000000'
          },
          {
            columns:[
                {
                    text:'Departamento |\nAño |\nPeriodo pagado |',
                    alignment: 'right',
                    margin:[5, 15, 5, 15],
                    width: '85%'
                },
                {
                    text:`${data.houseId}\n${data.year}\n${data.paymentMonth}`,
                    alignment: 'left', 
                    margin:[5, 15, 5, 15],
                    width: '15%'
                }
            ]
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', '*', '*'],
              body: [
                [
                  { text: 'Consecutivo', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Concepto', style: 'tableHeader', fillColor: '#dddddd' },
                  { text: 'Importe', style: 'tableHeader', fillColor: '#dddddd' }
                ],
                [
                  { text: '1', style: 'tableBody' },
                  { text: 'Cuota ordinaria', style: 'tableBody' },
                  { text: data.ordinaryPayment, style: 'tableBody',alignment: 'right' }
                ],
                [
                  { text: '2', style: 'tableBody' },
                  { text: 'Consumo de agua', style: 'tableBody' },
                  { text: data.waterPayment, style: 'tableBody',alignment: 'right' }
                ],
                [
                  { text: '3', style: 'tableBody' },
                  { text: 'Sanciones', style: 'tableBody' },
                  { text: data.sanctionPayment, style: 'tableBody',alignment: 'right' }
                ]
              ]
            },
            layout: {
              fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex % 2 === 0) ? '#f3f3f3' : null;
              }
            }
          },
          {
            columns:[
                {
                    text:'Total pagado |',
                    alignment: 'right',
                    style: 'subheader',
                    margin:[2, 20, 0, 2],
                    width: '85%'
                },
                {
                    text:`${data.total}`,
                    alignment: 'left', 
                    style: 'subheader',
                    margin:[2, 20, 0, 2],
                    width: '15%'
                }
            ]
          },
          {  
            text: 'NOTAS:',
            style: 'address',
            alignment: 'left',
            color: '#000000',
            bold: true
  },
  {
    ul: [
      'El pago de este recibo no libera de adeudos anteriores.',
      'No es válida sin el token de seguridad autorizado.',
    ]
  },
{  
  text: `${sanctionTitle}`,
  style: 'address',
  alignment: 'left',
  color: '#000000',
  bold: true
},
{
  ul: [
    `${sanctionDescription}`
  ]
}
        ],     
        styles: styles
      };
}

