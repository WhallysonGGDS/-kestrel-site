import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Context from "@/components/Context";
import Aircraft from "@/components/Aircraft";
import Delivery from "@/components/Delivery";
import Fleet from "@/components/Fleet";
import Climax from "@/components/Climax";
import Cta from "@/components/Cta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Context />
        <Aircraft />
        <Delivery />
        <Fleet />
        <Climax />
        <Cta />
      </main>
    </>
  );
}
