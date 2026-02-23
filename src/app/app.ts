import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppMessageModalComponent } from './shared/components/app-message-modal/app-message-modal.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppMessageModalComponent, ToastModule],
  templateUrl: './app.html',
})
export class App {}
