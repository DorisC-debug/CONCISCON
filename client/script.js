// BUSCAR CONTROLES POR TEXTO GENERAL
async function buscarControles() {
  const texto = document.getElementById('riskInput').value.trim();

  if (!texto || texto.length === 0) {
    alert('Por favor escribe un riesgo, palabra clave o control.');
    return;
  }

  try {
    const res = await fetch(`https://conciscon.onrender.com/api/controles?texto=${encodeURIComponent(texto)}`);
    const data = await res.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('control-card');
      div.innerHTML = `
        <h3>${item.SalvaguardaID} - ${item.NombreSalvaguarda}</h3>
        <p><strong>Descripción:</strong> ${item.DescripcionSalvaguarda}</p>
        <p><strong>Control:</strong> ${item.ControlID} -  ${item.NombreControl}</p>
        <p><strong>Función:</strong> ${item.FuncionCiberseguridad}</p>
        <p><strong>Tipo de activo:</strong> ${item.TipoActivo}</p>
        <p><strong>Grupo de Implementación:</strong> ${item.IG_Nombre}</p>
        <p><strong>Descripción de Grupo de Implementación:</strong> ${item.DescripcionIG}</p>
      `;
      resultsDiv.appendChild(div);
    });
  } catch (error) {
    console.error('Error al buscar controles:', error);
    alert('Error al conectar con el servidor.');
  }
}

// FILTRAR POR PALABRA CLAVE
async function filtrarPorPalabraClave() {
  const texto = document.getElementById('keywordFilter').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!texto || texto.length === 0) {
    alert('Por favor escribe una palabra clave para filtrar.');
    return;
  }

  try {
    const res = await fetch(`https://conciscon.onrender.com/api/controles?texto=${encodeURIComponent(texto)}`);
    const data = await res.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = '<p>No se encontraron resultados para el filtro.</p>';
      return;
    }

    data.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('control-card');
      div.innerHTML = `
        <h3>${item.SalvaguardaID} - ${item.NombreSalvaguarda}</h3>
        <p><strong>Descripción:</strong> ${item.DescripcionSalvaguarda}</p>
        <p><strong>Control:</strong> ${item.ControlID} -  ${item.NombreControl}</p>
        <p><strong>Función:</strong> ${item.FuncionCiberseguridad}</p>
        <p><strong>Tipo de activo:</strong> ${item.TipoActivo}</p>
        <p><strong>Grupo de Implementación:</strong> ${item.IG_Nombre}</p>
        <p><strong>Descripción de Grupo de Implementación:</strong> ${item.DescripcionIG}</p>
      `;
      resultsDiv.appendChild(div);
    });

  } catch (error) {
    console.error('Error al filtrar controles:', error);
    alert('Error al conectar con el servidor.');
  }
}
