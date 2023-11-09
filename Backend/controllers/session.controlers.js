import { pool } from "../db.js";

export const deleteSession = async (req, res) => {
    try {
  
      const{
        session_id
      }= req.params 

      const [results] = await pool.query(
        'UPDATE active = 0 WHERE session_id = ?',
        
      );
  
      res.status(200).send({ message: "User updated successfully"});
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };