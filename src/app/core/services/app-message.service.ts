import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageService as PrimeMessageService } from 'primeng/api';

export type AppMessageType = 'error' | 'warning' | 'success';

export interface AppMessagePayload {
  type: AppMessageType;
  title?: string;
  message: string;
  detail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {
  private readonly primeMessageService = inject(PrimeMessageService);
  private readonly _current = signal<AppMessagePayload | null>(null);

  readonly current = computed(() => this._current());
  readonly visible = computed(() => this._current() !== null);

  show(payload: AppMessagePayload): void {
    this._current.set(payload);
  }

  showError(message: string, options?: { title?: string; detail?: string }): void {
    this.show({
      type: 'error',
      title: options?.title,
      message,
      detail: options?.detail,
    });
  }

  showWarning(message: string, options?: { title?: string; detail?: string }): void {
    this.show({
      type: 'warning',
      title: options?.title,
      message,
      detail: options?.detail,
    });
  }

  showSuccess(message: string, options?: { title?: string; detail?: string; life?: number }): void {
    this.primeMessageService.add({
      severity: 'success',
      summary: options?.title ?? 'Éxito',
      detail: options?.detail ? `${message} ${options.detail}` : message,
      life: options?.life ?? 3500,
    });
  }

  close(): void {
    this._current.set(null);
  }
}
