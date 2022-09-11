import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

function App() {
  const preventDefault = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Header preventDefault={preventDefault}></Header>
      <Content preventDefault={preventDefault}></Content>
      <Footer preventDefault={preventDefault}></Footer>
    </>
  );
}

export default App;
