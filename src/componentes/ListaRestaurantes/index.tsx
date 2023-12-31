import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [busca, setBusca] = useState("");

  function carregarDados(url: string) {
    axios
      .get<IPaginacao<IRestaurante>>(url)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => console.log(erro));
  }

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  // function verMais() {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then((resposta) => {
  //       setRestaurantes([...restaurantes, ...resposta.data.results]);
  //       setProximaPagina(resposta.data.next);
  //     })
  //     .catch((erro) => console.log(erro));
  // }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      <label htmlFor="id_busca">Buscar</label>
      <input
        id="id_busca"
        type="text"
        placeholder="Busque o restaurente por aqui..."
        onChange={(e) => setBusca(e.target.value)}
      />
      {restaurantes
        .filter((restaurante) => {
          return busca.toLowerCase() === ""
            ? restaurante
            : restaurante.nome.toLowerCase().includes(busca.toLowerCase());
        })
        .map((item) => (
          <Restaurante restaurante={item} key={item.id} />
        ))}
      <button
        onClick={() => carregarDados(paginaAnterior)}
        disabled={!paginaAnterior}
      >
        Página Anterior
      </button>
      <button
        onClick={() => carregarDados(proximaPagina)}
        disabled={!proximaPagina}
      >
        Próxima Página
      </button>
      {/* {proximaPagina && <button onClick={verMais}>Ver Mais</button>} */}
    </section>
  );
};

export default ListaRestaurantes;
