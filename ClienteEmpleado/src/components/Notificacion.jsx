// src/components/Notificaciones.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Notificaciones = ({ tiendaNombre }) => {
  const [nuevosPedidos, setNuevosPedidos] = useState([]);

  useEffect(() => {
    const socket = io('http://localhost:3001');

    // Escuchar evento de nuevo pedido
    socket.on('nuevoPedido', (pedido) => {
      if (pedido.tienda.nombre === tiendaNombre) {
        setNuevosPedidos((prev) => [...prev, pedido]);
      }
    });

    // Cleanup al desmontar
    return () => socket.disconnect();
  }, [tiendaNombre]);

  if (nuevosPedidos.length === 0) {
    return <p>No hay notificaciones nuevas.</p>;
  }

  return (
    <div>
      <h3>Nuevos Pedidos</h3>
      {nuevosPedidos.map((pedido) => (
        <div key={pedido.codigoPedido} className="notificacion-card">
          <p><strong>Código:</strong> {pedido.codigoPedido}</p>
          <p><strong>Hora de entrega:</strong> {pedido.horaEntrega}</p>
          <p><strong>Método de pago:</strong> {pedido.metodoPago}</p>
          <p><strong>Menú:</strong> {pedido.menu.nombre}</p>
          <p><strong>Cantidad:</strong> {pedido.cantidad}</p>
          <p><strong>Total a pagar:</strong> ${pedido.totalAPagar}</p>
        </div>
      ))}
    </div>
  );
};

export default Notificaciones;
