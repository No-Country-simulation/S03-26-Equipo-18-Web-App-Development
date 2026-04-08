
import * as React from 'react';

interface WelcomeEmailProps {
  username: string;
  email: string;
  role: string;
  tempPassword?: string;
  organization: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const WelcomeEmail = ({ username, email, role, tempPassword, organization }: WelcomeEmailProps) => (
  
  
  <div style={{
    backgroundColor: '#0F171B', 
    padding: '40px',
    borderRadius: '16px',
    color: '#F0F4F5',
    fontFamily: 'sans-serif'
  }}>
    <h2 style={{ color: '#00CFBA', marginBottom: '16px' }}>¡Bienvenido al CMS de testimonios de Nuestra Organización! {organization}</h2>
    <p>Hola <strong>{username}</strong>,</p>
    <p>Tu cuenta de <span>${role}</span> ha sido creada exitosamente. Aquí tienes tus credenciales para acceder al panel:</p>
    
    <div style={{
      backgroundColor: '#1e293b',
      padding: '20px',
      borderRadius: '12px',
      margin: '20px 0',
      border: '1px solid #334155'
    }}>
      <p style={{ margin: '4px 0' }}><strong>Email:</strong> {email}</p>
      {tempPassword && <p style={{ margin: '4px 0' }}><strong>Contraseña temporal:</strong> {tempPassword}</p>}
    </div>

    <a href={`${baseUrl}/login`} style={{
      display: 'inline-block',
      backgroundColor: '#00CFBA',
      color: '#000',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: 'bold',
      textDecoration: 'none',
      marginTop: '10px'
    }}>
      Ir al Dashboard
    </a>

    <p style={{ marginTop: '30px', fontSize: '12px', color: '#94a3b8' }}>
      Por seguridad, te recomendamos cambiar tu contraseña una vez que ingreses por primera vez.
    </p>
  </div>
);