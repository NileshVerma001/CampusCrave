import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenue";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vivamus vitae magna sit amet quam fringilla commodo. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
            Vivamus vitae magna sit amet quam fringilla commodo. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus
            vitae magna sit amet quam fringilla commodo. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nulla facilisi. Vivamus vitae
            magna sit amet quam fringilla commodo. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla facilisi. Vivamus vitae magna sit
            amet quam fringilla commodo.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Vivamus vitae magna sit amet quam fringilla commodo. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi.
            Vivamus vitae magna sit amet quam fringilla commodo. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vivamus
            vitae magna sit amet quam fringilla commodo. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Nulla facilisi. Vivamus vitae
            magna sit amet quam fringilla commodo. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nulla facilisi. Vivamus vitae magna sit
            amet quam fringilla commodo.
          </p>
        </div>
      </section>

      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8 text-gray-500">
          <a className="text-4xl" href="tel:+919044171704">
            +91 9044171704
          </a>
        </div>
      </section>
    </>
  );
}
