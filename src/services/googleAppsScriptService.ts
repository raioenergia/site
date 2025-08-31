// src/services/googleAppsScriptService.ts
const GOOGLE_APPS_SCRIPT_URL = `https://script.google.com/macros/s/${process.env.PUBLIC_GOOGLE_APP_CODE}/exec`;

// Função para converter arquivo em base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]); // Remove data:type;base64,
        };
        reader.onerror = error => reject(error);
    });
};

export async function submitToGoogleScript(formData: {
    whatsapp: string;
    email?: string; // Opcional
    valorConta: number;
    economia: number;
    contaCemig?: File | null;
    documento?: File | null;
}): Promise<boolean> {
    try {
        const payload: any = {
            whatsapp: formData.whatsapp,
            email: formData.email || '', // Campo vazio se não fornecido
            valorConta: formData.valorConta,
            economia: formData.economia
        };

        // Converter arquivos para base64 (apenas se existirem)
        if (formData.contaCemig) {
            payload.contaCemigBase64 = await fileToBase64(formData.contaCemig);
            payload.contaCemigName = formData.contaCemig.name;
            payload.contaCemigType = formData.contaCemig.type;
        }

        if (formData.documento) {
            payload.documentoBase64 = await fileToBase64(formData.documento);
            payload.documentoName = formData.documento.name;
            payload.documentoType = formData.documento.type;
        }

        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        return result.status === 'success';

    } catch (error) {
        console.error('Erro ao enviar para Google Apps Script:', error);
        return false;
    }
}