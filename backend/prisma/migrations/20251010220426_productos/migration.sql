-- CreateTable
CREATE TABLE "Productos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "precio" DECIMAL(10,2) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "categorias" VARCHAR(50),
    "descripcion" VARCHAR(255),
    "imagenUrl" VARCHAR(255),

    CONSTRAINT "PK__Producto__3213E83FD03D74D8" PRIMARY KEY ("id")
);
