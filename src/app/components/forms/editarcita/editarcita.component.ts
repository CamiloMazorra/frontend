import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Afiliado } from 'src/app/models/afiliado';
import { Cita } from 'src/app/models/cita';
import { Test } from 'src/app/models/test';
import { AfiliadoService } from 'src/app/services/afiliado.service';
import { CitaService } from 'src/app/services/cita.service';
import { PruebaService } from 'src/app/services/prueba.service';

@Component({
  selector: 'app-editarcita',
  templateUrl: './editarcita.component.html',
  styleUrls: ['./editarcita.component.css']
})
export class EditarcitaComponent implements OnInit {

  tituloInicial = 'Citas - Actualizar Cita';
  public idElement = 0;
  public affOption: Afiliado[] = [];
  public testOption: Test[] = [];
  dateControl = new FormControl(new Date());
  public initialT = 0;
  public initialA = 0;
  public test: Test = {
    id: 0,
    name: '',
    description: ''
  }

  public aff: Afiliado = {
    id: 0,
    name: '',
    age: 0,
    email: ''
  }

  public app: Cita = {
    date: '',
    hour: '',
    idTest: this.test,
    idAffiliate: this.aff
  };


  citaForm = this.fb.group({
    date: new FormControl('', Validators.required),
    hour: new FormControl('', Validators.required),
    idTest: new FormControl('', Validators.required),
    idAffiliate: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder,
    private affService: AfiliadoService,
    private testService: PruebaService,
    private route: ActivatedRoute,
    private router: Router,
    private citaService: CitaService) { }

  ngOnInit(): void {
    this.afiliados();
    this.tests();
    this.route.params.subscribe(params => {
      this.idElement = params['id'];
    });
    this.traerCita();
  }

  afiliados() {
    this.affService.getAfiliados().subscribe(response => {
      this.affOption = response;
/*       console.log(this.affOption)
 */    });
  }

  tests() {
    this.testService.getTests().subscribe(response => {
      this.testOption = response;
/*       console.log(this.testOption);
 */    });
  };

  traerCita() {
    this.citaService.getCita(this.idElement).subscribe(citaEditar => {
      console.log(citaEditar)
      this.citaForm = this.fb.group({
        date: [moment(citaEditar.date, 'DD/MM/YYYY').format('YYYY-MM-DD') + 'T05:00:00.000Z', Validators.required],
        hour: [citaEditar.hour.toString(), Validators.required],
        idTest: [citaEditar.idTest.name, Validators.required],
        idAffiliate: [citaEditar.idAffiliate.id!.toString(), Validators.required],
      });
      this.initialT = citaEditar.idTest.id!;
      this.initialA = citaEditar.idAffiliate.id!;
      console.log(this.citaForm);
    })

  }
  crearCita(dataCita: any) {
    this.app.date = moment(dataCita.value.date).format('DD/MM/YYYY');
    this.app.hour = moment(dataCita.value.hour, 'h:mm A').format('HH:mm');
    this.app.idTest.id = dataCita.value.idTest;
    this.app.idAffiliate.id = dataCita.value.idAffiliate;

    console.log(this.app);


    this.citaService.postCita(this.app).subscribe(response => {
      this.app = response;
      console.log(this.aff);
      this.citaForm.reset;
      this.volverRuta();
    });
  }

  volverRuta() {
    //this.router.navigate(['../'], { relativeTo: this.route });
    this.router.navigate(['/dashboard/citas']);
  }

}
