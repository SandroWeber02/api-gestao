import puppeteer from "puppeteer";
import { getAlunoCompletoService } from "./alunosCompleto.service";
import { renderFichaMatriculaTemplate } from "./templates/fichaMatricula.template";

export async function gerarFichaMatriculaPdfService(id: string): Promise<Buffer> {
  const alunoCompleto = await getAlunoCompletoService(id);
  const html = renderFichaMatriculaTemplate(alunoCompleto);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}
