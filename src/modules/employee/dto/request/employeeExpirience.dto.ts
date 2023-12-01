import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';
import { UtilsService } from 'src/common/utils/utils.service';
export class ExperienceFilterDto {
  @Transform(({ value }) => UtilsService.toNumber(value))
  @IsNotEmpty()
  @IsInt({ message: 'minExperience must be an integer' })
  @IsPositive({ message: 'minExperience must be a positive integer' })
  minExperience: number;

  @Transform(({ value }) => UtilsService.toNumber(value))
  @IsInt({ message: 'maxExperience must be an integer' })
  @IsNotEmpty()
  @IsPositive({ message: 'maxExperience must be a positive integer' })
  maxExperience: number;
}
