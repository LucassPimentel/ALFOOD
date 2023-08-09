import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../../http";
import ITag from "../../../../interfaces/ITag";
import IRestaurante from "../../../../interfaces/IRestaurante";

export default function FormularioPrato() {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>();
  const [restaurante, setRestaurante] = useState("");
  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricaoPrato] = useState("");
  const [tags, setTagsPrato] = useState<ITag[]>();
  const [tag, setTag] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((resposta) => setTagsPrato(resposta.data.tags))
      .catch((error) => alert(`[ERROR] - ${error}`));

    http
      .get<IRestaurante[]>("restaurantes/")
      .then((resposta) => setRestaurantes(resposta.data))
      .catch((error) => alert(`[ERROR] - ${error}`));
  }, []);

  function selecionarArquivo(evento: React.ChangeEvent<HTMLInputElement>) {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
      console.log(imagem);
    } else {
      setImagem(null);
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("tag", tag);
    formData.append("descricao", descricao);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        alert("Prato Cadastrado!");
        setNomePrato("");
        setTag("");
        setDescricaoPrato("");
        setRestaurante("");
      })
      .catch((error) => alert(`[ERROR] - ${error}`));
  };
  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component={"h1"} variant="h6">
                Formulário de Prato
              </Typography>
              <Box
                component={"form"}
                sx={{ width: "100%" }}
                onSubmit={aoSubmeterForm}
              >
                <TextField
                  value={nomePrato}
                  onChange={(evento) => setNomePrato(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />
                <TextField
                  value={descricao}
                  onChange={(evento) => setDescricaoPrato(evento.target.value)}
                  id="standard-basic"
                  label="Descrição"
                  variant="standard"
                  fullWidth
                  required
                />
                <FormControl margin="dense" fullWidth required>
                  <InputLabel id="select-tag">Tag</InputLabel>
                  <Select
                    labelId="select-tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  >
                    {tags?.map((tag) => (
                      <MenuItem key={tag.id} value={tag.value}>
                        {tag.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth required>
                  <InputLabel id="select-restaurante">Restaurantes</InputLabel>
                  <Select
                    labelId="select-restaurante"
                    value={restaurante}
                    onChange={(e) => setRestaurante(e.target.value)}
                  >
                    {restaurantes?.map((restaurante) => (
                      <MenuItem key={restaurante.id} value={restaurante.id}>
                        {restaurante.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo}></input>

                <Button
                  type="submit"
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  fullWidth
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
