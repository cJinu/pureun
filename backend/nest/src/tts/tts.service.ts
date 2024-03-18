import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';

@Injectable()
export class TtsService {
    api_url: string = 'https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts';

    /**  */
    async tts(answer: string, filePath: string): Promise<any>{    
        
        const writer = fs.createWriteStream(filePath);

        await axios({  
            method: 'POST',
            url: this.api_url,
            data: "speaker=nhajun&volume=0&speed=-1&pitch=0&format=mp3&text=" + answer,
            headers: {'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_CLIENT_ID, 
                    'X-NCP-APIGW-API-KEY': process.env.CLOVA_CLIENT_SECRET},
            responseType: 'stream',
            })
            .then(response => {
                return new Promise((resolve, reject) => {
                    
                response.data.pipe(writer);
                let error = null;
                writer.on('error', err => {
                    error = err;
                    writer.close();
                    reject(err);
                });
                writer.on('close', () => {
                    if (!error) {
                        resolve(true);
                    }
                });
            });
        });
    }

    // async notTalkTts(answer: string): Promise<any>{
    //     return await axios({
    //         method: 'POST',
    //         url: this.api_url,
    //         data: "speaker=nhajun&volume=0&speed=0&pitch=0&format=mp3&text=" + answer,
    //         headers: {'X-NCP-APIGW-API-KEY-ID': process.env.CLOVA_CLIENT_ID, 
    //                 'X-NCP-APIGW-API-KEY': process.env.CLOVA_CLIENT_SECRET},
    //         responseType: 'stream',
    //     })
    // }

}