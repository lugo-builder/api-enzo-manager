import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payments } from 'src/schemas/payments.schema';
import { Water } from 'src/schemas/water.schema';

@Injectable()
export class UsersService {

    constructor(
                @InjectModel(Payments.name) private paymentsModel: Model<Payments>,
                @InjectModel(Water.name) private waterModel: Model<Water>
                ) {}

    async findAll(sortBy: string = 'houseId'): Promise<Payments[]> {
        return this.paymentsModel.find().sort({ [sortBy]: 1 }).exec();
      }

//     async findWaterByFilter(month: number, year: number, ac: string): Promise<Water[]> {
//         return this.waterModel.find({  
//             ac: ac
//         }).exec();
// }

async findWaterByFilter(sortBy: string = 'houseId'): Promise<Water[]> {
  return this.waterModel.find().sort({ [sortBy]: 1 }).exec();
}
}
