export interface Product {
  id: number;
  nombre: string;
  precio: number; // podrías usar `number` para decimal en TS
  activo: boolean; // BIT → boolean
  categorias: string; // VARCHAR(50) que puede ser NULL
  descripcion: string;
  imagenUrl: string; // URL de la imagen
}
