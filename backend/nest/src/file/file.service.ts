import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
    filePath(){
        
    }

    /** get today date */
    getToday(): Date{
        const currentDate = new Date();

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate as unknown as Date;
    }
}
