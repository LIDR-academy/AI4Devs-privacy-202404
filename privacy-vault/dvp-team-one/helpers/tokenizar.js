function tokenizePII(text, token = '[PII]') {
    // Definir expresiones regulares para identificar PII y sus respectivas claves
    const piiPatterns = [
        { key: 'phone', pattern: /(\b\d{3}[-.]?\d{3}[-.]?\d{4}\b)|(\b\d{9}\b)|(\b\d{4}[-.]?\d{4}[-.]?\d{4}[-.]?\d{4}\b)|(\b\d{4}[-.]?\d{6}[-.]?\d{5}\b)|(\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b)|(\b\d{3}[-.\s]?\d{4}[-.\s]?\d{4}\b)/g },
        { key: 'email', pattern: /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b)/g },
        { key: 'name', pattern: /(\b[A-Za-z]+\b)/g },
        { key: 'address', pattern: /(\b\d{1,5}\s[A-Za-z0-9\s]{1,}\b)/g },
        { key: 'zip_code', pattern: /(\b\d{5}\b)/g },
        { key: 'social_security_number', pattern: /(\b\d{3}[- ]?\d{2}[- ]?\d{4}\b)/g },
        { key: 'credit_card_number', pattern: /(\b(?:\d[ -]*?){13,16}\b)/g },
        { key: 'passport_number', pattern: /(\b[A-Za-z]{1,2}\d{7}\b)|(\b\d{9}\b)|(\b\d{3}[-\s]?\d{7}\b)/g },
        { key: 'driver_license_number', pattern: /(\b[A-Za-z]{1,2}\d{6,8}\b)/g },
        { key: 'birth_date', pattern: /(\b(?:0[1-9]|1[0-2])[-\/.](?:0[1-9]|1\d|2[0-8])[-\/.](?:19|20)\d{2}\b)|(\b\d{1,2}[-\/.]\d{1,2}[-\/.]\d{2,4}\b)/g },
        // Puedes agregar más patrones según sea necesario
    ];

    // Array para almacenar los objetos JSON
    const tokenizedData = [];

    // Reemplazar PII con tokens y construir el array de objetos JSON
    piiPatterns.forEach(({ key, pattern }) => {
        const matches = text.match(pattern);
        if (matches) {
            matches.forEach(match => {
                text = text.replace(match, token);
                tokenizedData.push({ key, value: token });
            });
        }
    });

    // Devolver el array de objetos JSON
    return tokenizedData;
}

module.exports =  {tokenizePII}

