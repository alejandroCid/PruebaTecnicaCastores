create database PruebaInventario;
use PruebaInventario;

create table roles (
	idRol int(2) primary key,
    rol varchar(15) not null
);

create table usuarios (
	idUsuario int(6) primary key auto_increment,
    nombre varchar(100) not null,
    correo varchar(50) not null,
    contrasena varchar(25) not null,
    idRol int(2) not null,
    estatus int(1) not null,
    CONSTRAINT fk_rol 
        FOREIGN KEY (idRol) 
        REFERENCES roles(idRol)
);
	
create table inventarios (
	idProducto int primary key auto_increment,
    nombre varchar(100) not null,
    cantidad int not null default(0),
    estatus int not null default(1)
);

create table historial_movimientos (
	idMovimiento int primary key auto_increment,
    idUsuario int(6) not null,
    idProducto int not null,
    tipo_movimiento char not null,
    cantidad int not null,
    fecha_hora datetime default current_timestamp,
    CONSTRAINT fk_usuario FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    CONSTRAINT fk_producto FOREIGN KEY (idProducto) REFERENCES inventarios(idProducto)
);

Insert into roles (idRol, rol) values (1, "Administrador");
Insert into roles (idRol, rol) values (2, "Almacenista");

select * from usuarios;
insert into usuarios (nombre, correo, contrasena, idRol, estatus) values ( "Admin", "admin@gmail.com", "admin123", 1, 1);
insert into usuarios (nombre, correo, contrasena, idRol, estatus) values ( "Juan", "juanelan@gmail.com", "juan123", 1, 0);
insert into usuarios (nombre, correo, contrasena, idRol, estatus) values ( "Luisa", "luisalpe@gmail.com", "luisa2001", 2, 1);
insert into usuarios (nombre, correo, contrasena, idRol, estatus) values ( "Alberto", "alberto2@gmail.com", "alberto456", 2, 0);
