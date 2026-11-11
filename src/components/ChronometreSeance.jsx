import { useState, useEffect } from 'react'; 
 
export default function ChronometreSeance() { 
  const [secondes, setSecondes] = useState(0); 
  const [estActif, setEstActif] = useState(false); 
 
  useEffect(() => { 
    let intervalId = null; 
 
    if (estActif) { 
      // Démarrage du timer dès que estActif passe à true 
      intervalId = setInterval(() => { 
        setSecondes(prev => prev + 1); 
      }, 1000); 
    } 
 
    // Fonction de nettoyage OBLIGATOIRE : 
    // Exécutée automatiquement par React lors du démontage du composant 
    // ou immédiatement avant la réexécution de l'effet si estActif change. 
    return () => { 
      if (intervalId) { 
        clearInterval(intervalId); 
      } 
    }; 
  }, [estActif]); // Dépendance : l'effet se déclenche quand 'estActif' change 
 
  const formatTemps = (totalSecondes) => { 
    const mins = Math.floor(totalSecondes / 60); 
    const secs = totalSecondes % 60; 
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; 
  }; 
 
  const reinitialiser = () => { 
    setEstActif(false); 
    setSecondes(0); 
  }; 
 
  return ( 
    <div style={{ 
      backgroundColor: '#ffffff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '20px', 
      marginBottom: '20px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
    }}> 
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Chronomètre d'Effort (HIIT)</h3> 
      <div style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        fontFamily: 'monospace', 
        color: estActif ? '#16a34a' : '#64748b', 
        margin: '12px 0' 
      }}> 
        {formatTemps(secondes)} 
      </div> 
 
      <div style={{ display: 'flex', gap: '10px' }}> 
        <button 
          type="button" 
          onClick={() => setEstActif(!estActif)} 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: estActif ? '#ea580c' : '#16a34a', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }} 
        > 
          {estActif ? 'Mettre en pause' : 'Démarrer la séance'} 
        </button> 
 
        <button 
          type="button" 
          onClick={reinitialiser} 
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#e2e8f0', 
            color: '#334155', 
            border: 'none', 
            borderRadius: '5px', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }} 
        > 
          Réinitialiser 
        </button> 
      </div> 
    </div> 
  ); 
} 