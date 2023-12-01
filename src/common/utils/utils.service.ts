import { Injectable } from '@nestjs/common';
import { parse, format, parseISO } from 'date-fns';
import { HandledErrorModel } from '../types/error';

@Injectable()
export class UtilsService {
    static toNumber = (value: string) => {
        const newValue: number = Number.parseInt(value);
        return newValue;
    };

    static toYYYYMMDD = (date: Date) => {
        return format(date, 'yyyy-MM-dd');
    };

    getHandledErrorModel(
        status: boolean,
        message: string,
        error: Error
    ): HandledErrorModel {
        return new HandledErrorModel(status, message, error);
    }
}