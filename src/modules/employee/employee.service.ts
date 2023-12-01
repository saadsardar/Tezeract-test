// employee.service.ts
import { Injectable } from '@nestjs/common';
import { EMPLOYEE_FILE_NAME, ERROR_MESSEAGES, RESPONSE_STATUS } from 'src/common/constants';
import { FileService } from 'src/common/file/file.service';
import { Employee } from './domain/entities/employee.entity';
import { UtilsService } from 'src/common/utils/utils.service';
import { HandledErrorModel } from 'src/common/types/error';

@Injectable()
export class EmployeeService {
  private employees: Employee[];

  constructor(

    private readonly utilsService: UtilsService,
    private readonly fileService: FileService,) {
  }

  private getEmployees() {
    if (!this.employees) {
      this.employees = this.fileService.readFile(EMPLOYEE_FILE_NAME, Employee);
    }
    return this.employees
  }

  filterBySalaryRange(minSalary: number, maxSalary: number, employeesData: Employee[]) {
    return employeesData.filter(
      (employee) => employee.salary >= minSalary && employee.salary <= maxSalary,
    );
  }

  private calculateAverageSalaryByPosition(employees: Employee[]) {
    const result = {};

    employees.forEach(({ position, salary }) => {
      result[position] = (result[position] || 0) + salary;
    });

    for (const position in result) {
      const employeeCount = employees.filter((employee) => employee.position === position).length;
      result[position] = Number((result[position] / employeeCount).toFixed(2));
    }

    return result;
  }

  private sortEmployeesBySalary(employeesData) {
    return [...employeesData].sort((a, b) => b.salary - a.salary)
  }

  getEmployeesData() {
    this.getEmployees()
    return this.employees;
  }

  getAverageEmployeesSalaryByPosition() {
    this.getEmployees()
    return this.calculateAverageSalaryByPosition(this.employees);
  }

  getEmployeesByExperience(minExperience: number, maxExperience: number): Employee[] {
    this.getEmployees()
    return this.employees.filter((employee) => {
      const experienceYears = employee.getExperienceYears();
      return experienceYears >= minExperience && experienceYears <= maxExperience;
    });
  }

  getTopEarnerEmployees(topNumber: number): Employee[] {
    this.getEmployees()
    const sortedEmployees = this.sortEmployeesBySalary(this.employees)
    return sortedEmployees.slice(0, topNumber);
  }

  getEmployeesRetentionRate(startDate: Date, endDate: Date): Record<string, number> {
    console.log("anaaf")
    const employees = this.getEmployees();
  
    const formattedStartDate = UtilsService.toYYYYMMDD(startDate);
    const formattedEndDate = UtilsService.toYYYYMMDD(endDate);
  
    const retentionRateByDepartment: Record<string, number> = {};
  
    employees.forEach(employee => {
      const department = employee.position;
      const joiningDate = UtilsService.toYYYYMMDD(new Date(employee.joiningDate));
  
      if (joiningDate >= formattedStartDate && joiningDate <= formattedEndDate) {
        retentionRateByDepartment[department] = (retentionRateByDepartment[department] || 0) + 1;
      }
    });
  
    Object.keys(retentionRateByDepartment).forEach(department => {
      retentionRateByDepartment[department] = (retentionRateByDepartment[department] / employees.length) * 100;
    });
  
    return retentionRateByDepartment;
  }
  
  
  getEmployeesBySalaryRange(minSalary: number, maxSalary: number): Employee[] | HandledErrorModel {
    this.getEmployees()
    if (minSalary > maxSalary) {
      const errorMessage = ERROR_MESSEAGES.MIN_LESSER_THAN_MAX
      return this.utilsService.getHandledErrorModel(
        RESPONSE_STATUS.FAIL,
        errorMessage,
        new Error(errorMessage)
      );
    }
    return this.filterBySalaryRange(minSalary, maxSalary, this.employees)
  }
}