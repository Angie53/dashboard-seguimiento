let datosClientes = [];

fetch('datos.json')
  .then(res => res.json())
  .then(data => {
    datosClientes = data;
    mostrarDatos("Angélica"); // Mostrar por defecto
  });

function mostrarDatos(vendedora) {
  const filtrados = datosClientes.filter(c => c.vendedora === vendedora);

  const asignados = 85; // Total fijo
  const contactados = filtrados.filter(c => c.estado !== "No contactado").length;
  const ventasCerradas = filtrados.filter(c => c.estado === "Venta cerrada").length;
  const buzones = filtrados.filter(c => c.estado === "Buzón").length;
  const errados = filtrados.filter(c => c.estado === "Errado").length;
  const datosMal = filtrados.filter(c => c.estado === "Datos mal").length;
  const cumplimiento = ((contactados / asignados) * 100).toFixed(1);

  document.getElementById('asignados').textContent = asignados;
  document.getElementById('contactados').textContent = contactados;
  document.getElementById('ventas').textContent = ventasCerradas;
  document.getElementById('buzon').textContent = buzones;
  document.getElementById('errados').textContent = errados;
  document.getElementById('datosmal').textContent = datosMal;
  document.getElementById('cumplimiento').textContent = cumplimiento + "%";

  const tabla = document.getElementById('tabla-clientes');
  tabla.innerHTML = '';
  filtrados.forEach(c => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${c.cliente}</td>
      <td>${c.estado}</td>
      <td>${c.ultimocontacto}</td>
    `;
    tabla.appendChild(fila);
  });
}