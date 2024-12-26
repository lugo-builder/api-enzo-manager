import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Decorador para definir un esquema de MongoDB
export class Water extends Document {
  
    @Prop({ required: true, unique: true }) // Campo único y obligatorio
    houseId: number;
  
    @Prop({ required: true })
    previousWaterMetering: string;
    


}

// Genera el esquema con Mongoose
export const WaterSchema = SchemaFactory.createForClass(Water);