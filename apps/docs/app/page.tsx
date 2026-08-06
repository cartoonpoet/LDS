import { HeroFilm } from "../src/components/site/HeroFilm";
import { HomeEffects } from "../src/components/site/HomeEffects";
import { Html } from "../src/components/site/Shell";
import { BENTO_HTML, DARK_HTML, FOOTER_HTML } from "../src/data/home-html";

export default function HomePage() {
  return (
    <main className="page-fade" id="page-home">
      <header className="hero">
        <div className="container">
          <HeroFilm />
          <Html html={BENTO_HTML} />
        </div>
      </header>
      <Html html={DARK_HTML} />
      <Html html={FOOTER_HTML} />
      <HomeEffects />
    </main>
  );
}
