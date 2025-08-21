import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

function ModalImgPost({modal}) {

  const [url, setUrl] = useState("");
  const [nombre, setNombre] = useState("");

  const abrirWidget = () => {
    // Crea el widget con tu configuración
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "dofgbev8i", // cambia por tu cloud_name
          uploadPreset: "konekt", // debe ser unsigned
          sources: ["local", "url", "camera"], // de dónde puede subir
          multiple: false,
          folder: "react_uploads", // carpeta opcional
          cropping: false,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Subida exitosa:", result.info);
            setUrl(result.info.secure_url);
            setNombre(result.info.original_filename);
          }
        }
      )
      .open();
  };

  return (
    <>
      <button onClick={() => modal}>Open dialog</button>
      <Dialog
        open={modal}
        onClose={() => modal}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <Description>
              This will permanently deactivate your account
            </Description>
            <div style={{ padding: "20px" }}>
              <h2>Subir Imagen con Cloudinary Widget</h2>
              <button onClick={abrirWidget}>Seleccionar Imagen</button>

              {url && (
                <div style={{ marginTop: "20px" }}>
                  <p>
                    <strong>Nombre:</strong> {nombre}
                  </p>
                  <img src={url} alt={nombre} width="200" />
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default ModalImgPost;
