// ...eliminado código duplicado fuera de la clase...
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-backup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './backup.component.html',
  styleUrl: './backup.component.css'
})
export class BackupComponent {
  uploadBackup() {
    if (!this.selectedFile) {
      this.uploadResult = 'Por favor selecciona un archivo .bak primero.';
      return;
    }
    this.backend.uploadBackup(this.selectedFile).subscribe({
      next: res => {
        if (typeof res === 'string') {
          this.uploadResult = res;
        } else if (res && typeof res === 'object' && res.message) {
          this.uploadResult = res.message;
        } else {
          this.uploadResult = JSON.stringify(res);
        }
      },
      error: err => this.uploadResult = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err))
    });
  }
  selectedFile: File | null = null;
  uploadResult: string = '';
  restoreResult: string = '';
  tablas: string[] = [];
  tablaBuscar: string = '';
  resultadoBuscar: string = '';
  dbName: string = 'IOSFINANCIERO_CAJICA_EPC_2025';
  bakFile: string = '';
  exportResult: string = '';
  databases: string[] = [];
  selectedDatabase: string = '';

  constructor(private backend: BackendService) {}

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
  this.bakFile = this.selectedFile?.name || ''; // Asigna el nombre automáticamente y previene error de null
      this.backend.uploadBackup(this.selectedFile!).subscribe({
        next: res => {
          if (typeof res === 'string') {
            this.uploadResult = res;
          } else if (res && typeof res === 'object' && res.message) {
            this.uploadResult = res.message;
          } else {
            this.uploadResult = JSON.stringify(res);
          }
        },
        error: err => this.uploadResult = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err))
      });
    }
  }

  onDatabaseChange() {
    this.exportResult = '';
    this.tablas = [];
  }

  restoreBackup() {
    if (this.bakFile && this.dbName) {
        this.backend.restoreBackup(this.bakFile, this.dbName).subscribe({
          next: (res: { message?: string; output?: string } | string) => {
            if (typeof res === 'string') {
              this.restoreResult = res;
            } else {
              this.restoreResult = (res.message || '') + (res.output ? '\n' + res.output : '');
            }
          },
          error: err => {
            const errorMsg = err.error?.error || err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err);
            const output = err.error?.output ? '\n' + err.error.output : '';
            this.restoreResult = 'Error: ' + errorMsg + output;
          }
      });
    }
  }

  listarTablas() {
    if (!this.selectedDatabase) {
      this.exportResult = 'Selecciona una base de datos primero.';
      return;
    }
    // Aquí podrías enviar el nombre de la base seleccionada al backend si es necesario
    this.backend.listarTablas().subscribe({
      next: res => this.tablas = res,
      error: err => {
        this.tablas = [];
        this.exportResult = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err));
      }
    });
  }

  buscarTabla() {
    if (this.tablaBuscar) {
      this.backend.buscarTabla(this.tablaBuscar).subscribe({
        next: res => this.resultadoBuscar = res,
        error: err => this.resultadoBuscar = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err))
      });
    }
  }

  exportarTablaCsv(nombre: string) {
    this.backend.exportarTablaCsv(nombre).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${nombre}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.exportResult = 'Exportación exitosa';
      },
      error: err => this.exportResult = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err))
    });
  }
/**
 * Obtiene la lista de bases de datos desde el backend y la asigna al arreglo `databases`.
 * Maneja errores mostrando el mensaje correspondiente en `exportResult`.
 */
getDatabases() {
  this.backend.getDatabases().subscribe({
    next: (res: string[]) => {
      this.databases = res;
    },
    error: err => {
      this.exportResult = 'Error: ' + (err.error?.message || err.message || JSON.stringify(err.error) || JSON.stringify(err));
    }
  });
}

}


