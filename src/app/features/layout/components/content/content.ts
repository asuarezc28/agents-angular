import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
}
