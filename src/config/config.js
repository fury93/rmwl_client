var prodConfig = {
    BASE_URL: 'http://rmapi.runasis.com'
};

var devConfig = {
    BASE_URL: 'http://rmwl-api.loc'
};

export const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? prodConfig : devConfig;

export default config;