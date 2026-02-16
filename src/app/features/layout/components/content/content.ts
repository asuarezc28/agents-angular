import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PanelConfig } from '../../models/navigation-config';

@Component({
  selector: 'app-content',
  imports: [CardModule, TranslateModule],
  templateUrl: './content.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  readonly panel = input<PanelConfig | undefined>();
}
