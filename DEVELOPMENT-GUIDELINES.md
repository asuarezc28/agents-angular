# Development Guidelines (Base)

Guía viva para desarrollar features en este proyecto sin romper arquitectura, performance ni consistencia visual.

> Estado: Angular 21, Standalone, Signals, PrimeNG + Tailwind, ngx-translate, ECharts, Lucide.

## 1) Principios obligatorios

- Usar componentes **standalone**.
- Estado local con **signals** (`signal`, `computed`, `effect`).
- Plantillas con control flow nativo (`@if`, `@for`, `@switch`).
- No usar `any` salvo caso extremo (preferir `unknown` o tipos explícitos).
- Toda nueva pantalla/panel debe priorizar **lazy loading**.

## 2) Estructura de carpetas (regla práctica)

- `src/app/core`: servicios transversales, config, constantes, modelos base.
- `src/app/shared`: componentes reutilizables entre features.
- `src/app/features`: funcionalidad de negocio por dominio.
- `src/assets/i18n`: traducciones por idioma.

## 3) Regla de oro para nuevos panels (bundle)

Todos los panels renderizables desde navegación deben declararse con `loadComponent` en `navigation.config.ts`.

### Ejemplo correcto

```ts
{
  id: 'my-panel',
  icon: 'chart',
  titleKey: 'layoutBase.panel.myFeature.title',
  descriptionKey: 'layoutBase.panel.myFeature.description',
  loadComponent: () =>
    import('../components/my-panel/my-panel.component').then(
      (m) => m.MyPanelComponent,
    ),
}
```

### Evitar (si no hay motivo)

```ts
component: MyPanelComponent;
```

## 4) Charts y librerías pesadas

- Mantener `echarts` en carga dinámica (lazy) en el wrapper de chart.
- Evitar imports estáticos de librerías pesadas en componentes de shell/layout.
- Si una feature trae dependencias grandes, encapsularla en panel/route lazy.

## 5) Rutas y composición

- `app.routes.ts` debe mantenerse simple, con carga diferida de áreas grandes cuando aplique.
- Evitar meter lógica de negocio en `app.ts` o en componentes de layout global.

## 6) i18n (obligatorio)

- No hardcodear textos visibles.
- Usar keys por dominio (`layoutBase.*`, `users.*`, etc.).
- Si se agrega texto nuevo, agregar claves en `assets/i18n/es/common.json` y `assets/i18n/en/common.json` (o archivo de dominio correspondiente).

## 7) Estilos y diseño

- Usar tokens/variables de PrimeNG (`--p-*`) y utilidades Tailwind.
- Evitar hardcodear colores fuera del sistema visual.
- Mantener coherencia entre dark/light en cualquier componente nuevo.

## 8) Servicios, guards, interceptors (cómo y dónde)

### Servicios

- Ubicación: `src/app/core/services` (globales) o `src/app/features/<feature>/services` (específicos).
- `providedIn: 'root'` para singleton global.

### Guards (cuando se introduzcan)

- Ubicación: `src/app/core/guards`.
- Preferir guards funcionales con `inject()`.

Ejemplo:

```ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLogged = true;
  return isLogged || router.createUrlTree(['/login']);
};
```

### Interceptors (cuando se introduzcan)

- Ubicación: `src/app/core/interceptors`.
- Registrar en `app.config.ts` con `provideHttpClient(withInterceptors([...]))`.

Ejemplo:

```ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = '';
  const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(cloned);
};
```

## 9) Mensajería global (error / warning / success)

Patrón vigente del proyecto:

- `error` y `warning` se muestran en **modal global** (`AppMessageModalComponent`).
- `success` se muestra en **toast no bloqueante** (`p-toast`).
- Servicio único de entrada: `AppMessageService`.

### Cuándo usar cada tipo

- `showError(...)`: fallos que bloquean una acción o requieren atención inmediata.
- `showWarning(...)`: estado no ideal, pero la app puede continuar.
- `showSuccess(...)`: confirmaciones de operación completada (guardar, actualizar, etc.).

### Ejemplos de uso (en cualquier componente/servicio)

