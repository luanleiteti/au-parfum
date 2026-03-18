export interface Collection {
  id: string
  name: string
  slug: string
  description: string
  image: string
  heroImage?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  collection: string
  price: number
  description: string
  longDescription: string
  materials: string
  dimensions?: string
  images: string[]
  featured?: boolean
  new?: boolean
}

export const collections: Collection[] = [
  {
    id: 'perfumes-femininos',
    name: 'Perfumes Femininos',
    slug: 'perfumes-femininos',
    description: 'Fragrâncias importadas que revelam a essência feminina',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80',
  },
  {
    id: 'perfumes-masculinos',
    name: 'Perfumes Masculinos',
    slug: 'perfumes-masculinos',
    description: 'Fragrâncias sofisticadas para o homem moderno',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1920&q=80',
  },
  {
    id: 'skincare',
    name: 'Skincare & Cuidados',
    slug: 'skincare',
    description: 'Produtos premium para o cuidado da sua pele',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=1920&q=80',
  },
  {
    id: 'cabelo-maquiagem',
    name: 'Cabelo & Maquiagem',
    slug: 'cabelo-maquiagem',
    description: 'Beleza profissional ao alcance das suas mãos',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1920&q=80',
  },
  {
    id: 'kits',
    name: 'Kits & Presentes',
    slug: 'kits',
    description: 'Conjuntos especiais para presentear com elegância',
    image: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=1920&q=80',
  },
  {
    id: 'lancamentos',
    name: 'Lançamentos',
    slug: 'lancamentos',
    description: 'As últimas novidades em perfumaria e beleza',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1920&q=80',
  },
]

