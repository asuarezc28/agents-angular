import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IdentitySegment, IdentityVertical } from '../../../core/mocks';
import { BaseDataService } from '../../../core/services/base-data.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Injectable({ providedIn: 'root' })
export class SettingsIdentityDataService extends BaseDataService {
  private readonly mockData = inject(MockDataService);

  getVerticals(): Observable<IdentityVertical[]> {
    return this.fromMockOrApi({
      mockRequest: () => this.mockData.getIdentityVerticals(),
      apiRequest: () => this.apiGet<IdentityVertical[]>('/settings/identity/verticals'),
    });
  }

  getSegments(): Observable<IdentitySegment[]> {
    return this.fromMockOrApi({
      mockRequest: () => this.mockData.getIdentitySegments(),
      apiRequest: () => this.apiGet<IdentitySegment[]>('/settings/identity/segments'),
    });
  }
}
