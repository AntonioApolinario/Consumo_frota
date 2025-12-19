import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core';
import { Abastecimento } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getAbastecimentos(): Observable<Abastecimento[]> {
    return this.apiService.get<Abastecimento[]>('abastecimentos');
  }
}
