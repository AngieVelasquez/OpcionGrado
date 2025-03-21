export interface LoginRequest {
  username: string;
  password: string;
}

export interface InformacionPersona {
  pegeId: string;
  numeroDocumento: string;
  email: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
}

export interface AuthResponse {
  token: string;
  expiration: Date;
  datosUsuario: InformacionPersona;
}
