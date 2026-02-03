import React, { useState } from 'react';
import type { VerificationResult } from '@/App';

export type AdminPanelProps = {
  verificationResult: VerificationResult | null;
  onUpdate: (result: VerificationResult) => void;
  onClose: () => void;
};

export const AdminPanel = (props: AdminPanelProps) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<VerificationResult | null>(null);

  // Fetch all verification requests
  const { data: entries, isPending: isLoadingEntries, error: loadError } = useQuery('CfdiVerificationRequest', {
    orderBy: { createdAt: 'desc' }
  });

  // Mutation for deleting entries
  const { remove, isPending: isDeleting, error: deleteError } = useMutation('CfdiVerificationRequest');

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta entrada?')) {
      return;
    }

    try {
      await remove(id);
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const generatePacCertificador = () => {
    // Pattern: 3 letters + 7 digits + 1 letter + 1 digit (e.g., ASE0201179X0)
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    
    // Generate 3 random letters
    let pac = '';
    for (let i = 0; i < 3; i++) {
      pac += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Generate 7 random digits
    for (let i = 0; i < 7; i++) {
      pac += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    
    // Generate 1 random letter
    pac += letters.charAt(Math.floor(Math.random() * letters.length));
    
    // Generate 1 random digit
    pac += digits.charAt(Math.floor(Math.random() * digits.length));
    
    return pac;
  };

  const generateFolioFiscal = () => {
    // Pattern: XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX (8-4-4-4-12 characters)
    // Example: OLQJOD25-VFH2-MTBN-P2EH-COATI7RHK8CY
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    const generateSegment = (length: number) => {
      let segment = '';
      for (let i = 0; i < length; i++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return segment;
    };
    
    return `${generateSegment(8)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(4)}-${generateSegment(12)}`;
  };

  const handleAddNew = () => {
    // Generate current timestamp for Fecha de Expedición
    const now = new Date();
    const fechaEmision = now.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Generate timestamp 1 second later for Fecha Certificación SAT
    const certificationDate = new Date(now.getTime() + 1000); // Add 1 second
    const fechaCertificacion = certificationDate.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    setEditingEntry({
      status: 'valid',
      folioFiscal: generateFolioFiscal(),
      rfcEmisor: 'SEA8808188A5',
      rfcReceptor: '',
      total: '',
      fechaEmision: fechaEmision,
      fechaCertificacion: fechaCertificacion,
      pacCertificador: generatePacCertificador(),
      nombreEmisor: 'SERVICIOS ESPECIALIZADOS ALANIS S.A. DE C.V.',
      nombreReceptor: '',
      efectoComprobante: 'Ingreso',
      estadoCfdi: '',
      estatusCancelacion: 'Cancelable con aceptación'
    });
    setShowEditForm(true);
  };

  const handleEdit = (entry: any) => {
    // Generate current timestamp for Fecha de Expedición
    const now = new Date();
    const fechaEmision = now.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    // Generate timestamp 1 second later for Fecha Certificación SAT
    const certificationDate = new Date(now.getTime() + 1000);
    const fechaCertificacion = certificationDate.toLocaleDateString('es-MX', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    setEditingEntry({
      status: 'valid',
      folioFiscal: entry.folioFiscal || generateFolioFiscal(),
      rfcEmisor: entry.rfcEmisor || 'SEA8808188A5',
      rfcReceptor: entry.rfcReceptor || '',
      total: '',
      fechaEmision: fechaEmision,
      fechaCertificacion: fechaCertificacion,
      pacCertificador: generatePacCertificador(),
      nombreEmisor: 'SERVICIOS ESPECIALIZADOS ALANIS S.A. DE C.V.',
      nombreReceptor: '',
      efectoComprobante: 'Ingreso',
      estadoCfdi: '',
      estatusCancelacion: 'Cancelable con aceptación'
    });
    setShowEditForm(true);
  };

  const handleGenerateQR = (entry: any) => {
    // Generate URL with parameters
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams({
      id: entry.folioFiscal || '',
      re: entry.rfcEmisor || '',
      rr: entry.rfcReceptor || ''
    });
    const fullUrl = `${baseUrl}?${params.toString()}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(fullUrl).then(() => {
      alert(`URL copiada al portapapeles:\n\n${fullUrl}\n\nPuedes usar esta URL para generar un código QR con cualquier generador de QR en línea.`);
    }).catch(() => {
      alert(`URL generada:\n\n${fullUrl}\n\nCopia esta URL para generar un código QR.`);
    });
  };

  const handleSaveEdit = (result: VerificationResult) => {
    props.onUpdate(result);
    setShowEditForm(false);
    setEditingEntry(null);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setEditingEntry(null);
  };

  if (showEditForm) {
    return (
      <AdminEditForm
        verificationResult={editingEntry}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-2 md:p-4">
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-semibold text-neutral-700">
            Panel de Administración - Gestión de Datos
          </h2>
          <button
            onClick={props.onClose}
            className="text-neutral-500 hover:text-neutral-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 md:mb-6">
          <button
            onClick={handleAddNew}
            className="bg-pink-950 text-white px-4 md:px-6 py-2 md:py-2.5 rounded hover:opacity-80 text-sm md:text-base w-full md:w-auto"
          >
            + Agregar Nueva Entrada
          </button>
        </div>

        {deleteError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            Error al eliminar: {deleteError.message}
          </div>
        )}

        {isLoadingEntries ? (
          <div className="text-center py-8">
            <p className="text-neutral-600">Cargando entradas...</p>
          </div>
        ) : loadError ? (
          <div className="text-center py-8">
            <p className="text-red-600">Error al cargar datos: {loadError.message}</p>
          </div>
        ) : !entries || entries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-neutral-600">No hay entradas registradas</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-neutral-100 border-b-2 border-neutral-300">
                  <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700">Folio Fiscal</th>
                  <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700 hidden sm:table-cell">RFC Emisor</th>
                  <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700">RFC Receptor</th>
                  <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700 hidden md:table-cell">Tipo</th>
                  <th className="text-left p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700 hidden lg:table-cell">Fecha</th>
                  <th className="text-center p-2 md:p-3 text-xs md:text-sm font-semibold text-neutral-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-neutral-200 hover:bg-neutral-50">
                    <td className="p-2 md:p-3 text-xs md:text-sm text-neutral-700 max-w-[120px] md:max-w-xs truncate">
                      {entry.folioFiscal || '-'}
                    </td>
                    <td className="p-2 md:p-3 text-xs md:text-sm text-neutral-700 hidden sm:table-cell">
                      {entry.rfcEmisor || '-'}
                    </td>
                    <td className="p-2 md:p-3 text-xs md:text-sm text-neutral-700">
                      {entry.rfcReceptor || '-'}
                    </td>
                    <td className="p-2 md:p-3 text-xs md:text-sm text-neutral-700 hidden md:table-cell">
                      <span className={`px-2 py-1 rounded text-xs ${
                        entry.variant === 'fiscal-data' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {entry.variant === 'fiscal-data' ? 'Folio Fiscal' : 'XML'}
                      </span>
                    </td>
                    <td className="p-2 md:p-3 text-xs md:text-sm text-neutral-700 hidden lg:table-cell">
                      {new Date(entry.createdAt).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="p-2 md:p-3 text-center">
                      <div className="flex gap-1 md:gap-2 justify-center flex-wrap">
                        <button
                          onClick={() => handleGenerateQR(entry)}
                          className="text-green-600 hover:text-green-800 text-xs md:text-sm px-2 md:px-3 py-1 border border-green-600 rounded hover:bg-green-50"
                          title="Generar URL para QR"
                        >
                          QR
                        </button>
                        <button
                          onClick={() => handleEdit(entry)}
                          className="text-blue-600 hover:text-blue-800 text-xs md:text-sm px-2 md:px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-800 text-xs md:text-sm px-2 md:px-3 py-1 border border-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                        >
                          {isDeleting ? 'Eliminando...' : 'Eliminar'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={props.onClose}
            className="bg-neutral-300 text-neutral-700 px-6 py-2.5 rounded hover:bg-neutral-400"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

type AdminEditFormProps = {
  verificationResult: VerificationResult | null;
  onSave: (result: VerificationResult) => void;
  onCancel: () => void;
};

function AdminEditForm(props: AdminEditFormProps) {
  const [formData, setFormData] = useState<VerificationResult>(
    props.verificationResult || {
      status: 'valid',
      folioFiscal: '',
      rfcEmisor: 'SEA8808188A5',
      rfcReceptor: '',
      total: '',
      fechaEmision: '',
      fechaCertificacion: '',
      pacCertificador: '',
      nombreEmisor: 'SERVICIOS ESPECIALIZADOS ALANIS S.A. DE C.V.',
      nombreReceptor: '',
      efectoComprobante: 'Ingreso',
      estadoCfdi: '',
      estatusCancelacion: 'Cancelable con aceptación'
    }
  );

  const handleChange = (field: keyof VerificationResult, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    props.onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-neutral-700">
            Editar Datos de Verificación
          </h2>
          <button
            onClick={props.onCancel}
            className="text-neutral-500 hover:text-neutral-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-neutral-600 mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value as 'valid' | 'invalid')}
              className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
            >
              <option value="valid">Vigente</option>
              <option value="invalid">No Vigente</option>
            </select>
          </div>

          {/* RFC Emisor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                RFC del Emisor
              </label>
              <input
                type="text"
                value={formData.rfcEmisor}
                onChange={(e) => handleChange('rfcEmisor', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                readOnly
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Nombre o Razón Social del Emisor
              </label>
              <input
                type="text"
                value={formData.nombreEmisor || ''}
                onChange={(e) => handleChange('nombreEmisor', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                readOnly
                disabled
              />
            </div>
          </div>

          {/* RFC Receptor */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                RFC del Receptor
              </label>
              <input
                type="text"
                value={formData.rfcReceptor}
                onChange={(e) => handleChange('rfcReceptor', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Nombre o Razón Social del Receptor
              </label>
              <input
                type="text"
                value={formData.nombreReceptor || ''}
                onChange={(e) => handleChange('nombreReceptor', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
              />
            </div>
          </div>

          {/* Folio Fiscal */}
          <div>
            <label className="block text-sm font-semibold text-neutral-600 mb-2">
              Folio Fiscal (UUID)
            </label>
            <input
              type="text"
              value={formData.folioFiscal}
              onChange={(e) => handleChange('folioFiscal', e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
              readOnly
              disabled
            />
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Fecha de Expedición
              </label>
              <input
                type="text"
                value={formData.fechaEmision || ''}
                onChange={(e) => handleChange('fechaEmision', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                placeholder="ej: 15 de enero de 2024, 10:30:45"
                readOnly
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Fecha Certificación SAT
              </label>
              <input
                type="text"
                value={formData.fechaCertificacion || ''}
                onChange={(e) => handleChange('fechaCertificacion', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                placeholder="ej: 15 de enero de 2024, 10:30:46"
                readOnly
                disabled
              />
            </div>
          </div>

          {/* PAC y Total */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                PAC que Certificó
              </label>
              <input
                type="text"
                value={formData.pacCertificador || ''}
                onChange={(e) => handleChange('pacCertificador', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                readOnly
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Total del CFDI
              </label>
              <input
                type="text"
                value={formData.total || ''}
                onChange={(e) => handleChange('total', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
                placeholder="ej: 500.00"
              />
            </div>
          </div>

          {/* Efecto, Estado, Estatus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Efecto del Comprobante
              </label>
              <input
                type="text"
                value={formData.efectoComprobante || ''}
                onChange={(e) => handleChange('efectoComprobante', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                placeholder="ej: Ingreso"
                readOnly
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Estado CFDI
              </label>
              <input
                type="text"
                value={formData.estadoCfdi || ''}
                onChange={(e) => handleChange('estadoCfdi', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950"
                placeholder="ej: Vigente"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-600 mb-2">
                Estatus de Cancelación
              </label>
              <input
                type="text"
                value={formData.estatusCancelacion || ''}
                onChange={(e) => handleChange('estatusCancelacion', e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-950 bg-gray-100"
                placeholder="ej: Cancelable con aceptación"
                readOnly
                disabled
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-pink-950 text-white px-6 py-2.5 rounded hover:opacity-80"
          >
            Guardar Cambios
          </button>
          <button
            onClick={props.onCancel}
            className="flex-1 bg-neutral-300 text-neutral-700 px-6 py-2.5 rounded hover:bg-neutral-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
