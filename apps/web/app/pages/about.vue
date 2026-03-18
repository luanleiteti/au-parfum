<script setup lang="ts">
const values = [
  {
    title: 'Autenticidade',
    number: '01',
    description: 'Trabalhamos apenas com produtos originais e importados das melhores casas de perfumaria e beleza do mundo. Garantia de procedência em cada frasco.',
  },
  {
    title: 'Curadoria',
    number: '02',
    description: 'Não vendemos tudo — selecionamos o melhor. Cada produto é escolhido pela qualidade dos ingredientes, inovação da fórmula e experiência que proporciona.',
  },
  {
    title: 'Experiência',
    number: '03',
    description: 'Acreditamos que comprar um perfume ou produto de beleza deve ser um momento especial. Cada detalhe da nossa loja é pensado para encantar.',
  },
]

const imageStrip = [
  { src: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=80', alt: 'Perfumes femininos' },
  { src: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', alt: 'Maquiagem profissional' },
  { src: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=800&q=80', alt: 'Kits de presente' },
]

useHead({
  title: 'Sobre — Au Parfum',
  meta: [
    { name: 'description', content: 'Conheça a história e os valores da Au Parfum. Fragrâncias que despertam emoções, produtos que transformam rituais em momentos de prazer.' },
  ],
})
</script>

<template>
  <!-- Hero -->
  <section class="relative h-[80vh] md:h-screen overflow-hidden -mt-[var(--ui-header-height)]">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&q=80"
        alt="Perfumaria artesanal"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-charcoal/20 via-charcoal/10 to-charcoal/50" />
    </div>

    <div class="relative container-full h-full flex flex-col justify-end pb-20 md:pb-28">
      <div class="animate-fade-in-up">
        <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/60 mb-5">
          Nossa História
        </p>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-[0.9]">
          A Essência do
          <br>
          <span class="italic font-normal">Extraordinário</span>
        </h1>
        <p class="text-base md:text-lg text-white/70 max-w-lg leading-relaxed">
          Fragrâncias que despertam emoções, produtos que transformam rituais
          em momentos de prazer.
        </p>
      </div>
    </div>
  </section>

  <!-- Philosophy -->
  <section class="py-28 md:py-40">
    <div class="container-narrow">
      <div class="max-w-3xl mx-auto text-center">
        <div class="divider-ornament mb-12">
          <span class="text-[10px] font-semibold tracking-[0.3em] uppercase text-primary whitespace-nowrap">
            Nossa Filosofia
          </span>
        </div>
        <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-highlighted leading-[1.25] tracking-tight">
          Acreditamos que cada fragrância conta uma história, que cada produto
          de beleza é um gesto de
          <span class="italic">amor próprio</span>.
        </h2>
      </div>
    </div>
  </section>

  <!-- Story -->
  <section class="pb-20 md:pb-32">
    <div class="container-full">
      <div class="grid md:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 md:mb-36">
        <div class="md:col-span-5">
          <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">
            O Começo
          </p>
          <h3 class="font-serif text-3xl md:text-4xl text-highlighted mb-8 leading-tight">
            Uma Paixão por
            <br>
            <span class="italic">Fragrâncias</span>
          </h3>
          <p class="text-muted leading-[1.8] mb-5">
            A Au Parfum nasceu da paixão por perfumes importados e da busca
            por produtos de beleza que realmente fazem a diferença. Depois de
            anos viajando pelo mundo e descobrindo as melhores maisons de
            perfumaria, decidimos trazer essa curadoria para o Brasil.
          </p>
          <p class="text-muted leading-[1.8]">
            O que começou como uma coleção pessoal se transformou em uma
            seleção cuidadosa de fragrâncias, skincare e maquiagem, escolhidos
            pela qualidade, originalidade e capacidade de transformar o dia a dia.
          </p>
        </div>
        <div class="md:col-span-7">
          <div class="aspect-[4/5] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80"
              alt="Coleção de perfumes"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            >
          </div>
        </div>
      </div>

      <!-- Full-width banner -->
      <div class="mb-24 md:mb-36">
        <div class="relative h-[50vh] md:h-[70vh] overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1920&q=80"
            alt="Fragrâncias artesanais"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-charcoal/20" />
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center max-w-3xl px-6 leading-tight">
              "O perfume é a forma
              <br>
              mais <span class="italic">intensa</span>
              <br>
              de memória"
            </p>
          </div>
        </div>
      </div>

      <!-- Second story block -->
      <div class="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div class="md:col-span-7 md:order-first">
          <div class="aspect-[4/5] overflow-hidden group">
            <img
              src="https://images.unsplash.com/photo-1570194065650-d99fb4ee3313?w=1200&q=80"
              alt="Produtos de skincare"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            >
          </div>
        </div>
        <div class="md:col-span-5">
          <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">
            Nossa Curadoria
          </p>
          <h3 class="font-serif text-3xl md:text-4xl text-highlighted mb-8 leading-tight">
            Das Melhores Maisons
            <br>
            <span class="italic">para Você</span>
          </h3>
          <p class="text-muted leading-[1.8] mb-5">
            Cada produto em nossa loja passa por uma curadoria rigorosa. Buscamos
            perfumes das mais renomadas casas de perfumaria, skincare com
            ingredientes de alta performance e maquiagem profissional de marcas
            consagradas.
          </p>
          <p class="text-muted leading-[1.8]">
            Priorizamos autenticidade, qualidade e resultados. Seja um perfume
            que se torna sua assinatura olfativa ou um sérum que transforma
            sua pele — acreditamos em produtos que fazem diferença real.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Values -->
  <section class="py-24 md:py-36 bg-linen">
    <div class="container-full">
      <div class="text-center mb-20">
        <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">
          O Que Nos Guia
        </p>
        <h2 class="font-serif text-4xl md:text-5xl text-highlighted">
          Nossos Valores
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-16 md:gap-12 lg:gap-20">
        <div
          v-for="(value, i) in values"
          :key="value.title"
          class="text-center animate-fade-in-up"
          :style="{ animationDelay: `${i * 150}ms` }"
        >
          <span class="text-[11px] font-semibold tracking-[0.3em] text-primary/50 mb-4 block">
            {{ value.number }}
          </span>
          <h3 class="font-serif text-2xl text-highlighted mb-5">
            {{ value.title }}
          </h3>
          <div class="w-8 h-px bg-primary/30 mx-auto mb-5" />
          <p class="text-muted leading-[1.8]">
            {{ value.description }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Three-image strip -->
  <section class="py-4 md:py-6">
    <div class="grid grid-cols-3 gap-2 md:gap-4 h-[35vh] md:h-[50vh]">
      <div
        v-for="(img, i) in imageStrip"
        :key="i"
        class="overflow-hidden group animate-fade-in-up"
        :style="{ animationDelay: `${i * 150}ms` }"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        >
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-28 md:py-40 relative overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920&q=80"
        alt=""
        loading="lazy"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-charcoal/60" />
    </div>

    <div class="relative container-narrow text-center">
      <p class="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-5">
        Fale Conosco
      </p>
      <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
        Alguma Dúvida?
      </h2>
      <p class="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
        Estamos sempre prontos para ajudar você a encontrar a fragrância
        perfeita ou o produto ideal para sua rotina de beleza.
      </p>
      <UButton
        to="mailto:contato@auparfum.com"
        external
        size="xl"
        trailing-icon="i-lucide-arrow-right"
        class="px-12 text-sm tracking-[0.15em] uppercase bg-white text-charcoal hover:bg-white/90"
      >
        Fale Conosco
      </UButton>
    </div>
  </section>
</template>
