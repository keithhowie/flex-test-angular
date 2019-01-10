import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignedUrlInfo } from './entities/signedUrlInfo';

@Injectable({
  providedIn: 'root'
})
export class S3UploadService {

  constructor(private httpClient: HttpClient) { }

  async uploadDocument(file: File): Promise<string> {
    const signedUrlInfo = await this.httpClient.get<SignedUrlInfo>(`https://urlsigner-uiczqjvmcp.now.sh/?objectName=${file.name}`).toPromise();
    await this.httpClient.put<Blob>(signedUrlInfo.signedUrl, file).toPromise();
    return signedUrlInfo.publicUrl;
  }
}
