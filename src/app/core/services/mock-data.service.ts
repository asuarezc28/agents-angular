import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import type { Company } from '@models/company.model';
import type { Project } from '@models/project.model';
import { IdentitySegment, IdentityVertical } from '../mocks';
import { BaseDataService } from './base-data.service';

interface IdentityProjectData {
  verticals: IdentityVertical[];
  segments: IdentitySegment[];
}

/**
 * Servicio genérico para cargar datos mock desde archivos JSON.
 *
 * Uso:
 * 1. Para añadir nuevos endpoints, simplemente usa loadJson<T>('nombre-archivo.json')
 * 2. Los archivos JSON deben estar en /src/app/core/mocks/ (servidos en runtime desde /mocks/)
 * 3. El caché está habilitado por defecto para optimizar peticiones
 *
 * Ejemplo:
 * ```typescript
 * // En otro servicio o componente
 * getUsers(): Observable<User[]> {
 *   return this.mockDataService.loadJson<User[]>('users.json');
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MockDataService extends BaseDataService {
  private cache = new Map<string, Observable<any>>();

  isEnabled(): boolean {
    return environment.useMocks;
  }

  /**
   * Método genérico para cargar cualquier archivo JSON desde /mocks/
   * @param filename Nombre del archivo JSON (ej: 'companies.json', 'users.json')
   * @param useCache Si es true, cachea la petición para evitar múltiples cargas (default: true)
   * @returns Observable con los datos parseados del JSON
   */
  loadJson<T>(filename: string, useCache = true): Observable<T> {
    const filePath = `/mocks/${filename}`;

    if (useCache && this.cache.has(filePath)) {
      return this.cache.get(filePath) as Observable<T>;
    }

    const request$ = this.http.get<T>(filePath).pipe(
      shareReplay(1), // Compartir resultado entre múltiples suscriptores
    );

    if (useCache) {
      this.cache.set(filePath, request$);
    }

    return request$;
  }

  /**
   * Limpia el caché de un archivo específico o todo el caché
   * @param filename Nombre del archivo a limpiar (opcional). Si no se pasa, limpia todo el caché
   */
  clearCache(filename?: string): void {
    if (filename) {
      this.cache.delete(`/mocks/${filename}`);
    } else {
      this.cache.clear();
    }
  }

  // ========== MÉTODOS ESPECÍFICOS (implementados con loadJson genérico) ==========

  getCompanies(): Observable<Company[]> {
    return this.loadJson<Company[]>('companies.json');
  }

  getProjectsByCompany(companyId: string): Observable<Project[]> {
    return this.loadJson<Project[]>('projects.json').pipe(
      map((projects) => projects.filter((project) => project.companyId === companyId)),
    );
  }

  getIdentityVerticals(): Observable<IdentityVertical[]> {
    return this.loadJson<IdentityProjectData>('identity-project.json').pipe(
      map((data) => data.verticals),
    );
  }

  getIdentitySegmentsByVertical(verticalId: string): Observable<IdentitySegment[]> {
    return this.loadJson<IdentityProjectData>('identity-project.json').pipe(
      map((data) => data.segments.filter((segment) => segment.verticalId === verticalId)),
    );
  }

  // Ejemplo de cómo añadir nuevos endpoints sin modificar la lógica del servicio:
  //
  // getUsers(): Observable<User[]> {
  //   return this.loadJson<User[]>('users.json');
  // }
  //
  // getRoles(): Observable<Role[]> {
  //   return this.loadJson<Role[]>('roles.json');
  // }
  //
  // getSettings(): Observable<Settings> {
  //   return this.loadJson<Settings>('settings.json');
  // }
}
