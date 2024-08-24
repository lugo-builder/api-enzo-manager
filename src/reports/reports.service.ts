import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { paymentHydraReport } from './templates/hydra/proof.payment.report';
import { paymentsHydraAugust } from './templates/hydra/payments/payments-august-2024';

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
    paymentsHydraAugust.forEach(houseData => {
      houseData.token = this.generateFolio(houseData);
      let pdfDoc = printer.createPdfKitDocument(paymentHydraReport(houseData));
      pdfDoc.pipe(fs.createWriteStream(`pago-interno-hydra-${houseData.houseId}`));
      pdfDoc.end();
    });
    console.log('Final GeneratePDF');
    return 'This action generate pdf';
  }

  generateFolio(data){
    const Cryptr = require('cryptr');
  const cryptr = new Cryptr(`colonoshydraac` , { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

const encryptedString = cryptr.encrypt(`Hydra${data.houseId}-${data.paymentMonth}-${data.year}`);
const decryptedString = cryptr.decrypt(encryptedString);

console.log(encryptedString); 
console.log(decryptedString); 
return encryptedString;
  }
}
