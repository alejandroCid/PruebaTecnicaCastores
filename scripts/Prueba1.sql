create database prueba1;
use prueba1;

create table productos(
	idProducto int(6) primary key auto_increment,
    nombre varchar(40),
    precio decimal(16,2)
);

create table ventas (
	idVenta int(6) primary key auto_increment,
    idProducto int(6),
    cantidad int(6),
    CONSTRAINT fk_ventas_productos 
        FOREIGN KEY (idProducto) 
        REFERENCES productos(idProducto)
);

insert into productos (nombre, precio) values ("Laptop", 3000.00);
insert into productos (nombre, precio) values ("PC", 4000.00);
insert into productos (nombre, precio) values ("Mouse", 100.00);
insert into productos (nombre, precio) values ("Teclado", 150.00);
insert into productos (nombre, precio) values ("Monitor", 2000.00);
insert into productos (nombre, precio) values ("Microfono", 350.00);
insert into productos (nombre, precio) values ("Audifonos", 450.00);

insert into ventas (idProducto, cantidad) values (5, 8);
insert into ventas (idProducto, cantidad) values (1, 15);
insert into ventas (idProducto, cantidad) values (6, 13);
insert into ventas (idProducto, cantidad) values (6, 4);
insert into ventas (idProducto, cantidad) values (2, 3);
insert into ventas (idProducto, cantidad) values (5, 1);
insert into ventas (idProducto, cantidad) values (4, 5);
insert into ventas (idProducto, cantidad) values (2, 5);
insert into ventas (idProducto, cantidad) values (6, 2);
insert into ventas (idProducto, cantidad) values (1, 8);

## 1.5 Traer todos los productos que tengan una venta.
SELECT * FROM productos
WHERE idProducto IN (
    SELECT DISTINCT idProducto 
    FROM ventas
);

## 1.6 Traer todos los productos que tengan ventas y la cantidad total de productos vendidos.
SELECT p.idProducto, p.nombre, p.precio, sum(v.cantidad) AS cantidad
FROM productos p 
JOIN ventas v ON p.idProducto = v.idProducto
GROUP BY idProducto;

## 1.7 Traer todos los productos (independientemente de si tienen ventas o no) y la suma total ($) vendida por producto.
SELECT 
	p.idProducto, 
    p.nombre, 
    p.precio, 
    sum(COALESCE(v.cantidad,0)) AS cantidad, 
    p.precio * sum(COALESCE(v.cantidad, 0)) AS Total_Vendido
FROM productos p 
LEFT JOIN ventas v ON p.idProducto = v.idProducto
GROUP BY idProducto;
