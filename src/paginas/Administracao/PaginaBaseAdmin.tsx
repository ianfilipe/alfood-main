import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";

export default function PaginaBaseAdmin() {
  return (
    <>
      <AppBar position="static">
        <Container max-width="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos">
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to="/admin/pratos/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container max-width="lg" sx={{ marginTop: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}
