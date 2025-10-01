import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://192.168.2.3/:8004/api/backup'; // Cambia el puerto si tu backend usa otro

  constructor(private http: HttpClient) { }

  uploadBackup(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  restoreBackup(bakFile: string, dbName: string): Observable<string> {
    const params = new HttpParams()
      .set('bakFile', bakFile)
      .set('dbName', dbName);
    return this.http.post<string>(`${this.apiUrl}/restore`, params);
  }

  listarTablas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tables`);
  }

  buscarTabla(nombre: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/tables/${nombre}`);
  }

  exportarTablaCsv(nombre: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/tables/${nombre}/csv`, { responseType: 'blob' });
  }

  getDatabases(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl.replace('/backup', '/backup/databases'));
  }
}
