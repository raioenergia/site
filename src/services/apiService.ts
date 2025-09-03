const API_URL = process.env.PUBLIC_API_URL || 'http://localhost:3001';

export async function submit(formData: FormData): Promise<boolean> {
    try {
        const response = await fetch(API_URL + '/brevo/contact', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        return result.success;

    } catch (error) {
        console.error('Erro ao enviar para API', error);
        return false;
    }
}