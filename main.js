// main.js - Funciones principales y utilidades

// Modal
function openTool(toolId) {
    const tool = tools[toolId];
    if (!tool) return;
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    body.innerHTML = `<h2 style="margin-bottom:20px; font-size:1.8rem;">${tool.title}</h2>${tool.render()}`;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (tool.init) tool.init();
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Copiar resultado
function copyResult(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent || el.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const original = el.textContent;
        el.textContent = '¡Copiado!';
        setTimeout(() => { el.textContent = original; }, 1500);
    });
}

// Generador de contraseñas
function generatePassword() {
    const length = parseInt(document.getElementById('pass-length').value);
    const useUpper = document.getElementById('pass-upper').checked;
    const useLower = document.getElementById('pass-lower').checked;
    const useNumbers = document.getElementById('pass-numbers').checked;
    const useSymbols = document.getElementById('pass-symbols').checked;

    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
        document.getElementById('pass-result').textContent = 'Selecciona al menos una opción';
        return;
    }

    let password = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
        password += chars[array[i] % chars.length];
    }
    document.getElementById('pass-result').textContent = password;
}

// Generador de QR (usando API de qrcode)
function generateQR() {
    const text = document.getElementById('qr-input').value.trim();
    if (!text) return;
    const container = document.getElementById('qr-result');
    // Usar API pública de QR
    const size = 200;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
    container.innerHTML = `
        <img src="${qrUrl}" alt="Código QR" style="border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
        <br><br>
        <button class="btn btn-accent" onclick="downloadQR('${qrUrl}')">Descargar QR</button>
    `;
}

function downloadQR(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codigo-qr.png';
    a.click();
}

// Convertidor de texto
function convertText(type) {
    const input = document.getElementById('text-input').value;
    let result = '';
    switch (type) {
        case 'upper': result = input.toUpperCase(); break;
        case 'lower': result = input.toLowerCase(); break;
        case 'title': result = input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
        case 'sentence': result = input.replace(/(^\s*\w|[.!?]\s+\w)/g, (txt) => txt.toUpperCase()); break;
        case 'reverse': result = input.split('').reverse().join(''); break;
        case 'trim': result = input.replace(/\s+/g, ' ').trim(); break;
    }
    document.getElementById('text-result').textContent = result;
}

// Generador Lorem Ipsum
function generateLorem() {
    const count = parseInt(document.getElementById('lorem-count').value);
    const paragraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
        "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
        "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
    ];
    let result = [];
    for (let i = 0; i < count; i++) {
        result.push(paragraphs[i % paragraphs.length]);
    }
    document.getElementById('lorem-result').textContent = result.join('\n\n');
}

// Generador de colores
function generateColors() {
    const locks = document.querySelectorAll('.color-lock');
    const existing = document.querySelectorAll('.color-swatch');
    const lockedColors = [];

    existing.forEach((swatch, i) => {
        if (locks[i] && locks[i].checked) {
            lockedColors[i] = swatch.style.background;
        }
    });

    const palette = document.getElementById('color-palette');
    palette.innerHTML = '';

    for (let i = 0; i < 5; i++) {
        let color;
        if (lockedColors[i]) {
            color = lockedColors[i];
        } else {
            color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
        }

        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.background = color;
        swatch.title = color;
        swatch.onclick = () => {
            navigator.clipboard.writeText(color);
            document.getElementById('color-result').textContent = `Copiado: ${color}`;
            document.getElementById('color-preview').style.background = color;
        };
        palette.appendChild(swatch);
    }
}

// Calculadora de descuentos
function calculateDiscount() {
    const price = parseFloat(document.getElementById('discount-price').value);
    const percent = parseFloat(document.getElementById('discount-percent').value);
    if (isNaN(price) || isNaN(percent)) return;

    const save = price * (percent / 100);
    const final_ = price - save;

    document.getElementById('discount-save').textContent = `$${save.toFixed(2)}`;
    document.getElementById('discount-final').textContent = `$${final_.toFixed(2)}`;
    document.getElementById('discount-result').style.display = 'flex';
}

// Generador de hashes
async function generateHashes() {
    const text = document.getElementById('hash-input').value;
    if (!text) return;

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1 = Array.from(new Uint8Array(sha1Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('hash-sha1').textContent = sha1;

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256 = Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    document.getElementById('hash-sha256').textContent = sha256;

    // MD5 (implementación simple en JS)
    document.getElementById('hash-md5').textContent = md5(text);
}

// MD5 implementation (simplificada)
function md5(string) {
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105813); b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
        a = ii(a, b, c, d, k[0], 6, -198630844); d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571); d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523); b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359); d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070); d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259); b = ii(b, c, d, a, k[9], 21, -343485551);
        x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, b, x, s, t); }
    function md51(s) {
        var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
        for (i = 64; i <= n; i += 64) md5cycle(state, md5blk(s.substring(i - 64, i)));
        s = s.substring(i - 64);
        var tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) { md5cycle(state, tail); tail = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }
    function md5blk(s) {
        var md5blks = [], i;
        for (i = 0; i < 64; i += 4) md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        return md5blks;
    }
    var hex_chr = '0123456789abcdef'.split('');
    function rhex(n) { var s = '', j = 0; for (; j < 4; j++) s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F]; return s; }
    function hex(x) { for (var i = 0; i < x.length; i++) x[i] = rhex(x[i]); return x.join(''); }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
    return hex(md51(string));
}
