import { Input, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IPaginacao } from "../../interfaces/IPaginacao";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");
  const [paginaAnterior, setPaginaAnterior] = useState("");
  const [search, setSearch] = useState("");
  const [filtroSelecionado, setFiltroSelecionado] = useState("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  // const verMais = () => {
  //   axios
  //     .get<IPaginacao<IRestaurante>>(proximaPagina)
  //     .then((response) => {
  //       setRestaurantes(response.data.results);
  //       setProximaPagina(response.data.next);
  //       setPaginaAnterior(response.data.previous);
  //     })
  //     .catch((erro) => {
  //       console.log(erro);
  //     });
  // };

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/",
        {
          params: {
            search: search,
          },
        }
      )
      .then((response) => {
        setRestaurantes(response.data.results);
      });
  }, [search]);

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>(
        "http://localhost:8000/api/v1/restaurantes/",
        {
          params: {
            ordering: filtroSelecionado,
          },
        }
      )
      .then((response) => {
        setRestaurantes(response.data.results);
      });
  }, [filtroSelecionado]);

  const mostrarPagina = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url).then((response) => {
      setRestaurantes(response.data.results);
      setProximaPagina(response.data.next);
      setPaginaAnterior(response.data.previous);
    });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <Select
        label="Filtre por"
        value={filtroSelecionado}
        onChange={(event) => {
          setFiltroSelecionado(event.target.value);
        }}
      >
        <MenuItem value="">Limpar Filtro</MenuItem>
        <MenuItem value="id">ID</MenuItem>
        <MenuItem value="nome">Nome</MenuItem>
      </Select>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => mostrarPagina(paginaAnterior)}
          disabled={!paginaAnterior}
        >
          Página Anterior
        </button>
      }
      {
        <button
          onClick={() => mostrarPagina(proximaPagina)}
          disabled={!proximaPagina}
        >
          Próxima Página
        </button>
      }
    </section>
  );
};

export default ListaRestaurantes;
