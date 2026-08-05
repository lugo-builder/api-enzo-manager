import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
//import { paymentHydraReport } from './templates/hydra/proof.payment.report';
import { paymentHydraReport } from './templates/hydra/layout.payment.report';
import { waterShimulReport } from './templates/shimul/water.report.template';
import { currentPaymentsHydra } from './templates/hydra/payments/payment-october-disorder-2024';
//import { recibosHydra } from './templates/hydra/payments/recibos-hydra-report';
import { recibosHydra } from './templates/hydra/payments/recibos-julio-hydra-report';
import { reportShimul } from './templates/shimul/periods/shimul-period-mayo_2026';
const fs = require('fs');
import * as path from 'path';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};
@Injectable()
export class ReportsService {
  create(createReportDto: CreateReportDto) {
    return 'This action adds a new report';
  }

  findAll() {
    return `This action returns all reports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }

generatePdf() {
    console.log('GeneratePDF');
    
    const PdfPrinter = require('pdfmake');
    const printer = new PdfPrinter(fonts);
    const fs = require('fs');
    //TODO: Generar un arreglo con el reporte final
    recibosHydra.forEach(houseData => {
      
      if(houseData.type !== `extrapay` && houseData.type !== `mora`){
        houseData.color = houseData.type === 'redemption' ? 'red' : 'black';
        houseData.token = this.generateFolio(houseData);
        let pdfDoc = printer.createPdfKitDocument(paymentHydraReport(houseData));
        let fileName = `pago-interno-${houseData.paymentMonth.toLowerCase()}-hydra-${houseData.houseId}.pdf`;
        pdfDoc.pipe(fs.createWriteStream(fileName));
        pdfDoc.end();
      }
    });
    console.log('Final GeneratePDF');
    
    return 'This action generate pdf';
  }

  generateFolio(data){
  const Cryptr = require('cryptr');
  //`colonoshydraac`
  const cryptr = new Cryptr(data.caKey , { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

const encryptedString = cryptr.encrypt(`${data.condo}${data.houseId}-${data.paymentMonth}-${data.year}`);
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); 
console.log(decryptedString); 
return encryptedString;
  }


  filterData() {
    console.log('Filter');
    
    // Ordenar el JSON por houseId de forma descendente
  const sortedPayments = currentPaymentsHydra.sort((a, b) => {
  // Convertimos houseId a números flotantes para asegurar una comparación numérica correcta
  const houseIdA = parseFloat(a.houseId);
  const houseIdB = parseFloat(b.houseId);

  return houseIdA - houseIdB ; // Orden Ascendente
});

console.log(sortedPayments);

const jsonContent = JSON.stringify(sortedPayments, null, 2); // `null, 2` para formatear con indentación de 2 espacios

// Escribir el resultado en un archivo llamado 'sorted_payments.json'
fs.writeFile('oct_sorted_payments.json', jsonContent, 'utf8', (err) => {
    if (err) {
        console.error('Error al escribir el archivo:', err);
    } else {
        console.log('Archivo JSON ordenado guardado como sorted_payments.json');
    }
});

    console.log('Final filter');
    return 'This action filter report';
  }

  generateRecibosShimul() {
    console.log('Generar reportes shimul');
    
    const PdfPrinter = require('pdfmake');
    const printer = new PdfPrinter(fonts);
    const fs = require('fs');



    //TODO: Generar un arreglo con el reporte final
    reportShimul.forEach(houseData => {
      
        //houseData.color = houseData.type === 'redemption' ? 'red' : 'black';
        houseData.token = this.generateFolio(houseData);
        
        let fileName = `${houseData.houseId}_${houseData.condo.toLowerCase()}_consumo_${houseData.periodOfUse.toLocaleLowerCase()}_${houseData.year}.pdf`;

        //Generar carpetas
        let houseNumber = parseInt(houseData.houseId);
        let casaName = `00`;
        if(houseNumber < 10){
          casaName = `0${houseData.houseId}`;
        }else{
          casaName = houseData.houseId;
        }
         const folderPath = `CASA ${casaName}/07.- JULIO 2026`;

         const outputDir = path.resolve(__dirname, '..', folderPath);
          const outputFilePath = path.join(outputDir, fileName);

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          let pdfDoc = printer.createPdfKitDocument(waterShimulReport(houseData));

          const writeStream = fs.createWriteStream(outputFilePath);
        pdfDoc.pipe(writeStream);
        pdfDoc.end();

        writeStream.on('finish', () => {
          console.log('PDF generated and saved to:', outputFilePath);
        });
        
        writeStream.on('error', (error) => {
          console.error('Error while generating the PDF:', error);
        });


      
    });
    console.log('Final GeneratePDF');
    
    return 'This action generate pdf';
  }

  generateRecibos() {
    console.log('Generar reportes Hydra');
    
    const PdfPrinter = require('pdfmake');
    const printer = new PdfPrinter(fonts);
    const fs = require('fs');



    //TODO: Generar un arreglo con el reporte final
    recibosHydra.forEach(houseData => {
      
        //houseData.color = houseData.type === 'redemption' ? 'red' : 'black';
        houseData.token = this.generateFolio(houseData);
        
        let fileName = `${houseData.condo.toLowerCase()}_${houseData.houseId}_pago_interno_${houseData.paymentMonth.toLocaleLowerCase()}_${houseData.year}.pdf`;

        //Generar carpetas
        let houseNumber = parseInt(houseData.houseId);
        let casaName = `00`;
        if(houseNumber < 10){
          casaName = `0${houseData.houseId}`;
        }else{
          casaName = houseData.houseId;
        }
         const folderPath = `HYDRA ${casaName}/07.- JULIO 2025`;

         const outputDir = path.resolve(__dirname, '..', folderPath);
          const outputFilePath = path.join(outputDir, fileName);

          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          let pdfDoc = printer.createPdfKitDocument(paymentHydraReport(houseData));

          const writeStream = fs.createWriteStream(outputFilePath);
        pdfDoc.pipe(writeStream);
        pdfDoc.end();

        writeStream.on('finish', () => {
          console.log('PDF generated and saved to:', outputFilePath);
        });
        
        writeStream.on('error', (error) => {
          console.error('Error while generating the PDF:', error);
        });


      
    });
    console.log('Final GeneratePDF');
    
    return 'This action generate pdf';
  }
}
