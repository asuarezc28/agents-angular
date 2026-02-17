/**
 * Modelo de Role para el sistema de permisos
 * Corresponde con los datos en /src/app/core/mocks/roles.json (runtime: /mocks/roles.json)
 */
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  level: 'system' | 'manager' | 'user';
}

/**
 * Usuario con rol asignado
 */
export interface UserWithRole {
  id: string;
  name: string;
  email: string;
  roleId: string;
  role?: Role;
}

/**
 * Ejemplo de cómo usar el MockDataService con roles:
 *
 * ```typescript
 * import { inject } from '@angular/core';
 * import { MockDataService } from '@core/services/mock-data.service';
 * import { Role } from '@core/models/role.model';
 *
 * export class RoleService {
 *   private mockDataService = inject(MockDataService);
 *
 *   getRoles(): Observable<Role[]> {
 *     return this.mockDataService.loadJson<Role[]>('roles.json');
 *   }
 *
 *   getRoleById(id: string): Observable<Role | undefined> {
 *     return this.mockDataService.loadJson<Role[]>('roles.json').pipe(
 *       map(roles => roles.find(role => role.id === id))
 *     );
 *   }
 *
 *   getAdminRoles(): Observable<Role[]> {
 *     return this.mockDataService.loadJson<Role[]>('roles.json').pipe(
 *       map(roles => roles.filter(role => role.level === 'system'))
 *     );
 *   }
 * }
 * ```
 */
