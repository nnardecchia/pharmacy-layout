"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

const PharmacyLayout = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const [hoveredSide, setHoveredSide] = useState(null);

  const createLayout = () => {
    const layout = Array(15).fill().map(() => Array(15).fill(null));
    
    // Función helper para setear valores en la matriz
    const setCell = (row, col, value) => {
      if (row >= 0 && row < 15 && col >= 0 && col < 15) {
        layout[row][col] = value;
      }
    };
    
    // Bodega [1,1] hasta [1,15]
    for(let col = 0; col < 15; col++) {
      setCell(0, col, { type: "Bodega", id: "storage" });
    }
    
    // Mostrador [2,1] hasta [2,15]
    for(let col = 0; col < 15; col++) {
      setCell(1, col, { type: "Mostrador", id: "counter" });
    }
    
    // Pasillo principal [3,1] hasta [3,15]
    for(let col = 0; col < 15; col++) {
      setCell(2, col, { type: "Pasillo", id: "main-aisle" });
    }
    
    // Consulta médica [9,1] a [12,1]
    for(let row = 8; row < 12; row++) {
      setCell(row, 0, { type: "Consulta Medica", id: "medical-office" });
    }

    // Mostradores verticales
    const verticalShelves = [
      { rows: [3,7], col: 0, id: "A4-A8" },
      { rows: [3,11], col: 2, id: "C4-C12-1" },
      { rows: [3,11], col: 3, id: "C4-C12-2" },
      { rows: [3,11], col: 5, id: "E4-E12-1" },
      { rows: [3,11], col: 6, id: "E4-E12-2" },
      { rows: [3,11], col: 8, id: "G4-G12-1" },
      { rows: [3,11], col: 9, id: "G4-G12-2" },
      { rows: [3,11], col: 11, id: "I4-I12-1" },
      { rows: [3,11], col: 12, id: "I4-I12-2" },
      { rows: [2,14], col: 14, id: "K3-K16" }
    ];

    verticalShelves.forEach(shelf => {
      for(let row = shelf.rows[0]; row <= shelf.rows[1]; row++) {
        setCell(row, shelf.col, { 
          type: "Estantería", 
          id: shelf.id,
          sides: ['left', 'right']
        });
      }
    });

    // Mostrador horizontal [15,9] a [15,14]
    for(let col = 8; col <= 13; col++) {
      setCell(14, col, { 
        type: "Estantería", 
        id: "back-shelf",
        sides: ['front', 'back']
      });
    }

    // Pasillos verticales
    const verticalAisles = [
      { rows: [3,11], col: 1 },
      { rows: [3,11], col: 4 },
      { rows: [3,11], col: 7 },
      { rows: [3,11], col: 10 },
      { rows: [3,11], col: 13 }
    ];

    verticalAisles.forEach(aisle => {
      for(let row = aisle.rows[0]; row <= aisle.rows[1]; row++) {
        setCell(row, aisle.col, { type: "Pasillo", id: `aisle-v-${row}-${aisle.col}` });
      }
    });

    // Pasillos horizontales
    for(let col = 0; col <= 13; col++) {
      setCell(12, col, { type: "Pasillo", id: `aisle-h-13-${col}` });
    }
    for(let col = 8; col <= 13; col++) {
      setCell(13, col, { type: "Pasillo", id: `aisle-h-14-${col}` });
    }

    return layout;
  };

  const layout = createLayout();

  const sections = {
    "storage": {
      title: "Bodega",
      levels: {
        main: "ÉTICOS • GENÉRICOS • ANTIBIÓTICOS • GENÉRICOS ANTIBIÓTICOS • ÉTICOS REFRIGERADOS"
      }
    },
    "counter": {
      title: "Mostrador Principal",
      levels: {
        top: "DULCES Y GOLOSINAS • SNACK APERITIVOS • ENERGIZANTES",
        middle: "PRODUCTOS DE ALTA ROTACIÓN",
        bottom: "PRODUCTOS DE IMPULSO"
      }
    },
    "A4-A8": {
      title: "Estantería A4-A8",
      sides: {
        right: {
          entrada: {
            top: "VITAMINAS Y MINERALES",
            middle: "SUPLEMENTOS ALIMENTICIOS",
            bottom: "EQUIPO MÉDICO BÁSICO"
          },
          mostrador: {
            top: "MATERIAL DE CURACIÓN",
            middle: "PRODUCTOS HIGIÉNICOS",
            bottom: "AGENTES DE DIAGNÓSTICO"
          }
        }
      }
    },
    "C4-C12-1": {
      title: "Estantería C4-C12 (Pasillo 1)",
      sides: {
        right: {
          entrada: {
            top: "CREMAS CORPORALES Y MANOS",
            middle: "CREMAS FACIALES",
            bottom: "BLOQUEADOR BRONCEADOR"
          },
          mostrador: {
            top: "SHAMPOOS",
            middle: "ACONDICIONADORES",
            bottom: "TRATAMIENTO CAPILAR"
          }
        },
        left: {
          entrada: {
            top: "GEL CERAS SILICAS",
            middle: "TINTES PREMIUM",
            bottom: "PRODUCTOS DESTACADOS"
          },
          mostrador: {
            top: "TINTES BÁSICOS",
            middle: "RETOCADORES",
            bottom: "ACCESORIOS CABELLO"
          }
        }
      }
    },
    "C4-C12-2": {
      title: "Estantería C4-C12 (Pasillo 2)",
      sides: {
        left: {
          entrada: {
            top: "DESODORANTES PERFUMES",
            middle: "CREMAS PARA PEINAR",
            bottom: "FIJADORES PREMIUM"
          },
          mostrador: {
            top: "JABONES LÍQUIDOS",
            middle: "JABONES SÓLIDOS",
            bottom: "JABONES DERMATOLÓGICOS"
          }
        },
        right: {
          entrada: {
            top: "ESPONJAS PREMIUM",
            middle: "ACCESORIOS BAÑO",
            bottom: "PRODUCTOS ESPECIALES"
          },
          mostrador: {
            top: "ESPONJAS BÁSICAS",
            middle: "PRODUCTOS LIMPIEZA",
            bottom: "LIMPIEZA ESPECIAL"
          }
        }
      }
    },
    "E4-E12-1": {
      title: "Estantería E4-E12 (Pasillo 2)",
      sides: {
        left: {
          entrada: {
            top: "TOALLAS SANITARIAS PREMIUM",
            middle: "PANTIPROTECTORES",
            bottom: "TOALLITAS ÍNTIMAS"
          },
          mostrador: {
            top: "PAPEL HIGIÉNICO",
            middle: "PAÑUELOS",
            bottom: "TOALLITAS HÚMEDAS"
          }
        },
        right: {
          entrada: {
            top: "PAÑALES ADULTO PREMIUM",
            middle: "TOALLAS INCONTINENCIA",
            bottom: "PRODUCTOS ESPECIALIZADOS"
          },
          mostrador: {
            top: "PAÑALES ADULTO BÁSICOS",
            middle: "PROTECTORES CAMA",
            bottom: "ACCESORIOS ADULTO"
          }
        }
      }
    },
    "E4-E12-2": {
      title: "Estantería E4-E12 (Pasillo 3)",
      sides: {
        left: {
          entrada: {
            top: "PAÑALES BEBÉ PREMIUM",
            middle: "FÓRMULAS ESPECIALES",
            bottom: "PRODUCTOS IMPORTADOS"
          },
          mostrador: {
            top: "PAÑALES BEBÉ BÁSICOS",
            middle: "FÓRMULAS BÁSICAS",
            bottom: "BIBERONES"
          }
        },
        right: {
          entrada: {
            top: "ACCESORIOS BEBÉ PREMIUM",
            middle: "PRODUCTOS BEBÉ ESPECIALES",
            bottom: "TALCOS IMPORTADOS"
          },
          mostrador: {
            top: "ACCESORIOS BEBÉ BÁSICOS",
            middle: "CREMAS BEBÉ",
            bottom: "COLONIAS BEBÉ"
          }
        }
      }
    },
    "G4-G12-1": {
      title: "Estantería G4-G12 (Pasillo 3)",
      sides: {
        left: {
          entrada: {
            top: "PASTAS DENTALES PREMIUM",
            middle: "CEPILLOS ESPECIALES",
            bottom: "PRODUCTOS IMPORTADOS"
          },
          mostrador: {
            top: "PASTAS DENTALES BÁSICAS",
            middle: "CEPILLOS BÁSICOS",
            bottom: "ENJUAGUES BUCALES"
          }
        },
        right: {
          entrada: {
            top: "ACCESORIOS DENTALES",
            middle: "PRODUCTOS ESPECIALIZADOS",
            bottom: "BLANQUEAMIENTO"
          },
          mostrador: {
            top: "RASTRILLOS PREMIUM",
            middle: "NAVAJAS ESPECIALES",
            bottom: "CREMAS AFEITAR"
          }
        }
      }
    },
    "G4-G12-2": {
      title: "Estantería G4-G12 (Pasillo 4)",
      sides: {
        left: {
          entrada: {
            top: "HIDRATANTES PREMIUM",
            middle: "SUEROS ESPECIALES",
            bottom: "PRODUCTOS DEPORTIVOS"
          },
          mostrador: {
            top: "HIDRATANTES BÁSICOS",
            middle: "SUEROS BÁSICOS",
            bottom: "PRODUCTOS BÁSICOS"
          }
        },
        right: {
          entrada: {
            top: "CARBONATADAS PREMIUM",
            middle: "SABORIZANTES ESPECIALES",
            bottom: "BEBIDAS DEPORTIVAS"
          },
          mostrador: {
            top: "CEREALES ESPECIALES",
            middle: "PRODUCTOS FRACCIONADOS",
            bottom: "SUPLEMENTOS BÁSICOS"
          }
        }
      }
    },
    "I4-I12-1": {
      title: "Estantería I4-I12 (Pasillo 4)",
      sides: {
        left: {
          entrada: {
            top: "ANTITUSIVOS PREMIUM",
            middle: "ANTIGRIPALES ESPECIALES",
            bottom: "DIGESTIVOS PREMIUM"
          },
          mostrador: {
            top: "ANTITUSIVOS BÁSICOS",
            middle: "ANTIGRIPALES BÁSICOS",
            bottom: "DIGESTIVOS BÁSICOS"
          }
        },
        right: {
          entrada: {
            top: "GOTAS OFTÁLMICAS PREMIUM",
            middle: "ANTIMICÓTICOS ESPECIALES",
            bottom: "FRACCIÓN VI ESPECIAL"
          },
          mostrador: {
            top: "POLVOS MEDICINALES",
            middle: "ACEITES ESPECIALES",
            bottom: "POMADAS"
          }
        }
      }
    },
    "I4-I12-2": {
      title: "Estantería I4-I12 (Pasillo 5)",
      sides: {
        left: {
          entrada: {
            top: "REPELENTES PREMIUM",
            middle: "INSECTICIDAS ESPECIALES",
            bottom: "PRODUCTOS ESTACIONALES"
          },
          mostrador: {
            top: "REPELENTES BÁSICOS",
            middle: "INSECTICIDAS BÁSICOS",
            bottom: "PRODUCTOS REGULARES"
          }
        },
        right: {
          entrada: {
            top: "PAPELERÍA PREMIUM",
            middle: "ORTOPEDIA ESPECIAL",
            bottom: "PRODUCTOS DESTACADOS"
          },
          mostrador: {
            top: "PAPELERÍA BÁSICA",
            middle: "ORTOPEDIA BÁSICA",
            bottom: "PRODUCTOS DE MENOR ROTACIÓN"
          }
        }
      }
    },
    "K3-K16": {
      title: "Estantería K3-K16",
      sides: {
        left: {
          entrada: {
            top: "MASCARILLAS PREMIUM",
            middle: "DISPOSITIVOS ESPECIALES",
            bottom: "PRODUCTOS DESTACADOS"
          },
          mostrador: {
            top: "MASCARILLAS BÁSICAS",
            middle: "DISPOSITIVOS SEXUALES",
            bottom: "INSOMNIO Y ESPECIALIDADES"
          }
        }
      }
    },
    "back-shelf": {
      title: "Estantería Posterior",
      sides: {
        front: {
          top: "OFERTAS DEL MES • PRODUCTOS DESTACADOS",
          middle: "PRODUCTOS DE TEMPORADA • NOVEDADES",
          bottom: "PRODUCTOS CON DESCUENTO • PROMOCIONES"
        }
      }
    },
    "medical-office": {
      title: "Consulta Médica",
      levels: {
        main: "ÁREA DE ATENCIÓN MÉDICA Y CONSEJERÍA FARMACÉUTICA"
      }
    },
    "main-aisle": {
      title: "Pasillo Principal",
      levels: {
        main: "ÁREA DE CIRCULACIÓN PRINCIPAL"
      }
    },
    "aisle-v": {
      title: "Pasillo Vertical",
      levels: {
        main: "ÁREA DE CIRCULACIÓN ENTRE ESTANTERÍAS"
      }
    },
    "aisle-h": {
      title: "Pasillo Horizontal",
      levels: {
        main: "ÁREA DE CIRCULACIÓN ENTRE ESTANTERÍAS"
      }
    }
};

  const renderCell = (cell) => {
    if (!cell) return <div className="h-12 w-12" />;

    const baseStyles = "h-12 w-12 border transition-colors";
    
    switch (cell.type) {
      case "Estantería":
        return (
          <div className={`${baseStyles} flex`}>
            <div 
              className="w-1/2 h-full bg-blue-100 border-r border-blue-300 hover:bg-blue-200"
              onMouseEnter={() => {
                setHoveredSection(cell.id);
                setHoveredSide('left');
              }}
              onMouseLeave={() => {
                setHoveredSection(null);
                setHoveredSide(null);
              }}
            />
            <div 
              className="w-1/2 h-full bg-blue-100 hover:bg-blue-200"
              onMouseEnter={() => {
                setHoveredSection(cell.id);
                setHoveredSide('right');
              }}
              onMouseLeave={() => {
                setHoveredSection(null);
                setHoveredSide(null);
              }}
            />
          </div>
        );
      case "Bodega":
        return (
          <div 
            className={`${baseStyles} bg-gray-300 hover:bg-gray-400`}
            onMouseEnter={() => {
              setHoveredSection(cell.id);
              setHoveredSide(null);
            }}
            onMouseLeave={() => {
              setHoveredSection(null);
              setHoveredSide(null);
            }}
          />
        );
      case "Mostrador":
        return (
          <div 
            className={`${baseStyles} bg-green-100 hover:bg-green-200`}
            onMouseEnter={() => {
              setHoveredSection(cell.id);
              setHoveredSide(null);
            }}
            onMouseLeave={() => {
              setHoveredSection(null);
              setHoveredSide(null);
            }}
          />
        );
      case "Pasillo":
        return <div className={`${baseStyles} bg-gray-50`} />;
      case "Consulta Medica":
        return <div className={`${baseStyles} bg-yellow-100`} />;
      default:
        return <div className={baseStyles} />;
    }
  };

  const tooltipContent = hoveredSection && sections[hoveredSection] && (
    <div className="absolute z-10 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
      <h3 className="font-bold mb-2">{sections[hoveredSection].title}</h3>
      <div className="space-y-2">
        {sections[hoveredSection].levels?.main && (
          <p><span className="font-semibold">Contenido:</span> {sections[hoveredSection].levels.main}</p>
        )}
        {sections[hoveredSection].sides?.[hoveredSide] && (
          <>
            <p><span className="font-semibold">Nivel Superior:</span> {sections[hoveredSection].sides[hoveredSide].top}</p>
            <p><span className="font-semibold">Nivel Medio:</span> {sections[hoveredSection].sides[hoveredSide].middle}</p>
            <p><span className="font-semibold">Nivel Inferior:</span> {sections[hoveredSection].sides[hoveredSide].bottom}</p>
          </>
        )}
        {sections[hoveredSection].levels?.top && !sections[hoveredSection].sides && (
          <>
            <p><span className="font-semibold">Nivel Superior:</span> {sections[hoveredSection].levels.top}</p>
            {sections[hoveredSection].levels.middle && (
              <p><span className="font-semibold">Nivel Medio:</span> {sections[hoveredSection].levels.middle}</p>
            )}
            {sections[hoveredSection].levels.bottom && (
              <p><span className="font-semibold">Nivel Inferior:</span> {sections[hoveredSection].levels.bottom}</p>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <Card className="p-6 relative">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-15 gap-0">
          {layout.map((row, rowIndex) => (
            <div key={rowIndex} className="contents">
              {row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`}>
                  {renderCell(cell)}
                </div>
              ))}
            </div>
          ))}
        </div>
        {tooltipContent} {/* Aquí se agregó el tooltipContent */}
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">Leyenda:</p>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-300 border border-gray-400 mr-2"></div>
            <span>Bodega</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-100 border border-green-300 mr-2"></div>
            <span>Mostrador</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-100 border border-blue-300 mr-2"></div>
            <span>Estantería</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 mr-2"></div>
            <span>Consulta Médica</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PharmacyLayout;