// salary-range.dto.ts
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
import { UtilsService } from 'src/common/utils/utils.service';

export class SalaryRangeDto {
  @IsNotEmpty()
  @Transform(({ value }) => UtilsService.toNumber(value))
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'minSalary must be a number' })
  @IsPositive({ message: 'minSalary must be a positive number' })
  minSalary: number;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: 'maxSalary must be a number' })
  @IsNotEmpty()
  @Transform(({ value }) => UtilsService.toNumber(value))
  @IsPositive({ message: 'maxSalary must be a positive number' })
  maxSalary: number;
}
