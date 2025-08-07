export function handleApiError(error) {
  console.error('[API ERROR]', error);

  // Podés personalizar la respuesta para el frontend
  return {
    ok: false,
    message: error.message || 'Error inesperado. Intente nuevamente.',
  };
}
