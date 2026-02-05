---
# ✈️ **Sistema de Escala de Voo**

<div align="center">

![Sistema de Escala de Voo](https://img.shields.io/badge/Escala_de_Voo-Sistema_Aeronáutico-2e6b50?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Sistema profissional de gestão de escalas de voo com interface moderna e intuitiva**

[Demonstração](#-demonstração) • [Instalação](#-instalação) • [Uso](#-como-usar) • [Documentação](#-documentação)

</div>
---

## 📋 **Índice**

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Usar](#-como-usar)
- [Componentes Principais](#-componentes-principais)
- [Customização](#-customização)
- [Validações](#-validações)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 🎯 **Sobre o Projeto**

O **Sistema de Escala de Voo** é uma aplicação web desenvolvida para gerenciar escalas de tripulação de forma eficiente e profissional. Com uma interface inspirada em planilhas Excel, o sistema oferece recursos avançados de edição, preenchimento em lote e gestão de observações.

### **Destaques:**

- 📊 **Grid Customizado** - Componente DataGrid totalmente desenvolvido do zero, sem dependências pesadas
- 🎨 **Design Aeronáutico** - Visual profissional com tema verde institucional
- ⚡ **Performance** - Otimizado para lidar com grandes volumes de dados
- 🔒 **Fortemente Tipado** - TypeScript em 100% do código
- 🔄 **Reutilizável** - Componentes modulares e reutilizáveis

---

## ✨ **Funcionalidades**

### **Gestão de Escalas**

- ✅ **Edição de Células** - Clique simples para editar códigos de voo
- ✅ **Fill Handle** - Arraste o quadrado verde para preencher múltiplas células (estilo Excel)
- ✅ **Dropdown Inteligente** - Seleção rápida de códigos predefinidos
- ✅ **Cores Automáticas** - Células coloridas de acordo com o tipo de código

### **Observações**

- 📝 **Observações por Dia** - Adicione notas detalhadas em cada célula
- 💬 **Popover Elegante** - Interface moderna para adicionar/editar observações
- 🔍 **Tooltip Inteligente** - Visualize observações ao passar o mouse
- ⚠️ **Validação** - Só permite observações em células preenchidas

### **Reordenação**

- ⋮⋮ **Drag & Drop** - Arraste linhas para reordenar pilotos
- 🎯 **Feedback Visual** - Indicação clara de onde a linha será solta

### **Interface**

- 🎨 **Tema Profissional** - Design clean com fonte Poppins
- 🌓 **Loading Screen** - Animação de carregamento com avião
- 📊 **Mês completo** - Grid otimizado para exibir o mês completo sem scroll horizontal
- 🔔 **Notificações** - Modais elegantes para feedback de ações

---

## 🚀 **Tecnologias**

### **Core**

- **[React 18](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida

### **Estilização**

- **CSS3** - Estilização customizada sem frameworks
- **[Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)** - Fonte moderna e profissional

### **Arquitetura**

- **Componentes Funcionais** - React Hooks
- **Custom Hooks** - Lógica reutilizável
- **TypeScript Generics** - Componentes genéricos e tipados

---

## 📦 **Requisitos**

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

---

## 🔧 **Instalação**

### **1. Clone o repositório**

```bash
git clone https://github.com/moisesamaral/escala-voo.git
cd escala-voo
```

### **2. Instale as dependências**

```bash
npm install
# ou
yarn install
```

### **3. Execute o projeto**

```bash
npm run dev
# ou
yarn dev
```

### **4. Acesse no navegador**

```
http://localhost:5173
```

---

## 📁 **Estrutura do Projeto**

```
escala-voo/
├── public/
│   └── airplane-icon.svg          # Ícone do sistema
├── src/
│   ├── components/
│   │   ├── DataGrid/
│   │   │   ├── DataGrid.tsx       # Componente genérico de grid
│   │   │   ├── DataGrid.css       # Estilos do grid
│   │   │   └── types.ts           # Tipos TypeScript
│   │   └── EscalaGrid/
│   │       ├── EscalaGrid.tsx     # Implementação específica
│   │       ├── EscalaGrid.css     # Estilos customizados
│   │       ├── PopoverDia.tsx     # Modal de observações
│   │       ├── popoverDia.css     # Estilos do popover
│   │       ├── ModalNotificacao.tsx  # Modal de feedback
│   │       ├── AvatarRenderer.tsx # Renderizador de avatar
│   │       ├── mockData.ts        # Dados de exemplo
│   │       └── types.ts           # Tipos da escala
│   ├── App.tsx                    # Componente principal
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Estilos globais
│   └── layout.css                 # Layout da aplicação
├── index.html                     # HTML base
├── package.json                   # Dependências
├── tsconfig.json                  # Configuração TypeScript
├── vite.config.ts                 # Configuração Vite
└── README.md                      # Este arquivo
```

---

## 📖 **Como Usar**

### **Editar Códigos**

1. **Clique simples** em uma célula de dia (1-29)
2. Selecione um código no dropdown que aparece
3. A célula será colorida automaticamente

### **Preencher em Lote (Fill Handle)**

1. **Clique** em uma célula com código preenchido
2. Veja o **quadrado verde** no canto inferior direito
3. **Arraste o quadrado** para baixo ou para o lado
4. Solte para preencher todas as células selecionadas

### **Adicionar Observações**

1. Certifique-se de que a célula tem um código preenchido
2. **Duplo clique** na célula
3. Digite a observação no popover que aparecer
4. Clique em **Salvar** ou pressione **Ctrl+Enter**

### **Reordenar Pilotos**

1. Clique e segure na coluna **⋮⋮** à esquerda
2. Arraste a linha para a posição desejada
3. Solte para reordenar

### **Visualizar Observações**

1. Células com observações mostram um ícone **📝**
2. **Passe o mouse** sobre a célula para ver o tooltip
3. **Duplo clique** para editar

---

## 🧩 **Componentes Principais**

### **DataGrid<T>**

Componente genérico e reutilizável para exibição de dados em formato tabular.

**Props:**

```typescript
interface DataGridProps<T> {
  columns: Column<T>[]; // Definição das colunas
  data: T[]; // Array de dados
  onDataChange?: (data: T[]) => void; // Callback de mudança
  rowHeight?: number; // Altura das linhas (padrão: 45)
  enableFillHandle?: boolean; // Habilita fill handle (padrão: true)
  enableRowDrag?: boolean; // Habilita drag de linhas (padrão: false)
  className?: string; // Classes CSS customizadas
}
```

**Exemplo de uso:**

```typescript
<DataGrid
  columns={columns}
  data={data}
  onDataChange={handleDataChange}
  rowHeight={40}
  enableFillHandle={true}
  enableRowDrag={true}
  className="my-grid"
/>
```

### **Column<T>**

Interface para definição de colunas.

```typescript
interface Column<T> {
  id: string; // ID único da coluna
  header: string; // Texto do cabeçalho
  width?: number; // Largura em pixels
  minWidth?: number; // Largura mínima
  editable?: boolean; // Célula editável
  editor?: "select" | "text"; // Tipo de editor
  options?: string[]; // Opções para select
  getValue?: (row: T) => any; // Função para obter valor
  setValue?: (row: T, value: any) => void; // Função para setar valor
  getStyle?: (value: any, row: T) => React.CSSProperties; // Estilo dinâmico
  getTooltip?: (row: T) => string | null; // Tooltip customizado
  onDoubleClick?: (
    row: T,
    rowIndex: number,
    column: Column<T>,
    event: React.MouseEvent,
  ) => void;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode; // Renderizador customizado
  pinned?: "left" | "right"; // Fixar coluna
}
```

### **PopoverDia**

Modal para adicionar/editar observações em células.

**Props:**

```typescript
interface PopoverDiaProps {
  anchor: { top: number; left: number } | null; // Posição do popover
  diaInfo: DiaInfo | null; // Informações do dia
  onSave: (obs: string) => void; // Callback de salvar
  onClose: () => void; // Callback de fechar
}
```

**Atalhos:**

- **Ctrl+Enter** - Salvar e fechar
- **Esc** - Fechar sem salvar

### **ModalNotificacao**

Modal de feedback para ações do usuário.

**Tipos:**

- ✅ **sucesso** - Operação bem-sucedida (verde)
- ❌ **erro** - Validação ou erro (vermelho)

---

## 🎨 **Customização**

### **Cores do Tema**

Edite as variáveis CSS em `index.css`:

```css
:root {
  --primary-green: #2e6b50;
  --primary-green-dark: #1f5039;
  --secondary-gray: #f5f7f9;
  --text-primary: #1a1a1a;
  --text-secondary: #6b7280;
  --border-color: #e5e7eb;
}
```

### **Códigos de Voo**

Edite o array em `EscalaGrid.tsx`:

```typescript
const codigos: CodigoDia[] = [
  "E",
  "F",
  "FS",
  "FP",
  "T",
  "SM",
  "CR",
  "FE",
  "DM",
  "AD",
  "LP",
  "LM",
  "FB",
  "LN",
  "LC",
  "BRU",
  "BRN",
  "BLL",
  "",
];
```

### **Cores dos Códigos**

Edite o objeto de cores em `EscalaGrid.tsx`:

```typescript
const cores: Record<CodigoDia, string | undefined> = {
  FE: "#d0e1ff", // Azul claro
  DM: "#d0e1ff", // Azul claro
  SM: "#fff6aa", // Amarelo
  FS: "#ffb3b3", // Vermelho claro
  // ... adicione mais cores
};
```

### **Altura das Linhas**

```typescript
<DataGrid
  rowHeight={45}  // Ajuste conforme necessário
  // ...
/>
```

---

## ✅ **Validações**

### **Observações**

- ⚠️ Só permite adicionar observações em células **preenchidas**
- ⚠️ Modal de erro aparece ao tentar adicionar em célula vazia

### **Preenchimento**

- ✅ Fill handle só funciona em células **editáveis**
- ✅ Copia o valor da célula de origem para todas selecionadas

### **Reordenação**

- ✅ Não permite soltar na mesma posição
- ✅ Feedback visual durante o arrasto

---

## 👨‍💻 **Autor**

<div align="center">

### **Moises Amaral**

Desenvolvedor Fullstack • JavaScript & .NET C#

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/moisesdeveloper/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/moisesamaral)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:moises.amaraldev@gmail.com)

Feito com ❤️ e muito ☕

</div>

---

## 📄 **Licença**

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

```
MIT License

Copyright (c) 2026 Moises Amaral

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🌟 **Agradecimentos**

- **React Team** - Pela biblioteca incrível
- **Vite Team** - Pela ferramenta de build ultra-rápida
- **TypeScript Team** - Pela tipagem forte e segura
- **Comunidade Open Source** - Por inspiração e conhecimento

---

<div align="center">

**Sistema de Escala de Voo** © 2026

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/moises-amaral)

</div>

---
