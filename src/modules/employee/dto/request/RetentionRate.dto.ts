import { Transform } from 'class-transformer';
import { IsNotEmpty, IsDate } from 'class-validator';

export class RetentionRateDto {
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate must be a valid date' })
  startDate: Date;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate must be a valid date' })
  endDate: Date;
}
