import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./Main";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div>
      <Header/>
      <Main/>
      <Footer />
    </div>
  );
}

export default App;
