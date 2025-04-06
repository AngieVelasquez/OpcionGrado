export interface Convocatoria {
  id?: number;
  titulo: string;
  resolucion: string;
  numeroResolucion: string; 
  descripcion: string;
  fechaInicio: Date | string | null;
  fechaFin: Date | string | null;  
  duracion: number;
  modalidadId?: number | null; 
  objetivos?: number[];
  lineas?: number[];
  estado?: string;
  nombreLineas?: string[];
}
