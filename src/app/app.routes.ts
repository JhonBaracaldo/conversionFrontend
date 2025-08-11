import { Routes } from '@angular/router';
import { BackupComponent } from './backup/backup.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'backup', pathMatch: 'full' },
	{ path: 'backup', component: BackupComponent },
];
