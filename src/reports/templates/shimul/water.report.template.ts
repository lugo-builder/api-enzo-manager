import { TDocumentDefinitions, Content, StyleDictionary } from 'pdfmake/interfaces';

const logo: Content = {
  image: 'src/assets/Tori.jpg',
  width: 70,
  margin:[30,10]
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
export const waterShimulReport = (data): TDocumentDefinitions => {
  let dataBody = [
    [
      { text: 'Concepto', style: 'tableHeader', fillColor: '#dddddd' },
      { text: 'Monto', style: 'tableHeader', fillColor: '#dddddd' }
    ],
    [
      { text: 'Lectura anterior', style: 'tableBody' },
      { text: `${data.previousWaterMetering} m3`, style: 'tableBody',alignment: 'right' }
    ],
    [
      { text: 'Lectura actual', style: 'tableBody' },
      { text: `${data.currentWaterMetering} m3`, stylwdee: 'tableBody',alignment: 'right' }
    ],
    [
      { text: 'Metros cúbicos consumidos', style: 'tableBody' },
      { text: `${data.metersConsumed} m3`, style: 'tableBody',alignment: 'right' }
    ],
    [
      { text: 'Diferencia por el macromedidor', style: 'tableBody' },
      { text: `$${data.differenceOfUse}`, style: 'tableBody',alignment: 'right' }
    ]
  ];

    return {
        header:{
            text: `${data.paymentMonth}-${data.year}`,
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
            text: 'CONDOMINO RINCONADA XANIC A.C.',
            style: 'subheader',
            alignment: 'left',
            color: '#000000'
          },
          {
                    text: 'Rinconada Xanic\nMarqués de Altamira\nCP 76240\nFraccionamiento Rincones del Marqués',
                    style: 'address',
                    alignment: 'left',
                    color: '#000000'
          },
          {
            qr: `Condominio Rinconada Xanic A.C.\nXanic ${data.houseId}\nConsumo de agua\nFecha: ${data.paymentMonth}\nToken: ${data.token}`,
            fit: 90,
            alignment: 'right'
          },
          {
            text: `Xanic ${data.houseId}`,
            style: 'header',
            alignment: 'center',
            color: '#000000'
          },
          // {
          //   text: 'Rinconada Xanic',
          //   style: 'subheader',
          //   alignment: 'center',
          //   color: '#000000'
          // },
          {
            columns:[
                {
                    text:'Casa |\nAño |\nPeriodo de consumo |',
                    alignment: 'right',
                    margin:[5, 15, 5, 15],
                    width: '85%'
                },
                {
                    text:`${data.houseId}\n${data.year}\n${data.periodOfUse}`,
                    alignment: 'left', 
                    margin:[5, 15, 5, 15],
                    width: '15%'
                }
            ]
          },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: dataBody
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
                    text:'Total a pagar |',
                    alignment: 'right',
                    style: 'subheader',
                    margin:[2, 20, 0, 2],
                    width: '85%'
                },
                {
                    text:`$${data.total}`,
                    alignment: 'left', 
                    style: 'header',
                    margin:[2, 20, 0, 2],
                    width: '15%'
                }
            ]
          },
          {  
            text: 'Información para realizar el pago',
            style: 'address',
            alignment: 'left',
            color: '#000000',
            bold: true,

  },
  {
    text: 'BANCO: BANCOMER \nNo DE CUENTA: 777777777 \nCLABE: 454545454545454545\nAclaraciones:',    
    style: 'address',
    alignment: 'left',
    color: '#000000',
    bold: true,
    
},
  { 
    text: 'xanic.aclaraciones@gmail.com', 
    link: 'xanic.aclaraciones@gmail.com',
    fontSize: 12,
    color: 'blue'
  },
  {  
    text: '\nNOTAS:',
    style: 'address',
    alignment: 'left',
    color: '#000000',
    bold: true
},
{
ul: [
'Este comprobante es solo informativo, y no libera de adeudos anteriores o acumulados.',
'No es válido sin el token de seguridad autorizado.',
]
},
        ],     
        styles: styles
      };
}
