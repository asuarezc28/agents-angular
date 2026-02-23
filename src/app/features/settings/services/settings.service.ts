import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SaveSettingsIdentityPayload {
  companyId: string;
  projectId: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  saveCurrentIdentityConfiguration(
    payload: SaveSettingsIdentityPayload,
  ): Observable<{ saved: true; payload: SaveSettingsIdentityPayload }> {
    return of({
      saved: true,
      payload,
    });
  }
}
