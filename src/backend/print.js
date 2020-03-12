function addStyles(win, styles) {
    styles.forEach(style => {
        let link = win.document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', style);
        win.document.getElementsByTagName('head')[0].appendChild(link);

    });
}

const VueHtmlToPaper = {
    install(Vue, options = {}) {
        Vue.mixin({
            methods: {
                $htmlToPaper(el, cb = () => true) {
                    let {
                        name = '_blank',
                        specs = ['fullscreen=yes', 'titlebar=yes', 'scrollbars=yes'],
                        replace = true,
                        styles = []
                    } = options;
                    specs = !!specs.length ? specs.join(',') : '';

                    const element = document.querySelectorAll(el)[0];

                    if (!element) {
                        alert(`Element to print #${el} not found!`);
                        return;
                    }

                    const url = '';
                    const win = window.open(url, name, specs, replace);
                    win.document.write(`
            <html>
              <head>
                <title>${document.title}</title>
                <style>
                @media print  {
                    pre{
                        border: 0 !important;
                        outline: 0 !important;
                        font-size: 16px;
                    }                
                }
                </style>
              </head>
              <body>
                ${element.innerHTML}
              </body>
            </html>
          `);

                    addStyles(win, styles);

                    setTimeout(() => {
                        win.document.close();
                        win.focus();
                        win.print();
                        win.close();
                        cb();
                    }, 1000);
                    return true;
                }
            }
        });
    }
}

export default VueHtmlToPaper;
