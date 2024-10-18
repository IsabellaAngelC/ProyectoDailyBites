import React from 'react';

const ConfirmButton = ({ navigate }) => {
  const handleConfirm = () => {
    alert('Pedido confirmado');
    // Aquí podrías añadir la lógica de confirmación en el futuro
  };

  return <button onClick={handleConfirm}>Confirmar Pedido</button>;
};

export default ConfirmButton;
