import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FileService {
  readFile<T>(fileName: string, classType: new (...args: any[]) => T): T[] {
    const filePath = path.resolve(process.cwd(), '.', fileName);
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const parsedData = JSON.parse(rawData);
      return plainToClass(classType, parsedData) as T[]
    } catch (error) {
      console.error(`Error reading JSON file (${fileName}): ${error.message}`);
      return [];
    }
  }
}