export const products: Product[] = [
  {
    id: 'chanel-n5',
    name: 'Chanel Nº5 Eau de Parfum',
    slug: 'chanel-n5-eau-de-parfum',
    collection: 'perfumes-femininos',
    price: 890,
    description: 'O ícone atemporal da perfumaria feminina',
    longDescription: 'Chanel Nº5 é mais do que um perfume — é uma declaração de elegância que transcende gerações. Criado em 1921 por Ernest Beaux, este bouquet aldeídico floral combina notas de ylang-ylang, rosa de maio e jasmim de Grasse, sobre uma base rica de sândalo e vetiver. Cada frasco carrega a essência do luxo parisiense.',
    materials: 'Eau de Parfum, 100ml',
    dimensions: '100ml',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'dior-jadore',
    name: "Dior J'adore Eau de Parfum",
    slug: 'dior-jadore-eau-de-parfum',
    collection: 'perfumes-femininos',
    price: 750,
    description: 'Uma ode luminosa à feminilidade e à flor',
    longDescription: "J'adore é a expressão máxima da feminilidade segundo a Maison Dior. Este bouquet solar e sensual combina notas de ylang-ylang das Comores, rosa damascena e jasmim Sambac, criando uma fragrância que é ao mesmo tempo opulenta e delicada. Um clássico moderno que brilha na pele.",
    materials: 'Eau de Parfum, 100ml',
    dimensions: '100ml',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    ],
    new: true,
  },
  {
    id: 'lancome-idole',
    name: 'Lancôme Idôle Eau de Parfum',
    slug: 'lancome-idole-eau-de-parfum',
    collection: 'perfumes-femininos',
    price: 620,
    description: 'Feminina, poderosa e limpa — a fragrância da nova geração',
    longDescription: 'Idôle da Lancôme é uma fragrância clean e luminosa que celebra a mulher moderna. Notas de rosa de Isparta, jasmim e chypre branco criam uma assinatura fresca e empoderada. O frasco mais fino do mercado é um ícone de design e sustentabilidade.',
    materials: 'Eau de Parfum, 75ml',
    dimensions: '75ml',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    ],
  },
  {
    id: 'bleu-de-chanel',
    name: 'Bleu de Chanel Parfum',
    slug: 'bleu-de-chanel-parfum',
    collection: 'perfumes-masculinos',
    price: 920,
    description: 'A expressão definitiva da liberdade masculina',
    longDescription: 'Bleu de Chanel Parfum é a versão mais intensa e profunda desta linha icônica. Notas cítricas de toranja e limão se fundem com menta e cedro, culminando em uma base de sândalo e âmbar. Uma fragrância que encapsula a determinação e a elegância do homem contemporâneo.',
    materials: 'Parfum, 100ml',
    dimensions: '100ml',
    images: [
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea081ae7aec?w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'sauvage-dior',
    name: 'Dior Sauvage Eau de Parfum',
    slug: 'dior-sauvage-eau-de-parfum',
    collection: 'perfumes-masculinos',
    price: 780,
    description: 'Selvagem, nobre e magnético',
    longDescription: 'Sauvage de Dior é uma fragrância que evoca paisagens vastas e selvagens. Criada por François Demachy, combina calabresa bergamota com pimenta de Sichuan e ambroxan, resultando em um perfume fresco porém intenso. A masculinidade em seu estado mais puro e refinado.',
    materials: 'Eau de Parfum, 100ml',
    dimensions: '100ml',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea081ae7aec?w=800&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80',
    ],
    new: true,
  },
  {
    id: 'la-mer-creme',
    name: 'La Mer Crème de la Mer',
    slug: 'la-mer-creme-de-la-mer',
    collection: 'skincare',
    price: 1650,
    description: 'O creme milagroso que revolucionou o skincare de luxo',
    longDescription: 'Crème de la Mer é o produto mais icônico do skincare mundial. Formulado com o exclusivo Miracle Broth\u2122 — um elixir fermentado por 3 meses com algas marinhas gigantes — este creme oferece hidratação profunda, renovação celular e luminosidade incomparável. Uma experiência sensorial que transforma a pele.',
    materials: 'Creme facial, 60ml',
    dimensions: '60ml',
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'sk-ii-essence',
    name: 'SK-II Facial Treatment Essence',
    slug: 'sk-ii-facial-treatment-essence',
    collection: 'skincare',
    price: 980,
    description: 'A essência milagrosa com Pitera\u2122 para pele cristalina',
    longDescription: 'A essência de tratamento facial SK-II contém mais de 90% de Pitera\u2122, um ingrediente bio-derivado rico em vitaminas, aminoácidos e minerais. Usada diariamente, transforma a textura da pele, reduz poros e confere uma luminosidade translúcida conhecida como \u201cpele de cristal\u201d.',
    materials: 'Essência facial, 230ml',
    dimensions: '230ml',
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
      'https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=800&q=80',
    ],
  },
  {
    id: 'serum-vitamina-c',
    name: 'Sérum Vitamina C Concentrado',
    slug: 'serum-vitamina-c-concentrado',
    collection: 'skincare',
    price: 380,
    description: 'Antioxidante potente para luminosidade e uniformidade',
    longDescription: 'Este sérum concentrado com 20% de Vitamina C pura estabilizada combate os radicais livres, estimula a produção de colágeno e uniformiza o tom da pele. Textura leve e absorção rápida, ideal para uso diário sob o protetor solar. Resultados visíveis em 2 semanas.',
    materials: 'Sérum facial, 30ml',
    dimensions: '30ml',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80',
    ],
    new: true,
  },
  {
    id: 'olaplex-kit',
    name: 'Olaplex Hair Repair Kit',
    slug: 'olaplex-hair-repair-kit',
    collection: 'cabelo-maquiagem',
    price: 450,
    description: 'O sistema revolucionário de reparação capilar',
    longDescription: 'O Kit Olaplex inclui os passos essenciais para reconstruir os fios de dentro para fora. A tecnologia patenteada de ligação molecular repara cabelos danificados por química, calor e coloração. Inclui Nº3 Hair Perfector, Nº4 Shampoo e Nº5 Conditioner para uma rotina completa de restauração.',
    materials: 'Kit com 3 produtos',
    dimensions: '3x 250ml',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    ],
    featured: true,
  },
  {
    id: 'palette-nudes',
    name: 'Paleta de Sombras Nudes Essenciais',
    slug: 'paleta-sombras-nudes-essenciais',
    collection: 'cabelo-maquiagem',
    price: 320,
    description: '18 tons nude do mate ao brilho para todo tipo de make',
    longDescription: 'Esta paleta curada reúne 18 tonalidades nude em acabamentos mate, acetinado e shimmer. Pigmentação intensa, textura aveludada e blendabilidade perfeita. De looks naturais do dia a dia a produções sofisticadas para a noite, esta paleta é tudo que você precisa.',
    materials: 'Paleta de sombras, 18 cores',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    ],
  },
  {
    id: 'kit-presente-luxo',
    name: 'Kit Presente Au Parfum Luxe',
    slug: 'kit-presente-au-parfum-luxe',
    collection: 'kits',
    price: 560,
    description: 'Uma seleção sofisticada para presentear com elegância',
    longDescription: 'Nosso Kit Presente Luxe reúne uma curadoria especial de miniaturas das fragrâncias mais desejadas, acompanhadas de um hidratante corporal perfumado e uma vela aromática. Apresentado em caixa de presente premium com laço de cetim, é o presente perfeito para quem aprecia a arte da perfumaria.',
    materials: 'Kit com 4 miniaturas + hidratante + vela',
    images: [
      'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
    ],
  },
  {
    id: 'ysl-libre',
    name: 'YSL Libre Eau de Parfum',
    slug: 'ysl-libre-eau-de-parfum',
    collection: 'lancamentos',
    price: 720,
    description: 'A liberdade como fragrância — lavanda e flor de laranjeira',
    longDescription: 'Libre de Yves Saint Laurent é uma fragrância que desafia as convenções. A combinação ousada de lavanda francesa — tradicionalmente masculina — com flor de laranjeira marroquina cria uma assinatura olfativa que é livre, magnética e inesquecível. Para mulheres que escrevem suas próprias regras.',
    materials: 'Eau de Parfum, 90ml',
    dimensions: '90ml',
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80',
    ],
    new: true,
  },
]

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter(p => p.collection === collectionSlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getNewProducts(): Product[] {
  return products.filter(p => p.new)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find(c => c.slug === slug)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = products.find(p => p.id === productId)
  if (!product) return []
  return products
    .filter(p => p.collection === product.collection && p.id !== productId)
    .slice(0, limit)
}
