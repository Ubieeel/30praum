async function carregarDados() {
  try {
    const [compraInformation, showInformation, userInformation] =
      await Promise.all([
        fetch("http://localhost:5000/api/compra", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch("http://localhost:5000/api/show", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

    const compraData = await compraInformation.json();
    const showData = await showInformation.json();
    const userData = await userInformation.json();

    console.log("Compras:", compraData);
    console.log("Shows:", showData);
    console.log("Usuários:", userData);

    let artistaShows = {};
    let vendaUnicas = {
      MATUE: 0,
      BRANDAO: 0,
      TETO: 0,
      WIU: 0,
    };

    let ingressosPorArtista = {
      MATUE: 0,
      BRANDAO: 0,
      TETO: 0,
      WIU: 0,
    };

    showData.forEach((show) => {
      if (!artistaShows[show.artista]) {
        artistaShows[show.artista] = [];
      }
      artistaShows[show.artista].push(show);
    });

    compraData.forEach((compra) => {
      const showId = compra.registroid;
      const artista = showData.find(
        (show) => show.registro === showId
      )?.artista;
      if (artista && vendaUnicas[artista] !== undefined) {
        vendaUnicas[artista] += 1;
        ingressosPorArtista[artista] += compra.quantidade || 0;
      }
    });

    if (artistaShows["MATUE"]) {
      const matueShowNovo = artistaShows["MATUE"].reverse();
      document.getElementById('mostSalesMatue').textContent =
        matueShowNovo[0].nome; // Show mais recente
      document.getElementById('showsMatue').textContent = matueShowNovo.length;
      document.getElementById('quantidadeVendasMatue').textContent =
        vendaUnicas["MATUE"];
      document.getElementById('quantidadeIngressosMatue').textContent =
        ingressosPorArtista["MATUE"];
    } else {
      document.getElementById('mostSalesMatue').textContent = "Nenhum show";
      document.getElementById('showsMatue').textContent = "0";
      document.getElementById('quantidadeVendasMatue').textContent = "0";
      document.getElementById('quantidadeIngressosMatue').textContent = "0";
    }

    if (artistaShows["WIU"]) {
      const wiuShowNovo = artistaShows["WIU"].reverse();
      document.getElementById('mostSalesWiu').textContent = wiuShowNovo[0].nome;
      document.getElementById('showsWiu').textContent = wiuShowNovo.length;
      document.getElementById('quantidadeVendasWiu').textContent =
        vendaUnicas["WIU"];
      document.getElementById('quantidadeIngressosWiu').textContent =
        ingressosPorArtista["WIU"];
    } else {
      document.getElementById('mostSalesWiu').textContent = "Nenhum show";
      document.getElementById('showsWiu').textContent = "0";
      document.getElementById('quantidadeVendasWiu').textContent = "0";
      document.getElementById('quantidadeIngressosWiu').textContent = "0";
    }

    if (artistaShows["TETO"]) {
      const tetoShowNovo = artistaShows["TETO"].reverse();
      document.getElementById('mostSalesTeto').textContent =
        tetoShowNovo[0].nome;
      document.getElementById('showsTeto').textContent = tetoShowNovo.length;
      document.getElementById('quantidadeVendasTeto').textContent =
        vendaUnicas["TETO"];
      document.getElementById('quantidadeIngressosTeto').textContent =
        ingressosPorArtista["TETO"];
    } else {
      document.getElementById('mostSalesTeto').textContent = "Nenhum show";
      document.getElementById('showsTeto').textContent = "0";
      document.getElementById('quantidadeVendasTeto').textContent = "0";
      document.getElementById('quantidadeIngressosTeto').textContent = "0";
    }

    if (artistaShows["BRANDAO"]) {
      const brandaoShowNovo = artistaShows["BRANDAO"].reverse();
      document.getElementById('mostSalesBrandao').textContent =
        brandaoShowNovo[0].nome;
      document.getElementById('showsBrandao').textContent =
        brandaoShowNovo.length;
      document.getElementById('quantidadeVendasBrandao').textContent =
        vendaUnicas["BRANDAO"];
      document.getElementById('quantidadeIngressosBrandao').textContent =
        ingressosPorArtista["BRANDAO"];
    } else {
      document.getElementById('mostSalesBrandao').textContent = "Nenhum show";
      document.getElementById('showsBrandao').textContent = "0";
      document.getElementById('quantidadeVendasBrandao').textContent = "0";
      document.getElementById('quantidadeIngressosBrandao').textContent = "0";
    }
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

carregarDados();
