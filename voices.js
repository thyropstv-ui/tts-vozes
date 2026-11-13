/* Funções compartilhadas pelo catálogo (index.html) e pelo gerador (gerador.html). */

// Ordem das abas de categoria. Categoria nova no JSON aparece depois destas.
const ORDEM_CATEGORIAS = [
  "Séries de TV",
  "Animes",
  "Desenhos",
  "Filmes e Heróis",
  "Games",
  "Música",
  "Narradores",
  "Personalidades",
  "Outras vozes",
];

const limpo = n => String(n).replace(/^!/, "");
const norm = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

async function carregaVozes() {
  const r = await fetch("custom_voices.json?_=" + Date.now());
  if (!r.ok) throw new Error(r.status);
  return r.json();
}

/*
  Agrupa as vozes em [{nome, subs:[{nome, vozes:[]}]}].
  - categorias na ordem de ORDEM_CATEGORIAS
  - dentro da categoria: séries com mais vozes primeiro, "Outros..." por último
  - voz sem "categoria"/"subcategoria" cai em "Outras vozes"
*/
function agrupaVozes(vozes) {
  const porCat = new Map();
  vozes.forEach((v, i) => {
    const c = v.categoria || "Outras vozes";
    const s = v.subcategoria || c;
    if (!porCat.has(c)) porCat.set(c, { nome: c, ordem: i, subs: new Map() });
    const g = porCat.get(c);
    if (!g.subs.has(s)) g.subs.set(s, { nome: s, ordem: i, vozes: [] });
    g.subs.get(s).vozes.push(v);
  });

  const outros = s => (/^Outros/.test(s.nome) ? 1 : 0);
  const lista = [...porCat.values()].map(g => ({
    nome: g.nome,
    ordem: g.ordem,
    subs: [...g.subs.values()].sort(
      (a, b) => outros(a) - outros(b) || b.vozes.length - a.vozes.length || a.ordem - b.ordem
    ),
  }));

  const pos = n => { const i = ORDEM_CATEGORIAS.indexOf(n); return i < 0 ? 99 : i; };
  lista.sort((a, b) => pos(a.nome) - pos(b.nome) || a.ordem - b.ordem);
  return lista;
}
