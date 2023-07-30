import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/AdministracaoRestaurantes";
import FormularioRestaurante from "./paginas/Administracao/AdministracaoRestaurantes/formularioRestaurante";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route
        path="/admin/restaurantes"
        element={<AdministracaoRestaurantes />}
      />
      <Route
        path="/admin/restaurantes/novo"
        element={<FormularioRestaurante />}
      />
    </Routes>
  );
}

export default App;
