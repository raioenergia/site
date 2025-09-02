// src/services/brevoService.ts
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Função para gerar email temporário baseado no WhatsApp
function generateTempEmail(whatsapp: string): string {
    const cleanPhone = whatsapp.replace(/\D/g, '');
    return `${cleanPhone}@whatsapp.temp`;
}

// Função para converter arquivo em base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = error => reject(error);
    });
};

// ✅ Função principal - adapta comportamento conforme tem email real
export async function submitToBrevo(formData: {
    whatsapp: string;
    email?: string;
    valorConta: number;
    economia: number;
    contaCemig?: File | null;
    documento?: File | null;
}): Promise<boolean> {
    try {
        const apiKey = process.env.PUBLIC_BREVO_API_KEY;

        if (!apiKey) {
            console.error('❌ BREVO_API_KEY não configurada');
            return false;
        }

        // ✅ Se é o primeiro passo (sem email real)
        if (!formData.email || formData.email.trim() === '') {
            return await createContactWithTempEmail(formData, apiKey);
        } else {
            // ✅ Se é o segundo passo (com email real)
            return await updateContactWithRealEmail(formData, apiKey);
        }

    } catch (error) {
        console.error('❌ Erro ao enviar para Brevo:', error);
        return false;
    }
}

// ✅ Passo 1: Criar contato com email temporário
async function createContactWithTempEmail(formData: any, apiKey: string): Promise<boolean> {
    try {
        const tempEmail = generateTempEmail(formData.whatsapp);

        const contactData = {
            email: tempEmail,
            attributes: {
                SMS: '+55' + formData.whatsapp.replace(/\D/g, ""),
                CEMIG_ACCOUNT_VALUE: formData.valorConta.toString(),
                CALCULATED_ECONOMY: formData.economia.toString(),
                CREATED: new Date(),
                LAST_UPDATED: new Date(),
                LEAD_ORIGIN: 'Calculadora Website',
                LEAD_STATUS: 'LEAD_INICIAL' // ✅ Marcar como lead inicial
            },
            updateEnabled: true
        };

        const response = await fetch(`${BREVO_API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(contactData)
        });

        if (response.ok) {
            console.log('✅ Lead inicial criado no Brevo com email temporário');
            return true;
        } else {
            // Se falhar (ex: já existe), tentar atualizar
            return await updateExistingContact(tempEmail, formData, apiKey, 'LEAD_INICIAL');
        }

    } catch (error) {
        console.error('❌ Erro na criação do lead inicial:', error);
        return false;
    }
}

// ✅ Passo 2: Atualizar contato existente com email real
async function updateContactWithRealEmail(formData: any, apiKey: string): Promise<boolean> {
    try {
        const tempEmail = generateTempEmail(formData.whatsapp);

        // ✅ 1. Buscar contato pelo email temporário
        const contact = await findContactByEmail(tempEmail, apiKey);

        if (!contact) {
            console.warn('⚠️ Contato não encontrado, criando novo');
            return await createContactWithRealEmail(formData, apiKey);
        }

        // ✅ 2. Atualizar contato existente com email real
        const updateData = {
            email: formData.email,
            attributes: {
                SMS: '+55' + formData.whatsapp.replace(/\D/g, ""),
                CEMIG_ACCOUNT_VALUE: formData.valorConta.toString(),
                CALCULATED_ECONOMY: formData.economia.toString(),
                LAST_UPDATED: new Date().toISOString(),
                LEAD_STATUS: 'LEAD_COMPLETO' // ✅ Atualizar status
            }
        };

        const response = await fetch(`${BREVO_API_URL}/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            console.log('✅ Contato atualizado com email real');

            // ✅ 3. Enviar arquivos se existirem
            // if (formData.contaCemig || formData.documento) {
            //     await uploadFilesToBrevo(formData, apiKey);
            // }

            return true;
        } else {
            const errorText = await response.text();
            console.error('❌ Erro ao atualizar contato:', response.status, errorText);
            return false;
        }

    } catch (error) {
        console.error('❌ Erro na atualização do contato:', error);
        return false;
    }
}

