export function base64ToPng(base64String: string) {
  return new Promise((resolve, reject) => {
    // Create an image element
    const img = new Image();
    img.src = `data:image/png;base64,${base64String}`;

    img.onload = () => {
      // Create a canvas and draw the image
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas is empty"));
        }
      }, "image/png");
    };

    img.onerror = () => {
      reject(new Error("Failed to load the image"));
    };
  });
}
