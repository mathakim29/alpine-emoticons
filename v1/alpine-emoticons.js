(function (factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        console.log("l")
        module.exports = factory();
        
    } else {
        document.addEventListener('alpine:init', () => factory());
    }
}(function () {
    const libStyles = `
        .emoji-gif {
            height: 1.372em; width: auto;
            display: inline-block; vertical-align: middle;
            transform: scale(0.9) translateY(-30%); 
        }
    `;

    window.Alpine.directive('emoji', (el, { expression }, { evaluateLater, effect }) => {
        const getEnabled = evaluateLater(expression);
        
        // Capture the original text once to avoid infinite loops
        const originalText = el.textContent.trim();

        effect(() => {
            getEnabled(isEnabled => {
                const data = window.Alpine.$data(el);
                const library = data.emojiLib || {};
                const validStatus = data.validStatus || {};
                
                let content = originalText;
                
                // Escape HTML
                content = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

                if (isEnabled) {
                    Object.entries(library).forEach(([key, url]) => {
                        if (validStatus[key] === true) {
                            const regex = new RegExp(`:${key}:`, 'gi');
                            content = content.replace(regex, `<img src="${url}" class="emoji-gif" alt="${key}">`);
                        }
                    });
                }
                el.innerHTML = content;
            });
        });
    });

    window.emojiApp = (userLibrary = {}) => {
        return {
            showEmoji: true,
            emojiLib: userLibrary,
            validStatus: {}, 

            init() {
                this.injectStyles();
                Object.entries(this.emojiLib).forEach(([key, url]) => {
                    const img = new Image();
                    img.onload = () => {
                        this.validStatus[key] = (img.naturalWidth === img.naturalHeight);
                        if (this.validStatus[key]) {
                            console.log(`%c[OK] :${key}: Ready`, "color: lime; font-weight: bold;");
                        } else {
                            console.log(`%c[ERR] :${key}: Not 1:1`, "color: red;");
                        }
                    };
                    // img.onerror = () => { this.validStatus[key] = false; };
                    img.src = url;
                });
            },

            injectStyles() {
                if (document.getElementById('alpine-emoji-styles')) return;
                const s = document.createElement('style');
                s.id = 'alpine-emoji-styles';
                s.innerHTML = libStyles;
                document.head.appendChild(s);
            }
        };
    };
}));