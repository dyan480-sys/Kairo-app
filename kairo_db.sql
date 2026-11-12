-- ==========================================================
-- RECONSTRUCCIÓN TOTAL KAIRO DB (Versión Final 7 Obras + Rutas Reales)
-- Responsable: Vilma Dayana Peña Villamizar
-- Acción: Limpieza total, estructura optimizada y corrección de sintaxis
-- ==========================================================

-- 1. BORRAR TODO (Limpieza profunda)
DROP SCHEMA IF EXISTS seguridad CASCADE;
DROP SCHEMA IF EXISTS catalogo CASCADE;
DROP SCHEMA IF EXISTS usuario_datos CASCADE;

-- 2. CREAR ESQUEMAS LIMPIOS
CREATE SCHEMA seguridad;
CREATE SCHEMA catalogo;
CREATE SCHEMA usuario_datos;

-- ==========================================================
-- ESQUEMA: SEGURIDAD
-- ==========================================================
CREATE TABLE seguridad."Usuarios" (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    monedas INT DEFAULT 0,
    nivel INT DEFAULT 0
);

INSERT INTO seguridad."Usuarios" (nombre, correo, contrasena, monedas, nivel)
VALUES ('Kairo Admin', 'kairoadmin@gmail.com', '12345678', 100, 5)
ON CONFLICT DO NOTHING;

SELECT * FROM seguridad."Usuarios";

