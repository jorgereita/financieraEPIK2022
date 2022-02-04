const TEM = 0.029;
const EA = 0.258;

export function getQuote(amount: number, quotes: number): any {
  const MV = EA / 12;
  return amount / ((1 - Math.pow(MV + 1, -quotes)) / MV);
}
export const availableAmount = "";
export const blackListedUsers = ['19385159', '70753211'];
export const whiteListedUsers = [ ];

export const incomeList = [
  {Id: 1, Descripcion: 'Menor a 1m'},
  {Id: 2, Descripcion: 'Entre 1m y 2m'},
  {Id: 3, Descripcion: 'Entre 2m y 3m'},
  {Id: 4, Descripcion: 'Entre 3m y 4m'},
  {Id: 5, Descripcion: 'Entre 4m y 5m'},
  {Id: 6, Descripcion: 'Mayor a 5m'},
];

export const occupationList = [
  {Id: 1, Descripcion: 'AMA DE CASA'},
  {Id: 2, Descripcion: 'ASALARIADO'},
  {Id: 3, Descripcion: 'ESTUDIANTE'},
  {Id: 4, Descripcion: 'INDEPENDIENTE FORMAL'},
  {Id: 5, Descripcion: 'INDEPENDIENTE INFORMAL'},
  {Id: 6, Descripcion: 'PENSIONADO'},
  {Id: 7, Descripcion: 'PRESTADOR DE SERVICIOS'},
  {Id: 8, Descripcion: 'RENTISTA'},
];

export const laboralAntiquityList = [
  {Id: 1, Descripcion: '0 a 6 meses'},
  {Id: 2, Descripcion: '6 meses a 1 año'},
  {Id: 3, Descripcion: '1 a 2 años'},
  {Id: 4, Descripcion: 'Más de 2 años'},
];

export const codigoCIIUList = [
  {Id: '10', Descripcion: 'Empleado'},
];

export function cleanData(): void {
  const keys = [
    'userData',
    'NumeroIdentificacion',
    'oUrl',
    'requestMoney',
    'IdConsulta',
    'dni-placeholder',
    'dni-reverse',
  ];

  keys.forEach(key => {
    localStorage.removeItem(key);
  });
}
