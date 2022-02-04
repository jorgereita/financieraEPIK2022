import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = environment.baseUrl;
  externalBaseUrl = environment.externalBaseUrl;

  constructor(private httpClient: HttpClient) {

  }

  getIp(): any {
    return this.httpClient.get<any>('http://api.ipify.org/?format=json');
  }

  list(): any {
    return this.httpClient.get<any>(this.baseUrl + '/api/values/list');
  }

  catalogos(): any {
    return this.httpClient.get<any>(this.baseUrl + '/api/catalogo/lista');
  }

  newUser(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/registra-usuario', data);
  }

  sendConfirmEmail(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/correo-confirmacion', data);
  }

  validateEmail(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-confirmacion', data);
  }

  sendOTP(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/generar-otp', data);
  }

  validateOTP(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-otp', data);
  }

  validatePhoto(data): any {
    return this.httpClient.post<any>(this.baseUrl + 'api/consulta/validar-foto', data);
  }

  getOlimpiaOtp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/validar-identidad', data);
  }

  getOlimpiaBankNote(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/validar-documentos', data);
  }

  sendQuoteViaWapp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/demo/enviar-whatsapp', data);
  }

  financialGetUserInfo(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/registrar', data);
  }
  simulationPreData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/sim/simulacion', data);
  }
  financialUserAgreement(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/acepta-megabase', data);
  }

  financialUserDataManipulationAgreement(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/autorizar-datos', data);
  }

  financialUpdateUserData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/actualizar-datos', data);
  }

  financialSaveSelfie(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/guardar-foto-perfil', data);
  }

  financialSaveDni(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/guardar-foto-documento', data);
  }

  financialSaveFingerprint(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/guardar-huella', data);
  }
  saveDniFront(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/foto-doc-frontal', data);
  }
  saveDniBack(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/guardar-foto-documento-reverso', data);
  }
  identificarRostro(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/epikface/identificar', data);
  }
  enrolarUsr(data) { 
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/epikface/agregar', data);
  }
  financialSaveExtraVariables(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/guardar-variables-extra', data);
  }

  financialCentralAuthorization(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/autorizar-centrales', data);
  }

  financialSendWapp(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/whatspp-cuota-demo', data);
  }
  cotizador(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/cotizador', data);
  }
  okCompra(data) {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/cliente-compra', data);
  }
  guardarSimulacion(data) {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/guardar-simulacion', data);
  }
  preguntarCuotasWhastapp(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/validar-aceptar-simulacion', data);
  }
  guardarInfoRecaudo(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/guardar-informacion-recaudo', data);
  }
  guardarInfoDesembolso(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/guardar-informacion-desembolso', data);
  }
  generarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/generar-documentos', data);
  }
  enviarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/enviar-documentos', data);
  }
  validarDocs(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/validar-documentos', data);
  }
  verifyPagare(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/validar-firma-documentos', data);
  }
  validarIdentidad(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/validar-identidad', data);
  }
  listaEnrolar(){
    return this.httpClient.get<any>(this.externalBaseUrl + 'api/usuario/lista-usuario');
  } 
  getFgaList(){
    return this.httpClient.get<any>(this.externalBaseUrl + 'api/cot/listado-fga');
  }
  sendFgaReport(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cot/reportar-fga', data);
  }
  validatePanicButton(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliNF/finalizar-flujo', data);
  }
  validateUidToken(data){
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/validacion-correo', data);
  }
  saveDniConfirm(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comNF/resumen-identidad', data);
  }
  confirmDocFlow(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/confirmar-doc-abordaje', data);
  }
  sendAddData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/datos-personales', data);
  }
  sendLabData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/datos-laborales', data);
  }
  sendContData(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/datos-contacto', data);
  }
  selecCredito(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/seleccion-credito', data);
  }
  selecFlujo(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/seleccion-flujo', data);
  }
  addAccountFlow(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/informacion-desembolso', data);
  }
  addAccountRecaudo(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/informacion-recaudo', data);
  }
  respuestaCliente(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/respuesta-cliente', data);
  }
  verificarPagare(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/validar-pagare', data);
  }
  verificarBackoffice(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/backoffice', data);
  }
  sendFotoSelfie(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/foto-selfie', data);
  }
  sendReversoDocumento(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/foto-doc-reverso', data);
  }
  cotizadorV2(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/comv2/simulador', data);
  }
  simaladorV2(data): any {
    return this.httpClient.post<any>(this.externalBaseUrl + 'api/cliv2/simulador', data);
  }
}
