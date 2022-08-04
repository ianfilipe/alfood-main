import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

export default function FormularioRestaurante() {
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      http
        .get<IRestaurante>(`restaurantes/${params.id}/`)
        .then((response) => setNomeRestaurante(response.data.nome));
    }
  }, [params]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const OnSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (params.id) {
      http
        .put(`restaurantes/${params.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Atualizado com sucesso!");
        });
    } else {
      http
        .post("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Cadastrado com sucesso!");
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={OnSubmitForm} sx={{ width: "100%" }}>
        <TextField
          value={nomeRestaurante}
          onChange={(event) => setNomeRestaurante(event.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          variant="outlined"
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
