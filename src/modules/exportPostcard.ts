import html2canvas from "html2canvas";

export async function exportPostcard(node: HTMLElement, fileName = "postal-flores-amarillas.png"): Promise<void> {
  const canvas = await html2canvas(node, {
    backgroundColor: "#0d0f12",
    scale: 3, 
    useCORS: true,
  });

  const link = document.createElement("a");
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
