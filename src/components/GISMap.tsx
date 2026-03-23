import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Project, ProjectSector } from '../types';
import { 
  Plane, 
  Zap, 
  Map as Road, 
  Phone, 
  Box, 
  Activity, 
  Train, 
  Factory, 
  Building2 
} from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Language, translations } from '../lib/translations';

// Fix for default marker icons in Leaflet with Webpack/Vite
// We'll use a data URI or just skip the default icon fix since we use custom icons
L.Marker.prototype.options.icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const sectorIcons: Record<ProjectSector, React.ReactNode> = {
  AIRPORT: <Plane className="w-4 h-4" />,
  ELECTRIC_POWER: <Zap className="w-4 h-4" />,
  ROADS: <Road className="w-4 h-4" />,
  TELECOM: <Phone className="w-4 h-4" />,
  TRANSFORMER: <Box className="w-4 h-4" />,
  TRANSMISSION_LINE: <Activity className="w-4 h-4" />,
  RAIL_WAY_LINE: <Train className="w-4 h-4" />,
  POWER_PLANTS: <Factory className="w-4 h-4" />,
  SUB_STATION: <Building2 className="w-4 h-4" />
};

const createCustomIcon = (sector: ProjectSector, color: string) => {
  const iconHtml = renderToStaticMarkup(
    <div className={`p-1.5 rounded-full border-2 border-white shadow-lg`} style={{ backgroundColor: color, color: 'white' }}>
      {sectorIcons[sector]}
    </div>
  );
  return L.divIcon({
    html: iconHtml,
    className: 'custom-leaflet-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

interface GISMapProps {
  projects: Project[];
  selectedProject?: Project | null;
  onProjectSelect?: (project: Project) => void;
  language: Language;
}

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export const GISMap: React.FC<GISMapProps> = ({ projects, selectedProject, onProjectSelect, language }) => {
  const t = translations[language];
  const addisCenter: [number, number] = [9.03, 38.74]; // Addis Ababa

  return (
    <div className="w-full h-full relative">
      <MapContainer 
        center={addisCenter} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {projects.map((project) => {
          const color = project.hasCollision ? '#ef4444' : '#22c55e';
          return (
            <React.Fragment key={project.id}>
              <Polyline 
                positions={project.coordinates} 
                color={color}
                weight={5}
                opacity={0.7}
                eventHandlers={{
                  click: () => onProjectSelect?.(project)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[150px]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1 rounded bg-slate-100">
                        {sectorIcons[project.type]}
                      </div>
                      <h3 className="font-bold text-gov-blue text-sm">{project.title}</h3>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">{project.organization}</p>
                    <div className={`text-[10px] font-bold px-2 py-1 rounded inline-block uppercase tracking-wider ${
                      project.hasCollision ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {project.hasCollision ? 'Collision Detected' : 'Clear'}
                    </div>
                  </div>
                </Popup>
              </Polyline>
              
              <Marker 
                position={project.coordinates[0]} 
                icon={createCustomIcon(project.type, color)}
                eventHandlers={{ click: () => onProjectSelect?.(project) }}
              >
                 <Popup>{project.title}</Popup>
              </Marker>
            </React.Fragment>
          );
        })}

        {selectedProject && (
          <ChangeView 
            center={selectedProject.coordinates[0]} 
            zoom={14} 
          />
        )}
      </MapContainer>

      {/* Map Legend */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg z-[1000] border border-slate-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-bold">Safe Project</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500 rounded-full"></div>
            <span className="text-[10px] font-bold">Collision Alert</span>
          </div>
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
            {Object.entries(sectorIcons).map(([key, icon]) => (
              <div key={key} className="flex items-center gap-1.5">
                <div className="p-1 rounded bg-slate-100 text-slate-600">
                  {icon}
                </div>
                <span className="text-[9px] font-medium text-slate-500 truncate">
                  {t.sectors[key.toLowerCase() as keyof typeof t.sectors]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
