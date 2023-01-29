import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
    async createFile(file: MemoryStoredFile) {
        try {
            const fileName = `${uuid.v4()}.${file.extension}`;
            const filePath = path.resolve(__dirname, '..', 'static');

            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }

            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteFile(fileName: string) {
        try {
            const filePath = path.resolve(__dirname, '..', 'static', fileName);
            console.log(filePath);

            if (fs.existsSync(filePath)) {
                fs.rmSync(filePath);
            }

            return fileName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при удалении файла', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
