import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Project } from '../mocks';
import { BaseDataService } from './base-data.service';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class ContextDataService extends BaseDataService {
  private readonly mockData = inject(MockDataService);

  getCompanies(): Observable<Company[]> {
    return this.fromMockOrApi({
      mockRequest: () => this.mockData.getCompanies(),
      apiRequest: () => this.apiGet<Company[]>('/companies'),
    });
  }

  getProjectsByCompany(companyId: string): Observable<Project[]> {
    return this.fromMockOrApi({
      mockRequest: () => this.mockData.getProjectsByCompany(companyId),
      apiRequest: () => this.apiGet<Project[]>(`/companies/${companyId}/projects`),
    });
  }
}