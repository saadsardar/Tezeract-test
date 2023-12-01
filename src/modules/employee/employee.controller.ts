import { Controller, Get, Query, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { BaseController } from 'src/common/web/base.controller';
import { ExperienceFilterDto } from './dto/request/employeeExpirience.dto';
import { TopEarnersDto } from './dto/request/topEmployees.dto';
import { RetentionRateDto } from './dto/request/RetentionRate.dto';
import { SalaryRangeDto } from './dto/request/salaryFilter.dto';
import { RESPONSE_MESSAGE } from 'src/common/constants';
import { Response } from 'express';

@Controller('employee')
export class EmployeeController extends BaseController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) {
        super();
    }
    @Get()
    async getEmployeesData(
        @Res() res: Response
    ) {
        const result = this.employeeService.getEmployeesData();
        return this.sendResponse(result, res, RESPONSE_MESSAGE.FETCHED)
    }

    @Get('department/salary')
    async getAverageSalaryByPosition(
        @Res() res: Response
    ) {
        const result = this.employeeService.getAverageEmployeesSalaryByPosition();
        return this.sendResponse(result, res, RESPONSE_MESSAGE.FETCHED);
    }
    @Get('experience/filter')
    async filterEmployeesByExperience(@Query() filterDto: ExperienceFilterDto, @Res() res: Response) {
        const { minExperience, maxExperience } = filterDto;
        const filteredEmployees = this.employeeService.getEmployeesByExperience(minExperience, maxExperience);
        return this.sendResponse(filteredEmployees, res, RESPONSE_MESSAGE.FETCHED);
    }

    @Get('top-earners')
    getTopEarners(@Query() topEarnersDto: TopEarnersDto, @Res() res: Response) {
        const { topNumber } = topEarnersDto;
        const topEarners = this.employeeService.getTopEarnerEmployees(topNumber);
        return this.sendResponse(topEarners, res, RESPONSE_MESSAGE.FETCHED);
    }

    @Get('retention-rate')
    getRetentionRate(@Query() retentionRateDto: RetentionRateDto, @Res() res: Response) {
        const { startDate, endDate } = retentionRateDto;
        const retentionRate = this.employeeService.getEmployeesRetentionRate(startDate, endDate);
        return this.sendResponse(retentionRate, res, RESPONSE_MESSAGE.FETCHED);
    }

    @Get('salary-range/filter')
    filterEmployeesBySalaryRange(@Query() salaryRangeDto: SalaryRangeDto, @Res() res: Response) {
        const { minSalary, maxSalary } = salaryRangeDto;
        const filteredEmployees = this.employeeService.getEmployeesBySalaryRange(minSalary, maxSalary);
        return this.sendResponse(filteredEmployees, res, RESPONSE_MESSAGE.FETCHED);
    }
}
