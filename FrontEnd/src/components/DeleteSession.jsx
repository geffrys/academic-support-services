import React from 'react';
import axios from '../api/axios'; 
import { Deleterequest } from '../api/Session.api';

const DeleteSession = ({ session_id, onSuccess, onError }) => {
  const Delete = async () => {
    try {
      
      await Deleterequest(session_id, axios);
      onSuccess(); 
    } catch (error) {
      console.error('Error al eliminar sesión:', error);
      onError(); 
    }
  };

  return (
    <button onClick={Delete}>
      Delete Session
    </button>
  );
};

export default DeleteSession;
