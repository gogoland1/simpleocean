import Link from "next/link";

export default function SimpleFooter() {
  return (
    <footer className="bg-black text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <p className="font-bold">OceanInsight</p>
            <p className="text-sm">Consultoría oceanográfica</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/about" className="mr-4 text-gray-300 hover:text-white">
              Sobre nosotros
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white">
              Contacto
            </Link>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-sm">© {new Date().getFullYear()} OceanInsight</p>
        </div>
      </div>
    </footer>
  );
}