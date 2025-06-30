import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function App() {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useState(null)[0];

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef?.offsetWidth) {
        setContainerWidth(containerRef.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [containerRef]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100dvw',
        height: 'auto', 
        // position: 'fixed', 
        // top: 0, 
        // left: 0
      }}
    >
      <Document
        file="/novedades.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => {
          console.error("❌ Error al cargar el PDF:", err);
          setError("No se pudo cargar el PDF.");
        }}
      >
        {numPages &&
          Array.from({ length: numPages }, (_, i) => (
            <Page
              className='flex'
              key={i}
              pageNumber={i + 1}
              // size="A4"
              width={containerWidth} // Escala automáticamente sin deformar
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
      </Document>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
