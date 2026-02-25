import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import type { IdentitySegment, IdentityVertical } from '@models/identity-project.model';
import { PanelViewFrameComponent } from '../../../layout/components/panel-view-frame/panel-view-frame.component';
import { SettingsIdentityDataService } from '../../services/settings-identity-data.service';

@Component({
  selector: 'app-settings-dashboard',
  imports: [
    PanelViewFrameComponent,
    ReactiveFormsModule,
    TabsModule,
    CardModule,
    SelectModule,
    ButtonModule,
    TranslateModule,
  ],
  templateUrl: './settings-dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsDashboardComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly identityData = inject(SettingsIdentityDataService);
  private readonly http = inject(HttpClient);
  private readonly translate = inject(TranslateService);

  protected readonly activeTab = signal('identity');

  protected readonly form = this.formBuilder.group({
    verticalId: [null as string | null],
    segmentId: [null as string | null],
  });

  protected readonly verticals = toSignal(this.identityData.getVerticals(), {
    initialValue: [] as IdentityVertical[],
  });

  protected readonly segments = toSignal(this.identityData.getSegments(), {
    initialValue: [] as IdentitySegment[],
  });

  protected readonly canSave = computed(() => {
    return Boolean(this.form.controls.verticalId.value && this.form.controls.segmentId.value);
  });

  constructor() {
    const initialLang = this.translate.currentLang || this.translate.getFallbackLang() || 'es';
    this.loadViewTranslations(initialLang);

    this.translate.onLangChange.pipe(takeUntilDestroyed()).subscribe(({ lang }) => {
      this.loadViewTranslations(lang);
    });
  }

  protected onTabChange(value: string | number | undefined): void {
    if (typeof value === 'string') {
      this.activeTab.set(value);
    }
  }

  private loadViewTranslations(lang: string): void {
    this.http
      .get<TranslationObject>(`./assets/i18n/${lang}/settings-dashboard.json`)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (translations) => {
          this.translate.setTranslation(lang, translations, true);
        },
      });
  }
}
