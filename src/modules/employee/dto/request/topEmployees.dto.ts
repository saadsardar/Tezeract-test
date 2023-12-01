// top-earners.dto.ts
import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { UtilsService } from 'src/common/utils/utils.service';

export class TopEarnersDto {
  @IsNotEmpty()
  @Transform(({ value }) => UtilsService.toNumber(value))
  @IsInt({ message: 'N must be an integer' })
  @IsPositive({ message: 'N must be a positive integer' })
  topNumber: number;
}
