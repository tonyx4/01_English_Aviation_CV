/* =============================
SCRIPT PRINCIPAL
Control general del CV y menús desplegables
============================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Página cargada correctamente.");

  // ====== FUNCIÓN: GENERAR PDF ======
 
        // 👉 GENERAR PDF
        html2pdf().set(opt).from(element).save();
      }
    );

  // ====== FUNCIÓN: ENLACES DE CERTIFICACIÓN ======
  const certificationLinks = document.querySelectorAll(
    ".Certifications-details a",
  );

  certificationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      // URL base (ya incluye img)
      const baseUrl = link.getAttribute("href");

      // Nombre de la certificación
      const name = link.dataset.name || "Certification";

      // URL final segura
      const fullUrl = `${baseUrl}&name=${encodeURIComponent(name)}`;

      console.log(`Abriendo certificación: ${name}`);
      window.open(fullUrl, "_blank");
    });
  });

  // ====== FUNCIÓN: MENÚ DESPLEGABLE GENERAL ======
  const dropdowns = document.querySelectorAll(".dropdown");
  dropdowns.forEach((drop) => {
    const content = drop.querySelector(".dropdown-content");
    if (content) {
      drop.addEventListener("mouseenter", () => {
        content.style.display = "block";
      });
      drop.addEventListener("mouseleave", () => {
        content.style.display = "none";
      });
    }
  });

  // ====== FUNCIÓN: OCULTAR LISTADO DE TRAINING & CERTIFICATION ======
  const trainingSection = document.querySelector(".Training");
  if (trainingSection) {
    const details = trainingSection.querySelector("details");
    if (details) {
      // Abre el listado al pasar el mouse
      trainingSection.addEventListener("mouseenter", () => {
        details.setAttribute("open", true);
      });
      // Lo cierra al retirar el cursor
      trainingSection.addEventListener("mouseleave", () => {
        details.removeAttribute("open");
      });
    }
  };
  // =============================
// DESCARGA PDF – VERSIÓN ESTABLE
// =============================
window.addEventListener("load", () => {

  const downloadBtn = document.getElementById("downloadPdf");

  if (!downloadBtn) {
    console.error("Botón #downloadPdf no existe");
    return;
  }

  downloadBtn.addEventListener("click", () => {

    const resume = document.getElementById("resume");

    if (!resume) {
      alert("ERROR: No se encontró el contenedor #resume");
      return;
    }

    if (typeof html2pdf === "undefined") {
      alert("ERROR: html2pdf.js no está cargado");
      return;
    }

    const options = {
      margin: 10,
      filename: "CV_Cristobal_Cantillo.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        scrollY: 0
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait"
      },
      pagebreak: {
        mode: ["css", "legacy"]
      }
    };

    html2pdf()
      .set(options)
      .from(resume)
      .save();
  });
});

