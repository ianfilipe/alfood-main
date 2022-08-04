import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

export default function AdministracaoPratos() {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>("pratos/").then((response) => setPratos(response.data));
  }, []);

  const excluir = (pratoASerExcluido: IPrato) => {
    http.delete(`pratos/${pratoASerExcluido.id}/`).then(() => {
      const listaPrato = pratos.filter(
        (prato) => prato.id !== pratoASerExcluido.id
      );
      setPratos([...listaPrato]);
    });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.descricao}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>
                [
                <a href={prato.imagem} target="_blank" rel="noreferrer">
                  Ver imagem
                </a>
                ]
              </TableCell>

              <TableCell>
                [ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}