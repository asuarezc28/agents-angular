import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-plain-panel-view',
  imports: [TranslateModule],
  template: `
    <section>
      <h2 class="text-xl font-semibold">
        {{ 'layoutBase.panel.users.directory.title' | translate }}
      </h2>
      <p class="mt-2 opacity-80">
        {{ 'layoutBase.panel.users.directory.description' | translate }}
      </p>

      <div class="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div>
          <p class="text-sm opacity-70">Status</p>
          <p class="text-lg font-semibold">Active users: 248</p>
        </div>
        <div>
          <p class="text-sm opacity-70">Pending</p>
          <p class="text-lg font-semibold">Invitations: 12</p>
        </div>
        <div>
          <p class="text-sm opacity-70">Roles</p>
          <p class="text-lg font-semibold">Custom roles: 6</p>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlainPanelViewComponent {}
