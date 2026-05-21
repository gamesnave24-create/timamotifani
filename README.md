# 💕 Site Romântico

Um site moderno e elegante para casais, inspirado no Spotify e em contadores de relacionamento. Tema escuro com roxo, rosa e gradientes animados.

---

## ✨ Funcionalidades

| Seção | Descrição |
|---|---|
| 🏠 Hero | Gradiente animado, coração pulsante, corações ao clicar |
| ⏱ Contador | Dias, horas, minutos e segundos desde o início do namoro |
| 🎵 Player | Player estilo Spotify com capa, progresso e volume |
| 📸 Galeria | Grid de fotos com zoom no hover e lightbox ao clicar |
| 💕 Sobre nós | Foto do casal + texto romântico |
| 🎁 Surpresa | Botão flutuante que abre mensagem especial |

---

## 🚀 Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) v18 ou superior

### Passos

```bash
# 1. Entre na pasta do projeto
cd "Site"

# 2. Instale as dependências (só na primeira vez)
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## ⚙️ Personalização

### 1. Data do relacionamento
Abra [src/components/Counter.jsx](src/components/Counter.jsx) e edite:
```js
const RELATIONSHIP_START = new Date('2025-11-11T00:00:00')
//                                    ^^^^^^^^^^^^ sua data aqui
```

### 2. Música
- Coloque seu arquivo em **`public/music.mp3`**
- Edite [src/components/MusicPlayer.jsx](src/components/MusicPlayer.jsx):
```js
const TRACK = {
  title:  'A Little Respect',
  artist: 'Erasure',
  cover:  '/cover.jpg',   // imagem em public/cover.jpg
  src:    '/music.mp3',
}
```

### 3. Fotos da galeria
- Crie a pasta **`public/photos/`**
- Nomeie as fotos: `photo1.jpg`, `photo2.jpg`, ..., `photo6.jpg`
- Edite as legendas em [src/components/Gallery.jsx](src/components/Gallery.jsx)

### 4. Foto do casal (seção "Sobre nós")
- Coloque em **`public/couple.jpg`**

### 5. Nomes e textos
- Edite [src/components/AboutUs.jsx](src/components/AboutUs.jsx) → constante `ABOUT`
- Edite [src/components/SurpriseModal.jsx](src/components/SurpriseModal.jsx) → constante `SURPRISE`

### 6. Título da aba
- Edite [index.html](index.html) → tag `<title>`

---

## 📁 Estrutura do projeto

```
Site/
├── public/
│   ├── music.mp3          ← sua música aqui
│   ├── cover.jpg          ← capa da música
│   ├── couple.jpg         ← foto do casal
│   └── photos/
│       ├── photo1.jpg
│       ├── photo2.jpg
│       ├── photo3.jpg
│       ├── photo4.jpg
│       ├── photo5.jpg
│       └── photo6.jpg
├── src/
│   ├── components/
│   │   ├── Hero.jsx           ← tela inicial
│   │   ├── Counter.jsx        ← contador de relacionamento
│   │   ├── MusicPlayer.jsx    ← player de música
│   │   ├── Gallery.jsx        ← galeria de fotos
│   │   ├── AboutUs.jsx        ← seção "sobre nós"
│   │   ├── FloatingHearts.jsx ← corações flutuantes
│   │   └── SurpriseModal.jsx  ← modal surpresa
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## 🌐 Deploy na Vercel

### Opção A — Via GitHub (recomendado)

1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e faça login
3. Clique em **"Add New → Project"**
4. Importe o repositório
5. As configurações são detectadas automaticamente pelo `vercel.json`
6. Clique em **Deploy** — pronto! 🎉

### Opção B — Via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy (responda as perguntas)
vercel

# Deploy de produção
vercel --prod
```

---

## 🛠 Build de produção

```bash
npm run build
```

Os arquivos otimizados ficam na pasta `dist/`.

---

## 🎨 Tecnologias

- **React 18** + **Vite 5**
- **TailwindCSS 3**
- **Framer Motion 11** — animações suaves
- **CSS Animations** — gradiente, coração, corações flutuantes
- **HTML5 Audio API** — player de música

---

Feito com ❤️
