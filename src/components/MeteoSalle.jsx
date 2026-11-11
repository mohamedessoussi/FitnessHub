import { useState, useEffect } from 'react'; 
 
const VILLES_DISPONIBLES = [ 
  { code: 'Casablanca', nom: 'Casablanca (Anfa Club)' }, 
  { code: 'Rabat', nom: 'Rabat (Agdal Club)' }, 
  { code: 'Marrakech', nom: 'Marrakech (Guéliz Club)' } 
]; 
 
export default function MeteoSalle() { 
  const [villeSelectionnee, setVilleSelectionnee] = useState('Casablanca'); 
  const [donnees, setDonnees] = useState(null); 
  const [enChargement, setEnChargement] = useState(true); 
  const [erreur, setErreur] = useState(null); 
 
  useEffect(() => { 
    // 1. Instanciation du contrôleur d'annulation standard du navigateur 
    const controleur = new AbortController(); 
    const signal = controleur.signal; 
 
    const chargerDonneesMeteo = async () => { 
      setEnChargement(true); 
      setErreur(null); 
 
      try { 
        // Simulation d'une API REST avec délai réseau réaliste 
        // Dans un cas réel : fetch(`https://api.meteo.ma/${villeSelectionnee}`, { signal }) 
        await new Promise(resolve => setTimeout(resolve, 800)); 
 
        // Vérifier si la requête a été annulée entre-temps 
        if (signal.aborted) { 
          return; 
        } 
 
        // Données simulées selon la ville 
        const meteoData = { 
          Casablanca: { temperature: 22, humidite: '68%', condition: 'Ensoleillé, brise marine' 
}, 
          Rabat: { temperature: 20, humidite: '72%', condition: 'Partiellement nuageux' }, 
          Marrakech: { temperature: 29, humidite: '35%', condition: 'Chaud et sec' } 
        }; 
 
        setDonnees(meteoData[villeSelectionnee]); 
        setEnChargement(false); 
      } catch (err) { 
        if (err.name !== 'AbortError') { 
          setErreur("Impossible de récupérer les conditions météo."); 
          setEnChargement(false); 
        } 
      } 
    }; 
 
    chargerDonneesMeteo(); 
 
    // 2. Nettoyage : annuler la requête si la ville change ou si le composant est fermé.
    return () => { 
      controleur.abort(); 
    }; 
  }, [villeSelectionnee]); // Rejoue l'effet à chaque changement de 'villeSelectionnee' 
 
  return ( 
    <div style={{ 
      backgroundColor: '#ffffff', 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '20px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
    }}> 
      <h3 style={{ marginTop: 0, color: '#0f172a' }}>Conditions Extérieures des Clubs</h3> 
 
      <div style={{ marginBottom: '16px' }}> 
        <label htmlFor="select-ville" style={{ display: 'block', fontWeight: 'bold', 
marginBottom: '6px' }}> 
          Choisir le club : 
        </label> 
        <select 
          id="select-ville" 
          value={villeSelectionnee} 
          onChange={(e) => setVilleSelectionnee(e.target.value)} 
          style={{ 
            padding: '8px 12px', 
            borderRadius: '5px', 
            border: '1px solid #cbd5e1', 
            fontSize: '0.95rem', 
            width: '100%', 
            maxWidth: '300px' 
          }} 
        > 
          {VILLES_DISPONIBLES.map(v => ( 
            <option key={v.code} value={v.code}>{v.nom}</option> 
          ))} 
        </select> 
      </div> 
 
      {enChargement && ( 
        <div style={{ color: '#0284c7', fontStyle: 'italic', padding: '10px 0' }}> 
          Actualisation des données météo en cours... 
        </div> 
      )} 
 
      {erreur && ( 
        <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: '10px', 
borderRadius: '5px' }}> 
          {erreur} 
        </div> 
      )} 
 
      {!enChargement && !erreur && donnees && ( 
        <div style={{ 
          backgroundColor: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          borderRadius: '6px', 
          padding: '14px', 
          marginTop: '10px' 
        }}> 
          <p style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: 'bold', color: 
'#0f172a' }}> 
            Température : {donnees.temperature} °C 
          </p> 
          <p style={{ margin: '0 0 6px 0', color: '#475569' }}> 
            Humidité de l'air : {donnees.humidite} 
          </p> 
          <p style={{ margin: 0, color: '#16a34a', fontWeight: 'bold' }}> 
            Conditions : {donnees.condition} 
          </p> 
        </div> 
      )} 
    </div> 
  ); 
} 