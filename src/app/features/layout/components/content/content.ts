import { ChangeDetectionStrategy, Component, Type, effect, input, signal } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PanelConfig } from '../../models/navigation-config';

@Component({
  selector: 'app-content',
  imports: [TranslateModule, NgComponentOutlet],
  templateUrl: './content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  readonly panel = input<PanelConfig | undefined>();

  protected readonly resolvedComponent = signal<Type<unknown> | null>(null);
  protected readonly isLoadingComponent = signal(false);

  private loadRequestId = 0;

  constructor() {
    effect(() => {
      const activePanel = this.panel();
      const requestId = ++this.loadRequestId;

      if (!activePanel) {
        this.resolvedComponent.set(null);
        this.isLoadingComponent.set(false);
        return;
      }

      if (activePanel.component) {
        this.resolvedComponent.set(activePanel.component);
        this.isLoadingComponent.set(false);
        return;
      }

      if (activePanel.loadComponent) {
        this.resolvedComponent.set(null);
        this.isLoadingComponent.set(true);

        void activePanel
          .loadComponent()
          .then((component) => {
            if (this.loadRequestId !== requestId) {
              return;
            }

            this.resolvedComponent.set(component);
            this.isLoadingComponent.set(false);
          })
          .catch(() => {
            if (this.loadRequestId !== requestId) {
              return;
            }

            this.resolvedComponent.set(null);
            this.isLoadingComponent.set(false);
          });

        return;
      }

      this.resolvedComponent.set(null);
      this.isLoadingComponent.set(false);
    });
  }
}
