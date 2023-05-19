import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdComponent } from '../../shared/confirmd/confirmd.component';


@Component({
  selector: 'app-nuevoafiliado',
  templateUrl: './nuevoafiliado.component.html',
  styleUrls: ['./nuevoafiliado.component.css']
})
export class NuevoafiliadoComponent {

  tituloInicial = 'Afiliados - Nuevo Afiliado';

  selectedValue: string = '';
  selectedCar: string = '';

  afiliadosForm = this.fb.group({
    name: new FormControl(''),
    age: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private fb: FormBuilder, public dialog: MatDialog) { }

  crearAfiliado(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmdComponent, {
      width: '200px',
      height: '120px',
      data: 'esta seguro?'
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
      if (res) {
        console.log('borrar afiliado')
      }
    });
  }
}
