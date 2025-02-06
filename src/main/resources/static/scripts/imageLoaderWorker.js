self.onmessage = async function (e) {
    const imageUrls = e.data; // Recibe las URLs de las imágenes

    try {
        const loadedImages = await Promise.all(
            imageUrls.map(async (url) => {
                const response = await fetch(url);
                const blob = await response.blob();
                return URL.createObjectURL(blob); // Crea un URL de objeto para cada imagen
            })
        );

        // Envía las URLs cargadas de regreso al hilo principal
        self.postMessage({ success: true, images: loadedImages });
    } catch (error) {
        // En caso de error, notifica al hilo principal
        self.postMessage({ success: false, error: error.message });
    }
};
