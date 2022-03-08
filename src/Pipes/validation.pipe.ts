import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../Exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (metadata.type !== 'body') {
            return value;
        }
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const obj = plainToClass(metatype, value);
        const errors = await validate(obj, {
            //transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        if (errors.length) {
            const messages = errors.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(
                    ', ',
                )}`;
            });
            throw new ValidationException(messages);
        }
        return value;
    }
    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
