import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-view-loading-state',
  imports: [ProgressSpinnerModule, TranslateModule],
  template: `
    <section class="flex items-center justify-center" [style.minHeight]="minHeight()">
      <p-progressSpinner
        [style]="{ width: spinnerSize(), height: spinnerSize() }"
        [strokeWidth]="strokeWidth()"
        [ariaLabel]="ariaLabelKey() | translate"
      />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewLoadingStateComponent {
  readonly minHeight = input('24rem');
  readonly spinnerSize = input('3rem');
  readonly strokeWidth = input('4');
  readonly ariaLabelKey = input('messages.loading');
}
