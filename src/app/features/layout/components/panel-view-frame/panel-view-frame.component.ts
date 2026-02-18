import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-panel-view-frame',
  imports: [CardModule, TranslateModule, NgOptimizedImage],
  template: `
    <p-card>
      @if (titleKey(); as title) {
        <ng-template pTemplate="header">
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ title | translate }}</h2>
          </div>
        </ng-template>
      }

      <ng-content />

      @if (showDecoration()) {
        <div class="mt-4 flex justify-end">
          <img
            ngSrc="assets/img/GEN-AI-SAE.png"
            width="160"
            height="160"
            alt=""
            aria-hidden="true"
            class="opacity-90 pointer-events-none select-none"
          />
        </div>
      }
    </p-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelViewFrameComponent {
  readonly titleKey = input<string | undefined>();
  readonly showDecoration = input(true);
}
