import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { toObservable, toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService, type TranslationObject } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { PanelViewFrameComponent } from '../../../layout/components/panel-view-frame/panel-view-frame.component';
import { IdentitySegment, IdentityVertical } from '../../../../core/mocks';
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

  protected readonly selectedVerticalId = toSignal(this.form.controls.verticalId.valueChanges, {
    initialValue: this.form.controls.verticalId.value,
  });

  protected readonly selectedSegmentId = toSignal(this.form.controls.segmentId.valueChanges, {
    initialValue: this.form.controls.segmentId.value,
  });

  protected readonly verticals = toSignal(this.identityData.getVerticals(), {
    initialValue: [] as IdentityVertical[],
  });

  protected readonly segments = toSignal(
    toObservable(this.selectedVerticalId).pipe(
      switchMap((verticalId) => {
        if (!verticalId) {
          return of([] as IdentitySegment[]);
        }

        return this.identityData.getSegmentsByVertical(verticalId);
      }),
    ),
    { initialValue: [] as IdentitySegment[] },
  );

  protected readonly canSave = computed(() => {
    return Boolean(this.selectedVerticalId() && this.selectedSegmentId());
  });

  constructor() {
    this.form.controls.verticalId.valueChanges.subscribe(() => {
      this.form.controls.segmentId.setValue(null);
    });

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
