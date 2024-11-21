import 'react-native-gesture-handler';
import Routes from './src/routes';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>

  );
}

// Cores usadas
// Tema claro: 
// Background: #F5F5F5
// Texto: #424242
// Texto Auxiliar: #757575
// Primária: #00796B
// Secundária: #B2DFDB

// Tema escuro:
// Background: #121212
// Texto: #FFFFFF
// Texto Auxiliar: #bdbdbd
// Primária: #004d40
// Secundária: #80cbc4
