import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import Admin from "../models/admin";

export const AdminService={
    async verifyCredential(options:any) {
        const {
            email,password
        }=options
        try {
            const admin = await Admin.findOne({ where: { email } });
    
            // Vérifie si l'administrateur existe
            if (!admin) {
             throw new Error("BAD_CREDENTIAL")
            }
        
            // Compare le mot de passe fourni avec le mot de passe hashé
            const isMatch = await bcrypt.compare(password, admin.password);
            
            if (!isMatch) {
                throw new Error("INVALID_CREDENTIAL");
            }
        
            const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET as string, { expiresIn: process.env.TOKEN_TIME_OUT});
            
         return { message: 'Login successful', token }
         
        } catch (error) {
          throw error;
        }
      },
    
}

