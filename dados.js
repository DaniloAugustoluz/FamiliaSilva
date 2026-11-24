/* Dados da Pizzaria Família Silva. Para mudar preço, sabor ou horário, edite só este arquivo. */
window.LOJA = {
  previa: true,                 // true: o pedido sai marcado como TESTE. Trocar para false na entrega.
  whatsapp: "5511949623319",
  // minutos desde a meia-noite; fechamento acima de 1440 passa da meia-noite
  horas: [
    { dia: "Domingo", abre: 1080, fecha: 1485 },
    { dia: "Segunda", abre: 1080, fecha: 1410 },
    { dia: "Terça", fechado: true },
    { dia: "Quarta", abre: 1080, fecha: 1410 },
    { dia: "Quinta", abre: 1080, fecha: 1485 },
    { dia: "Sexta", abre: 1080, fecha: 1440 },
    { dia: "Sábado", abre: 1080, fecha: 1440 }
  ]
};

(function () {
  const p = (nome, desc, G, P) => ({ nome, desc, precos: { G, P } });
  const u = (nome, preco, desc) => ({ nome, desc: desc || "", precos: { un: preco } });

  window.CARDAPIO = [
    { id: "salgadas", nome: "Pizzas salgadas", tipo: "pizza", itens: [
      p("A Moda", "Peito de peru, mussarela, bacon e tomate", 54, 47),
      p("A Moda da Casa", "Presunto, bacon, frango, ervilha, milho, palmito, ovo, calabresa e catupiry", 59, 52),
      p("A Moda do Chefe", "Frango, milho, mussarela e bacon", 54, 47),
      Object.assign(p("A Moda do Cliente", "Escolha até 4 ingredientes", 54, 47), { obs: "Quais ingredientes? (até 4)", obsObrig: true }),
      p("Americana", "Mussarela, palmito, ovo e cheddar", 54, 47),
      p("Atum I", "Atum e cebola", 51, 44),
      p("Atum II", "Atum, tomate e parmesão", 52, 45),
      p("Bacon I", "Bacon e mussarela", 51, 44),
      p("Bacon II", "Mussarela, parmesão e bacon", 51, 44),
      p("Baiana", "Calabresa, cebola, ovo e molho de pimenta", 51, 44),
      p("Batata Palha", "Mussarela e batata palha", 48, 41),
      p("Bauru", "Mussarela, presunto e tomate", 48, 41),
      p("Brócolis", "Brócolis, catupiry e bacon", 54, 47),
      p("Caiçara", "Mussarela, milho, palmito e bacon", 48, 41),
      p("Caipira", "Frango, catupiry, milho e bacon", 54, 47),
      p("Calabresa", "Calabresa e cebola", 48, 41),
      p("Carne Seca", "Carne seca, ovo e catupiry", 54, 47),
      p("Catubresa", "Calabresa e catupiry", 49, 42),
      p("Dois Queijos", "Mussarela e catupiry", 52, 45),
      p("Escarola", "Escarola, mussarela, bacon e cebola", 51, 44),
      p("Formatura", "Frango, mussarela, milho e ervilha", 54, 47),
      p("Francesa I", "Mussarela, presunto, champignon e catupiry", 53, 46),
      p("Francesa II", "Mussarela, calabresa e presunto", 53, 46),
      p("Frango I", "Frango e catupiry", 54, 47),
      p("Frango II", "Frango e mussarela", 54, 47),
      p("Frango III", "Frango, mussarela, bacon e alho dourado", 54, 47),
      p("Grega", "Calabresa, mussarela e vinagrete", 52, 45),
      p("Lombo Especial", "Lombo, cebola, champignon, bacon, palmito e mussarela", 55, 48),
      p("Maluca", "Calabresa, mussarela, vinagrete e bacon", 54, 47),
      p("Marguerita", "Mussarela, manjericão e tomate", 48, 41),
      p("Milho", "Mussarela e milho", 49, 42),
      p("Milho II", "Mussarela, milho e bacon", 49, 42),
      p("Mussarela", "Mussarela e tomate", 48, 41),
      p("Napolitana", "Mussarela, parmesão e tomate", 48, 41),
      p("Nordestina", "Carne seca, cebola, ovo, mussarela e bacon", 55, 48),
      p("Palmito I", "Palmito, catupiry, tomate e parmesão", 51, 44),
      p("Palmito II", "Palmito, cebola, tomate e bacon", 51, 44),
      p("Parmegiana", "Calabresa, mussarela e cheddar", 49, 42),
      p("Paris", "Presunto, champignon, catupiry, parmesão e bacon", 53, 46),
      p("Paulista", "Mussarela, bacon, ovo e cebola", 51, 44),
      p("Peito de Peru", "Peito de peru, bacon, milho, ovo e mussarela", 53, 46),
      p("Pepperoni", "Pepperoni e mussarela", 48, 41),
      p("Portuguesa", "Presunto, ervilha, ovo, cebola e mussarela", 53, 46),
      p("Portuguesa Real", "Presunto, milho, palmito, ervilha, mussarela e cebola", 53, 46),
      p("Quatro Queijos", "Mussarela, provolone, parmesão e catupiry", 56, 49),
      p("Toscana", "Calabresa e mussarela", 49, 42)
    ] },
    { id: "doces", nome: "Pizzas doces", tipo: "pizza", itens: [
      p("Brigadeiro", "Chocolate, M&M's e granulado", 49, 42),
      p("Doce de Leite", "Doce de leite, coco ralado e M&M's", 49, 42),
      p("Romeu e Julieta", "Mussarela e goiabada", 48, 41),
      p("Sensação", "Chocolate com morango", 52, 45),
      p("Prestígio", "Chocolate com coco ralado", 48, 41)
    ] },
    { id: "lanches", nome: "Lanches", tipo: "lanche", itens: [
      u("X-Burger", 14, "Pão, hambúrguer, presunto e mussarela"),
      u("X-Salada", 15, "Pão, hambúrguer, presunto, mussarela, alface e tomate"),
      u("X-Bacon", 18, "Pão, hambúrguer, mussarela, bacon, alface e tomate"),
      u("X-Egg", 17, "Pão, hambúrguer, presunto, mussarela e ovo"),
      u("X-Calabresa", 17, "Pão, hambúrguer, calabresa, mussarela, alface e tomate"),
      u("X-Tudo", 21, "Pão, hambúrguer, ovo, presunto, mussarela, calabresa, bacon, alface e tomate")
    ] },
    { id: "pasteis", nome: "Pastéis", tipo: "pastel", itens: [
      u("Pastel de carne seca", 12), u("Pastel de carne seca com queijo", 12), u("Pastel de pizza", 12), u("Pastel de catubresa", 12),
      u("Pastel de queijo", 12), u("Pastel portuguesa", 12), u("Pastel de frango com catupiry", 12), u("Pastel de frango", 12)
    ] },
    { id: "bebidas", nome: "Bebidas", tipo: "bebida", itens: [
      u("Coca-Cola 1 L", 8.5), u("Coca-Cola 1,5 L", 11), u("Coca-Cola 2 L", 14), u("Coca-Cola Zero 2 L", 14), u("Coca-Cola 2,5 L", 15),
      u("Guaraná Antarctica", 14), u("Fanta Laranja", 14), u("Fanta Uva", 14),
      u("Sukita Laranja", 12), u("Sukita Uva", 12), u("Itubaína", 12),
      u("Dolly Guaraná", 9), u("Dolly Laranja", 9), u("Dolly Uva", 9), u("Dolly Limão", 9)
    ] },
    { id: "sobremesas", nome: "Sobremesas", tipo: "sobremesa", itens: [
      u("Bolo de pote de chocolate 200 g", 8), u("Bolo de pote de prestígio 200 g", 8),
      u("Mousse de limão 100 ml", 5), u("Mousse de maracujá 100 ml", 5)
    ] }
  ];
})();
