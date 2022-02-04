import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { ModalInfoComponent } from 'src/app/shared/components/modal-info/modal-info.component';
import { environment } from '../../../../../environments/environment';
const internalIp = require('internal-ip');
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  loginForm: FormGroup;
  authorizationForm: FormGroup;
  submitted = false;
  @Input() type: string;
  hide: boolean;
  dataImg: any;
  error: any;
  mensaje: any;
  showLogin: boolean = false;
  // version = environment.version;
  validateUbi = false
  IpV4
  lat
  long
  bussinessLogo = ""
  private loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService,
    public dialogReasons: MatDialog,
  ) {
    // Initialize storage
    localStorage.clear();

    this.loginForm = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Clave: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.authorizationForm = this.formBuilder.group({
      Autorizacion: [false, []],
    });
  }
  irPopUpInfo(data1) {
    // this.index2Relase = index;
    const dialogRef = this.dialogReasons.open(ModalInfoComponent, {
      width: '400px',
      height: '',
      data: { data: data1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        // this.myRequest.splice(this.index2Relase, 1);
      }
    });
  }
  get f() { return this.loginForm.controls; }
  ChangeToLogin() {
    this.showLogin = true;
  }
  GoOthers() {

  }
  validateBussiness() {
    switch (environment.bussinessName) {
      case "EURO":
        this.bussinessLogo = "./assets/images/funnel/euro_orange.png"
        break;
      case "BO-CONCEPT":
        this.bussinessLogo = "./assets/images/funnel/bo-logo.png"
        break;
      case "COMPENSAR":
        this.bussinessLogo = "./assets/images/funnel/Logocompensar1.png"
        break;
      case "BIKEHOUSE":
        this.bussinessLogo = "./assets/images/funnel/LogoBikehouse.png"
        break;
      default:
        break;
    }
  }
  ngOnInit() {
    this.getPosition().then(pos => { }).catch(error => {
      this.irPopUpInfo("Recuerde que para continuar debe aprobar los accesos a ubicación.");
    });

    (async () => {
      // console.log(await internalIp.v6());
      //=> 'fe80::1'

      this.IpV4 = await internalIp.v4();
      //=> '10.0.0.79'
    })();
    this.validateBussiness()
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

        this.validateUbi = true;
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          this.validateUbi = false;
          reject(err);
        });
    });

  }
  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = this.loginForm.value;
    // console.log(formData);

    if (formData.Usuario === 'administrador') {
      localStorage.setItem('path', 'latest');
    }

    if (formData.Usuario === 'asesor@epik.com.co') {
      localStorage.setItem('path', 'other');
    }

    // await this.router.navigateByUrl('/funnel/agent-home');

    this.submitted = true;
    this.loading = true;
    sessionStorage.setItem('email', this.f.Usuario.value);
    let ip = sessionStorage.getItem("ipPrivada");


    navigator.geolocation.getCurrentPosition(resp => {
      let dts = {
        "Usuario": this.f.Usuario.value,
        "Clave": this.f.Clave.value,
        // "DireccionIP": this.IpV4,
        "Latitud": resp.coords.latitude,
        "Longitud": resp.coords.longitude
      }
      localStorage.setItem('Latitud', resp.coords.latitude.toString());
      localStorage.setItem('Longitud', resp.coords.longitude.toString());
      this.authService.authenticate(dts).subscribe(res => {
        if (res.IdError === 2) {

          this.mensaje = 'Se ha generado un error. Intente de nuevo';
          this.error = true;
          this.submitted = false;
          this.loading = false;
          return
        }

        if (res.IdError === 1) {

          this.mensaje = 'Usuario y/o contraseña erronea';
          this.error = true;
          this.submitted = false;
          this.loading = false;
          return
        }

        if (res.IdError === -99) {
          this.irPopUpInfo(res.Mensaje);
          // this.mensaje = 'Mensaje';
          this.error = true;
          this.submitted = false;
          this.loading = false;
          return
        }
        if (res.IdError !== 0) {

          this.mensaje = res.Mensaje;
          this.error = true;
          this.submitted = false;
          this.loading = false;
          return
        }

        localStorage.setItem('token', res.JWT);
        localStorage.setItem('expired', res.Expiracion.toString());
        localStorage.setItem('roleId', res.IdPerfil.toString());
        // this.router.navigate(["/home"]);

        // 1 puede seguir
        // 2 no esta enrolado
        // 0 no foto hoy
        // -1 no requerido

        if (!res.CambioClave) {
          localStorage.removeItem('token');
          sessionStorage.setItem('lastPass', this.f.Clave.value);
          this.router.navigateByUrl(`/account/${res.JWT}?validate=ok`);
        } else {
          const idTokenFace = (parseInt(localStorage.getItem('expired'), 10)) * 2;
          localStorage.setItem('idTokenFace', idTokenFace.toString());
          localStorage.setItem('datauser', JSON.stringify(res));
          // this.router.navigate(['/funnel/initial-query']);
        }
        // if (res.Identificado == 1 ||res.Identificado == -1) {

        // }
        localStorage.setItem('username', res.PrimerNombre + " " + res.SegundoNombre + " " + res.PrimerApellido + " " + res.SegundoApellido);
        // this.router.navigate(["/menu/admin-menu"]);
        // return;
        this.submitted = false;
        this.loading = false;
        if (res.Identificado == -1) {
          this.router.navigate(["/menu/admin-menu"]);
          return;
        }
        if (res.Identificado == 0) {
          this.router.navigate(["/menu/daily-face"]);
          return;
        }
        if (res.Identificado == 1) {
          this.router.navigate(["/funnel/initial-query"]);
          return;
        }
        if (res.Identificado == 2) {
          this.irPopUpInfo("Pendiente enrolamiento: El usuario debe ser enrolado por el administrador.")
          return;
        }
        if (res.Identificado == 3) {
          this.irPopUpInfo("Usuario fuera de coordenadas: El usuario no está dentro del rango permitido.")
          return;
        }
        if (res.Identificado == 4) {
          this.irPopUpInfo("IP Incorrecta: El usuario está logueando desde una IP Pública diferente a la registrada.")
          return;
        }

        // if (res.Identificado == 0) {
        //   var idTokenFace=(parseInt(localStorage.getItem("expired")))*4;
        //   localStorage.setItem("idTokenFace",idTokenFace.toString() );
        //    this.router.navigate(["/facematch"]);
        // }


      }, err => {
        this.mensaje = 'Se ha generado un error. Intente de nuevo';
        this.submitted = false;
        this.loading = false;
        this.error = true;
        return
      });

    },
      err => {
        this.loading = false;
        this.submitted = false;
        this.irPopUpInfo("Recuerde que para continuar debe aprobar los accesos a ubicación.");
      });

  }
}