// ✅ Função auxiliar: Buscar contato por email
async function findContactByEmail(email: string, apiKey: string): Promise<any | null> {
    try {
        const response = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'api-key': apiKey
            }
        });

        if (response.ok) {
            return await response.json();
        } else if (response.status === 404) {
            return null; // Contato não encontrado
        } else {
            console.error('❌ Erro ao buscar contato:', response.status);
            return null;
        }

    } catch (error) {
        console.error('❌ Erro na busca do contato:', error);
        return null;
    }
}

// ✅ Função auxiliar: Criar contato direto com email real (fallback)
async function createContactWithRealEmail(formData: any, apiKey: string): Promise<boolean> {
    try {
        const contactData = {
            email: formData.email,
            attributes: {
                SMS: '+55' + formData.whatsapp.replace(/\D/g, ""),
                CEMIG_ACCOUNT_VALUE: formData.valorConta.toString(),
                CALCULATED_ECONOMY: formData.economia.toString(),
                CREATED: new Date().toISOString(),
                LEAD_ORIGIN: 'Calculadora Website',
                LEAD_STATUS: 'LEAD_COMPLETO'
            },
            updateEnabled: true
        };

        const response = await fetch(`${BREVO_API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(contactData)
        });

        return response.ok;

    } catch (error) {
        console.error('❌ Erro na criação direta:', error);
        return false;
    }
}

// ✅ Função auxiliar: Atualizar contato existente
async function updateExistingContact(email: string, formData: any, apiKey: string, status: string): Promise<boolean> {
    try {
        const contact = await findContactByEmail(email, apiKey);

        if (!contact) return false;

        const updateData = {
            attributes: {
                SMS: '+55' + formData.whatsapp.replace(/\D/g, ""),
                CEMIG_ACCOUNT_VALUE: formData.valorConta.toString(),
                CALCULATED_ECONOMY: formData.economia.toString(),
                LAST_UPDATED: new Date(),
                LEAD_STATUS: status
            }
        };

        const response = await fetch(`${BREVO_API_URL}/contacts/${contact.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(updateData)
        });

        return response.ok;

    } catch (error) {
        console.error('❌ Erro na atualização:', error);
        return false;
    }
}

// ✅ Upload de arquivos (mantido igual)
async function uploadFilesToBrevo(formData: any, apiKey: string): Promise<boolean> {
    try {
        const attachments = [];

        if (formData.contaCemig) {
            const contaBase64 = await fileToBase64(formData.contaCemig);
            attachments.push({
                content: contaBase64,
                name: `Conta_CEMIG_${formData.whatsapp.replace(/\D/g, '')}.${getFileExtension(formData.contaCemig.name)}`,
                contentType: formData.contaCemig.type
            });
        }

        if (formData.documento) {
            const docBase64 = await fileToBase64(formData.documento);
            attachments.push({
                content: docBase64,
                name: `Documento_${formData.whatsapp.replace(/\D/g, '')}.${getFileExtension(formData.documento.name)}`,
                contentType: formData.documento.type
            });
        }

        const emailData = {
            sender: {
                name: "Sistema Raio Energia",
                email: "sistema@raioenergia.com.br"
            },
            to: [{
                email: "arquivos@raioenergia.com.br",
                name: "Arquivos Raio Energia"
            }],
            subject: `Arquivos do cliente ${formData.whatsapp}`,
            htmlContent: `
                <h3>Novos arquivos recebidos</h3>
                <p><strong>WhatsApp:</strong> ${formData.whatsapp}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Valor da Conta:</strong> R$ ${formData.valorConta}</p>
                <p><strong>Economia:</strong> R$ ${formData.economia}</p>
                <p><strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}</p>
            `,
            attachment: attachments
        };

        const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            console.log('✅ Arquivos enviados via email');
            return true;
        }

        return false;

    } catch (error) {
        console.error('❌ Erro no envio de arquivos:', error);
        return false;
    }
}

// Função auxiliar para extensão do arquivo
function getFileExtension(filename: string): string {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2) || 'pdf';
}
