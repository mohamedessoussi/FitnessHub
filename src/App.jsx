import { useState } from 'react'; 
import ChronometreSeance from './components/ChronometreSeance'; 
import DetecteurFenetre from './components/DetecteurFenetre'; 
import MeteoSalle from './components/MeteoSalle'; 
 
export default function App() { 
  const [afficherChrono, setAfficherChrono] = useState(true); 
 
  return ( 
    <div style={{ 
      maxWidth: '750px', 
      margin: '30px auto', 
      padding: '0 20px', 
      fontFamily: 'system-ui, -apple-system, sans-serif' 
    }}> 
      <header style={{ marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: 
'12px' }}> 
        <h1 style={{ color: '#0f172a', margin: '0 0 6px 0' }}>FitnessHub Tracker</h1> 
        <p style={{ color: '#64748b', margin: 0 }}> 
          Atelier Pratique Dédié au Hook <code>useEffect</code> (Cycle de vie &amp; Nettoyage) 
        </p> 
      </header> 
 
      <div style={{ marginBottom: '16px' }}> 
        <button 
          type="button" 
          onClick={() => setAfficherChrono(current => !current)}
          style={{ 
            padding: '6px 12px', 
            backgroundColor: '#334155', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            fontSize: '0.85rem' 
          }} 
        > 
          {afficherChrono
            ? 'Masquer le chronomètre (Démonter)'
            : 'Afficher le chronomètre (Monter)'}
        </button> 
      </div> 
{afficherChrono && <ChronometreSeance />} 
<DetecteurFenetre /> 
<MeteoSalle /> 
</div> 
); 
}