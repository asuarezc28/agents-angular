import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppMessageService } from '../../../core/services/app-message.service';

@Component({
  selector: 'app-message-modal',
  imports: [DialogModule, ButtonModule],
  template: `
    <p-dialog
      [visible]="messageService.visible()"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [closable]="true"
      [dismissableMask]="true"
      [style]="{ width: 'min(92vw, 34rem)' }"
      (onHide)="close()"
    >
      <ng-template pTemplate="header">
        <span class="font-semibold" [class]="titleClass()">{{ headerText() }}</span>
      </ng-template>

      @if (messageService.current(); as message) {
        <div class="flex items-start gap-3">
          <span
            class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            [class]="badgeClass()"
          >
            {{ message.type === 'error' ? '!' : '⚠' }}
          </span>

          <div class="min-w-0 space-y-1">
            <p class="m-0 text-base font-medium">{{ message.message }}</p>
            @if (message.detail) {
              <p class="m-0 text-sm opacity-80">{{ message.detail }}</p>
            }
          </div>
        </div>

        <div class="mt-5 flex justify-end">
          <button pButton type="button" label="Cerrar" (click)="close()"></button>
        </div>
      }
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMessageModalComponent {
  protected readonly messageService = inject(AppMessageService);

  protected readonly headerText = computed(() => {
    const message = this.messageService.current();

    if (!message) {
      return '';
    }

    if (message.title) {
      return message.title;
    }

    return message.type === 'error' ? 'Error' : 'Advertencia';
  });

  protected readonly badgeClass = computed(() => {
    const message = this.messageService.current();
    if (!message) {
      return '';
    }

    return message.type === 'error'
      ? 'bg-red-100 text-red-700 dark:bg-red-900/35 dark:text-red-300'
      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/35 dark:text-yellow-300';
  });

  protected readonly titleClass = computed(() => {
    const message = this.messageService.current();
    if (!message) {
      return '';
    }

    return message.type === 'error'
      ? 'text-red-700 dark:text-red-300'
      : 'text-yellow-700 dark:text-yellow-300';
  });

  protected close(): void {
    this.messageService.close();
  }
}
