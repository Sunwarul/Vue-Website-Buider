export default {
    install(Vue, options = {}) {
        Vue.filter('currency', (value, currency, locale) => {
            return new Intl.NumberFormat(locale || 'en-US', {
                style: 'currency',
                currency: currency || 'USD'
            }).format(parseFloat(value));
        });
        Vue.filter('truncate', (value, length) => {
            return window._.truncate(value, length || 40);
        });
    }
};
