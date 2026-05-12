import templateHtml from "../assets/templates/giaodienportfolio.html?raw";
import { API_BASE_URL } from "../services/portfolioApi";

function PortfolioFrame() {
  const uiHtml = templateHtml.replace("__API_BASE_URL__", API_BASE_URL);

  return (
    <main className="ui-shell">
      <iframe className="ui-frame" srcDoc={uiHtml} title="Portfolio Interface" />
    </main>
  );
}

export default PortfolioFrame;