```ts
import { inject } from '@angular/core';
import { AppMessageService } from 'src/app/core/services/app-message.service';

const appMessage = inject(AppMessageService);

appMessage.showError('No se pudo cargar la información solicitada.', {
  title: 'Error de carga',
  detail: 'Intenta nuevamente en unos segundos.',
});

appMessage.showWarning('Hay datos pendientes de sincronizar.', {
  title: 'Sincronización pendiente',
  detail: 'Los cambios locales aún no se han enviado al servidor.',
});

appMessage.showSuccess('Cambios guardados correctamente.', {
  title: 'Guardado',
  detail: 'La actualización se aplicó sin errores.',
  life: 3500,
});

// También soporta texto por i18n key + params
appMessage.showError(
  { key: 'messages.projects.loadError', params: { projectName: 'Apollo' } },
  {
    title: { key: 'messages.common.errorTitle' },
    detail: { key: 'messages.common.tryAgainLater' },
  },
);

// En success con toast, se puede mezclar key y texto directo
appMessage.showSuccess(
  { key: 'messages.users.savedOk' },
  {
    title: 'Guardado',
    life: 2500,
  },
);
```

### Reglas UX mínimas

- No usar modal para `success` salvo requerimiento explícito de negocio.
- Mantener mensajes cortos y accionables (qué pasó + siguiente paso).
- Si un flujo puede disparar muchos errores seguidos (HTTP), aplicar deduplicación/throttle en interceptor.
- `AppMessageService` permite enviar `string` o `{ key, params }` para `title/message/detail`.

## 10) Checklist al crear una feature nueva

- Crear carpeta en `features/<feature>` con componentes/servicios propios.
- Añadir traducciones de la feature.
- Si entra por navegación panel, usar `loadComponent`.
- Evitar dependencias pesadas en componentes globales.
- Verificar dark/light y accesibilidad básica (`aria-label`, contraste, foco).
- Ejecutar build de producción y revisar que no crezca innecesariamente el chunk inicial.

## 11) Mantenimiento de esta guía

Actualizar este archivo cuando se agregue infraestructura base:

- autenticación/autorización,
- guards/interceptors,
- manejo de errores global,
- telemetría/logging,
- cambios de arquitectura de rutas o layout.

Si una PR cambia una regla base, debe incluir actualización de esta guía y notificarselo a los compañeros.

## 12) Feature Skeleton (plantilla base recomendada)

Estructura mínima para nuevas features:

```text
src/app/features/<feature>/
  components/
    <feature>-panel/
      <feature>-panel.component.ts
  services/
    <feature>.service.ts
  models/
    <feature>.model.ts
  config/
    <feature>.config.ts
```

Ejemplo de panel standalone:

```ts
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-my-feature-panel',
  imports: [],
  template: `
    <section>
      <h2>{{ title() }}</h2>
      @if (items().length === 0) {
        <p>No data</p>
      }
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFeaturePanelComponent {
  private readonly state = signal<string[]>([]);
  protected readonly items = computed(() => this.state());
  protected readonly title = computed(() => 'My Feature');
}
```

Registro del panel en navegación (obligatorio lazy):

```ts
{
  id: 'my-feature',
  icon: 'chart',
  titleKey: 'layoutBase.panel.myFeature.title',
  descriptionKey: 'layoutBase.panel.myFeature.description',
  loadComponent: () =>
    import('../components/my-feature-panel/my-feature-panel.component').then(
      (m) => m.MyFeaturePanelComponent,
    ),
}
```

## 13) Flujo estándar para implementar una feature

1. Crear estructura `features/<feature>` con `components`, `services`, `models`.
2. Implementar panel standalone con signals y `OnPush`.
3. Añadir traducciones (`es` y `en`) para labels/títulos/mensajes.
4. Registrar el panel con `loadComponent` en configuración de navegación.
5. Verificar dark/light + accesibilidad básica (focus, `aria-label`, contraste).
6. Ejecutar `pnpm build --configuration production` y revisar tamaños de chunks.
7. Actualizar esta guía si se introduce un patrón técnico nuevo.
