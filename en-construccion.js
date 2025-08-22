// en-construccion.js — Vista genérica "En construcción"
export async function render(host) {
  host.innerHTML = `
    <section class="card" style="text-align:center;padding:40px;">
      <div style="font-size:48px;line-height:1;">🚧</div>
      <h2 style="margin:12px 0 6px;">Sección en construcción</h2>
      <p>Pronto estará disponible. Gracias por tu paciencia.</p>
      <div style="margin-top:16px;">
        <a class="btn" href="#/fractales">Volver a Fractales</a>
      </div>
    </section>
  `;
}
