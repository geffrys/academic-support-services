import React from "react";
import axios from "../api/axios";
import { Deleterequest } from "../api/session.api";
import {useNavigate} from 'react-router-dom';

const DeleteSession = ({ session_id}) => {
  const navigate = useNavigate();
  const Delete = async () => {
    try {
      await Deleterequest(session_id, axios);
      window.location.reload();
    } catch (error) {
      console.error("Error when deleting session:", error);
    }
  };

  return <a onClick={Delete} style={{ cursor: 'pointer' }}>❌</a>;
};

export default DeleteSession;
