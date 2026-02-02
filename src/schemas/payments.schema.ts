import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema() // Decorador para definir un esquema de MongoDB
export class Payments extends Document {
  @Prop({ required: true }) // Campo obligatorio
  amount: string;

  @Prop({ required: true, unique: true }) // Campo único y obligatorio
  houseId: number;

  @Prop() // Campo opcional
  sanctionDescription: string;
}

// Genera el esquema con Mongoose
export const PaymentsSchema = SchemaFactory.createForClass(Payments);
