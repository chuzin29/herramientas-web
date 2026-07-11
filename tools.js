// tools.js - Implementación de todas las herramientas

const tools = {
    counter: {
        title: '📝 Contador de Palabras',
        render: () => `
            <div class="tool-section">
                <h2>Contador de Palabras y Caracteres</h2>
                <textarea id="counter-input" rows="10" placeholder="Escribe o pega tu texto aquí..."></textarea>
                <div class="stats" id="counter-stats">
                    <div class="stat-item"><div class="number" id="words">0</div><div class="label">Palabras</div></div>
                    <div class="stat-item"><div class="number" id="chars">0</div><div class="label">Caracteres</div></div>
                    <div class="stat-item"><div class="number" id="lines">0</div><div class="label">Líneas</div></div>
                    <div class="stat-item"><div class="number" id="paragraphs">0</div><div class="label">Párrafos</div></div>
                </div>
            </div>
        `,
        init: () => {
            const input = document.getElementById('counter-input');
            input.addEventListener('input', () => {
                const text = input.value;
                document.getElementById('words').textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
                document.getElementById('chars').textContent = text.length;
                document.getElementById('lines').textContent = text ? text.split('\n').length : 0;
                document.getElementById('paragraphs').textContent = text.trim() ? text.trim().split(/\n\s*\n/).length : 0;
            });
        }
    },

    password: {
        title: '🔐 Generador de Contraseñas',
        render: () => `
            <div class="tool-section">
                <h2>Generador de Contraseñas Seguras</h2>
                <div class="slider-group">
                    <label>Longitud:</label>
                    <input type="range" id="pass-length" min="4" max="64" value="16">
                    <span class="value" id="pass-length-val">16</span>
                </div>
                <div class="checkbox-group">
                    <label><input type="checkbox" id="pass-upper" checked> Mayúsculas (A-Z)</label>
                    <label><input type="checkbox" id="pass-lower" checked> Minúsculas (a-z)</label>
                    <label><input type="checkbox" id="pass-numbers" checked> Números (0-9)</label>
                    <label><input type="checkbox" id="pass-symbols" checked> Símbolos (!@#$)</label>
                </div>
                <button class="btn" onclick="generatePassword()">Generar Contraseña</button>
                <button class="btn btn-accent" onclick="copyResult('pass-result')">Copiar</button>
                <div class="result-box" id="pass-result">Haz clic en generar</div>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('pass-length');
            slider.addEventListener('input', () => {
                document.getElementById('pass-length-val').textContent = slider.value;
            });
        }
    },

    qr: {
        title: '📱 Generador de QR',
        render: () => `
            <div class="tool-section">
                <h2>Generador de Código QR</h2>
                <input type="text" id="qr-input" placeholder="Ingresa una URL o texto...">
                <button class="btn" onclick="generateQR()">Generar QR</button>
                <div id="qr-result" style="text-align:center; margin-top:20px;"></div>
            </div>
        `,
        init: () => {}
    },

    text: {
        title: '🔄 Convertidor de Texto',
        render: () => `
            <div class="tool-section">
                <h2>Convertidor de Texto</h2>
                <textarea id="text-input" rows="8" placeholder="Escribe o pega tu texto aquí..."></textarea>
                <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:15px;">
                    <button class="btn" onclick="convertText('upper')">MAYÚSCULAS</button>
                    <button class="btn" onclick="convertText('lower')">minúsculas</button>
                    <button class="btn" onclick="convertText('title')">Capitalizar</button>
                    <button class="btn" onclick="convertText('sentence')">Primera mayúscula</button>
                    <button class="btn" onclick="convertText('reverse')">Invertir</button>
                    <button class="btn" onclick="convertText('trim')">Eliminar espacios</button>
                    <button class="btn btn-accent" onclick="copyResult('text-result')">Copiar</button>
                </div>
                <div class="result-box" id="text-result">El resultado aparecerá aquí</div>
            </div>
        `,
        init: () => {}
    },

    lorem: {
        title: '📄 Generador Lorem Ipsum',
        render: () => `
            <div class="tool-section">
                <h2>Generador de Lorem Ipsum</h2>
                <div class="slider-group">
                    <label>Párrafos:</label>
                    <input type="range" id="lorem-count" min="1" max="20" value="3">
                    <span class="value" id="lorem-count-val">3</span>
                </div>
                <button class="btn" onclick="generateLorem()">Generar</button>
                <button class="btn btn-accent" onclick="copyResult('lorem-result')">Copiar</button>
                <div class="result-box" id="lorem-result">Haz clic en generar</div>
            </div>
        `,
        init: () => {
            const slider = document.getElementById('lorem-count');
            slider.addEventListener('input', () => {
                document.getElementById('lorem-count-val').textContent = slider.value;
            });
        }
    },

    color: {
        title: '🎨 Generador de Colores',
        render: () => `
            <div class="tool-section">
                <h2>Generador de Paletas de Colores</h2>
                <div class="color-preview" id="color-preview" style="background:#6c5ce7;"></div>
                <div class="checkbox-group">
                    <label><input type="checkbox" id="color-lock1" class="color-lock" data-index="0"> 🔒</label>
                    <label><input type="checkbox" id="color-lock2" class="color-lock" data-index="1"> 🔒</label>
                    <label><input type="checkbox" id="color-lock3" class="color-lock" data-index="2"> 🔒</label>
                    <label><input type="checkbox" id="color-lock4" class="color-lock" data-index="3"> 🔒</label>
                    <label><input type="checkbox" id="color-lock5" class="color-lock" data-index="4"> 🔒</label>
                </div>
                <button class="btn" onclick="generateColors()">🎲 Generar Paleta</button>
                <div class="color-palette" id="color-palette"></div>
                <div class="result-box" id="color-result" style="margin-top:15px;">Clic en un color para copiarlo</div>
            </div>
        `,
        init: () => { generateColors(); }
    },

    discount: {
        title: '💰 Calculadora de Descuentos',
        render: () => `
            <div class="tool-section">
                <h2>Calculadora de Descuentos</h2>
                <input type="number" id="discount-price" placeholder="Precio original ($)" step="0.01">
                <input type="number" id="discount-percent" placeholder="Descuento (%)" step="0.01" max="100">
                <button class="btn" onclick="calculateDiscount()">Calcular</button>
                <div class="stats" id="discount-result" style="display:none;">
                    <div class="stat-item"><div class="number" id="discount-save">$0</div><div class="label">Ahorras</div></div>
                    <div class="stat-item"><div class="number" id="discount-final">$0</div><div class="label">Precio Final</div></div>
                </div>
            </div>
        `,
        init: () => {}
    },

    hash: {
        title: '🔒 Generador de Hash',
        render: () => `
            <div class="tool-section">
                <h2>Generador de Hash</h2>
                <textarea id="hash-input" rows="5" placeholder="Ingresa el texto a hashear..."></textarea>
                <button class="btn" onclick="generateHashes()">Generar Hashes</button>
                <div style="margin-top:15px;">
                    <label style="color:var(--text-muted); font-size:0.9rem;">MD5:</label>
                    <div class="result-box" id="hash-md5" style="font-family:monospace; font-size:0.85rem;"></div>
                    <label style="color:var(--text-muted); font-size:0.9rem;">SHA-1:</label>
                    <div class="result-box" id="hash-sha1" style="font-family:monospace; font-size:0.85rem;"></div>
                    <label style="color:var(--text-muted); font-size:0.9rem;">SHA-256:</label>
                    <div class="result-box" id="hash-sha256" style="font-family:monospace; font-size:0.85rem;"></div>
                </div>
            </div>
        `,
        init: () => {}
    }
};
