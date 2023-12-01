export class Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
  joiningDate: Date;

  constructor(id?: number, name?: string, position?: string, salary?: number, joiningDate?: Date) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.salary = salary;
    this.joiningDate = joiningDate;
  }

  getExperienceYears(): number {
    const currentDate = new Date();
    const joiningDate = new Date(this.joiningDate);
    const diffInMilliseconds = currentDate.getTime() - joiningDate.getTime();
    return diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);
  }

}