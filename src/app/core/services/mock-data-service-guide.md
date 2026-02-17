# Mock Data Service - Guía de Uso

## 📋 Descripción

`MockDataService` es un servicio genérico para cargar datos mock desde archivos JSON ubicados en `src/app/core/mocks/` (servidos en runtime desde `/mocks/`). Está diseñado para ser extensible sin necesidad de modificar el código del servicio cada vez que se añade un nuevo endpoint.

## 🎯 Características

- ✅ **Genérico**: Carga cualquier archivo JSON con tipado TypeScript
- ✅ **Caché automático**: Evita múltiples peticiones al mismo archivo
- ✅ **Type-safe**: Soporte completo de tipos TypeScript
- ✅ **Fácil de extender**: Añade nuevos endpoints sin modificar el servicio base
- ✅ **ShareReplay**: Comparte resultados entre múltiples suscriptores

## 📁 Estructura de Archivos

```
src/app/core/
└── mocks/
    ├── companies.json     # Datos de compañías
    ├── projects.json      # Datos de proyectos
    ├── users.json         # (ejemplo) Datos de usuarios
    └── settings.json      # (ejemplo) Configuración
```

## 🚀 Uso Básico

### 1. Cargar datos desde un servicio

```typescript
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MockDataService } from '@core/services/mock-data.service';

interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private mockDataService = inject(MockDataService);

  getUsers(): Observable<User[]> {
    return this.mockDataService.loadJson<User[]>('users.json');
  }

  getUserById(id: string): Observable<User | undefined> {
    return this.mockDataService
      .loadJson<User[]>('users.json')
      .pipe(map((users) => users.find((user) => user.id === id)));
  }
}
```

### 2. Cargar datos sin caché (para datos que cambian)

```typescript
// Útil para datos que se actualizan frecuentemente
getRealtimeData(): Observable<RealtimeData> {
  return this.mockDataService.loadJson<RealtimeData>('realtime.json', false);
}
```

### 3. Limpiar el caché

```typescript
// Limpiar caché de un archivo específico
this.mockDataService.clearCache('users.json');

// Limpiar todo el caché
this.mockDataService.clearCache();
```

## 📝 Añadir Nuevos Endpoints

### Paso 1: Crear el archivo JSON

Crea tu archivo JSON en `src/app/core/mocks/`:

```json
// src/app/core/mocks/roles.json
[
  {
    "id": "1",
    "name": "Admin",
    "permissions": ["read", "write", "delete"]
  },
  {
    "id": "2",
    "name": "User",
    "permissions": ["read"]
  }
]
```

### Paso 2: Definir la interfaz TypeScript

```typescript
// src/app/core/models/role.model.ts
export interface Role {
  id: string;
  name: string;
  permissions: string[];
}
```

### Paso 3: Usar en tu servicio/componente

```typescript
import { inject } from '@angular/core';
import { MockDataService } from '@core/services/mock-data.service';
import { Role } from '@core/models/role.model';

export class RoleService {
  private mockDataService = inject(MockDataService);

  getRoles(): Observable<Role[]> {
    return this.mockDataService.loadJson<Role[]>('roles.json');
  }
}
```

**¡Eso es todo!** No necesitas modificar `MockDataService`.

## 🔄 Métodos Específicos vs. loadJson Genérico

### Opción 1: Usar loadJson directamente (Recomendado para casos simples)

```typescript
export class ProductService {
  private mockDataService = inject(MockDataService);

  getProducts(): Observable<Product[]> {
    return this.mockDataService.loadJson<Product[]>('products.json');
  }
}
```

### Opción 2: Extender MockDataService (Solo si necesitas lógica de negocio)

```typescript
// En mock-data.service.ts, añadir método específico
getProducts(): Observable<Product[]> {
  return this.loadJson<Product[]>('products.json').pipe(
    map(products => products.filter(p => p.isActive)), // Lógica adicional
  );
}
```

**¿Cuándo usar cada opción?**

- **Opción 1**: Cuando solo necesitas cargar datos sin transformación
- **Opción 2**: Cuando necesitas aplicar filtros, transformaciones o lógica de negocio

## 🎨 Ejemplos Avanzados

### Cargar múltiples archivos en paralelo

