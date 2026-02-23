import { Injectable, computed, inject, signal } from '@angular/core';
import { MessageService as PrimeMessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

export type AppMessageType = 'error' | 'warning' | 'success';

export interface AppMessageI18nText {
  key: string;
  params?: Record<string, string | number | boolean | null | undefined>;
}

export type AppMessageText = string | AppMessageI18nText;

export interface AppMessagePayload {
  type: AppMessageType;
  title?: AppMessageText;
  message: AppMessageText;
  detail?: AppMessageText;
}

interface ResolvedAppMessagePayload {
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
  private readonly translate = inject(TranslateService);
  private readonly _current = signal<ResolvedAppMessagePayload | null>(null);

  readonly current = computed(() => this._current());
  readonly visible = computed(() => this._current() !== null);

  show(payload: AppMessagePayload): void {
    this._current.set(this.resolvePayload(payload));
  }

  showError(
    message: AppMessageText,
    options?: { title?: AppMessageText; detail?: AppMessageText },
  ): void {
    this.show({
      type: 'error',
      title: options?.title,
      message,
      detail: options?.detail,
    });
  }

  showWarning(
    message: AppMessageText,
    options?: { title?: AppMessageText; detail?: AppMessageText },
  ): void {
    this.show({
      type: 'warning',
      title: options?.title,
      message,
      detail: options?.detail,
    });
  }

  showSuccess(
    message: AppMessageText,
    options?: { title?: AppMessageText; detail?: AppMessageText; life?: number },
  ): void {
    const resolvedMessage = this.resolveText(message);
    const resolvedTitle = options?.title ? this.resolveText(options.title) : 'Éxito';
    const resolvedDetail = options?.detail ? this.resolveText(options.detail) : resolvedMessage;

    this.primeMessageService.add({
      severity: 'success',
      summary: resolvedTitle,
      detail: resolvedDetail,
      life: options?.life ?? 3500,
    });
  }

  close(): void {
    this._current.set(null);
  }

  private resolvePayload(payload: AppMessagePayload): ResolvedAppMessagePayload {
    return {
      type: payload.type,
      title: payload.title ? this.resolveText(payload.title) : undefined,
      message: this.resolveText(payload.message),
      detail: payload.detail ? this.resolveText(payload.detail) : undefined,
    };
  }

  private resolveText(text: AppMessageText): string {
    if (typeof text === 'string') {
      return text;
    }

    return this.translate.instant(text.key, text.params);
  }
}
