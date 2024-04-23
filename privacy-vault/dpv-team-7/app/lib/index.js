export const extractPIIs = (message) => {
    const patterns = [
        { type: 'email', regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g },
        { type: 'phone', regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g },
        { type: 'date', regex: /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g },
        { type: 'name', regex: /\b[A-Z][a-z]{1,15}\b/g },
        { type: 'dni', regex: /\b\d{8}[A-Z]\b/g }
    ];

    let matches = [];
    patterns.forEach(pattern => {
        let match;
        while ((match = pattern.regex.exec(message)) !== null) {
            matches.push({ value: match[0], type: pattern.type });
        }
    });

    return matches;
}

export const extractTokens = (message) => {
    const regex = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/g;
    let matches = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