```typescript
import { forkJoin } from 'rxjs';

loadDashboardData(): Observable<DashboardData> {
  return forkJoin({
    users: this.mockDataService.loadJson<User[]>('users.json'),
    projects: this.mockDataService.loadJson<Project[]>('projects.json'),
    stats: this.mockDataService.loadJson<Stats>('stats.json'),
  });
}
```

### Combinar datos de múltiples archivos

```typescript
getUsersWithRoles(): Observable<UserWithRole[]> {
  return forkJoin({
    users: this.mockDataService.loadJson<User[]>('users.json'),
    roles: this.mockDataService.loadJson<Role[]>('roles.json'),
  }).pipe(
    map(({ users, roles }) =>
      users.map(user => ({
        ...user,
        role: roles.find(r => r.id === user.roleId),
      }))
    ),
  );
}
```

### Paginación simulada

```typescript
getUsersPaginated(page: number, pageSize: number): Observable<User[]> {
  return this.mockDataService.loadJson<User[]>('users.json').pipe(
    map(users => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return users.slice(start, end);
    }),
  );
}
```

## ⚙️ Configuración de Mocks

El servicio verifica si los mocks están habilitados a través de `environment.useMocks`:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  useMocks: true, // ← Habilita/deshabilita mocks globalmente
};
```

**Cambiar en producción:**

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  useMocks: false, // Usar API real en producción
};
```

## 🐛 Debugging

### Ver caché actual

```typescript
// En DevTools Console
const service = inject(MockDataService);
console.log((service as any).cache);
```

### Verificar si mocks están habilitados

```typescript
const service = inject(MockDataService);
console.log('Mocks enabled:', service.isEnabled());
```

## 📊 Performance

- **Caché**: Primera carga del JSON se cachea automáticamente
- **ShareReplay**: Múltiples suscriptores comparten la misma petición HTTP
- **Tamaño**: Archivos JSON pequeños (<100KB) se cargan instantáneamente
- **Recomendación**: Para archivos grandes (>500KB), considera desactivar caché: `loadJson('huge.json', false)`

## ✅ Best Practices

1. **Nombres de archivos**: Usa kebab-case (users.json, user-roles.json)
2. **Tipado**: Siempre define interfaces TypeScript para tus datos
3. **Caché**: Deja el caché activado por defecto (solo desactiva para datos dinámicos)
4. **Estructura JSON**: Mantén la estructura plana cuando sea posible
5. **Comentarios**: Añade comentarios en los archivos JSON para documentar la estructura

## 🔗 Integración con Servicios Reales

Cuando pases de mocks a API real:

```typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  private mockDataService = inject(MockDataService);
  private http = inject(HttpClient);
  private environment = inject(ENVIRONMENT); // Token de inyección

  getUsers(): Observable<User[]> {
    if (this.mockDataService.isEnabled()) {
      return this.mockDataService.loadJson<User[]>('users.json');
    }

    // API real
    return this.http.get<User[]>(`${this.environment.apiUrl}/users`);
  }
}
```

## 📚 Métodos Disponibles

| Método                             | Descripción                         | Parámetros                                               |
| ---------------------------------- | ----------------------------------- | -------------------------------------------------------- |
| `loadJson<T>(filename, useCache?)` | Carga un archivo JSON genérico      | `filename: string`, `useCache?: boolean` (default: true) |
| `clearCache(filename?)`            | Limpia caché específico o total     | `filename?: string`                                      |
| `isEnabled()`                      | Verifica si mocks están habilitados | Ninguno                                                  |
| `getCompanies()`                   | Carga compañías (método específico) | Ninguno                                                  |
| `getProjectsByCompany(companyId)`  | Carga proyectos filtrados           | `companyId: string`                                      |

## 🆘 Troubleshooting

### Error: "GET /mocks/users.json 404"

✅ **Solución**: Verifica que el archivo existe en `src/app/core/mocks/users.json`

### El caché no se actualiza después de modificar el JSON

✅ **Solución**: Limpia el caché manualmente:

```typescript
this.mockDataService.clearCache('users.json');
```

### Tipos TypeScript no coinciden con el JSON

✅ **Solución**: Define una interfaz que coincida exactamente con la estructura del JSON o usa validación de runtime (ej: zod)

---

**Última actualización:** 17 de febrero de 2026  
**Autor:** Equipo Frontend  
**Versión Angular:** 21.1.0
