import { useState, useEffect } from 'react'; 
 
export default function DetecteurFenetre() { 
  const [largeur, setLargeur] = useState(window.innerWidth); 
 
  useEffect(() => { 
    // Fonction gestionnaire d'événement 
    const handleResize = () => { 
      setLargeur(window.innerWidth); 
    }; 
 
    // Abonnement à l'événement de redimensionnement de la fenêtre 
    window.addEventListener('resize', handleResize); 
 
    // Fonction de nettoyage pour détacher l'écouteur si le composant quitte l'écran 
    return () => { 
      window.removeEventListener('resize', handleResize); 
    }; 
  }, []); // Tableau vide : abonnement unique au montage, nettoyage au démontage 
 
  const estGrandEcran = largeur >= 768; 
 
  return ( 
    <div style={{ 
      backgroundColor: '#ffffff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '20px', 
      marginBottom: '20px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
    }}> 
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Moniteur d'Affichage Salle</h3> 
      <p style={{ margin: '6px 0', color: '#475569' }}> 
        Largeur courante de l'écran : <strong>{largeur} px</strong> 
      </p> 
      <div style={{ 
        display: 'inline-block', 
        padding: '6px 12px', 
        borderRadius: '20px', 
        fontSize: '0.85rem', 
        fontWeight: 'bold', 
        backgroundColor: estGrandEcran ? '#e0f2fe' : '#fef3c7', 
        color: estGrandEcran ? '#0369a1' : '#b45309' 
      }}> 
        {estGrandEcran ? 'Mode Écran Salle (Tablette / TV Murale)' : 'Mode Smartphone Coach'} 
      </div> 
    </div> 
  ); 
} 