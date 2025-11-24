'use client'

import { useState, useRef } from 'react'
import { IfcViewer, IfcOverlay, IfcGreenMarker, IfcControls } from 'react-ifc-viewer'

export default function BIM() {
  const [ifcFile, setIfcFile] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setIfcFile(url)
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      
     <h1 className="text-3xl text-white font-bold mb-1">Visualizador BIM (.IFC)</h1>

      <div className="flex items-center gap-4 p-4 shadow-md rounded-md">
        <input
          type="file"
          accept=".ifc"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-2 py-1 bg-blue-500 hover:bg-indigo-600 transition-colors text-white font-semibold rounded-md"
        >
          Selecionar arquivo IFC
        </button>

        {ifcFile && (
          <span className="text-sm truncate max-w-xs opacity-80">
            {fileInputRef.current?.files?.[0]?.name}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-hidden mb-1 border border-gray-700 mt-2 rounded-lg">
        {ifcFile && (
          <IfcViewer 
            url={ifcFile} 
            enableMeshHover 
            enableMeshSelection 
            className="w-full h-full"
          >
            <IfcOverlay
              requirements={{ type: 'IfcSensor' }}
              onSelect={(data) => console.log('Sensor selected:', data)}
            >
              <IfcGreenMarker hoverEffect />
            </IfcOverlay>

            <IfcControls />
          </IfcViewer>
        )}
      </div>
    </div>
  )
}
