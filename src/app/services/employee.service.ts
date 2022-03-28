import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employ } from '../model/Employ';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private corsHeaders: HttpHeaders = new HttpHeaders();
  private baseURL = environment.apiUrl + 'api/v1/employs';
  message:BehaviorSubject<string>;
  constructor(private httpClient: HttpClient) {
    this.message = new BehaviorSubject<string>('');
    this.corsHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
    });
  }
  setMessage(msg:string){
   this.message.next(msg);
  }

  getEmploysList(): Observable<Employ[]> {
    return this.httpClient.get<Employ[]>(`${this.baseURL}`);
  }
  createEmploye(employ: Employ): Observable<Employ> {
    return this.httpClient.post<Employ>(`${this.baseURL}`, employ);
  }
  getEmployById(id: number): Observable<Employ> {
    return this.httpClient.get<Employ>(`${this.baseURL}/${id}`);
  }
  updateEmploy(id: number, employ: Employ): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${id}`, employ,{responseType:'text'});
  }
  deleteEmploy(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