-- ==========================================================
-- ESQUEMA: CATALOGO
-- ==========================================================
CREATE TABLE catalogo."Generos" (
    id_genero SERIAL PRIMARY KEY,
    nombre_genero VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO catalogo."Generos" (nombre_genero) VALUES
('Accion'), ('Fantasia'), ('Romance'), ('Drama'), ('Comedia'), ('Misterio')
ON CONFLICT DO NOTHING;

SELECT * FROM catalogo."Generos";

-- Tabla Obras
CREATE TABLE catalogo."Obras" (
    id_obra SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    tipo_obra VARCHAR(20) DEFAULT 'Manhwa', -- Manga o Manhwa
    portada_url VARCHAR(255),
    descripcion TEXT,
    estado_publicacion BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA INTERMEDIA PARA GÉNEROS
CREATE TABLE catalogo."Obra_Genero" (
    id_obra INT REFERENCES catalogo."Obras"(id_obra) ON DELETE CASCADE,
    id_genero INT REFERENCES catalogo."Generos"(id_genero) ON DELETE CASCADE,
    PRIMARY KEY (id_obra, id_genero)
);

-- INSERTAR LAS 7 OBRAS DEFINITIVAS
INSERT INTO catalogo."Obras" (titulo, autor, tipo_obra, descripcion) VALUES
('Cásate con mi esposo', 'Lico', 'Manhwa', 'Jiang Mianyu renace y busca venganza contra su esposo y amiga que la traicionaron.'),
('Death Note', 'Tsugumi Ohba', 'Manga', 'Light Yagami encuentra un cuaderno sobrenatural que mata a cualquiera cuyo nombre escriba en él.'),
('Dr. Stone', 'Riichiro Inagaki', 'Manga', 'Senku Ishigami despierta en un mundo de piedra miles de años después y usa la ciencia para reconstruir la civilización.'),
('Fullmetal Alchemist', 'Hiromu Arakawa', 'Manga', 'Dos hermanos buscan la Piedra Filosofal para recuperar sus cuerpos tras un experimento de alquimia fallido.'),
('La doncella secreta del conde', 'Lee Hyeon', 'Manhwa', 'Una mujer se hace pasar por hombre para trabajar como secretario de un conde frío y misterioso.'),
('Operación: Amor Puro', 'Yoon Hyun', 'Manhwa', 'Una comedia romántica sobre operaciones secretas y malentendidos amorosos.'),
('Solo Leveling', 'Chugong', 'Manhwa', 'Sung Jin-Woo, el cazador más débil, obtiene un sistema que le permite subir de nivel sin límites.');

-- ASIGNAR LOS 3 GÉNEROS A CADA OBRA
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Cásate con mi esposo' AND g.nombre_genero IN ('Romance', 'Drama', 'Misterio');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Death Note' AND g.nombre_genero IN ('Misterio', 'Accion', 'Drama');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Dr. Stone' AND g.nombre_genero IN ('Accion', 'Comedia', 'Drama');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Fullmetal Alchemist' AND g.nombre_genero IN ('Accion', 'Fantasia', 'Drama');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'La doncella secreta del conde' AND g.nombre_genero IN ('Romance', 'Drama', 'Fantasia');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Operación: Amor Puro' AND g.nombre_genero IN ('Romance', 'Comedia', 'Drama');
INSERT INTO catalogo."Obra_Genero" (id_obra, id_genero) SELECT o.id_obra, g.id_genero FROM catalogo."Obras" o, catalogo."Generos" g WHERE o.titulo = 'Solo Leveling' AND g.nombre_genero IN ('Accion', 'Fantasia', 'Drama');

SELECT * FROM catalogo."Obras";
SELECT * FROM catalogo."Obra_Genero";

-- TABLA CAPÍTULOS
CREATE TABLE catalogo."Capitulos" (
    id_capitulo SERIAL PRIMARY KEY,
    id_obra INT NOT NULL REFERENCES catalogo."Obras"(id_obra) ON DELETE CASCADE,
    numero_capitulo INT NOT NULL,
    titulo_capitulo VARCHAR(150),
    contenido_url VARCHAR(500), -- CORRECCIÓN: Aumentado a 500 para soportar rutas absolutas largas de Windows
    orden_lectura INT,
    costo_monedas INT DEFAULT 0,
    fecha_publicacion DATE DEFAULT CURRENT_DATE
);

-- ==========================================================
-- INSERTAR CAPÍTULOS CON RUTAS REALES (Correcciones de sintaxis aplicadas)
-- ==========================================================

-- Cásate con mi esposo (1-7)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#1] Cásate Con Mi Esposo-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#2] Cásate Con Mi Esposo-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#3] Cásate Con Mi Esposo-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#4] Cásate Con Mi Esposo-HD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#5] Cásate Con Mi Esposo-HD.pdf', 5),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 6, 'Capítulo 6', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#6] Cásate Con Mi Esposo-HD.pdf', 6),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Cásate con mi esposo'), 7, 'Capítulo 7', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Casate_con_mi_esposo\[#7] Cásate Con Mi Esposo-HD.pdf', 7);

-- Death Note (0-6)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 0, 'Capítulo 0', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#0] Death Note - full color-HD.pdf', 0),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#1] Death Note - full color-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#2] Death Note - full color-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#3] Death Note - full color-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#4] Death Note - full color-HD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#5] Death Note - full color-HD.pdf', 5),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Death Note'), 6, 'Capítulo 6', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\death_note\[#6] Death Note - full color-HD.pdf', 6);

-- Dr. Stone (1-6) - CORREGIDA FALTA DE COMA EN CAP 2
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#1] Dr.Stone-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#2] Dr.Stone-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#3] Dr.Stone-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#4] Dr.Stone-HD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#5] Dr.Stone-HD.pdf', 5),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Dr. Stone'), 6, 'Capítulo 6', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Dr_Stone\[#6] Dr.Stone-HD.pdf', 6);

-- Fullmetal Alchemist (0-4)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Fullmetal Alchemist'), 0, 'Capítulo 0', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Fullmetal_Alchemist\[#0.] Fullmetal Alchemist-HD.pdf', 0),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Fullmetal Alchemist'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Fullmetal_Alchemist\[#1] Fullmetal Alchemist-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Fullmetal Alchemist'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Fullmetal_Alchemist\[#2] Fullmetal Alchemist-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Fullmetal Alchemist'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Fullmetal_Alchemist\[#3] Fullmetal Alchemist-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Fullmetal Alchemist'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Fullmetal_Alchemist\[#4] Fullmetal Alchemist-HD.pdf', 4);

-- La doncella secreta del conde (1-5)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='La doncella secreta del conde'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\La_Doncella_Secreta_Del_Conde\[#1] La Doncella Secreta Del Conde-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='La doncella secreta del conde'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\La_Doncella_Secreta_Del_Conde\[#2] La Doncella Secreta Del Conde-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='La doncella secreta del conde'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\La_Doncella_Secreta_Del_Conde\[#3] La Doncella Secreta Del Conde-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='La doncella secreta del conde'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\La_Doncella_Secreta_Del_Conde\[#4] La Doncella Secreta Del Conde-HD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='La doncella secreta del conde'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\La_Doncella_Secreta_Del_Conde\[#5] La Doncella Secreta Del Conde-HD.pdf', 5);

-- Operación: Amor Puro (0-7)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 0, 'Capítulo 0', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#0] Operación_ amor verdadero-HD.pdf', 0),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#1] Operación_ amor verdadero-HD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#2] Operación_ amor verdadero-HD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#3] Operación_ amor verdadero-HD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#4] Operación_ amor verdadero-HD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#5] Operación_ amor verdadero-HD.pdf', 5),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 6, 'Capítulo 6', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#6] Operación_ amor verdadero-HD.pdf', 6),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Operación: Amor Puro'), 7, 'Capítulo 7', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Operacion_Amor_Puro\[#7] Operación_ amor verdadero-HD.pdf', 7);

-- Solo Leveling (0-5)
INSERT INTO catalogo."Capitulos" (id_obra, numero_capitulo, titulo_capitulo, contenido_url, orden_lectura) VALUES
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 0, 'Capítulo 0', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#0.] Solo Leveling-HD.pdf', 0),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 1, 'Capítulo 1', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#1] Solo Leveling-SD.pdf', 1),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 2, 'Capítulo 2', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#2] Solo Leveling-SD.pdf', 2),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 3, 'Capítulo 3', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#3] Solo Leveling-SD.pdf', 3),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 4, 'Capítulo 4', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#4] Solo Leveling-SD.pdf', 4),
((SELECT id_obra FROM catalogo."Obras" WHERE titulo='Solo Leveling'), 5, 'Capítulo 5', 'C:\Users\USUARIO\OneDrive - ISER\Escritorio\kairo-app\assets\manwhas\Solo_Leveling\[#5] Solo Leveling-SD.pdf', 5);

SELECT * FROM catalogo."Capitulos";

-- ==========================================================
-- ESQUEMA: USUARIO_DATOS
-- ==========================================================
CREATE TABLE usuario_datos."Biblioteca" (
    id_biblioteca SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES seguridad."Usuarios"(id_usuario) ON DELETE CASCADE,
    id_obra INT REFERENCES catalogo."Obras"(id_obra) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_lectura VARCHAR(20) DEFAULT 'Leyendo',
    UNIQUE(id_usuario, id_obra)
);

CREATE TABLE usuario_datos."Progreso_Lectura" (
    id_progreso SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES seguridad."Usuarios"(id_usuario) ON DELETE CASCADE,
    id_capitulo INT REFERENCES catalogo."Capitulos"(id_capitulo) ON DELETE CASCADE,
    pagina_actual INT DEFAULT 1,
    ultima_lectura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_usuario, id_capitulo)
);

CREATE TABLE usuario_datos."Historial_Monedas" (
    id_transaccion SERIAL PRIMARY KEY,
    id_usuario INT REFERENCES seguridad."Usuarios"(id_usuario) ON DELETE CASCADE,
    cantidad INT NOT NULL,
    motivo VARCHAR(100),
    fecha_transaccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- VERIFICACIÓN FINAL
SELECT '--- RESUMEN DE OBRAS Y GÉNEROS ---' AS info;
SELECT o.titulo, array_agg(g.nombre_genero) as generos, count(c.id_capitulo) as caps
FROM catalogo."Obras" o
JOIN catalogo."Obra_Genero" og ON o.id_obra = og.id_obra
JOIN catalogo."Generos" g ON og.id_genero = g.id_genero
LEFT JOIN catalogo."Capitulos" c ON o.id_obra = c.id_obra
GROUP BY o.titulo
ORDER BY o.titulo;

--consulta final 
SELECT 
    o.titulo, 
    array_agg(DISTINCT g.nombre_genero) as generos_unicos, -- DISTINCT elimina duplicados
    count(DISTINCT c.id_capitulo) as total_caps            -- Cuenta capítulos reales
FROM catalogo."Obras" o
JOIN catalogo."Obra_Genero" og ON o.id_obra = og.id_obra
JOIN catalogo."Generos" g ON og.id_genero = g.id_genero
LEFT JOIN catalogo."Capitulos" c ON o.id_obra = c.id_obra
GROUP BY o.titulo
ORDER BY o.titulo;