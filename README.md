# Vozes | Thyrops Live

Site estático (sem servidor) para o GitHub Pages, no visual das lives.

- `index.html`: catálogo de vozes com abas de categoria. Toca a amostra pública do Fish Audio e copia o comando `!nomedavoz`. Não precisa de API key.
- `gerador.html`: gera áudio com um texto livre. Precisa da API key do Fish Audio de quem usa (fica só no navegador dele).
- `custom_voices.json`: a lista de vozes. É o mesmo arquivo que você já mantém.
- `tema.css` e `voices.js`: visual e funções compartilhadas pelas duas páginas.
- `assets/logo.png`: logo recortado da imagem da live.

## Publicar (grátis)

1. Crie um repositório público no GitHub e envie **todos** os arquivos, mantendo a pasta `assets/`.
2. Em **Settings → Pages**: *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. O site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Adicionar ou editar vozes

Edite `custom_voices.json`. Cada voz tem:

```json
{
  "nome": "!goku",
  "id": "ID_DO_MODELO_NO_FISH_AUDIO",
  "descricao": "De Dragon Ball",
  "volume": 0,
  "categoria": "Animes",
  "subcategoria": "Dragon Ball"
}
```

- `id`: o código na URL da voz (`fish.audio/m/<id>`).
- `volume`: ajuste em % (só é usado no gerador).
- `categoria`: vira uma aba. As atuais são Séries de TV, Animes, Desenhos, Filmes e Heróis, Games, Música, Narradores, Personalidades e Outras vozes.
- `subcategoria`: a série ou grupo dentro da aba (Chaves, Naruto, One Piece...). Aparece como título e como botão de filtro.
- Categoria nova no JSON ganha uma aba sozinha, depois das atuais. Voz sem categoria cai em "Outras vozes".
- Dentro de cada categoria, as séries com mais vozes aparecem primeiro e as chamadas "Outros ..." vão para o fim.
- A ordem das abas está no começo de `voices.js` (`ORDEM_CATEGORIAS`).

## Como o catálogo toca as vozes (sem chave)

Ao clicar no play, a página consulta `https://api.fish.audio/model/<id>` (endpoint público), pega a primeira amostra da voz e toca o MP3 de `platform.r2.fish.audio`. As capas vêm de `public-platform.r2.fish.audio`. Voz sem amostra pública mostra "amostra indisponível".

## Se o gerador der erro de CORS

Se o navegador bloquear a chamada direta para `api.fish.audio`, crie um proxy gratuito no Cloudflare Workers que repasse a requisição para `https://api.fish.audio/v1/tts` com os headers CORS e cole a URL dele em **Avançado → URL da API**.

## Aviso

Projeto não oficial. As vozes pertencem aos seus criadores no Fish Audio. Não use para enganar ou se passar por pessoas reais.
