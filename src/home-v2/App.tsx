import { ChangePanelShell } from './components/ChangePanelShell';
import { ConfiguratorShell } from './components/ConfiguratorShell';
import { HeaderShell } from './components/HeaderShell';
import { HeroShell } from './components/HeroShell';
import { ProductsPanelShell } from './components/ProductsPanelShell';

export function App() {
  return (
    <div className="home-v2">
      <HeaderShell />
      <main>
        <HeroShell />
        <ChangePanelShell />
        <ProductsPanelShell />
        <ConfiguratorShell />
      </main>
      <footer className="preview-footer">
        <span>BND.STUDIO</span>
        <span>Stage 02 · structural preview only</span>
      </footer>
    </div>
  );
}
