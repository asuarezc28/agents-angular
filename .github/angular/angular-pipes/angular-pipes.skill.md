---
name: angular-pipes
description: >
  Create pure and impure pipes in Angular v21+ for data transformation in templates.
  Trigger: When transforming data in templates, formatting dates/currency, filtering arrays, or creating custom data transformations.
---

# Angular Pipes

Create custom pipes for data transformation in Angular v21+. Pipes are standalone by default—do NOT set `standalone: true`.

## When to Use

- Transforming data for display (formatting, filtering, mapping)
- Creating reusable data transformations across components
- Keeping template logic clean and declarative
- Performance-sensitive transformations with pure pipes
- Complex transformations that need signal inputs

## Pure vs Impure Pipes

| Type               | When to Use                                                      | Performance                             | Example                         |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------- | ------------------------------- |
| **Pure** (default) | Transform primitive values or immutable objects                  | ✅ High - cached results                | `date`, `currency`, `uppercase` |
| **Impure**         | Transform mutable objects or arrays, or depend on external state | ⚠️ Low - runs on every change detection | `async`, custom filters         |

**Default to pure pipes**. Only use impure when absolutely necessary.

## Pure Pipe Structure

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit).trim() + ellipsis;
  }
}
```

```html
<!-- Usage -->
<p>{{ longText | truncate:30 }}</p>
<p>{{ longText | truncate:100:'…' }}</p>
```

## Pipe with Signal Inputs

```typescript
import { Pipe, PipeTransform, inject, signal } from '@angular/core';
import { UserService } from '../services/user';

@Pipe({
  name: 'userName',
})
export class UserNamePipe implements PipeTransform {
  private userService = inject(UserService);

  transform(userId: string): string {
    const user = this.userService.getUser(userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }
}
```

## Impure Pipe (Use Sparingly)

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false, // ⚠️ Runs on every change detection
})
export class FilterByPipe implements PipeTransform {
  transform<T>(items: T[], property: keyof T, value: any): T[] {
    if (!items || !property) return items;
    return items.filter((item) => item[property] === value);
  }
}
```

```html
<!-- Usage - filters on every change detection -->
@for (item of items | filterBy:'status':'active'; track item.id) {
<div>{{ item.name }}</div>
}
```

**Prefer computed signals over impure pipes:**

```typescript
// ✅ Better: Use computed signal instead
export class MyComponent {
  items = signal<Item[]>([]);
  filterValue = signal('active');

  filteredItems = computed(() => this.items().filter((item) => item.status === this.filterValue()));
}
```

```html
<!-- Template using computed signal -->
@for (item of filteredItems(); track item.id) {
<div>{{ item.name }}</div>
}
```

## Common Pipe Patterns

### Number Formatting

```typescript
@Pipe({ name: 'fileSize' })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
  }
}
```

```html
<p>{{ file.size | fileSize }}</p>
<!-- Output: "2.5 MB" -->
```

### Date Formatting

```typescript
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  }
}
```

### Safe Navigation

```typescript
@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  transform(value: any, path: string): any {
    return path.split('.').reduce((obj, key) => obj?.[key], value);
  }
}
```

```html
<p>{{ user | safe:'address.city' }}</p>
<!-- Safely accesses nested properties -->
```

### Array Transformation

```typescript
@Pipe({ name: 'join' })
export class JoinPipe implements PipeTransform {
  transform(array: any[], separator: string = ', ', property?: string): string {
    if (!array) return '';

    const values = property ? array.map((item) => item[property]) : array;

    return values.join(separator);
  }
}
```

```html
<p>{{ tags | join:', ' }}</p>
<p>{{ users | join:', ':'name' }}</p>
<!-- Output: "John, Jane, Bob" -->
```

## Async Pipe with Signals

```typescript
// ✅ Prefer signals over async pipe in Angular 21+
export class MyComponent {
  private http = inject(HttpClient);

  // Old way with async pipe
  users$ = this.http.get<User[]>('/api/users');

  // New way with signals (toSignal from @angular/core/rxjs-interop)
  users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });
}
```

```html
<!-- Old way -->
@for (user of users$ | async; track user.id) {
<div>{{ user.name }}</div>
}

<!-- New way (preferred) -->
@for (user of users(); track user.id) {
<div>{{ user.name }}</div>
}
```

## File Naming

No `.pipe` suffix. The folder tells you what it is.

```
✅ src/app/shared/pipes/truncate.ts
❌ src/app/shared/pipes/truncate.pipe.ts
```

## Testing Pipes

```typescript
import { TestBed } from '@angular/core/testing';
import { TruncatePipe } from './truncate';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should truncate long text', () => {
    const result = pipe.transform('This is a very long text', 10);
    expect(result).toBe('This is a...');
  });

  it('should not truncate short text', () => {
    const result = pipe.transform('Short', 10);
    expect(result).toBe('Short');
  });

  it('should handle null values', () => {
    const result = pipe.transform(null as any);
    expect(result).toBe('');
  });
});
```

## Commands

```bash
# Generate a pipe
ng g pipe shared/pipes/truncate --flat

# Generate a pipe in a specific feature
ng g pipe features/products/pipes/price-format --flat
```

## Critical Rules

- **DO** keep pipes pure by default
- **DO** use pipes for presentation logic only
- **DO** test pipes independently
- **DO** use native control flow (`@for`, `@if`) instead of `*ngFor`, `*ngIf`
- **DO NOT** set `standalone: true` (it's default in Angular 21+)
- **DO NOT** use impure pipes unless absolutely necessary
- **DO NOT** perform heavy computations in pipes
- **DO NOT** mutate input values in pipes
- **Prefer** computed signals over impure pipes for filtering/sorting

## Resources

- https://angular.dev/guide/pipes
- https://angular.dev/guide/signals
