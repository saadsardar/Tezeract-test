import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './modules/employee/employee.module';
import { UtilsModule } from './common/utils/utils.module';
import { FileModule } from './common/file/file.module';

@Module({
  imports: [
    UtilsModule,
    EmployeeModule,
    FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
